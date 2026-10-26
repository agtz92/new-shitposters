---
title: Cómo resolver conflictos de merge en Git paso a paso
date: '2026-10-26T14:08:40.222Z'
featuredimage: >-
  https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8ZGV2ZWxvcGVyJTIwcmVzb2x2aW5nJTIwY29kZSUyMGNvbmZsaWN0fGVufDF8MHx8fDE3OTMwMjM1MzR8MA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Random
tags:
  - '#git'
  - '#merge'
  - '#programacion'
  - '#tutorial'
short-description: >-
  Aprende cómo resolver conflictos de merge en Git paso a paso: identifica los
  marcadores, edita el archivo, termina el merge y evita errores comunes.
mk1: >-
  <p><small><em>Foto de <a
  href="https://unsplash.com/@cdr6934?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Chris Ried</a> en <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  Si quieres saber cómo resolver conflictos de merge en Git, la respuesta corta
  es esta: identifica los archivos marcados con `git status`, edita cada uno
  para dejar el código final, borra los marcadores de conflicto, usa `git add`
  sobre el archivo y termina con `git commit`. Parece mucho, pero es un proceso
  de cinco pasos que puedes practicar en unos minutos.


  En esta guía verás qué significan los marcadores, un ejemplo completo para
  reproducir el conflicto desde cero y las trampas que más errores generan, como
  la inversión de ours y theirs durante un rebase.


  ## Qué es un conflicto de merge y por qué aparece


  Git combina ramas aplicando los cambios de cada una. Si dos ramas tocan las
  mismas líneas de un mismo archivo, o si una borra un archivo que la otra
  modificó, Git no puede decidir solo qué versión conservar. Entonces detiene el
  merge y te deja a cargo. No hay daño en el repositorio: solo queda un merge
  pendiente.


  Los motivos más comunes son sencillos:


  - Dos personas editan la misma función o el mismo párrafo de un archivo.

  - Una rama renombra o mueve un archivo que la otra sigue cambiando.

  - Una rama elimina un archivo mientras la otra lo modifica.


  Un estudio de [Ghiotto et al.
  (2018)](https://leomurta.github.io/papers/ghiotto2018.pdf) sobre 2,731
  proyectos de código abierto concluyó que resolver todos los conflictos de
  forma completamente automática probablemente no es posible. Por eso la
  decisión humana sigue siendo parte del trabajo.


  ## Cómo identificar los archivos en conflicto


  Lo primero es saber dónde está el problema. Ejecuta:


  ```

  git status

  ```


  Los archivos conflictivos aparecen en la sección “Unmerged paths” con
  etiquetas como `both modified`. Si solo quieres la lista de nombres, usa:


  ```

  git diff --name-only --diff-filter=U

  ```


  Ese comando muestra únicamente los archivos sin fusionar, y es útil cuando el
  merge afectó a muchos archivos.
mk2: >-
  ## Cómo leer los marcadores de conflicto


  Dentro del archivo afectado, Git escribe algo como esto:


  ```

  <<<<<<< HEAD

  Hola desde main

  =======

  Hola desde feature/saludo

  >>>>>>> feature/saludo

  ```


  - Lo que está entre `<<<<<<< HEAD` y `=======` es tu versión, la de la rama en
  la que estás.

  - Lo que está entre `=======` y `>>>>>>> feature/saludo` es la versión que
  llega de la otra rama.

  - Los marcadores no son código. Si se quedan en el archivo, el programa puede
  no compilar o comportarse mal.


  Si activas `git config merge.conflictStyle diff3`, aparece además una sección
  `|||||||` con el texto original, anterior a los cambios de ambas ramas. Así
  ves con más claridad quién cambió qué. La [documentación de Git Book sobre
  merges avanzados](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging)
  explica el formato con detalle.


  ## Ejemplo completo para reproducir el conflicto


  Copia estos comandos en tu terminal (necesitas Git 2.28 o superior). Crean un
  repositorio de prueba y provocan un conflicto a propósito:


  ```

  mkdir demo-conflictos && cd demo-conflictos

  git init -b main

  git config user.name 'Tu Nombre'

  git config user.email 'tu@correo.com'

  echo 'Hola mundo' > saludo.txt

  git add saludo.txt

  git commit -m 'Commit inicial'

  git switch -c feature/saludo

  echo 'Hola desde feature/saludo' > saludo.txt

  git commit -am 'Cambia el saludo en feature'

  git switch main

  echo 'Hola desde main' > saludo.txt

  git commit -am 'Cambia el saludo en main'

  git merge feature/saludo

  ```


  El último comando responde con algo como `CONFLICT (content): Merge conflict
  in saludo.txt` y `Automatic merge failed; fix conflicts and then commit the
  result.` Ahora revisa el contenido con `cat saludo.txt` y verás los marcadores
  del ejemplo anterior.
mk3: >-
  ## Cómo resolver conflictos de merge en Git paso a paso


  1. **Revisa el estado.** Ejecuta `git status`. Verás `both modified:
  saludo.txt`.

  2. **Abre el archivo.** Con Vim escribe `vim saludo.txt`; con nano, `nano
  saludo.txt`; con VS Code, `code saludo.txt`. Si trabajas en un servidor sin
  editor gráfico, Vim o nano son suficientes.

  3. **Decide el resultado final.** Edita el archivo hasta dejar solo el texto
  que quieres conservar, sin marcadores. Por ejemplo:


  ```

  Hola desde main y feature/saludo

  ```


  4. **Borra todos los marcadores.** Elimina las líneas `<<<<<<<`, `=======` y
  `>>>>>>>`. Guarda y cierra el editor.

  5. **Marca el archivo como resuelto.** Ejecuta `git add saludo.txt`.

  6. **Termina el merge.** Ejecuta `git commit`. Git abre el editor con un
  mensaje predeterminado como “Merge branch 'feature/saludo'”; guárdalo y
  cierra. Si prefieres no usar editor, ejecuta `git commit -m 'Resuelve
  conflicto en saludo.txt'`.


  Ojo: `git add` solo le indica a Git que el archivo ya está listo. No comprueba
  que el código funcione, así que la revisión final es importante (más abajo
  verás cómo hacerla).


  Para ver los conflictos sin editor gráfico, `git diff` muestra los bloques en
  conflicto en formato combinado. Junto con Vim o nano, tienes el flujo completo
  en terminal.


  ## Ours y theirs: la trampa del rebase


  Git ofrece atajos para aceptar una versión completa de un archivo:


  ```

  git checkout --ours saludo.txt

  git checkout --theirs saludo.txt

  ```


  Durante un merge normal, `--ours` es la rama en la que estás (aquí, `main`) y
  `--theirs` es la rama que estás fusionando (`feature/saludo`). Pero durante un
  rebase los lados se invierten. Según la [documentación oficial de
  git-rebase](https://git-scm.com/docs/git-rebase), “ours” es la serie ya
  rebaseada sobre la que se aplica el cambio, y “theirs” es la rama de trabajo
  que se está reproduciendo. Quien asume lo contrario puede descartar justo el
  código que quería conservar.


  Regla práctica: antes de usar `--ours` o `--theirs`, revisa en qué operación
  estás con `git status`. Si dice “You are currently rebasing”, invierte tu
  intuición. Si dice “You are currently merging”, aplica la regla normal.
  Recuerda también que `git checkout --ours` descarta por completo la otra
  versión del archivo, así que úsalo solo cuando de verdad quieras esa versión
  entera.
mk4: >-
  ## Cómo comprobar que el merge quedó bien


  Antes de hacer push, haz una revisión final en tres pasos:


  1. **Busca marcadores que se hayan quedado.** Ejecuta:


  ```

  git grep -nE '^(<{7}|={7}|>{7})'

  ```


  Si no obtienes ninguna línea, no quedaron marcadores. Git grep devuelve código
  de salida 1 cuando no encuentra nada, así que ese código no indica un error.


  2. **Corre tus pruebas o compila el proyecto.** Un archivo sin marcadores
  puede seguir teniendo un error lógico.

  3. **Revisa qué trajo cada rama.** Ejecuta `git log --merge --oneline` para
  ver los commits que tocaron los archivos en conflicto. Después, `git show
  --stat HEAD` te muestra los archivos incluidos en el commit de merge.


  ## Casos especiales: archivos binarios y archivos eliminados


  **Archivos binarios.** Imágenes, PDF o ejecutables no se pueden mezclar línea
  por línea. Escoge una versión completa:


  ```

  git checkout --ours logo.png

  git add logo.png

  ```


  Cambia `--ours` por `--theirs` si quieres la otra versión, y recuerda la
  inversión de lados durante un rebase.


  **Eliminar contra modificar.** Si una rama borró un archivo y la otra lo
  cambió, Git lo marca como `deleted by us` o `deleted by them`. Si quieres
  conservar la versión modificada, ejecuta `git add archivo`. Si prefieres
  eliminarlo, ejecuta `git rm archivo`.


  ## Cómo cancelar el merge con git merge --abort


  Si te equivocaste o no sabes por dónde seguir, puedes cancelar todo con:


  ```

  git merge --abort

  ```


  Según la [documentación oficial de
  git-merge](https://git-scm.com/docs/git-merge), el comando intenta reconstruir
  el estado previo al merge. Ten en cuenta dos cosas: se pierden las ediciones
  de resolución que llevabas hechas, y si tenías cambios sin guardar cuando
  empezó el merge, en algunos casos Git no puede recuperarlos. Por eso, antes de
  fusionar o hacer pull con trabajo pendiente, guárdalo con `git stash`. Si
  quieres entender ese comando, lee [qué es git stash y cuándo usarlo en tus
  proyectos](https://www.10datos.com/que-es-git-stash).


  ## Qué hacer si git push falla por conflicto


  Cuando el push responde con “rejected” o “non-fast-forward”, todavía no hay un
  conflicto: el repositorio remoto tiene commits que tú no tienes. La secuencia
  recomendada es:


  1. Guarda tus cambios locales sin commit con `git stash`, si los tienes.

  2. Trae los cambios con `git pull`, o con `git pull --rebase` si tu equipo
  prefiere un historial lineal.

  3. Si aparece un conflicto, aplica el flujo de esta guía.

  4. Corre las verificaciones y después ejecuta `git push`.


  Si no tienes claro cuándo conviene el rebase y cuándo el merge, esta
  comparación te ayuda: [Git Rebase vs. Git Merge: diferencias clave y cuál
  deberías usar en tus
  proyectos](https://www.10datos.com/git-rebase-vs-git-merge-diferencias-clave-y-cuál-deberías-usar-en-tus-proyectos).
mk5: >-
  ## Preguntas frecuentes


  ### ¿Cuál es la diferencia entre git merge --continue y git commit?


  `git merge --continue`, disponible desde Git 2.27, verifica que haya un merge
  en curso y crea el commit de fusión. Si estás en medio de un merge, `git
  commit` cumple la misma función. Ambos funcionan; el primero es más explícito
  si quieres dejar claro que estás cerrando un merge. No lo confundas con `git
  rebase --continue`, que pertenece a otro proceso.


  ### ¿Cómo evito los conflictos de merge?


  Trae cambios con frecuencia, usa ramas de vida corta y haz commits pequeños.
  El [estudio de la Universidad de Saarland sobre los desafíos para resolver
  conflictos de
  merge](https://www.se.cs.uni-saarland.de/publications/docs/VHF+22.pdf)
  encontró que confirmar fragmentos pequeños hace más rápida la resolución. Si
  además coordinas con tu equipo quién toca qué archivo, reduces muchos de los
  choques.


  ### ¿Cómo resuelvo conflictos en archivos binarios?


  Git no puede fusionar imágenes, PDF u otros binarios. Elige una versión
  completa con `git checkout --ours` o `--theirs`, márcala con `git add` y
  confirma. Si el archivo es importante, consulta con quien lo modificó antes de
  decidir.


  ### ¿Qué hago si git push falla por conflicto?


  Sincroniza primero con `git pull` o `git pull --rebase`, resuelve los
  conflictos que aparezcan y vuelve a intentar el push. Si usas rebase, revisa
  antes la sección sobre ours y theirs.


  ## Conclusión


  Resolver conflictos de merge en Git se reduce a cuatro acciones: entender los
  marcadores, decidir el código final, borrar lo que sobra y cerrar el proceso
  con `git add` y `git commit`. Antes de hacer push, busca marcadores que se
  hayan quedado y corre tus pruebas. Con el ejemplo de esta guía puedes
  practicar el flujo completo sin riesgo, y cuando lo domines, los conflictos
  dejarán de ser una emergencia para convertirse en una tarea más.
---

