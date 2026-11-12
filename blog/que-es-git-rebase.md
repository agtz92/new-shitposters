---
title: Qué es git rebase y cuándo conviene usarlo
date: '2026-11-12T14:11:30.254Z'
featuredimage: >-
  https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8ZGV2ZWxvcGVyJTIwbGFwdG9wJTIwY29kZSUyMHNjcmVlbnxlbnwxfDB8fHwxNzk0NDkyNDYxfDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Random
tags:
  - '#git'
  - '#rebase'
  - '#versiones'
  - '#programacion'
short-description: >-
  Qué es git rebase, cómo reescribe tu historial, un ejemplo completo con
  conflicto y cuándo evitarlo en ramas compartidas. Guía para principiantes.
mk1: >-
  <p><small><em>Foto de <a
  href="https://unsplash.com/@ilyapavlov?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Ilya Pavlov</a> en <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  ## Qué es git rebase y qué hace exactamente


  Si te preguntas qué es git rebase, la respuesta corta es esta: es un comando
  que toma los commits de tu rama y los vuelve a aplicar encima de otra rama,
  como si hubieras empezado tu trabajo desde la punta actual de esa rama. El
  resultado es un historial en línea recta, sin commits de fusión. Sirve para
  mantener tu rama al día, pero tiene una regla que no conviene romper: no lo
  uses sobre ramas que otras personas ya descargaron.


  Abajo verás cómo funciona, en qué se distingue de merge y de reset, un ejemplo
  completo que puedes correr en tu terminal y las situaciones en las que es
  mejor no usarlo.


  Según la [documentación oficial de
  git-rebase](https://git-scm.com/docs/git-rebase), el comando reaplica commits
  sobre otra base. Piensa en un caso típico: creaste una rama llamada feature
  para una función nueva, y mientras tanto alguien agregó cambios a main. Tu
  rama sigue apoyada en un punto viejo de main.


  Con rebase, Git hace lo siguiente:


  - Localiza el ancestro común entre tu rama y la base, es decir, el punto donde
  se separaron.

  - Toma los commits que existen solo en tu rama.

  - Los reaplica, uno por uno, encima de la punta actual de la base.

  - Mueve el puntero de tu rama al último commit reaplicado.


  Lo importante es que los commits reaplicados tienen el mismo cambio, pero
  llevan hashes nuevos. Por eso decimos que rebase reescribe el historial.


  ## Rebase frente a merge: la diferencia que cambia la forma del historial


  Ambos comandos integran cambios de una rama en otra, pero dejan historiales
  distintos. Merge crea un commit de fusión que une las dos historias, así que
  conservas la forma real en que se desarrolló el trabajo. Rebase pone tus
  commits en fila, como si se hubieran escrito en orden.


  <table>

  <thead><tr><th>Aspecto</th><th>git merge</th><th>git rebase</th></tr></thead>

  <tbody><tr><td>Qué hace</td><td>Une dos ramas con un commit de
  fusión</td><td>Reaplica tus commits sobre la base</td></tr><tr><td>Forma del
  historial</td><td>Ramificado, con bifurcaciones
  visibles</td><td>Lineal</td></tr><tr><td>Reescribe
  commits</td><td>No</td><td>Sí, genera commits
  nuevos</td></tr><tr><td>Conflictos</td><td>Se resuelven todos a la
  vez</td><td>Se resuelven uno por cada commit reaplicado</td></tr><tr><td>Caso
  típico</td><td>Integrar una rama compartida</td><td>Mantener tu rama personal
  al día</td></tr></tbody>

  </table>


  La diferencia en los conflictos es la que más se nota en la práctica. Con
  merge ves todos los conflictos juntos. Con rebase, si tu rama tiene varios
  commits que tocan las mismas líneas, tendrás que resolver conflictos varias
  veces seguidas. La lógica de marcas y de git add es la misma; si te hace falta
  repasarla, [cómo resolver conflictos de merge en Git paso a
  paso](https://www.10datos.com/como-resolver-conflictos-merge-git) lo explica
  con calma. Para una comparación más amplia de criterios, revisa [Git Rebase
  vs. Git Merge: diferencias clave y cuál deberías usar en tus
  proyectos](https://www.10datos.com/git-rebase-vs-git-merge-diferencias-clave-y-cuál-deberías-usar-en-tus-proyectos).
mk2: >-
  ## Rebase frente a reset y revert


  Estos tres comandos se confunden mucho porque todos cambian el historial, pero
  el riesgo de cada uno es distinto:


  - git reset mueve el puntero de la rama a otro commit. Con --hard también
  descarta los cambios sin confirmar de tus archivos, así que es el más
  peligroso de los tres.

  - git revert crea un commit nuevo que deshace los cambios de otro commit. No
  borra nada, por eso es la opción segura en ramas compartidas.

  - git rebase reaplica commits sobre otra base. No deshace trabajo, pero cambia
  los hashes de los commits que mueve.


  Si lo que quieres es deshacer un commit que ya publicaste, usa revert. Si
  quieres ordenar tus commits antes de compartirlos, usa rebase. Para ver a
  fondo cuándo conviene cada uno, lee [Git reset vs git revert: cuál usar y
  cuándo](https://www.10datos.com/git-reset-vs-git-revert).
mk3: >-
  ## Ejemplo completo: rebase de principio a fin


  El siguiente script crea un repositorio de prueba desde cero, genera una rama
  que diverge de main, provoca un conflicto real y lo resuelve con rebase.
  Puedes copiarlo en una carpeta vacía.


  Requisitos previos:


  - Git 2.28 o posterior (por la opción -b de git init) y Git 2.23 o posterior
  para git switch.

  - Una terminal Bash, Zsh o Git Bash en Windows.

  - Antes de hacer rebase en un repositorio real, crea una rama de respaldo con
  git branch respaldo-feature. Así siempre tendrás un punto de regreso.


  ### Paso 1: crea dos ramas que divergen


  ```bash

  mkdir demo-rebase && cd demo-rebase

  git init -b main

  git config user.name 'Ana'

  git config user.email 'ana@ejemplo.com'


  echo 'Hola' > saludo.txt

  git add saludo.txt

  git commit -m 'Commit inicial'


  git switch -c feature

  echo 'Hola desde feature' > saludo.txt

  git commit -am 'Cambia el saludo en feature'


  git switch main

  echo 'Hola desde main' > saludo.txt

  git commit -am 'Cambia el saludo en main'


  git switch feature

  git rebase main

  ```


  El último comando provoca un conflicto, porque ambas ramas cambiaron la misma
  línea. Git responde algo como esto:


  ```

  Auto-merging saludo.txt

  CONFLICT (content): Merge conflict in saludo.txt

  error: could not apply 7d3e1f2... Cambia el saludo en feature

  ```


  Git se detiene a mitad del proceso. Debajo del mensaje aparecen pistas con las
  tres opciones: continuar con --continue, saltar el commit con --skip o
  cancelar con --abort.


  ### Paso 2: resuelve el conflicto y continúa


  Dentro de saludo.txt, Git escribe marcas como estas:


  ```

  <<<<<<< HEAD

  Hola desde main

  =======

  Hola desde feature

  >>>>>>> 7d3e1f2 (Cambia el saludo en feature)

  ```


  Aquí HEAD es la versión de la base (main). Decide el texto final, guarda el
  archivo, márcalo como resuelto y continúa:


  ```bash

  echo 'Hola desde main y feature' > saludo.txt

  git add saludo.txt

  git rebase --continue

  ```


  Si todo salió bien, Git termina con el mensaje Successfully rebased and
  updated refs/heads/feature.


  ### Paso 3: revisa el historial


  ```bash

  git log --oneline --graph --all

  ```


  La salida debe verse así:


  ```

  * 4b1c9e2 (HEAD -> feature) Cambia el saludo en feature

  * 8f2a7d0 (main) Cambia el saludo en main

  * 1c5e3b9 Commit inicial

  ```


  Los hashes serán distintos en tu equipo, pero la forma debe coincidir: una
  sola línea que parte de Commit inicial, con feature delante de main. Para
  confirmar el contenido, ejecuta cat saludo.txt; debe mostrar Hola desde main y
  feature.


  ### Paso 4: cancela o recupera si algo sale mal


  Si estás en medio del conflicto y prefieres volver al punto de partida,
  ejecuta git rebase --abort. La rama regresa exactamente al estado previo al
  rebase. Si el rebase ya terminó, vuelve a tu rama de respaldo con git reset
  --hard respaldo-feature, pero solo si no tienes cambios sin guardar, porque
  ese comando los descarta.


  ## Rebase interactivo: ordenar tus commits antes de compartirlos


  El rebase interactivo (git rebase -i) abre una lista de commits en tu editor y
  tú decides qué hacer con cada uno. Por ejemplo, git rebase -i HEAD~3 muestra
  los últimos tres commits de tu rama. Los comandos más usados son:


  - pick: conserva el commit tal cual.

  - reword: conserva el cambio, pero te deja editar el mensaje.

  - squash: combina el commit con el anterior.

  - drop: elimina el commit.


  Es muy útil para limpiar una rama con commits del tipo «arreglo typo» antes de
  abrir un pull request. Pro Git dedica un capítulo a este tema: [Git Tools:
  Rewriting
  History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History).
mk4: >-
  ## Ramas compartidas: la regla que no debes romper


  Reescribir historial es seguro mientras solo tú tienes esos commits. El
  problema aparece cuando ya los subiste a un remoto que otras personas usan. Si
  los reescribes, tu copia y la de tu equipo dejan de coincidir, y quien intente
  integrar esos cambios verá divergencias difíciles de resolver.


  Atlassian sostiene que el rebase en sí no es tan peligroso. El riesgo serio
  aparece cuando se combina una reorganización interactiva que reescribe
  historial con un push forzado a una rama remota compartida ([tutorial de
  rebase de
  Atlassian](https://www.atlassian.com/es/git/tutorials/rewriting-history/git-rebase)).
  GitHub también considera mala práctica reescribir commits que ya se subieron a
  un repositorio ([documentación de GitHub sobre
  rebase](https://docs.github.com/en/get-started/using-git/about-git-rebase)).


  Si de todos modos necesitas subir la rama reescrita, usa --force-with-lease en
  lugar de --force:


  ```bash

  git push --force-with-lease origin feature

  ```


  Según la [documentación de git push](https://git-scm.com/docs/git-push), esta
  variante rechaza la operación si la rama remota tiene cambios que tu copia
  local no conoce. Así evitas pisar trabajo de otra persona. Aun así, avisa a tu
  equipo antes de hacerlo.


  ## Mitos comunes sobre git rebase


  Hay tres ideas que se repiten mucho y no son del todo ciertas:


  - «Con rebase mis commits no cambian.» Falso en la mayoría de los casos. Al
  reaplicar commits sobre otra base, Git crea commits nuevos con hashes
  distintos. La excepción es cuando tu rama ya parte de la punta actual de la
  base: entonces no hay nada que reproducir y los commits conservan su hash.

  - «Rebase siempre es mejor que merge.» No. Ambos son válidos; cambia el tipo
  de historial que quieres dejar y quién más usa la rama.

  - «Rebase borra commits.» No por sí solo. Puedes perder commits si eliminas
  líneas con drop en el rebase interactivo o si fuerzas un push sin respaldo,
  como veremos en las preguntas frecuentes.


  ## Rebase y el botón «Rebase and merge» de GitHub


  En las solicitudes de cambios, GitHub ofrece un botón llamado Rebase and
  merge. Como explica la [documentación de GitHub sobre
  rebase](https://docs.github.com/en/get-started/using-git/about-git-rebase),
  esta opción reaplica los commits de la PR sobre la rama base sin crear un
  commit de fusión. Ocurre en el servidor, no en tu computadora, pero el
  resultado en el historial es parecido: una sola línea de commits. Lo que
  aprendiste en el ejemplo anterior sirve de base para entender ambos flujos.
mk5: >-
  ## Cuándo conviene usar git rebase (y cuándo no)


  Conviene cuando:


  - Quieres mantener tu rama personal al día con main sin llenar el historial de
  commits de fusión.

  - Necesitas limpiar commits locales antes de abrir un pull request.

  - Usas git pull --rebase para traer cambios del remoto sin crear commits de
  fusión automáticos.


  No conviene cuando:


  - La rama la usan otras personas.

  - Los commits ya fueron integrados a la rama principal.

  - No tienes claro lo que hace el comando. Practica primero en un repositorio
  de prueba como el del ejemplo.


  Si trabajas en equipo, un acuerdo sencillo vale más que cualquier regla
  técnica. Puedes empezar con esta plantilla:


  1. Solo se reescribe historial en ramas personales.

  2. Las ramas compartidas se integran con merge o con el botón de la
  plataforma, según lo acordado.

  3. Cualquier push forzado usa --force-with-lease y se avisa en el canal del
  equipo.

  4. Antes de rebasar una rama que alguien más ya tiene, se consulta con esa
  persona.


  ## Preguntas frecuentes


  ### ¿Puedo perder commits con git rebase?


  Normalmente no. Git guarda el estado anterior de tus ramas en el reflog
  durante un tiempo. Sí puedes perder trabajo si eliminas commits con drop en el
  rebase interactivo o si descartas cambios sin confirmar. Antes de un rebase
  importante, crea una rama de respaldo.


  ### ¿Cómo cancelo un rebase con conflictos?


  Ejecuta git rebase --abort mientras el rebase siga en curso. La rama vuelve al
  estado anterior al comando. Si el rebase ya terminó, regresa con tu rama de
  respaldo o usa el reflog.


  ### ¿Qué hace git pull --rebase?


  Descarga los cambios del remoto y, en lugar de crear un commit de fusión,
  reaplica tus commits locales encima de la rama remota. Si quieres que sea el
  comportamiento predeterminado, configúralo con git config --global pull.rebase
  true.


  ### ¿Qué hago si ya hice push de un rebase por error?


  Revisa git reflog para encontrar el hash donde estaba la rama antes del
  rebase. Crea una rama nueva apuntando a ese hash con git branch recuperada
  seguido del hash y, si necesitas actualizar el remoto, usa --force-with-lease.
  Avisa a tu equipo, porque quienes ya descargaron la versión reescrita tendrán
  que sincronizarse.


  ## Conclusión


  Git rebase es una herramienta poderosa para mantener un historial limpio y
  lineal. Úsalo en tus ramas personales, practica con el ejemplo de este
  artículo y reserva la reescritura para cuando el equipo esté de acuerdo. Si
  dudas, pregúntate si alguien más tiene esos commits: si la respuesta es sí,
  mejor usa merge o revert.
---

