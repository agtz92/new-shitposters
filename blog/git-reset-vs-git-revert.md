---
title: 'Git reset vs git revert: cuál usar y cuándo'
date: '2026-10-26T14:14:22.370Z'
featuredimage: >-
  https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8Z2l0JTIwY29tbWl0JTIwaGlzdG9yeXxlbnwxfDB8fHwxNzkzMDIzODUxfDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Random
tags:
  - '#git'
  - '#programacion'
  - '#versiones'
  - '#commits'
  - '#tutorial'
short-description: >-
  Git reset vs git revert: cuándo usar cada uno según si el commit ya está
  compartido, con ejemplos de historial y cómo evitar reescribir ramas públicas.
mk1: >-
  <p><small><em>Foto de <a
  href="https://unsplash.com/@markusspiske?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Markus Spiske</a> en <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  Si ya cometiste un error en Git, la pregunta clave es si alguien más tiene ese
  commit. En la comparación de **git reset vs git revert** la regla básica es
  esta: si el commit solo existe en tu computadora, `git reset` te permite
  reescribir la historia local; si ya está en un repositorio compartido, usa
  `git revert`, que deshace los cambios creando un commit nuevo.


  Esa respuesta resuelve la mayoría de los casos, pero conviene entender qué
  cambia en el historial con cada comando. Aquí te explico cómo funciona cada
  uno, con ejemplos de `git log` y los riesgos de reescribir ramas públicas.


  ## Qué hace cada comando


  ### git revert: deshacer con un commit nuevo


  `git revert` crea un commit que invierte los cambios de otro commit. Según la
  [documentación oficial de
  git-revert](https://git-scm.com/docs/git-revert.html), sirve para registrar
  commits nuevos que anulan el efecto de commits anteriores. El historial
  original no se toca: los commits viejos siguen ahí y el nuevo queda encima.


  ```

  git revert 9b13e7d

  ```


  Git abrirá tu editor para que escribas el mensaje del nuevo commit, que por
  defecto dice algo como `Revert "Corrige enlace roto en el footer"`. Antes de
  ejecutarlo, tu árbol de trabajo debe estar limpio, es decir, sin cambios
  pendientes respecto a HEAD.


  ### git reset: mover el puntero de la rama


  `git reset` no crea un commit de deshacer. Lo que hace es mover el puntero de
  la rama actual hacia otro commit. Según el modo que uses, afecta a distintas
  zonas:


  - `--soft`: mueve HEAD. Los cambios de los commits eliminados quedan en el
  área de staging, listos para volver a confirmarse.

  - `--mixed` (el modo por defecto): mueve HEAD y limpia el staging. Los cambios
  siguen en tus archivos, pero sin preparar.

  - `--hard`: mueve HEAD, limpia el staging y descarta los cambios del
  directorio de trabajo. La [documentación de
  git-reset](https://git-scm.com/docs/git-reset) advierte que este modo puede
  descartar trabajo; los cambios no confirmados que se pierden así generalmente
  no se recuperan.
mk2: >-
  ## La regla de decisión: ¿el commit ya es compartido?


  La regla práctica es esta:


  1. **Si el commit solo está en tu computadora**, puedes usar `git reset` para
  limpiar el historial.

  2. **Si el commit ya está en un remoto** (GitHub, GitLab, Bitbucket o
  cualquier servidor que otras personas usen), usa `git revert`.


  El problema es que a veces no sabes con certeza si alguien ya lo descargó.
  Puedes comprobarlo así:


  ```

  git fetch origin

  git branch -r --contains 9b13e7d

  ```


  Si la salida muestra ramas como `origin/main`, el commit ya está en el remoto.
  Si no muestra nada, solo existe en tu repositorio local. El `git fetch` previo
  es importante: Git compara contra las referencias remotas que tiene guardadas,
  y si no las actualizas, la respuesta puede estar desfasada.


  ### El matiz de la rama personal


  No todo lo que está en un remoto implica el mismo riesgo. Una rama de
  funcionalidad que solo tú usas no es igual que `main`. Si después de subirla
  decides reescribirla, la opción más segura es `--force-with-lease` en lugar de
  `--force`. La [documentación de git push](https://git-scm.com/docs/git-push)
  explica que esta opción rechaza el envío si el remoto tiene cambios que tu
  copia local no conoce, así que no sobrescribes por accidente el trabajo de
  otra persona.


  ```

  git reset --soft HEAD~1

  git push --force-with-lease origin mi-rama

  ```


  Esto solo es razonable si nadie más trabaja sobre esa rama. Si un compañero
  hizo commits encima, su copia quedará desincronizada y tendrá que recuperar el
  trabajo con cuidado. En ramas compartidas como `main` o `develop`, la regla es
  no reescribir: usa `git revert`.
mk3: >-
  ## Ejemplo de historial: antes y después


  Los diagramas de `git log --graph` ayudan a ver la diferencia. Supongamos que
  el commit `9b13e7d` contiene un error y que ya se subió al remoto.


  ### Caso compartido: revert


  Antes:


  ```

  * 4f2a9c1 (HEAD -> main, origin/main) Agrega formulario de contacto

  * 9b13e7d Corrige enlace roto en el footer

  * 2c8d0aa Actualiza dependencias

  ```


  Después de ejecutar `git revert 9b13e7d`:


  ```

  * 7e5f310 (HEAD -> main) Revert "Corrige enlace roto en el footer"

  * 4f2a9c1 (origin/main) Agrega formulario de contacto

  * 9b13e7d Corrige enlace roto en el footer

  * 2c8d0aa Actualiza dependencias

  ```


  El commit `9b13e7d` sigue en el historial, y el nuevo `7e5f310` anula sus
  cambios. Como solo agregaste un commit, puedes hacer un `git push` normal. Tus
  compañeros reciben un cambio hacia adelante y su historial sigue coincidiendo
  con el tuyo.


  ### Caso local: reset


  Ahora imagina que los dos últimos commits nunca salieron de tu computadora:


  Antes:


  ```

  * 4f2a9c1 (HEAD -> main) Agrega formulario de contacto

  * 9b13e7d Corrige enlace roto en el footer

  * 2c8d0aa (origin/main) Actualiza dependencias

  ```


  Después de ejecutar `git reset --soft HEAD~2`:


  ```

  * 2c8d0aa (HEAD -> main, origin/main) Actualiza dependencias

  ```


  Los dos commits desaparecen de la rama, pero sus cambios quedan en el área de
  staging, así que puedes corregirlos y volver a confirmarlos. Si necesitas
  guardar cambios que aún no están listos, revisa nuestra guía sobre [qué es git
  stash y cuándo usarlo](https://www.10datos.com/que-es-git-stash) antes de
  ejecutar un reset.


  ## Cómo revertir un merge commit


  Un merge commit tiene dos padres. Para revertirlo, Git necesita saber cuál
  línea quieres conservar. Con `-m 1` le indicas que conserve la rama principal
  (el primer padre, normalmente la rama en la que hiciste el merge) y deshaga
  los cambios que trajo la otra:


  ```

  git log --oneline --graph -n 5

  git revert -m 1 a1b2c3d

  ```


  Hay una trampa importante. Después de revertir un merge, si intentas volver a
  fusionar esa misma rama, Git puede considerar que sus cambios ya están
  integrados y no traerlos de nuevo. Para reincorporarlos, primero tienes que
  revertir el revert. Por eso, antes de deshacer un merge, conviene pensar si
  realmente quieres quitar esos cambios o solo corregir una parte.
mk4: >-
  ## Cómo revertir desde un pull request


  En GitHub no siempre necesitas la terminal. Si un pull request ya fusionado
  causa problemas, puedes crear una reversión desde la interfaz. Según la
  [documentación de GitHub sobre revertir un pull
  request](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/reverting-a-pull-request),
  el resultado es un pull request nuevo que contiene el commit de reversión.


  Este flujo tiene una ventaja para equipos: el cambio que deshace el trabajo
  también pasa por revisión antes de integrarse a la rama principal. Así no
  quedas con una reversión que nadie revisó.


  ## Cómo recuperar un commit después de un reset equivocado


  Si hiciste un reset y te diste cuenta tarde, el reflog suele salvarte. Según
  la [guía de Atlassian sobre reescritura de
  historial](https://www.atlassian.com/es/git/tutorials/rewriting-history), el
  registro de referencia guarda el estado anterior de las ramas y te permite
  volver a él.


  1. Ejecuta `git reflog` y busca la línea anterior al reset. Por ejemplo:
  `4f2a9c1 HEAD@{1}: commit: Agrega formulario de contacto`.

  2. Confirma que es el punto correcto con `git log --oneline -3 4f2a9c1`.

  3. Crea una rama de rescate para no perder nada más: `git branch
  rescate-formulario 4f2a9c1`.

  4. Si quieres que `main` vuelva a apuntar ahí, ejecuta `git reset 4f2a9c1`
  mientras estás en esa rama. Si prefieres revisar primero, puedes fusionar la
  rama de rescate.


  Una advertencia: el reflog es local, así que solo sirve en tu computadora, y
  Git limpia entradas antiguas con el tiempo. Actúa pronto y no ejecutes `git
  reset --hard` sin antes guardar cambios pendientes.
mk5: >-
  ## Tabla comparativa


  <table>

  <thead><tr><th></th><th>git revert</th><th>git reset</th></tr></thead>

  <tbody><tr><td>Qué hace</td><td>Crea un commit que invierte cambios
  anteriores</td><td>Mueve el puntero de la rama a otro
  commit</td></tr><tr><td>Historial</td><td>Conserva todos los
  commits</td><td>Quita commits de la rama (siguen en el
  reflog)</td></tr><tr><td>Ramas compartidas</td><td>Seguro</td><td>Riesgoso:
  obliga a hacer force push</td></tr><tr><td>Cambios sin confirmar</td><td>Pide
  árbol de trabajo limpio</td><td><code>--hard</code> los
  descarta</td></tr><tr><td>Caso típico</td><td>Anular un commit ya
  publicado</td><td>Limpiar commits locales antes de compartir</td></tr></tbody>

  </table>


  Si además te interesa entender cómo integrar cambios sin reescribir historial,
  revisa nuestra comparación de [git rebase y git
  merge](https://www.10datos.com/git-rebase-vs-git-merge-diferencias-clave-y-cuál-deberías-usar-en-tus-proyectos).


  ## Preguntas frecuentes


  ### ¿git revert borra el commit original?


  No. El commit original sigue en el historial. Git agrega un commit nuevo que
  invierte sus cambios, así que ambos quedan visibles.


  ### ¿Puedo usar git reset en una rama compartida?


  Técnicamente sí, pero tendrás que hacer un push forzado y tus compañeros
  tendrán que sincronizar su copia, lo que puede causarles problemas. En ramas
  como `main`, usa `git revert`.


  ### ¿Qué es --force-with-lease y en qué se diferencia de --force?


  `--force` sobrescribe el remoto sin revisar si alguien subió cambios nuevos.
  `--force-with-lease` solo envía si el remoto está donde tu copia local lo
  espera, lo que evita borrar trabajo ajeno sin querer.


  ### ¿Cómo deshago un commit que ya subí a GitHub?


  Usa `git revert` sobre ese commit y después un `git push` normal. Si el cambio
  vino de un pull request fusionado, también puedes crear la reversión desde la
  interfaz de GitHub.


  ## Conclusión


  La diferencia entre git reset y git revert depende sobre todo de si el commit
  ya salió de tu máquina. Si es local, reset te ayuda a limpiar el historial. Si
  ya está compartido, revert es la opción segura porque conserva la historia y
  no obliga a nadie a reescribir su copia. Antes de ejecutar cualquiera de los
  dos, comprueba el estado de la rama y guarda tus cambios pendientes.
---

