---
title: Cómo instalar Ollama para usar IA abierta en tu PC
date: '2026-10-19T16:13:54.728Z'
featuredimage: >-
  https://images.unsplash.com/photo-1602016736566-7ed6a58894bd?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8cGVyc29uJTIwdHlwaW5nJTIwb24lMjBsYXB0b3B8ZW58MXwwfHx8MTc5MjQyNjI1N3ww&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Recomendaciones
tags:
  - '#Ollama'
  - '#IAlocal'
  - '#Tutorial'
  - '#Linux'
short-description: >-
  Cómo instalar Ollama en Windows, Mac y Linux paso a paso, con requisitos de
  RAM y disco y una guía para descargar modelos de forma segura.
mk1: >-
  <p><small><em>Foto de <a
  href="https://unsplash.com/@lukesouthern?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Luke Southern</a> en <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  Si buscas cómo instalar Ollama, la respuesta corta es esta: descarga el
  programa desde la página oficial, ejecútalo en tu sistema y confirma la
  instalación con el comando `ollama --version`. En Linux basta con una línea en
  la terminal, y en Mac también puedes instalarlo con Homebrew. Con Ollama listo
  puedes correr modelos de lenguaje abiertos directamente en tu computadora, sin
  enviar cada pregunta a un servicio en la nube.


  Abajo encontrarás los pasos para Windows, macOS y Linux, los requisitos de RAM
  y de disco para el programa y para cada modelo, y una advertencia importante
  sobre la descarga de modelos y la configuración del servidor, que es el punto
  donde más suelen fallar las guías.
mk2: >-
  ## Cómo instalar Ollama paso a paso en Windows, macOS y Linux


  El proceso es corto en los tres sistemas. Lo que cambia es la forma de
  instalar el programa; después, los comandos son prácticamente los mismos.


  ### Windows


  1. Entra a [ollama.com/download](https://ollama.com/download) y descarga el
  archivo OllamaSetup.exe.

  2. Ejecuta el instalador y espera a que termine. Al final, Ollama queda
  corriendo en segundo plano y verás su icono en la bandeja del sistema, junto
  al reloj.

  3. Abre PowerShell o la Terminal de Windows. También funciona el Símbolo del
  sistema si lo prefieres.

  4. Escribe `ollama --version` y presiona Enter. Si aparece un número de
  versión, la instalación funcionó.

  5. Para correr tu primer modelo, escribe `ollama run llama3.2`. La primera vez
  se descarga el modelo y después se abre un chat en la misma terminal.


  ### macOS


  Tienes dos caminos:


  - **Con la aplicación:** descarga el instalador desde la página oficial de
  Ollama, abre el archivo y mueve Ollama a la carpeta Aplicaciones. Ábrela una
  vez para que se configure el servicio.

  - **Con Homebrew:** si ya usas Homebrew, abre Terminal y escribe `brew install
  ollama`. Si quieres que Ollama quede activo en segundo plano, usa `brew
  services start ollama`.


  Después, en Terminal:


  1. Escribe `ollama --version` para confirmar la versión instalada.

  2. Escribe `ollama run llama3.2` para descargar y abrir tu primer modelo.


  Antes de instalar la aplicación, revisa en la página oficial la versión mínima
  de macOS que requiere la versión actual.


  ### Linux


  Ollama ofrece un script de instalación oficial para Linux. Ejecútalo con este
  comando:


  ```

  curl -fsSL https://ollama.com/install.sh | sh

  ```


  Antes de ejecutarlo, asegúrate de escribir bien el dominio ollama.com. Si
  quieres revisar el contenido del script, puedes abrir su dirección en el
  navegador y leerlo. Luego:


  1. Pega el comando en tu terminal. Te pedirá tu contraseña de sudo porque
  instala el binario en el sistema.

  2. Verifica la instalación con `ollama --version`.

  3. Si tu distribución usa systemd, revisa que el servicio esté activo con
  `systemctl status ollama`.

  4. Corre tu primer modelo con `ollama run llama3.2`.
mk3: >-
  ## Requisitos de RAM y espacio en disco para Ollama


  Conviene separar dos cosas: el programa Ollama y cada modelo que descargas.
  Muchas guías mezclan ambas cifras, y por eso parece que se necesita más de lo
  que realmente hace falta para empezar.


  ### Lo que ocupa el programa


  El programa en sí es ligero. Según
  [HardwareXT](https://www.hardwarext.com/ia/ollama-instalar-y-usar), en Windows
  se necesita Windows 10 22H2 o posterior y unos 4 GB libres para el programa.
  Los modelos ocupan espacio aparte.


  ### Lo que pide cada modelo


  La RAM que necesitas depende sobre todo del tamaño del modelo, que se mide en
  miles de millones de parámetros (la letra B). Como orientación práctica,
  [DevToolHub](https://devtoolhub.com/ollama-hardware-requirements/) indica lo
  siguiente:


  <table>

  <thead><tr><th>Tamaño del modelo</th><th>RAM recomendada</th><th>Qué significa
  en la práctica</th></tr></thead>

  <tbody><tr><td>7B</td><td>8 GB</td><td>Funciona en una laptop de 8 GB, pero
  conviene cerrar otras apps; 16 GB da más
  margen</td></tr><tr><td>13B</td><td>16 GB</td><td>Equipos de 16 GB de
  RAM</td></tr><tr><td>33B</td><td>32 GB</td><td>Escritorios o estaciones de
  trabajo con 32 GB o más</td></tr></tbody>

  </table>


  Si tu equipo tiene una tarjeta gráfica con suficiente memoria de video, el
  modelo puede correr en la GPU y responder más rápido. Sin GPU, Ollama funciona
  igual, solo que las respuestas tardan más, sobre todo con modelos grandes.


  En cuanto al disco, los modelos van desde unos cuantos gigabytes hasta decenas
  de gigabytes. Si planeas probar varios, reserva bastante espacio libre antes
  de empezar.


  ## Qué hacer después de instalar Ollama


  Con Ollama instalado, estos comandos te darán control sobre tus modelos:


  - `ollama list` muestra los modelos que ya tienes descargados.

  - `ollama pull nombre-del-modelo` descarga un modelo sin abrir el chat.

  - `ollama ps` muestra qué modelo está cargado en memoria y si está usando GPU
  o CPU.

  - `ollama rm nombre-del-modelo` borra un modelo y libera espacio.


  Para empezar, `llama3.2` es una opción ligera. Si tu equipo tiene poca RAM,
  prueba modelos pequeños antes de intentar uno de los grandes.
mk4: >-
  ## Descarga de modelos y seguridad: la advertencia que casi nadie explica


  Antes de correr modelos conviene entender dos riesgos distintos.


  ### Descarga los modelos desde la biblioteca oficial


  Los comandos `ollama run` y `ollama pull` descargan modelos desde la
  biblioteca de Ollama. Usa los nombres publicados ahí y revisa la licencia de
  cada modelo, porque no todos tienen las mismas condiciones de uso. Si alguien
  te comparte un archivo de modelo por otro medio, como un foro, un chat o un
  enlace de origen desconocido, trátalo con la misma desconfianza que cualquier
  archivo que descargas de internet. No instales modelos solo porque prometen
  más velocidad o capacidades sin decir de dónde salen.


  ### La configuración del servidor es el riesgo más documentado


  Ollama expone una API local. Según [un estudio académico sobre servidores de
  Ollama expuestos](https://arxiv.org/pdf/2609.07115), la API no incluye
  autenticación integrada y, además de generar texto, permite descargar, crear,
  copiar y borrar modelos. En una instalación nativa, el servicio escucha solo
  en tu equipo por defecto. El problema aparece cuando cambias la variable
  OLLAMA_HOST para aceptar conexiones de otros dispositivos, o cuando publicas
  el puerto 11434 en Docker o en tu router.


  El riesgo ya es real a gran escala. En enero de 2026, investigadores de
  SentinelOne y Censys reportaron cerca de 175,000 servidores de Ollama
  expuestos a internet, en decenas de países, según [The Hacker
  News](https://thehackernews.com/2026/01/researchers-find-175000-publicly.html).


  Para evitar problemas:


  - No abras el puerto 11434 a internet.

  - Si necesitas acceder desde otro equipo, hazlo dentro de tu red privada o con
  una VPN.

  - Si pones un servidor accesible desde fuera, protégelo con un proxy que pida
  autenticación.
mk5: >-
  ## Problemas comunes al instalar Ollama


  - **El comando ollama no se reconoce:** cierra y vuelve a abrir la terminal
  para que cargue la nueva ruta del sistema.

  - **El modelo responde muy lento o se cierra:** probablemente tu equipo no
  tiene suficiente RAM para ese modelo. Prueba una versión más pequeña.

  - **No sabes si usa la GPU:** mientras el modelo responde, ejecuta `ollama
  ps`. La columna PROCESSOR indica si corre en GPU o en CPU.

  - **Quieres cambiar la carpeta de los modelos:** es una configuración del
  sistema que conviene hacer con la documentación oficial a la mano, para no
  romper la instalación.


  ## Preguntas frecuentes sobre cómo instalar Ollama


  ### ¿Ollama funciona sin GPU?


  Sí. Puede correr solo con el procesador. Las respuestas tardan más, sobre todo
  con modelos grandes, pero el programa funciona.


  ### ¿Cuánta RAM necesito para usar Ollama?


  El programa necesita pocos gigabytes de espacio libre. La RAM depende del
  modelo: para modelos de 7B, 8 GB sirven, pero 16 GB te dan más margen para
  trabajar cómodo.


  ### ¿Cómo actualizo Ollama?


  En Windows y macOS, descarga de nuevo el instalador desde la página oficial y
  ejecútalo. En Linux, vuelve a correr el script de instalación.


  ### ¿Es seguro usar Ollama?


  El riesgo principal no está en instalar el programa, sino en exponer el
  servidor a internet o en usar modelos de fuentes poco confiables. Si lo
  mantienes en tu equipo o detrás de una red privada, el riesgo baja mucho.


  ## Conclusión


  Instalar Ollama toma pocos minutos: descarga el programa oficial, confirma la
  versión y corre un modelo pequeño para probar. Después, elige modelos según la
  RAM de tu equipo y mantén el servidor cerrado a internet. Con eso ya tienes
  una IA abierta funcionando en tu PC.
---

