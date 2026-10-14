// Generado por `npm run escenas` a partir de escenas.md y src/datos/mapa.js. No se edita a mano:
// el texto se cambia en escenas.md, y la posición, los encuadres y las piezas del hub, en mapa.js.
//
// Por escena: id, título, bloque, mensaje, guion, minutos previstos, zona y región, y su
// rectángulo en el mundo (x, y, ancho, alto; null en las que se ven desde la vista general).
// Por paso: n, texto, detalle (sublista o filas de tabla), avanzado ([A]: se puede saltar),
// detalleAvanzado (un detalle [A] dentro del paso), hub (pieza que entra en el hub),
// viaja (la pieza viaja desde su zona: «Pieza al hub») y encuadre propio:
// null (su escena) · 'general' · 'pieza' (zona + hub) · 'avanzado' (zoom a su fila) · id de otra escena.

export const ESCENAS = [
  {
    id: "E01", titulo: "Bienvenida y mapa", bloque: "Apertura", bloqueCorto: "Apertura", mensaje: "esto es lo que vamos a recorrer.", guion: "Apertura", minutos: 2, zona: "general", region: "general", x: null, y: null, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Vista general del mapa con todo atenuado. Título «Devin en el día a día» y subtítulo «Cómo aprovecharlo mejor y controlar el consumo». Logo de Openbank.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Las cuatro regiones se iluminan una a una, cada una con su pregunta: «¿Dónde está cada cosa?», «¿Qué es cada pieza?», «¿Cuánto cuesta?», «¿Cómo lo uso bien?».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "→ Cámara a la Parte 1.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: "E02"},
    ],
  },
  {
    id: "E02", titulo: "Local y Cloud", bloque: "Parte 1 · Primeros pasos", bloqueCorto: "Parte 1", mensaje: "dónde se ejecuta decide qué podemos hacer.", guion: "1.1", minutos: 4, zona: "parte1", region: "parte1", x: -1040, y: -3600, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Dos preguntas: «¿Dónde se ejecuta?» y «¿Desde dónde interactúo?».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Se separan dos islas: Local (icono `laptop`) y Cloud (icono `cloud`).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Local: aparecen tres ventajas como etiquetas: «Control de modelo y effort», «Acceso a lo local», «Revisión visual de cambios».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Cloud: una tarea se entrega y se ejecuta sola en remoto; después, la misma tarea se repite en bucle sobre un calendario (`calendar-clock`): «Automatizar flujos repetitivos».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "Dentro de Local aparecen dos tarjetas: Desktop (IDE) y CLI (terminal).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 6, texto: "Las tres opciones se conectan con una línea: «Pueden combinarse».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E03", titulo: "Dónde está cada control", bloque: "Parte 1 · Primeros pasos", bloqueCorto: "Parte 1", mensaje: "dónde se toca cada cosa; qué hace, después.", guion: "1.2", minutos: 4, zona: "parte1", region: "parte1", x: 1040, y: -3600, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Captura de Devin Desktop a tamaño grande.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Se resalta el cuadro de mensajes.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Se resalta el selector de modelo → etiqueta «Parte 2 · Modelos».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Se resalta el effort → «Parte 2 · Effort».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "Se resalta el modo → «Parte 4 · Planificar».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 6, texto: "Se resalta el indicador de contexto → «Parte 2 · Contexto».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 7, texto: "Se resalta el consumo de la sesión → «Parte 3 · Coste».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 8, texto: "Mensaje final: «Antes de empezar: modelo, effort y modo».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E04", titulo: "El agente, vacío", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "vamos a montar el agente pieza a pieza.", guion: "transición a la parte 2", minutos: 0.5, zona: "hub", region: "centro", x: 0, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Cámara al hub. La tarjeta del agente, con los huecos vacíos de cada pieza.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E05", titulo: "Modelos: niveles y generaciones", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "los niveles de OpenAI y Anthropic se corresponden, y la generación también cuenta.", guion: "2.1, hasta la tabla y las generaciones", minutos: 2, zona: "modelos", region: "centro", x: -2080, y: -1560, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Familias como píldoras: GPT (OpenAI), Claude (Anthropic), SWE (Cognition) y otras.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "La tabla de niveles se construye fila a fila, de arriba abajo:", detalle: ["Nivel | OpenAI | Anthropic | Entrada / salida por 1M","Máximo | GPT-6 Astra | Fable 5.1 | 10 $ / 50 $","Alto | — | Opus 5.5 | 4 $ / 20 $","Medio | GPT-6 Sol · 6.1 Sol | Sonnet 5.5 | 2 $ / 10 $","Económico | GPT-6 Luna | Haiku 5.5 | 0,10 $ / 0,50 $"], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Generaciones: una línea de tiempo por familia (GPT-5.5 → 5.6 → 6 → 6.1; Claude 4.x → 5 → 5.5). «El nombre del nivel no basta: mira la generación.»", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "«Sol cambió de nivel»: en GPT-5.6, Sol ≈ Opus y Terra ≈ Sonnet; en GPT-6 no hay Terra y Sol ≈ Sonnet.", detalle: [], avanzado: true, detalleAvanzado: false, hub: null, viaja: false, encuadre: "avanzado"},
    ],
  },
  {
    id: "E06", titulo: "Modelos: coste y rendimiento", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "arriba a la izquierda es mejor, y la generación pesa tanto como el nivel.", guion: "2.1, «La relación entre rendimiento y coste»", minutos: 2, zona: "modelos", region: "centro", x: 0, y: -1560, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Ejes de la gráfica: coste por intento (escala logarítmica) y porcentaje de acierto. Nota de fuente visible: «Terminal-Bench 4.0 · Anthropic, 22-09-2026».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Las líneas se dibujan una a una: GPT-5.6 Sol, Opus 5, Fable 5.1, GPT-6 Astra y, la última y en acento, Opus 5.5.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Lectura 1: se resaltan Opus 5 en Max y Opus 5.5 en su esfuerzo por defecto. Flecha: «más acierto por ~1/5 del coste».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Lectura 3: dos puntos a la misma altura, uno de un modelo barato con más esfuerzo y otro de uno caro con menos.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E07", titulo: "Modelos: cómo elegir", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "lo que importa es el coste de completar bien la tarea.", guion: "2.1, «Cómo elegir»", minutos: 1, zona: "modelos", region: "centro", x: 2080, y: -1560, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Tabla de tipo de tarea y estrategia inicial, con escalonado.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Dos contadores: un modelo barato que necesita tres intentos frente a uno bueno que acierta a la primera; el barato acaba costando más. Etiqueta «Cifras ficticias».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Pieza al hub: encuadre zona + hub; el modelo viaja y se encaja.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "modelo", viaja: true, encuadre: "pieza"},
    ],
  },
  {
    id: "E08", titulo: "Effort", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "subir el esfuerzo encarece más de lo que mejora.", guion: "2.2", minutos: 2.5, zona: "effort", region: "centro", x: 4480, y: -1560, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Dial de effort con cinco posiciones: Low, Medium, High, XHigh, Max. Nota pequeña: «Depende del modelo: SWE-2 solo tiene tres niveles».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "El dial gira de Low a Max: crecen las fichas de razonamiento (rayadas) y suben dos contadores, latencia y coste.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Cámara corta a la gráfica de E06. Se resaltan los puntos de una línea: de Low a Medium, salto grande; de XHigh a Max, casi nulo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: "E06"},
      {n: 4, texto: "Vuelta a E08: «El esfuerzo no sustituye al contexto». Una pieza de información falta y pensar más no la crea.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "Tarjeta de consejo: «Empieza por un nivel medio; sube cuando lo justifique la tarea».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 6, texto: "Pieza al hub: el dial se une al modelo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "effort", viaja: true, encuadre: "pieza"},
    ],
  },
  {
    id: "E09", titulo: "Contexto: qué es", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "el contexto es todo lo que el modelo lee en cada llamada.", guion: "2.3, definición y tres conceptos", minutos: 1.5, zona: "contexto", region: "centro", x: 4480, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Aparece el recipiente vacío y entran capas, de abajo arriba: instrucciones, conversación, código leído, resultados de herramientas.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Capacidad: se resalta la escala completa del recipiente.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Utilizado: la línea de nivel en acento.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Relevante: solo algunas capas quedan resaltadas; el resto se atenúa.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E10", titulo: "Contexto: degradación", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "el modelo rinde peor con más contexto, y empieza a caer pronto.", guion: "2.3, «Por qué no conviene llenarlo»", minutos: 2, zona: "contexto", region: "centro", x: 6560, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Ejes: tokens de contexto (8K → 1M, logarítmica) y acierto (%). Fuente: «Context Arena · GDM-MRCR v2 · 14-10-2026».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Las líneas se dibujan: Claude Sonnet 5, Claude Opus 5 y GPT-5.6 Sol, con etiquetas en 8K, 128K y 512K.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Se sombrea la franja 64K–256K: «La caída empieza con una cuarta parte de la ventana o menos».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "El remate, con cifras grandes: misma pregunta y mismo modelo. Con 300 tokens relevantes acierta el 92 %; con 113.000 tokens de historial, el 38 %. Fuente: «Chroma · Context Rot · 2025».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "Modelos actuales (GraphWalks, ficha de Gemini 4 Argon): Opus 5.5 pasa de 90,6 a 66,8 y GPT-6 Astra de 98,7 a 71,8.", detalle: [], avanzado: true, detalleAvanzado: false, hub: null, viaja: false, encuadre: "avanzado"},
    ],
  },
  {
    id: "E11", titulo: "Contexto: gestionar la sesión", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "decidir con criterio cuándo seguir, compactar o empezar de cero.", guion: "2.3, «Continuar, compactar o empezar de nuevo»", minutos: 1.5, zona: "contexto", region: "centro", x: 8640, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Tres caminos desde una sesión: continuar, compactar y sesión nueva, cada uno con sus situaciones de la tabla.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Compactar: el recipiente lleno se comprime en una capa de resumen. Al lado aparece la lista de lo que hay que guardar (cinco puntos).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Consejos: «Una sesión por objetivo» y «No reinicies continuamente (y la caché… en la parte 3)».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Pieza al hub: el recipiente se encaja en el agente.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "contexto", viaja: true, encuadre: "pieza"},
    ],
  },
  {
    id: "E12", titulo: "Rules y AGENTS.md", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "lo que va siempre debe ser breve y estable.", guion: "2.4", minutos: 2, zona: "rules", region: "centro", x: 4480, y: 1560, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "El documento AGENTS.md cae al fondo del recipiente: «Lo primero que entra».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Niveles: árbol del repositorio. El AGENTS.md de la raíz se carga al inicio; el de un subdirectorio aparece cuando el agente entra en esa carpeta.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Un AGENTS.md largo engorda la capa del fondo, y en cada llamada se relee: un contador hace tic en cada llamada.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Consejo: «Breve y estable; para lo largo, una skill». Una rule apunta a una skill.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "Pieza al hub: el documento se coloca al fondo del recipiente del hub.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "rules", viaja: true, encuadre: "pieza"},
    ],
  },
  {
    id: "E13", titulo: "Skills", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "una skill solo ocupa contexto cuando se usa.", guion: "2.5", minutos: 2, zona: "skills", region: "centro", x: 0, y: 1560, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Varias skills plegadas: solo se ve su nombre y su descripción.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Llega una tarea que encaja con una: esa skill se despliega y su contenido entra en el recipiente. Las demás siguen plegadas.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Dos formas de activarla: `/nombre-de-la-skill` (nosotros) o el agente la elige por su descripción.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Cuándo crear una: tres ejemplos y su anatomía (cuándo se aplica, qué necesita, pasos, resultado).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "Pieza al hub: las skills plegadas se colocan junto al agente.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "skills", viaja: true, encuadre: "pieza"},
    ],
  },
  {
    id: "E14", titulo: "El bucle del agente", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "las herramientas convierten un modelo en un agente.", guion: "2.6, primeros párrafos", minutos: 1.5, zona: "hub", region: "centro", x: 0, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Cámara al hub. Aparecen las herramientas de serie: `file-text` (leer), `pencil` (editar), `search` (buscar) y `terminal` (ejecutar).", detalle: [], avanzado: false, detalleAvanzado: false, hub: "herramientas", viaja: false, encuadre: null},
      {n: 2, texto: "El bucle da una vuelta lenta: el modelo decide, una herramienta pulsa y su resultado entra como ficha en el recipiente. Rótulo: «Esto es un agente».", detalle: [], avanzado: false, detalleAvanzado: false, hub: "bucle", viaja: false, encuadre: null},
      {n: 3, texto: "El bucle da tres vueltas más rápidas y el recipiente crece. Esto prepara la parte 3.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E15", titulo: "Herramientas del departamento", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "el agente decide por la descripción; una tool da manos, una skill da oficio.", guion: "2.6, desde «Cómo las usa el agente»", minutos: 2.5, zona: "tools", region: "centro", x: -4480, y: 1560, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Herramientas propias como círculos con su nombre en mono: documentación, incidencias, validación y revisión (provisionales).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Una herramienta se da la vuelta: el código queda oculto y se ve lo que el agente lee, que es nombre, descripción y parámetros. La descripción se resalta: «La descripción es el disparador».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Los tres pasos en Local:", detalle: ["lista de servidores (poco contexto);","el agente pide las herramientas de uno y sus definiciones entran en el recipiente;","la llamada: solo entran argumentos y resultado, mientras código y credenciales se quedan tras un muro."], avanzado: true, detalleAvanzado: false, hub: null, viaja: false, encuadre: "avanzado"},
      {n: 4, texto: "Comparación en dos columnas, «Manos» (tool) y «Oficio» (skill), con las filas de la tabla del guion apareciendo de dos en dos.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "«No compiten»: una skill se acopla a una herramienta.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 6, texto: "Nuestras herramientas: tabla con dónde está cada una, qué permisos necesita y quién la mantiene.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 7, texto: "Consejos para quien las crea (tres).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 8, texto: "Pieza al hub: las herramientas propias se colocan junto a las de serie.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "propias", viaja: true, encuadre: "pieza"},
    ],
  },
  {
    id: "E16", titulo: "MCP", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "MCP es el enchufe para nuestras herramientas.", guion: "2.7", minutos: 1, zona: "mcp", region: "centro", x: -4480, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Conector MCP del hub hacia dos servidores: uno local (`laptop`) y uno remoto (`cloud`).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Cómo se añaden: `devin mcp add` (fichero local o de proyecto) y Cloud → Customize → MCPs.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Candado: «Credenciales nunca en el repositorio».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Pieza al hub: el conector.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "mcp", viaja: true, encuadre: "pieza"},
    ],
  },
  {
    id: "E17", titulo: "Subagentes", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "contexto separado, coste propio.", guion: "2.8", minutos: 2.5, zona: "subagentes", region: "centro", x: -4480, y: -1560, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "El agente lanza un subagente por el camino de puntos, con su propio recipiente vacío: no hereda la conversación.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "El recipiente del subagente se llena mientras el del agente apenas crece. Vuelve una ficha «↩ resumen + evidencias».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "El subagente tiene su propio contador de coste. Nota: «General: hereda el modelo; exploración: otro».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Cuándo compensan: lista de sí y lista de no.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "El encargo de ejemplo, en una tarjeta en mono.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 6, texto: "Dos subagentes editan el mismo archivo y aparece un conflicto. Solución: repartir archivos.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 7, texto: "Consejo: «No por defecto: cuando separar aporte más que coordinar».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 8, texto: "Pieza al hub: el subagente con su recipiente.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "subagente", viaja: true, encuadre: "pieza"},
    ],
  },
  {
    id: "E18", titulo: "Plugins", bloque: "Parte 2 · Cómo funciona: las piezas", bloqueCorto: "Parte 2", mensaje: "un plugin empaqueta todo lo anterior.", guion: "2.9", minutos: 1, zona: "hub", region: "centro", x: 0, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Las piezas del hub (skills, AGENTS.md, conector MCP y subagente) se envuelven en la caja de plugin. [A] Etiqueta de hooks.", detalle: [], avanzado: false, detalleAvanzado: true, hub: "plugin", viaja: false, encuadre: null},
      {n: 2, texto: "Etiquetas de la organización: obligatorio, recomendado y prohibido.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "El patrón del departamento: MCP + skills + AGENTS.md mínimo. Rótulo de transición: «Ya conocemos las piezas. ¿Cuánto cuesta usarlas?».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E19", titulo: "Qué es un token", bloque: "Parte 3 · Tokens y coste", bloqueCorto: "Parte 3", mensaje: "en cada llamada el modelo relee todo el contexto.", guion: "3.1", minutos: 1.5, zona: "hub", region: "centro", x: 0, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "La frase «Arregla la paginación» se parte en fichas de token.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "El bucle del agente gira y en cada vuelta una línea recorre todo el recipiente («se relee»). Un contador de llamadas sube: 1, 2, 3…", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "→ Cámara a la región de la parte 3.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: "E20"},
    ],
  },
  {
    id: "E20", titulo: "Qué pagamos", bloque: "Parte 3 · Tokens y coste", bloqueCorto: "Parte 3", mensaje: "ACUs ≈ coste en tokens + 20 %.", guion: "3.2", minutos: 1, zona: "parte3", region: "parte3", x: 11520, y: -1860, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Fichas → «coste en tokens» → ×1,2 → «ACUs».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Etiqueta bien visible: «Benchmark interno · pocas tareas · aproximación».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E21", titulo: "Los cuatro tipos", bloque: "Parte 3 · Tokens y coste", bloqueCorto: "Parte 3", mensaje: "no todos los tokens cuestan lo mismo.", guion: "3.3", minutos: 2, zona: "parte3", region: "parte3", x: 11520, y: -620, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Input sin caché: capa sólida, sin corchete.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Cache write: el corchete se alarga sobre una capa nueva.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Cache read: corchete continuo con ✓ sobre las capas ya vistas. Barra de precio pequeña: «2,5–10 % del input».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Output: fichas huecas, y rayadas para el razonamiento: «el más caro por token».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "Tabla de tarifas reales de los modelos de la cuenta.", detalle: [], avanzado: true, detalleAvanzado: false, hub: null, viaja: false, encuadre: "avanzado"},
    ],
  },
  {
    id: "E22", titulo: "La caché", bloque: "Parte 3 · Tokens y coste", bloqueCorto: "Parte 3", mensaje: "lo ya visto se relee barato, mientras la caché no caduque.", guion: "3.4", minutos: 1.5, zona: "parte3", region: "parte3", x: 11520, y: 620, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Dos llamadas seguidas, una al lado de la otra: el principio es idéntico y el corchete lo cubre. Solo lo nuevo se paga completo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Un temporizador de cinco minutos se agota: el corchete pasa a discontinuo con ✕ y todo se vuelve a escribir.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Nota: «Duración en Devin: pendiente de verificar».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E23", titulo: "Una conversación, paso a paso", bloque: "Parte 3 · Tokens y coste", bloqueCorto: "Parte 3", mensaje: "la caché ahorra mucho, y las pausas largas la desperdician.", guion: "3.5. Es la animación principal de la charla", minutos: 4, zona: "parte3", region: "parte3", x: 11520, y: 1860, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Situación inicial: 20.000 tokens fijos (AGENTS.md e instrucciones) en ambos lados.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Llamada 1: con caché cuesta un poco más (0,070 frente a 0,058).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Llamadas 2 a 12 en reproducción continua: sin caché, cada llamada cuesta más; con caché, el coste por llamada apenas crece. Totales: 1,36 frente a 0,43, un −69 %.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Variante pausa: el lado con caché rebobina a la llamada 6. En la 7 la caché caduca y la llamada cuesta 0,145. Total 0,54, un +27 %.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 5, texto: "Variante compactación: tras la llamada 8 el recipiente se comprime; las llamadas siguientes son más baratas, pero la compactación también cuesta. Total 0, 445: en una sesión corta no ahorra. [A] En 30 llamadas, un −12 %.", detalle: [], avanzado: false, detalleAvanzado: true, hub: null, viaja: false, encuadre: null},
      {n: 6, texto: "Tres conclusiones, una a una: «La caché es lo que más ahorra», «Las pausas largas y los reinicios la desperdician» y «Compactar es sobre todo calidad».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E24", titulo: "Definir la tarea", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", mensaje: "una buena petición responde cinco preguntas.", guion: "4.1", minutos: 2.5, zona: "parte4", region: "parte4", x: -2080, y: 3600, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Las cinco preguntas en lista.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "La petición inicial: «Arregla la paginación».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "La petición mejorada, en mono.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 4, texto: "Cada fragmento de la petición mejorada se subraya con el número de la pregunta que responde (1 a 5).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E25", titulo: "Contexto progresivo", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", mensaje: "primero lo esencial, el resto accesible.", guion: "4.2", minutos: 1.5, zona: "parte4", region: "parte4", x: 0, y: 3600, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Lo primero: error exacto, pasos de reproducción y archivos relacionados.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "La hipótesis como sugerencia, no como orden (la cita del guion).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Mil líneas de log se filtran hasta el fragmento relevante.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E26", titulo: "Planificar", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", mensaje: "un plan solo cuando aporta.", guion: "4.3", minutos: 1.5, zona: "parte4", region: "parte4", x: 2080, y: 3600, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Dos caminos: cambio pequeño → ejecutar; tarea amplia → modo planificación.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "La tarjeta del plan: qué cambiar, por qué, riesgos y cómo validarlo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E27", titulo: "Intervenir", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", mensaje: "corregir pronto y con datos concretos.", guion: "4.4", minutos: 1.5, zona: "parte4", region: "parte4", x: 2080, y: 4840, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "El agente se desvía del camino; la corrección con información concreta lo devuelve (la cita).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Pausa de diagnóstico: la petición en mono.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E28", titulo: "Verificar", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", mensaje: "una respuesta convincente no demuestra que funcione.", guion: "4.5", minutos: 1.5, zona: "parte4", region: "parte4", x: 0, y: 4840, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Rótulo: «Convincente ≠ funciona».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Lista de comprobación: archivos cambiados, alcance y pruebas, más lo que no se ha podido comprobar.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "La petición de cierre.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E29", titulo: "Hábitos", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", mensaje: "lo que gasta sin aportar.", guion: "4.6", minutos: 1, zona: "parte4", region: "parte4", x: -2080, y: 4840, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Los cuatro hábitos genéricos con su alternativa.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Recordatorio de los hábitos propios de cada pieza, con líneas hacia sus zonas: effort (E08), contexto (E11) y subagentes (E17).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
  {
    id: "E30", titulo: "Antes de pulsar Enter", bloque: "Cierre", bloqueCorto: "Cierre", mensaje: "cinco preguntas antes de empezar.", guion: "Cierre", minutos: 2, zona: "general", region: "general", x: null, y: null, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "La cámara se aleja al mapa entero.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 2, texto: "Las cinco preguntas aparecen una a una y cada una ilumina su región: resultado → Parte 4, configuración → Partes 1 y 2, contexto → Contexto, herramientas → Tools y plugins, terminado → Verificar.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
      {n: 3, texto: "Mensaje final y logo de Openbank.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, viaja: false, encuadre: null},
    ],
  },
];
