---
title: Qué es una rama en Git y cómo crear una nueva
date: '2026-10-30T14:16:51.998Z'
featuredimage: >-
  https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8Y29tcHV0ZXIlMjBjb2RlJTIwdGVybWluYWx8ZW58MXwwfHx8MTc5MzM2OTU4MXww&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Random
tags:
  - '#git'
  - '#programacion'
  - '#tutorial'
  - '#terminal'
short-description: >-
  Qué es una rama en Git, cómo funciona HEAD y cómo crear y cambiar de rama con
  git switch -c, con un diagrama sencillo y ejemplos claros.
mk1: >-
  <p><small><em>Foto de <a
  href="https://unsplash.com/@ilyapavlov?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Ilya Pavlov</a> en <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  Si te preguntas qué es una rama en Git, la respuesta corta es que se trata de
  un puntero móvil que apunta a un commit, es decir, a una versión guardada de
  tu proyecto en un momento dado. Con una rama puedes trabajar en una función,
  una corrección o un experimento sin tocar la versión principal del código.
  Para crearla usas `git branch nombre`, y para crearla y entrar en ella de una
  vez, `git switch -c nombre`.


  Eso es lo esencial. A continuación te explico el concepto con un ejemplo
  cotidiano, un diagrama sencillo y los comandos que puedes copiar en tu
  terminal.


  ## La rama como un Post-it sobre un commit


  Imagina que tu proyecto es un cuaderno y cada commit es una página escrita.
  Cada página se apoya en la anterior, así que todas forman una cadena. Una rama
  es como un Post-it pegado sobre una de esas páginas: marca dónde estás parado.
  Si quieres escribir en una línea nueva sin borrar lo anterior, mueves el
  Post-it a otra página y sigues desde ahí.


  En términos técnicos, la rama guarda el identificador (hash) de un commit.
  Cuando haces un commit nuevo en esa rama, Git mueve el puntero al commit
  recién creado. Por eso crear una rama es rápido: no copia archivos, solo crea
  un puntero nuevo. La [documentación de Pro Git sobre
  ramas](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
  explica este modelo con detalle, y el [tutorial de Atlassian sobre
  ramas](https://www.atlassian.com/es/git/tutorials/using-branches) lo resume en
  español.
mk2: >-
  ## Cómo se ve una rama: diagrama paso a paso


  Un diagrama aclara más que una definición larga. Así cambian los commits y el
  HEAD cuando creas y cambias de rama. Cada flecha apunta de un commit a su
  padre, y las etiquetas indican dónde está cada puntero.


  ```

  Paso 1: repositorio con tres commits en main
    A <- B <- C
              ^
            main, HEAD

  Paso 2: ejecutas git branch nueva-funcion
    A <- B <- C
              ^   ^
            main  nueva-funcion
            HEAD sigue en main

  Paso 3: ejecutas git switch nueva-funcion
    A <- B <- C
              ^   ^
            main  nueva-funcion
                  HEAD ahora apunta aquí
  ```


  En el paso 2 la rama ya existe, pero tú sigues en main. En el paso 3, HEAD se
  mueve a la rama nueva, y los commits que hagas a partir de ahí avanzarán solo
  nueva-funcion. Main se queda en C hasta que decidas unir ambas líneas.


  ## Qué es HEAD y por qué importa


  HEAD es el puntero que indica en qué rama (o en qué commit) estás trabajando
  en este momento. En la lista de ramas, HEAD señala la que aparece marcada con
  asterisco.


  Lo práctico es esto: cada commit que haces se guarda en la rama a la que
  apunta HEAD. Si creas una rama y olvidas cambiar a ella, tus cambios
  terminarán en la rama equivocada.


  ## Requisitos antes de crear una rama


  Antes de empezar, revisa lo siguiente:


  1. Tener Git instalado. Ejecuta `git --version` en la terminal para
  confirmarlo.

  2. Estar dentro de un repositorio. Usa `git status`; si aparece un error como
  "not a git repository", entra a la carpeta correcta o ejecuta `git init` si el
  proyecto es nuevo.

  3. Tener al menos un commit. Una rama necesita un commit al que apuntar, así
  que un repositorio recién creado y vacío no te permitirá crearla.

  4. Para usar `git switch`, la versión de Git debe ser 2.23 o superior. Si
  tienes una versión anterior, usa `git checkout` en su lugar.
mk3: >-
  ## Cómo crear una rama en Git paso a paso


  Sigue estos pasos desde la terminal, dentro de la carpeta de tu proyecto:


  1. Revisa en qué rama estás con `git branch`. La rama marcada con asterisco es
  la actual.

  2. Verifica que no tengas cambios pendientes que quieras conservar con `git
  status`.

  3. Crea la rama con `git branch mejora-login`.

  4. Cambia a ella con `git switch mejora-login`.

  5. Confirma el cambio con `git branch`. El asterisco debe aparecer junto a
  mejora-login.

  6. Haz tus cambios y guárdalos con `git add` y `git commit`. Esos commits
  quedarán en mejora-login.


  ### Opción 1: git branch y después git switch


  Es la forma más clara para entender qué hace cada parte. Primero creas el
  puntero y después mueves HEAD hacia él.


  ### Opción 2: git switch -c en un solo paso


  Si quieres hacer ambas cosas de una vez, usa:


  ```

  git switch -c mejora-login

  ```


  Este comando es la forma moderna de crear y cambiar a una rama. Su equivalente
  anterior es `git checkout -b mejora-login`, que verás en muchos tutoriales y
  que sigue funcionando.


  ## La trampa de git branch


  Este es el error más común entre quienes empiezan. El comando `git branch
  nombre` solo crea la rama, no cambia a ella. La [documentación oficial de
  git-branch](https://git-scm.com/docs/git-branch) indica que el comando crea la
  nueva rama sin modificar el árbol de trabajo; para cambiar de rama necesitas
  otro comando.


  ¿Qué pasa si no lo sabes? Escribes código, haces un commit y tus cambios se
  guardan en main en lugar de en la rama nueva. Al probar la rama, no encuentras
  tu trabajo y empiezas a buscar un error que no existe.


  La regla práctica es confirmar siempre con `git branch` que el asterisco está
  donde esperas antes de escribir código.


  ## Cómo saber en qué rama estás


  Tres comandos te ayudan a ubicarte:


  - `git branch`: lista las ramas locales y marca la actual con asterisco.

  - `git status`: muestra la rama actual en la primera línea, junto con los
  archivos modificados.

  - `git branch --show-current`: imprime solo el nombre de la rama actual, útil
  en scripts.


  ## Qué pasa con tus cambios al cambiar de rama


  Si tienes cambios sin commit y cambias de rama, Git intenta llevarlos contigo.
  Si los archivos modificados son distintos en ambas ramas, el cambio se hace
  sin problemas. Si coinciden, Git te detiene para no perder trabajo y te pide
  hacer commit o guardar los cambios.


  Tienes dos opciones:


  1. Hacer commit de lo que tienes antes de cambiar de rama.

  2. Guardar los cambios de forma temporal con `git stash`, cambiar de rama y
  recuperarlos después. Puedes ver los pasos en la guía [qué es git stash y
  cuándo usarlo](https://www.10datos.com/que-es-git-stash).
mk4: >-
  ## Cómo se conecta una rama con merge y rebase


  Crear ramas tiene sentido porque después necesitas volver a juntar el trabajo.
  Hay dos formas comunes de hacerlo:


  - **Merge** (`git merge`): une el historial de dos ramas y crea un commit de
  unión. Conserva las bifurcaciones tal como ocurrieron.

  - **Rebase** (`git rebase`): reacomoda tus commits sobre la punta de otra
  rama, lo que deja un historial más lineal.


  Un ejemplo corto: estás en mejora-login y quieres traer lo más reciente de
  main. Si ejecutas `git merge main` desde mejora-login, Git crea un commit que
  une ambas líneas. Si ejecutas `git rebase main`, tus commits se colocan encima
  de main. En los dos casos tu rama recibe los cambios de main, pero el
  historial queda distinto.


  Para integrar la rama a main, el flujo es este:


  1. Cambia a la rama principal con `git switch main`.

  2. Une los cambios con `git merge mejora-login`.

  3. Si todo está bien, borra la rama con `git branch -d mejora-login`.


  Si quieres comparar cuál estrategia conviene en tu caso, revisa [Git Rebase
  vs. Git Merge: diferencias
  clave](https://www.10datos.com/git-rebase-vs-git-merge-diferencias-clave-y-cuál-deberías-usar-en-tus-proyectos).
  Y si al unir aparecen conflictos, la guía [cómo resolver conflictos de merge
  en Git paso a
  paso](https://www.10datos.com/como-resolver-conflictos-merge-git) muestra cómo
  seguir.


  ## Cómo borrar una rama local


  Cuando ya integraste una rama, bórrala con `git branch -d mejora-login`. Git
  solo la elimina si su trabajo ya está incorporado en otra rama. Según la
  [gestión de ramas de Pro
  Git](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management), esa es
  la razón por la que las ramas que ya no tienen asterisco pueden borrarse con
  -d.


  Si Git rechaza el borrado, significa que la rama tiene commits que no se han
  unido a ninguna otra. Revisa si te faltó hacer merge. Solo si de verdad
  quieres descartar esos commits, usa `git branch -D mejora-login`, con
  mayúscula, y ten en cuenta que ese trabajo puede ser difícil de recuperar.
mk5: >-
  ## Buenas prácticas para nombrar ramas


  Git no permite espacios en los nombres de las ramas, así que usa guiones o
  guiones bajos. Nombres como `mejora-login` o `correccion-carrito` dicen qué
  contiene la rama sin necesidad de abrirla. Evita nombres genéricos como
  `prueba` o `nueva`, que se vuelven confusos cuando tienes varias ramas
  abiertas al mismo tiempo.


  ## Preguntas frecuentes


  ### ¿Qué es una rama en Git con un ejemplo sencillo?


  Es un nombre que apunta a un commit y que avanza cada vez que haces un commit
  nuevo en ella. Piensa en main como la versión principal de tu proyecto y en
  mejora-login como una línea de trabajo paralela que avanza por su cuenta hasta
  que decides unirla.


  ### ¿Cuál es la diferencia entre git branch y git checkout -b?


  `git branch` crea la rama y tú te quedas donde estás. `git checkout -b` (o
  `git switch -c`) crea la rama y te cambia a ella en el mismo paso.


  ### ¿Por qué mi rama principal se llama master o main?


  El nombre de la rama inicial depende de la configuración de tu Git y del
  proyecto. La documentación de Pro Git usa master en sus ejemplos, y muchos
  proyectos actuales usan main. Para revisar tu configuración puedes ejecutar
  `git config --global init.defaultBranch`; si no devuelve nada, tu Git usa su
  valor predeterminado. Si quieres cambiarle el nombre a una rama, estando en
  ella usa `git branch -m nuevo-nombre`.


  ### ¿Qué pasa si cambio de rama sin hacer commit?


  Git conserva tus cambios si no chocan con los archivos de la otra rama. Si sí
  chocan, te avisa y te pide hacer commit o usar `git stash` antes de cambiar.


  ## Conclusión


  Una rama en Git es un puntero que apunta a un commit, y te permite avanzar en
  una tarea sin afectar la línea principal. Crea una con `git branch` si quieres
  preparar el terreno, o con `git switch -c` si quieres crearla y entrar en ella
  al mismo tiempo. Recuerda que `git branch` no cambia de rama por sí solo.
  Cuando domines esta base, el siguiente paso natural es unir tus ramas con
  merge o rebase.
---

