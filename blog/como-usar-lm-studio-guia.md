---
title: Cómo usar LM Studio para correr IA en tu computadora
date: '2026-10-28T14:11:52.988Z'
featuredimage: >-
  https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8cGVyc29uJTIwdXNpbmclMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfDB8fHwxNzkzMTk2NDAwfDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Recomendaciones
tags:
  - '#LMStudio'
  - '#IALocal'
  - '#Tutorial'
  - '#Modelos'
short-description: >-
  Aprende cómo usar LM Studio paso a paso: instalación, requisitos de RAM,
  descarga de modelos de IA abiertos y licencias para correrlos en tu PC.
mk1: >-
  <p><small><em>Foto de <a
  href="https://unsplash.com/@glenncarstenspeters?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Glenn Carstens-Peters</a> en <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  Si buscas cómo usar LM Studio, la respuesta corta es esta: instalas la
  aplicación desde su sitio oficial, descargas un modelo de lenguaje abierto
  desde su catálogo y lo cargas en la ventana de chat. Todo se ejecuta en tu
  computadora, así que tus conversaciones no salen a la nube. Lo que sí
  necesitas es memoria suficiente: con 16 GB de RAM puedes trabajar con modelos
  medianos, y con 8 GB conviene quedarte con modelos pequeños.


  LM Studio es una aplicación propietaria y cerrada, no un modelo. Los modelos
  que descargas dentro de ella sí son de pesos abiertos, pero cada uno tiene su
  propia licencia, y eso cambia lo que puedes hacer con ellos en el trabajo o en
  un proyecto comercial. Por eso esta guía incluye una sección dedicada a las
  licencias.


  ## Qué necesitas antes de instalar LM Studio


  Antes de aprender cómo usar LM Studio en tu equipo, revisa que tu sistema
  cumpla con los requisitos. La [documentación oficial de
  requisitos](https://lmstudio.ai/docs/app/system-requirements) fija el mínimo
  para cada sistema y, además, las recomendaciones de memoria:


  <table>

  <thead><tr><th>Sistema</th><th>Requisito
  oficial</th><th>Recomendado</th></tr></thead>

  <tbody><tr><td>Mac</td><td>Chip Apple Silicon (serie M) y macOS 14 o
  superior</td><td>16 GB de RAM</td></tr><tr><td>Windows</td><td>Procesador
  compatible con AVX2</td><td>16 GB de RAM y al menos 4 GB de
  VRAM</td></tr></tbody>

  </table>


  Los Mac con procesador Intel no aparecen en los requisitos oficiales, así que
  si tienes uno, revisa la página de requisitos antes de descargar la app.


  La RAM determina qué tan grande puede ser el modelo que cargas. Según
  [DataCamp](https://www.datacamp.com/tutorial/lm-studio), una referencia
  práctica es esta:


  - 8 GB de RAM: modelos pequeños, de 1B a 4B parámetros.

  - 16 GB de RAM: modelos medianos, de 7B a 9B parámetros.


  Estas cifras son orientativas. Una versión más comprimida del modelo ocupa
  menos memoria, y un contexto más largo también consume más RAM, como verás más
  adelante.
mk2: >-
  ## Paso a paso para instalar LM Studio


  Estos pasos te enseñan cómo usar LM Studio desde cero, empezando por la
  instalación.


  1. Entra a la página oficial, lmstudio.ai, y descarga la versión para tu
  sistema operativo. Evita sitios que ofrecen instaladores de terceros o que
  usan dominios parecidos.

  2. En Mac, abre el archivo descargado y arrastra LM Studio a la carpeta
  Aplicaciones. En Windows, ejecuta el instalador y sigue los pasos en pantalla.

  3. Abre LM Studio. En la primera ejecución verás la pantalla principal con la
  barra lateral de navegación.

  4. Revisa que en la barra lateral aparezcan la pestaña Discover (para buscar
  modelos) y la pestaña de chat. Si falta alguna, actualiza la app a la versión
  más reciente.


  ## Cómo descargar un modelo en LM Studio


  El flujo básico tiene tres momentos: buscar, elegir una versión y descargar.
  Es la parte de cómo usar LM Studio que más decisiones requiere.


  1. Abre la pestaña Discover desde la barra lateral.

  2. Escribe el nombre del modelo que quieres, por ejemplo Gemma o Qwen, en el
  buscador.

  3. Revisa las opciones de cuantización, que aparecen con nombres como Q4_K_M o
  Q5_K_M. La cuantización reduce el tamaño del modelo: Q4 ocupa menos memoria,
  mientras que Q5 suele conservar un poco más de calidad a cambio de más
  espacio.

  4. Compara el tamaño en disco con la RAM disponible. Una guía de terceros
  recomienda Q4_K_M para equipos de 8 GB, y señala que un modelo de 7B en esa
  versión ronda los 4,5 GB.

  5. Haz clic en Download y espera a que termine la descarga.


  Antes de cargar un modelo grande, cierra navegadores con muchas pestañas y
  otras apps pesadas. La memoria se reparte entre todo lo que tengas abierto.
mk3: >-
  ## Cargar el modelo y empezar a chatear


  1. Ve a la pestaña de chat.

  2. En el selector superior, elige el modelo que descargaste y pulsa la opción
  para cargarlo (Load model).

  3. Espera a que termine la carga. La primera vez puede tardar más de lo
  normal.

  4. Escribe tu pregunta en el cuadro inferior y envíala.


  Hay dos ajustes que conviene entender desde el principio al aprender cómo usar
  LM Studio:


  - Temperatura: controla qué tan variadas o predecibles son las respuestas.
  Valores bajos dan respuestas más consistentes, y valores altos, más creativas.
  Para resumir datos o escribir código, suele funcionar mejor un valor bajo.

  - Longitud de contexto: es cuánto texto puede tener presente el modelo dentro
  de una conversación. Según una guía de terceros, el valor por defecto es de
  4096 tokens. Subirlo permite conversaciones y documentos más largos, pero
  consume más RAM.


  ## Usar LM Studio como servidor local


  Si ya sabes cómo usar LM Studio en el chat, el servidor local es el siguiente
  paso. Permite que otras apps o scripts consulten el modelo sin salir de tu
  equipo. La documentación para desarrolladores describe una API REST y una
  herramienta de línea de comandos llamada lms. Algunas guías señalan que la API
  sigue el formato de OpenAI, por lo que muchos proyectos solo necesitan cambiar
  la dirección base. Revisa la documentación oficial para los endpoints exactos
  antes de integrarlo.
mk4: >-
  ## Licencias: qué puedes hacer con la app y con cada modelo


  ### La app es gratis para uso personal y de negocio interno


  Los [términos de uso de LM Studio](https://lmstudio.ai/app-terms) otorgan una
  licencia para fines personales o de negocio interno. En julio de 2025, [Simon
  Willison
  documentó](https://simonwillison.net/2025/Jul/8/lm-studio-is-free-for-use-at-work/)
  que la empresa eliminó el requisito de una licencia comercial separada para
  usar la app en el trabajo.


  El uso de la app, sin embargo, no cubre a los modelos. Cada uno se rige por su
  propia licencia.


  ### Cada modelo tiene su propia licencia


  Descargar un modelo desde LM Studio no te da derechos sobre él. Según una
  comparativa de modelos abiertos de 2026, estas son las licencias que más
  aparecen:


  <table>

  <thead><tr><th>Modelo</th><th>Licencia</th><th>Qué implica</th></tr></thead>

  <tbody><tr><td>Qwen 3.6</td><td>Apache 2.0</td><td>Uso comercial permitido,
  con atribución y sin garantías</td></tr><tr><td>Gemma 4</td><td>Varía según la
  fuente</td><td>Algunas fuentes la describen como Apache 2.0; otras, como
  licencia propia de Google que permite uso comercial con restricciones. Revisa
  la ficha del modelo</td></tr><tr><td>Llama 4</td><td>Licencia personalizada de
  Meta</td><td>Restringe el uso a empresas con más de 700 millones de usuarios
  activos mensuales</td></tr></tbody>

  </table>


  Antes de usar cualquier modelo en un proyecto:


  - Abre su ficha en Hugging Face y busca el campo de licencia y el archivo
  LICENSE. Lo que dice la ficha oficial es lo que cuenta.

  - Revisa si permite uso comercial, si pide mencionar al autor y si tiene
  límites de usuarios o de tipo de uso.

  - Recuerda que un modelo de pesos abiertos no siempre es software libre en
  sentido estricto. Que esté disponible no significa que puedas hacer cualquier
  cosa con él.

  - Si vas a usarlo en un producto que vas a vender, consulta con alguien que
  sepa de derecho digital.
mk5: >-
  ## Problemas comunes al usar LM Studio


  ### Error «Not enough memory to load model»


  Este mensaje aparece cuando el modelo, junto con su contexto, no cabe en la
  memoria disponible. Prueba en este orden:


  1. Cierra apps y pestañas que consuman RAM.

  2. Elige una cuantización más comprimida, como Q4 en lugar de Q5.

  3. Cambia a un modelo más pequeño.

  4. Reduce la longitud de contexto y vuelve a cargar el modelo.


  ### La respuesta es muy lenta


  Es normal en equipos con poca memoria o sin GPU dedicada. Usa un modelo más
  pequeño, reduce el contexto y cierra otras aplicaciones mientras chateas.


  ## Preguntas frecuentes


  ### ¿Es difícil aprender cómo usar LM Studio?


  No. La interfaz gráfica permite buscar, descargar y chatear sin escribir
  comandos. Lo más importante es elegir un modelo que quepa en tu RAM.


  ### ¿LM Studio es gratis?


  Sí, la app es gratuita para uso personal y para trabajo interno, según sus
  términos. La licencia de cada modelo es otra cosa, así que revísala antes de
  usarlo en un proyecto.


  ### ¿Necesito tarjeta gráfica?


  No es obligatoria, pero ayuda. En Windows, la documentación recomienda al
  menos 4 GB de VRAM. Sin GPU dedicada puedes usar modelos pequeños, aunque las
  respuestas tardarán más.


  ### ¿Puedo usarlo sin internet?


  Necesitas internet para descargar la app y los modelos. Una vez descargados,
  puedes chatear sin conexión.


  ### ¿LM Studio o Ollama?


  Ambas herramientas ejecutan modelos en tu equipo. LM Studio tiene una interfaz
  gráfica para buscar, descargar y chatear sin tocar la terminal, mientras que
  Ollama se usa más desde la línea de comandos. Si quieres empezar sin
  complicaciones, LM Studio es la opción más directa.


  ## Conclusión


  Usar LM Studio es sencillo: instalas la app, descargas un modelo que quepa en
  tu RAM y lo cargas en el chat. Ahora ya sabes cómo usar LM Studio para correr
  IA de forma privada. Antes de usarlo en un proyecto real, revisa dos cosas:
  los requisitos de tu sistema y la licencia del modelo. Con esas dos
  verificaciones tendrás una IA privada en tu computadora, sin depender de la
  nube.
---

