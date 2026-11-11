---
title: Qué es la IA de código abierto y por qué importa
date: '2026-11-11T14:14:57.542Z'
featuredimage: >-
  https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8b3BlbiUyMHNvdXJjZSUyMGNvZGUlMjBzY3JlZW58ZW58MXwwfHx8MTc5NDQwNjM4Mnww&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Recomendaciones
tags:
  - '#IA'
  - '#OpenSource'
  - '#LLM'
  - '#Licencias'
  - '#Ollama'
short-description: >-
  Qué es la IA de código abierto, en qué se diferencia de los pesos abiertos,
  cómo revisar licencias y cuáles son sus ventajas y límites.
mk1: >-
  <p><small><em>Foto de <a
  href="https://unsplash.com/@ilyapavlov?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Ilya Pavlov</a> en <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  Qué es la IA de código abierto es una pregunta sencilla con una respuesta que
  cambia según quién la explique. En términos simples, se trata de modelos de
  inteligencia artificial cuyo código, su forma de entrenamiento y, en muchos
  casos, sus parámetros ya entrenados están disponibles para que cualquiera los
  descargue, estudie, modifique y comparta. La idea viene del software libre,
  aplicada a sistemas que aprenden a partir de datos.


  El problema es que la etiqueta se usa para cosas distintas. Modelos como Llama
  o Mistral se describen a menudo como abiertos, pero en realidad muchas veces
  publican sus pesos sin publicar todo lo demás. Entender esa diferencia te dice
  qué puedes hacer de verdad con un modelo antes de usarlo en un proyecto o en
  tu trabajo.


  ## Qué es la IA de código abierto, en palabras simples


  En software, código abierto significa que el código fuente se publica con una
  licencia que permite usarlo, estudiarlo, modificarlo y redistribuirlo. En
  inteligencia artificial la idea se complica, porque un modelo no es solo un
  programa. Tiene tres partes:


  1. El código que define la arquitectura y que sirve para entrenar y ejecutar
  el modelo.

  2. Los datos con los que aprendió, o al menos información suficiente sobre
  ellos.

  3. Los pesos, que son los parámetros numéricos que quedan después del
  entrenamiento y que determinan cómo responde el modelo.


  Un modelo puede publicar los pesos sin publicar los datos ni el proceso
  completo de entrenamiento. Por eso no todo lo “abierto” es igual de abierto.
mk2: >-
  ## Pesos abiertos frente a código abierto


  Los pesos abiertos (open weights) describen modelos cuyos parámetros puedes
  descargar y ejecutar en tu propio equipo o servidor. El código abierto, en el
  sentido estricto que usa la Open Source Initiative (OSI), exige más: que el
  sistema pueda usarse, estudiarse, modificarse y compartirse, con información
  suficiente para entenderlo y reconstruirlo.


  <table>

  <thead><tr><th>Característica</th><th>Pesos abiertos</th><th>Código abierto
  (definición OSI)</th></tr></thead>

  <tbody><tr><td>Descargas los
  parámetros</td><td>Sí</td><td>Sí</td></tr><tr><td>Acceso al código de
  entrenamiento</td><td>No siempre</td><td>Sí</td></tr><tr><td>Información sobre
  los datos</td><td>Puede ser limitada</td><td>Información suficiente para
  reconstruir el sistema de forma sustancial</td></tr><tr><td>Modificar y
  redistribuir</td><td>Depende de la licencia</td><td>Sí, con las libertades de
  la definición</td></tr></tbody>

  </table>


  En la práctica, muchos modelos que la prensa llama “de código abierto” son de
  pesos abiertos. Por eso conviene preguntar siempre qué se publicó exactamente
  y bajo qué condiciones.


  ## Qué dice la definición de la OSI


  El 28 de octubre de 2024, la OSI publicó la primera versión de su [Open Source
  AI Definition (OSAID
  1.0)](https://opensource.org/blog/the-open-source-initiative-announces-the-release-of-the-industrys-first-open-source-ai-definition).
  Según la definición, un sistema de IA de código abierto debe garantizar cuatro
  libertades: usarlo para cualquier propósito, estudiarlo, modificarlo y
  compartirlo. Además, debe incluir información sobre datos, código y parámetros
  lo bastante detallada para que alguien pueda recrearlo.


  Un punto que suele pasar desapercibido: la OSI no exige publicar el conjunto
  de datos completo. Basta con información suficiente para reconstruirlo de
  forma sustancial. Esa diferencia importa, porque muchos datos de entrenamiento
  tienen restricciones legales y no pueden liberarse tal cual.


  La OSI también revisó modelos populares como Llama 2, Phi-2, Mixtral y Grok, y
  concluyó que no cumplían su definición, según
  [IBM](https://www.ibm.com/think/topics/open-source-ai). La discusión sigue
  abierta, y las empresas que publican estos modelos suelen defender su propio
  uso del término.


  Un [informe internacional sobre seguridad de la
  IA](https://arxiv.org/pdf/2501.17805) distingue ambos conceptos y advierte que
  los modelos de pesos abiertos no necesariamente son de código abierto.
mk3: >-
  ## Licencias: qué revisar antes de usar un modelo


  La licencia dice qué puedes hacer con el modelo, y eso incluye si puedes
  usarlo en un negocio. Estas son algunas de las más comunes:


  <table>

  <thead><tr><th>Licencia</th><th>Qué permite</th><th>Condiciones a tener en
  cuenta</th></tr></thead>

  <tbody><tr><td>Apache 2.0</td><td>Usar, modificar y distribuir, incluso con
  fines comerciales</td><td>Conservar los avisos de licencia y de derechos de
  autor</td></tr><tr><td>MIT</td><td>Muy permisiva: usar, copiar, modificar y
  vender</td><td>Conservar el aviso de copyright y el texto de la
  licencia</td></tr><tr><td>Llama Community License</td><td>Uso comercial en
  general</td><td>Mostrar “Built with Llama”, cumplir la política de uso
  aceptable y pedir permiso a Meta si tu servicio supera 700 millones de
  usuarios activos mensuales, según <a
  href="https://blog.promise.legal/open-weight-ai-license-trap-startups/">un
  análisis de licencias de Promise Legal</a></td></tr><tr><td>Licencia de
  investigación</td><td>Experimentar y estudiar</td><td>No está pensada para uso
  comercial</td></tr></tbody>

  </table>


  Mistral ha liberado muchos modelos con Apache 2.0, pero algunas versiones de
  Mistral Large 2 se publicaron solo para investigación. Es decir, el nombre de
  la empresa no te dice la licencia: tienes que revisar cada modelo.


  Si usarás un modelo en un producto, revisa también las restricciones de uso y
  la documentación de los datos, no solo la licencia del archivo. Esto no
  sustituye una asesoría legal, sobre todo si tu empresa opera en varios países.


  ## Ventajas de la IA de código abierto


  - **Control de tus datos:** al ejecutar el modelo en tu equipo o en tu
  servidor, tus textos no tienen por qué salir hacia un proveedor externo.

  - **Menos dependencia de un solo proveedor:** si cambian los precios o las
  condiciones de un servicio cerrado, puedes cambiar de modelo o de servidor.

  - **Personalización:** puedes ajustar un modelo a un idioma, un tema o una
  tarea específica.

  - **Transparencia para estudiar:** si el código y la documentación están
  disponibles, puedes revisar cómo funciona y reportar fallas.

  - **Comunidad:** muchos proyectos reciben mejoras y pruebas de personas de
  todo el mundo.
mk4: >-
  ## Límites y costos reales


  Un modelo abierto no es gratis en el sentido completo. Quitar el cobro por uso
  de un proveedor no elimina el costo de cómputo. Un modelo grande necesita
  memoria suficiente y, muchas veces, tarjetas gráficas caras o un servidor.


  - **Hardware:** los modelos pequeños pueden correr en laptops recientes, pero
  los grandes requieren equipos de alto nivel.

  - **Calidad:** los modelos abiertos han avanzado mucho, aunque no siempre
  igualan a los mejores modelos cerrados en todas las tareas.

  - **Mantenimiento:** actualizaciones, configuración y seguridad corren por tu
  cuenta.

  - **Seguridad:** que el código sea público permite revisarlo, pero también
  facilita que alguien lo modifique y quite salvaguardas.


  ## Openwashing: cuando la etiqueta no coincide con el producto


  El openwashing es el uso de la palabra “abierto” para dar una imagen de
  transparencia que el producto no tiene del todo. En IA aparece cuando una
  empresa publica pesos con una licencia restrictiva y promueve el modelo como
  de código abierto. Hay posturas en conflicto: algunas compañías sostienen que
  liberar pesos ya es abrir su tecnología a la comunidad, mientras que críticos
  responden que faltan datos, código de entrenamiento o libertades para usarlo
  sin restricciones. Ambas posturas tienen parte de razón, y conviene leer la
  licencia y la documentación antes de creer el título.


  ## Cómo se usan en la práctica: Ollama y LM Studio


  Para probar modelos de pesos abiertos sin enviar tus datos a la nube,
  herramientas como Ollama y LM Studio permiten descargarlos y ejecutarlos en tu
  computadora. Su función es de inferencia: ejecutan el modelo, pero no lo
  entrenan ni lo ajustan. Muchos modelos se distribuyen en formato GGUF, que
  comprime los pesos para que quepan en equipos de consumo. LM Studio usa
  llama.cpp por debajo para estos modelos, y ambas herramientas pueden exponer
  una interfaz compatible con OpenAI en localhost, lo que permite conectar tus
  propias aplicaciones.


  Un flujo básico para probar un modelo abierto en tu equipo sería este:


  1. Revisa la licencia del modelo que quieres usar y confirma si permite tu
  caso de uso.

  2. Verifica la memoria RAM y la tarjeta gráfica disponibles, y elige una
  versión del modelo que quepa en tu equipo.

  3. Descarga el modelo desde la herramienta que elijas, Ollama o LM Studio, y
  ejecútalo con una consulta sencilla.

  4. Haz pruebas con tus propios ejemplos antes de integrarlo en un proceso
  real.
mk5: >-
  ## Regulación: lo que conviene saber


  En la Unión Europea, el Reglamento de IA contempla exenciones parciales para
  modelos liberados con licencias libres y de código abierto (artículo 53),
  aunque no aplican a los modelos que implican riesgo sistémico. Si trabajas con
  clientes europeos, revisa el texto oficial del Reglamento antes de tomar
  decisiones.


  ## Preguntas frecuentes


  ### ¿Llama es de código abierto?


  Depende de la definición que uses. Meta distribuye sus pesos con la Llama
  Community License, que tiene restricciones comerciales y de uso. La OSI
  concluyó que Llama 2 no cumple su definición de código abierto, aunque Meta lo
  promueve como abierto. Lo más preciso es llamarlo modelo de pesos abiertos.


  ### ¿Los modelos de código abierto son gratis?


  Muchos se pueden descargar sin pagar licencia, pero el costo total incluye
  hardware, electricidad, mantenimiento y tiempo de configuración. Lo que se
  elimina es el cobro por uso a un proveedor, no el gasto de cómputo.


  ### ¿Puedo usar un modelo abierto en mi negocio?


  Sí, si la licencia lo permite. Apache 2.0 y MIT son permisivas, pero otras
  licencias imponen condiciones o prohíben el uso comercial. Revisa la licencia,
  las restricciones de uso y la documentación de los datos antes de integrar el
  modelo en un producto.


  ### ¿Puedo correr una IA de código abierto en mi computadora?


  Sí, sobre todo con modelos pequeños y medianos y con herramientas como Ollama
  o LM Studio. Los modelos grandes requieren mucha memoria y, en general,
  equipos más potentes.


  ## Conclusión


  La IA de código abierto promete transparencia, control y competencia, pero la
  palabra “abierto” hay que leerla con cuidado. Distingue entre código, datos y
  pesos, revisa la licencia de cada modelo y calcula el costo real de cómputo.
  Con esa base, puedes decidir si un modelo te sirve para aprender, experimentar
  o construir un producto.
---

