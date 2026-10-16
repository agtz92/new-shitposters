#!/usr/bin/env node
/**
 * Importer de EvergreenSEO: se copia a cada blog (scripts/evergreen-import.mjs) y lo corre un GitHub Action.
 * Baja el feed del sitio (EVERGREEN_FEED_URL = https://<dashboard>/api/feed/<feed_token>) y escribe cada
 * .md tal cual en la ruta que indica el feed (y su imagen, si se copia al repo). Sin dependencias: Node 18+.
 *
 * Reglas:
 * - Archivo nuevo → se escribe.
 * - Ya existe y lo importó este script con una versión anterior (rev) → se reescribe (corrección desde el dashboard).
 * - Ya existe pero no lo importó este script (Decap, o publicado antes por commit) → no se toca, salvo que el
 *   feed traiga una corrección hecha después de publicarlo.
 * - Nunca borra nada. El registro de lo importado vive en .evergreen/imported.json.
 *
 * Uso: EVERGREEN_FEED_URL=... node scripts/evergreen-import.mjs [--dry-run]
 */
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const FEED_URL = process.env.EVERGREEN_FEED_URL;
const DRY = process.argv.includes("--dry-run");
const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, ".evergreen", "imported.json");
const CORRECTION_GAP_MS = 60_000; // rev posterior a la publicación = corrección hecha desde el dashboard

if (!FEED_URL) {
  console.error("Falta EVERGREEN_FEED_URL");
  process.exit(1);
}

/** Ruta relativa segura dentro del repo (el feed no puede escribir fuera ni en .git). */
function safePath(rel) {
  const abs = path.resolve(ROOT, rel);
  if (!abs.startsWith(ROOT + path.sep) || rel.split(/[\\/]/).some((p) => p === ".." || p === ".git")) {
    throw new Error(`Ruta inválida en el feed: ${rel}`);
  }
  return abs;
}

async function write(rel, data) {
  const abs = safePath(rel);
  if (DRY) return console.log(`  (dry-run) escribiría ${rel}`);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, data);
}

async function main() {
  const res = await fetch(FEED_URL, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Feed respondió ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const feed = await res.json();
  const manifest = existsSync(MANIFEST) ? JSON.parse(await fs.readFile(MANIFEST, "utf8")) : {};

  let written = 0;
  for (const item of feed.items ?? []) {
    const known = manifest[item.slug];
    if (known === item.rev) continue;
    const exists = existsSync(safePath(item.path));
    const correction = new Date(item.rev).getTime() - new Date(item.published_at).getTime() > CORRECTION_GAP_MS;
    if (exists && !known && !correction) {
      console.log(`= ${item.path} ya existe; se registra sin reescribir`);
      manifest[item.slug] = item.rev;
      continue;
    }
    // Siempre se vuelve a bajar: una corrección puede traer imagen nueva con el mismo nombre
    if (item.image) {
      const img = await fetch(item.image.url);
      if (!img.ok) throw new Error(`Imagen de ${item.slug} respondió ${img.status}`);
      await write(item.image.path, Buffer.from(await img.arrayBuffer()));
    }
    await write(item.path, item.content);
    console.log(`${exists ? "~" : "+"} ${item.path}`);
    manifest[item.slug] = item.rev;
    written++;
  }

  if (!DRY) {
    await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
    await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  }
  console.log(`${written} post(s) importados de ${feed.site?.domain ?? FEED_URL}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
