---
title: Qué es git stash y cuándo usarlo en tus proyectos
date: '2026-10-20T14:13:23.020Z'
featuredimage: /assets/evergreen/que-es-git-stash.jpg
categoria: Random
tags:
  - '#git'
  - '#programacion'
  - '#terminal'
  - '#tutorial'
short-description: >-
  Qué es git stash y cómo guardar cambios a medias para cambiar de rama. Ejemplo
  completo en terminal, comandos de recuperación y errores comunes.
mk1: >-
  En pocas palabras, **qué es git stash**: un comando que guarda temporalmente
  los cambios que tienes sin confirmar, deja tu directorio de trabajo limpio y
  te permite recuperarlos después, justo donde los dejaste. Sirve para cuando
  estás a medio camino de una tarea y necesitas cambiar de rama, traer cambios
  del remoto o atender algo urgente sin perder tu avance.


  Si alguna vez intentaste cambiar de rama y Git te respondió que tus cambios
  locales se sobrescribirían, ya conoces el problema que resuelve. Git no te
  deja moverte entre ramas con trabajo sin confirmar, a menos que hagas un
  commit o lo descartes. Stash es la tercera opción: guardar sin confirmar y sin
  tirar nada.


  ## Qué es git stash con una analogía sencilla


  Piensa en tu escritorio. Tienes varias hojas a medias sobre la mesa y alguien
  te pide espacio. Lo más práctico es meter las hojas en un cajón con una
  etiqueta, dejar la mesa vacía y sacarlas cuando vuelvas. Eso hace git stash
  con tus archivos modificados.


  Por dentro, el comando toma las modificaciones de tus archivos rastreados y
  del área de preparación, las guarda como una entrada en una pila y devuelve el
  directorio de trabajo al estado del último commit (HEAD). Como es una pila,
  funciona en orden LIFO: la entrada más reciente siempre es `stash@{0}`, la
  anterior es `stash@{1}`, y así sucesivamente.


  ## Cuándo conviene usar git stash


  - Cuando necesitas cambiar de rama para atender un bug urgente y tu trabajo
  todavía no está listo para un commit.

  - Cuando quieres traer cambios del remoto y tienes modificaciones locales en
  los mismos archivos.

  - Cuando quieres probar cómo se comporta el código sin tus cambios, por un
  momento.

  - Cuando te interrumpen y no tienes tiempo de dejar un commit con sentido.


  Si el trabajo va a durar días, stash no es la herramienta adecuada. Lo
  explicamos más abajo.
mk2: >-
  ## Ejemplo completo en terminal: del trabajo a medias al bug urgente


  Supongamos que trabajas en un proyecto de tienda en línea, en la rama
  `feature/carrito`. Modificaste `src/carrito.js` y `styles/carrito.css`, y
  creaste un archivo nuevo, `src/cupones.js`, que todavía no agregaste a Git.
  Llega un aviso: hay un error de IVA en producción y debes corregirlo en
  `main`.


  **Paso 1.** Revisa el estado del repositorio:


  ```bash

  $ git status

  On branch feature/carrito

  Changes not staged for commit:
    modified:   src/carrito.js
    modified:   styles/carrito.css

  Untracked files:
    src/cupones.js
  ```


  **Paso 2.** Guarda tu trabajo con un mensaje descriptivo e incluye los
  archivos no rastreados con `-u`:


  ```bash

  $ git stash push -u -m "carrito: cálculo de descuentos a medias"

  Saved working directory and index state On feature/carrito: carrito: cálculo
  de descuentos a medias

  ```


  **Paso 3.** Confirma que el directorio quedó limpio:


  ```bash

  $ git status

  On branch feature/carrito

  nothing to commit, working tree clean

  ```


  **Paso 4.** Cambia a `main`, corrige el bug y confirma el cambio:


  ```bash

  $ git switch main

  Switched to branch 'main'

  $ git add src/checkout.js

  $ git commit -m "Corrige cálculo de IVA en checkout"

  [main 3f2a9c1] Corrige cálculo de IVA en checkout
   1 file changed, 2 insertions(+), 2 deletions(-)
  ```


  **Paso 5.** Regresa a tu rama y revisa la lista de stashes:


  ```bash

  $ git switch feature/carrito

  Switched to branch 'feature/carrito'

  $ git stash list

  stash@{0}: On feature/carrito: carrito: cálculo de descuentos a medias

  ```


  **Paso 6.** Recupera tu trabajo con `pop`:


  ```bash

  $ git stash pop

  On branch feature/carrito

  Changes not staged for commit:
    modified:   src/carrito.js
    modified:   styles/carrito.css

  Untracked files:
    src/cupones.js

  Dropped refs/stash@{0} (9b1e4d7...)

  ```


  **Paso 7.** Verifica. `git stash list` ya no muestra nada y `git status`
  vuelve a mostrar tus archivos.


  Si hubieras omitido `-u`, `src/cupones.js` se habría quedado en la carpeta
  durante el cambio de rama. Eso no siempre es un problema, pero si `main` tiene
  un archivo con ese mismo nombre, Git se negaría a cambiar de rama para no
  sobrescribirlo. Sin `-u`, Git solo guarda los archivos rastreados modificados
  y los que ya están en el área de preparación. Los ignorados, como un `.env` o
  una carpeta `node_modules`, requieren la opción `-a`.
mk3: >-
  ## Pop contra apply: cuál usar


  <table>

  <thead><tr><th>Comando</th><th>Qué hace</th><th>¿Elimina el stash de la
  lista?</th></tr></thead>

  <tbody><tr><td><code>git stash pop</code></td><td>Aplica el stash y lo borra
  si todo sale bien</td><td>Sí, si se aplica sin
  conflictos</td></tr><tr><td><code>git stash apply</code></td><td>Aplica el
  stash y lo deja en la lista</td><td>No</td></tr></tbody>

  </table>


  Usa `apply` cuando quieras aplicar el mismo cambio en otra rama o cuando
  quieras conservar una copia mientras pruebas. Para aplicar un stash distinto
  del más reciente, indica su referencia: `git stash apply stash@{1}`.


  ## Comandos útiles para gestionar stashes


  - `git stash push -m "descripción"`: guarda con nombre. Es la forma
  recomendada desde Git 2.13. El antiguo `git stash save` todavía funciona, pero
  la documentación oficial lo trata como legado.

  - `git stash push -- src/carrito.js`: guarda solo un archivo, también desde
  Git 2.13.

  - `git stash list`: muestra todas las entradas.

  - `git stash show -p stash@{1}`: muestra el diff de un stash antes de
  aplicarlo.

  - `git stash drop stash@{0}`: elimina una entrada específica.

  - `git stash clear`: borra todas las entradas. Son difíciles de recuperar, así
  que no cuentes con ello.

  - `git stash branch feature/carrito-v2`: crea una rama desde el commit donde
  se creó el stash y aplica el cambio ahí. Es útil cuando `main` avanzó mucho y
  el stash choca con el código actual.


  ## Qué hacer si git stash pop provoca conflictos


  Cuando el cambio guardado toca las mismas líneas que modificaste en la rama de
  destino, `pop` puede fallar con un conflicto. La [documentación oficial de git
  stash](https://git-scm.com/docs/git-stash) indica que, en ese caso, la entrada
  no se elimina de la lista. El proceso es este:


  1. Ejecuta `git stash pop` y revisa el mensaje. Git indica los archivos en
  conflicto.

  2. Abre cada archivo y busca las marcas `<<<<<<<`, `=======` y `>>>>>>>`.
  Elige el código correcto o combina las dos versiones.

  3. Marca cada archivo como resuelto con `git add` sobre su ruta.

  4. Revisa con `git status` y, cuando todo esté listo, elimina la entrada con
  `git stash drop`.


  Antes de volver a intentar el `pop`, revisa con `git status` y `git diff`. El
  árbol de trabajo ya tiene cambios parciales y un segundo intento puede dejar
  un desorden difícil de entender.
mk4: >-
  ## Cómo recuperar un stash borrado por error


  Un stash eliminado no desaparece de inmediato. Git conserva el commit aunque
  ya no aparezca en la lista, hasta que una limpieza lo elimine. Tienes dos
  caminos.


  **Si acabas de hacer drop o clear**, Git imprime el identificador del commit:


  ```bash

  $ git stash drop

  Dropped refs/stash@{0} (9b1e4d7c2f8a...)

  ```


  Puedes restaurarlo con:


  ```bash

  $ git stash apply 9b1e4d7c2f8a

  ```


  **Si ya no tienes ese identificador**, busca los commits inalcanzables:


  ```bash

  $ git fsck --unreachable | grep commit

  unreachable commit 9b1e4d7c2f8a...

  unreachable commit 41ad0e8b...

  ```


  Revisa el contenido de cada candidato:


  ```bash

  $ git show 9b1e4d7

  ```


  Cuando encuentres el correcto, aplícalo con `git stash apply 9b1e4d7` o crea
  una rama para conservarlo: `git branch recuperado-carrito 9b1e4d7`.


  Advertencia: estos objetos no duran para siempre. Git puede eliminarlos
  durante una limpieza (`git gc`), y por defecto esa limpieza solo borra objetos
  con cierta antigüedad. Si necesitas recuperar algo, hazlo cuanto antes y evita
  ejecutar `git gc --prune=now` mientras tanto.


  ## Errores comunes y advertencias


  - **Olvidar `-u`.** Los archivos nuevos no entran al stash y pueden estorbar
  al cambiar de rama.

  - **Usar `-a` sin pensar.** Guarda también los archivos ignorados. Si tienes
  un `.env` con credenciales, quedará dentro del stash local. Revisa qué estás
  guardando antes de usar esta opción.

  - **Creer que el stash es un respaldo.** Vive solo en tu equipo. Como explica
  el [tutorial de Atlassian sobre
  stash](https://www.atlassian.com/es/git/tutorials/saving-changes/git-stash),
  los stashes no se transfieren al repositorio remoto cuando haces push. Si
  cambias de computadora, ese trabajo no viaja con el proyecto.

  - **Limpiar con `git clean` sin revisar.** `git clean -fd` borra archivos no
  rastreados sin pasar por el stash. Si vas a usarlo, guarda antes con `git
  stash push -u`.

  - **Stashes sin nombre.** Sin `-m`, Git usa un mensaje genérico con el hash
  del último commit. Con tres o cuatro entradas, es casi imposible
  distinguirlas.
mk5: >-
  ## Cuándo NO usar git stash


  Stash está pensado para pausas cortas, de minutos u horas. Si tu trabajo va a
  durar varios días, conviene guardarlo en una rama o en un commit WIP:


  ```bash

  $ git switch -c wip/cupones

  $ git add .

  $ git commit -m "WIP: primera versión de cupones"

  ```


  Para retomarlo, cambia a esa rama y sigue trabajando. Si después quieres
  deshacer el commit pero conservar los cambios, usa `git reset --soft HEAD~1`.
  Cuando llegue el momento de integrar esa rama con la principal, puedes revisar
  las opciones en la guía sobre [Git Rebase vs. Git
  Merge](https://www.10datos.com/git-rebase-vs-git-merge-diferencias-clave-y-cuál-deberías-usar-en-tus-proyectos).


  La diferencia con un stash es clara: el commit WIP tiene nombre, historial y
  puede subirse al remoto con `git push`. Si acumulas más de dos o tres stashes,
  probablemente es señal de que necesitas ramas.


  ## Preguntas frecuentes


  ### ¿Git stash guarda archivos nuevos o sin seguimiento?


  No por defecto. Solo guarda los archivos rastreados modificados y los que
  están en el área de preparación. Para incluir los nuevos usa `git stash push
  -u`, y para incluir también los ignorados usa `-a`.


  ### ¿Cuál es la diferencia entre git stash pop y git stash apply?


  Ambos aplican los cambios. `pop` además elimina la entrada si todo sale bien;
  `apply` la conserva. Usa `apply` si quieres tener una copia mientras pruebas.


  ### ¿Cómo veo lo que contiene un stash antes de aplicarlo?


  Con `git stash show -p stash@{0}`. La opción `-p` muestra el diff completo.
  Sin ella solo verás un resumen de los archivos afectados.


  ### ¿Se sube el stash a GitHub o GitLab con git push?


  No. Los stashes son locales. Si necesitas compartir ese trabajo, confírmalo en
  una rama y súbela al remoto.


  ### ¿Git borra los stashes por sí solo?


  No. Permanecen en la lista hasta que haces `drop` o `clear`. Aun así, no los
  uses como respaldo a largo plazo.


  ## Conclusión


  Git stash es una herramienta sencilla para pausar un trabajo sin confirmarlo
  ni perderlo. Quédate con tres hábitos: nombrar cada stash con `push -m`,
  revisar la lista antes de aplicar y no eliminar una entrada hasta confirmar
  que el cambio está a salvo. Si además quieres decidir cómo integrar tu trabajo
  cuando vuelvas a la rama principal, la guía sobre [Git Rebase vs. Git
  Merge](https://www.10datos.com/git-rebase-vs-git-merge-diferencias-clave-y-cuál-deberías-usar-en-tus-proyectos)
  te ayudará a elegir.
---

