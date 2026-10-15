// Generado por `npm run escenas` a partir de escenas.md y src/datos/mapa.js. No se edita a mano:
// el texto se cambia en escenas.md, y la posición, los encuadres y las piezas del hub, en mapa.js.
//
// Por escena: id, título, bloque (nombre, corto y título de su tapa), mensaje, guion, minutos
// previstos, zona (su pantalla) y región (su bloque del mapa), y el rectángulo de su pantalla
// en el mundo (x, y, ancho, alto; null en las que se ven desde la vista general). Las escenas
// de una misma zona comparten pantalla.
// Por paso: n, texto, detalle (sublista o filas de tabla), avanzado ([A]: se puede saltar),
// detalleAvanzado (un detalle [A] dentro del paso), hub (pieza que entra en el hub) y
// encuadre propio: null (su pantalla) · 'general' · 'portada' · 'diagrama' · id de otra escena.

export const ESCENAS = [
  {
    id: "E01", titulo: "Portada y mapa", bloque: "Apertura", bloqueCorto: "Apertura", bloqueTitulo: "Apertura", mensaje: "esto es lo que vamos a recorrer.", guion: "Apertura", minutos: 2, zona: "general", region: "general", x: null, y: null, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Portada: el logo de Devin y, debajo, «Devin», en grande, en el centro del mapa. Es la tapa del bloque central vista de cerca.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: "portada"},
      {n: 2, texto: "La cámara se aleja a la vista general: los cinco bloques, cada uno con su tapa. En la del centro siguen el logo y «Devin»; en las de fuera, al principio solo su icono (Primeros pasos `footprints`, Coste `coins`, Buenas prácticas `route` y Preguntas `message-circle-question`). Cuando la cámara llega, cada icono sube y aparece su título debajo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E02", titulo: "Devin Desktop, CLI y Cloud", bloque: "Parte 1 · Primeros pasos", bloqueCorto: "Parte 1", bloqueTitulo: "Primeros pasos", mensaje: "dónde se ejecuta decide qué podemos hacer.", guion: "1.1", minutos: 4, zona: "parte1", region: "parte1", x: 0, y: -3280, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Dos preguntas, centradas juntas: «¿Dónde voy a ejecutar Devin?» y «¿Cómo interactúo con él?».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Se separan dos islas: Local (icono `laptop`) y Cloud (icono `cloud`). Primero se explica Local entero; después, Cloud.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Local: aparecen tres ventajas: «Control de modelo y effort», «Acceso a lo local», «Revisión visual de cambios».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "Dentro de Local aparecen sus dos interfaces: Desktop (IDE) y CLI (terminal).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 5, texto: "Cloud: una tarea se entrega y se ejecuta sola en remoto; después, la misma tarea se repite cada semana (`calendar-clock`, con una flecha que gira sin parar); y su ventaja: «Trabajar con múltiples repositorios».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 6, texto: "Las tres opciones se conectan con una línea: «Pueden combinarse».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E03", titulo: "Dónde está cada control", bloque: "Parte 1 · Primeros pasos", bloqueCorto: "Parte 1", bloqueTitulo: "Primeros pasos", mensaje: "dónde se toca cada cosa; qué hace, después.", guion: "1.2", minutos: 4, zona: "parte1", region: "parte1", x: 0, y: -3280, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Captura de Devin Desktop, entera.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "La captura se amplía hasta el panel de la sesión y se resalta el cuadro de mensajes.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Se abre el selector de modelo y se resalta → etiqueta «Modelo».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "En la ficha del modelo, se resalta el effort («Higher effort consumes more tokens») → «Effort».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 5, texto: "Se abre el selector de modo (Code, Smart, Ask, Plan, Bypass Permissions) → «Modo».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 6, texto: "Al pasar por el indicador de contexto sale su aviso (contexto usado y caché) → «Contexto».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 7, texto: "Mensaje final: «Antes de empezar» y, debajo, modelo, effort y modo, cada uno con su icono.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E04", titulo: "El agente, vacío", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "vamos a montar el agente pieza a pieza.", guion: "transición a la parte 2", minutos: 0.5, zona: "hub", region: "centro", x: 0, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "En una animación rápida y seguida aparecen Devin, en su círculo, sus herramientas de serie y, después, los huecos vacíos de cada pieza, en el orden de la ruta.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: "diagrama"},
    ],
  },
  {
    id: "E05", titulo: "Modelos: niveles y generaciones", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "la elección más relevante a la hora de usar Devin es: ¿qué modelo uso?", guion: "2.1, hasta la tabla y las generaciones", minutos: 2, zona: "modelos", region: "centro", x: 0, y: -1240, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Los tres proveedores principales, con su logo, grandes y centrados: OpenAI (GPT), Anthropic (Claude) y Cognition (SWE, con el logo de Devin).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Se colocan bajo el título, cada uno con su logo y su nombre, y aparece «y otros: Gemini, Kimi, GLM…».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "La tabla de niveles se construye fila a fila, de arriba abajo:", detalle: ["Nivel | OpenAI | Anthropic | Entrada / salida por 1M","Máximo | GPT-6 Astra | Fable 5.1 | 10 $ / 50 $","Alto | — | Opus 5.5 | 4 $ / 20 $","Medio | GPT-6 Sol · 6.1 Sol | Sonnet 5.5 | 2 $ / 10 $","Económico | GPT-6 Luna | Haiku 5.5 | 0,10 $ / 0,50 $"], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "A la derecha de la tabla, un arco por salto de nivel, con lo que multiplica el precio: de Económico a Medio, ×20; de Medio a Alto, ×2; de Alto a Máximo, ×2,5.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 5, texto: "Desde el económico a todos los demás, arcos cada vez más abiertos: ×20 (Medio), ×40 (Alto) y ×100 (Máximo, en acento: un modelo SOTA frente al más económico). Los otros dos saltos se atenúan.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 6, texto: "Generaciones: una línea de tiempo por familia (GPT-5.5 → 5.6 → 6 → 6.1; Claude 4.x → 5 → 5.5). «El nombre del nivel no basta: mira la generación.»", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E06", titulo: "Modelos: coste y rendimiento", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "arriba a la izquierda es mejor, y la generación pesa tanto como el nivel.", guion: "2.1, «La relación entre rendimiento y coste»", minutos: 2, zona: "modelos", region: "centro", x: 0, y: -1240, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Ejes de la gráfica: coste por intento (escala logarítmica) y efectividad (%). Nota de fuente visible: «Terminal-Bench 4.0 · Anthropic, 22-09-2026».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Las líneas se dibujan seguidas y rápidas: GPT-5.6 Sol, Opus 5, Fable 5.1 y GPT-6 Astra. Después, sola y en acento, Opus 5.5: según la línea llega a cada punto, aparece el nombre de su nivel de esfuerzo (Low, Medium, High, XHigh, Max), para que se lea que cada punto es un esfuerzo mayor.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Lectura 1: se resaltan Opus 5 en Max y Opus 5.5 en su esfuerzo por defecto (Medium). Flecha: «más efectividad por ~1/5 del coste».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "Lectura 3: dos puntos a la misma altura, uno de un modelo barato con más esfuerzo y otro de uno caro con menos: Opus 5 en XHigh (50,6 %) y GPT-6 Astra en Low (49,7 %), unidos por una guía discontinua. Opus 5.5 se atenúa y GPT-6 Astra se aviva.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E07", titulo: "Modelos: cómo elegir", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "lo que importa es el coste de completar bien la tarea.", guion: "2.1, «Cómo elegir»", minutos: 1, zona: "modelos", region: "centro", x: 0, y: -1240, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Tabla de tipo de tarea, estrategia inicial y modelo recomendado, con escalonado. Para las tareas sencillas (localizar o explicar, cambio pequeño, trabajo repetitivo), GPT-6 Luna; para las complejas (diagnóstico, revisión de un cambio importante), GPT-6.1 Sol / SWE-2 mientras esté en promoción.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Dos contadores: un modelo barato que necesita tres intentos (0,40 cada uno: 1,20) frente a uno bueno que acierta a la primera (0,90); el barato acaba costando más.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "modelo", encuadre: null},
    ],
  },
  {
    id: "E08", titulo: "Effort", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "el effort regula cuánto «piensa» el modelo antes de responder.", guion: "2.2", minutos: 2.5, zona: "effort", region: "centro", x: 2080, y: -1240, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Dial de effort con cinco posiciones: Low, Medium, High, XHigh, Max.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "El dial gira de Low a Max y suben dos contadores, latencia y coste.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Junto al dial, la gráfica de E06 en pequeño, con las demás líneas atenuadas. Se resaltan los puntos de Opus 5.5: de Low a Medium, +19 puntos; de XHigh a Max, −2.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "Las columnas se desplazan. La tercera: «El esfuerzo no sustituye al contexto» · «Dar al agente el contexto adecuado es la mejor manera de aumentar su eficacia» · tarjeta de consejo: «Empieza por un nivel medio; sube cuando lo justifique la tarea».", detalle: [], avanzado: false, detalleAvanzado: false, hub: "effort", encuadre: null},
    ],
  },
  {
    id: "E09", titulo: "Contexto: qué es", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "el contexto es todo lo que el modelo lee en cada llamada.", guion: "2.3, definición y tres conceptos", minutos: 1.5, zona: "contexto", region: "centro", x: 2080, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Capacidad: tres ventanas superpuestas, de 256K, 512K y 1M tokens. La capacidad depende del modelo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Utilizado: una ventana de 256K se llena de izquierda a derecha con lo que lee el modelo: instrucciones, reglas, conversación, código leído y resultados de herramientas. La línea de nivel, en acento, marca el 65 %.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Relevante: el mismo relleno se atenúa salvo un trozo del código leído, «Contexto útil».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E10", titulo: "Contexto: degradación", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "cuanto más contexto, peor rendimiento ofrece el modelo.", guion: "2.3, «Por qué no conviene llenarlo»", minutos: 2, zona: "contexto", region: "centro", x: 2080, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Ejes: tokens de contexto (8K → 1M, logarítmica) y acierto (%). Fuente: «Context Arena · GDM-MRCR v2 · 14-10-2026».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Las tres líneas se dibujan a la vez: GPT-5.6 Sol, Claude Opus 5 y Claude Sonnet 5. Al acabar, sin otro clic, se sombrean las franjas, una tras otra: 64K–256K, «Inicio de degradación», y 256K–512K, más oscura y rojiza, «Degradación alta».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "La tabla «Acierto según la ventana usada»: cada modelo con la ventana casi vacía (8K), al 25 % (256K) y al 50 % (512K). Las tres ventanas son de 1M. Las columnas del 25 % y del 50 % llevan el tono de su franja.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E11", titulo: "Contexto: gestionar la sesión", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "cómo podemos gestionar mejor el contexto.", guion: "2.3, «Continuar, compactar o empezar de nuevo»", minutos: 1.5, zona: "contexto", region: "centro", x: 2080, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Continuar, con sus situaciones. La ventana ya está cargada (68 %): aunque el contexto sea amplio, si es necesario y relevante se puede seguir, y lo ocupado crece un poco más (75 %).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Compactar (continuar se atenúa): la conversación y lo explorado se recogen, suave, hasta el resumen de la sesión (12 %).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Sesión nueva (compactar se atenúa): la ventana vuelve a estar llena y se vacía casi por completo; queda el system prompt (5 %).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "A la derecha, lo que hay que guardar antes de compactar o cambiar de sesión (cinco puntos); compactar se aviva.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "contexto", encuadre: null},
    ],
  },
  {
    id: "E12", titulo: "Rules y AGENTS.md", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "normas fijas que debe cumplir el agente.", guion: "2.4", minutos: 2, zona: "rules", region: "centro", x: 2080, y: 1240, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "El documento AGENTS.md entra en la ventana y ocupa su principio: «Se incluyen automáticamente en todos los prompts».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Niveles: árbol del repositorio. Las rules (`.devin/rules/rule-1.md`, `rule-2.md`) y el AGENTS.md de la raíz se cargan al inicio; el de un subdirectorio aparece cuando el agente entra en esa carpeta.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "«Las rules y AGENTS.md se releen en cada llamada»: si son largos, engordan la capa del fondo; un contador hace tic en cada llamada.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "Consejo: «Breve y estable; para lo largo, una skill». Una rule apunta a una skill.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "rules", encuadre: null},
    ],
  },
  {
    id: "E13", titulo: "Skills", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "instrucciones sobre cómo realizar una tarea.", guion: "2.5", minutos: 2, zona: "skills", region: "centro", x: 0, y: 1240, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Varias skills plegadas: solo se ve su nombre y su descripción.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Llega una tarea que encaja con una: su contenido entra en la ventana y las demás se atenúan. Ninguna se despliega: la tarjeta sigue mostrando solo nombre y descripción.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Dos formas de activarla: `/nombre-de-la-skill` (nosotros) o el agente la elige por su descripción.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "«Cuándo crear una», a la izquierda, y debajo «Procedimientos propios repetitivos»; a su derecha, cuatro flechas curvas (abanico) hacia lo que debe explicar una skill, una parte encima de otra: cuándo, qué necesita, pasos y resultado. Después, el consejo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "skills", encuadre: null},
    ],
  },
  {
    id: "E14", titulo: "El bucle del agente", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "las herramientas convierten un modelo en un agente.", guion: "2.6, primeros párrafos", minutos: 1.5, zona: "hub", region: "centro", x: 0, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "«Por defecto, Devin incluye una serie de tools disponibles» y, debajo, las herramientas de serie en una rejilla de 2 × 2, todas del mismo tamaño: `search` (buscar), `file-text` (leer), `pencil` (editar) y `terminal` (ejecutar).", detalle: [], avanzado: false, detalleAvanzado: false, hub: "herramientas", encuadre: null},
      {n: 2, texto: "El bucle da una vuelta lenta: el modelo decide, una herramienta pulsa y su resultado entra como ficha en la ventana; en el panel, cada fase aparece cuando ocurre. Seguidas, sin otro clic, tres vueltas más rápidas: la ventana se llena y el contador de llamadas sube de 1 a 4 (esto prepara la parte 3). Al final, el rótulo: «Esto es un agente».", detalle: [], avanzado: false, detalleAvanzado: false, hub: "bucle", encuadre: null},
    ],
  },
  {
    id: "E15", titulo: "Herramientas del departamento", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "una tool «da manos» al LLM, una skill «da conocimiento».", guion: "2.6, desde «Cómo las usa el agente»", minutos: 2.5, zona: "tools", region: "centro", x: -2080, y: 1240, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Un solo ejemplo claro: la herramienta `create_pull_request` (icono y nombre en mono) y su ficha, lo que el agente lee de ella: nombre, descripción y parámetros. Las dos, juntas, centradas y en grande: son las piezas principales.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "La pantalla se reordena en un esquema, de izquierda a derecha: Agente → Tool → sus tres elementos, uno encima de otro (Nombre, Descripción, Parámetros) → la ficha, con una flecha de cada elemento a su campo. Sin recuadro rojo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Comparación en dos columnas, «Tool propia → manos» y «Skill → conocimiento», y debajo «No compiten»: una skill se acopla a una herramienta. Todas las filas y el pie entran en una sola animación, escalonada.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "propias", encuadre: null},
    ],
  },
  {
    id: "E16", titulo: "MCP", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "MCP es el estándar con el que conectamos herramientas a Devin.", guion: "2.7", minutos: 2.5, zona: "mcp", region: "centro", x: -2080, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Sin un estándar: arriba, tres agentes (Devin, otro agente y un IDE con IA); abajo, tres servicios (GitHub, Atlassian y Sonar, con su logo); un cable de cada agente a cada servicio. «Sin un estándar, cada agente necesita su propia integración con cada servicio: 3 × 3 = 9».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Con MCP: los nueve cables se van y todo pasa por el conector, en el centro. «Con MCP, cada servicio publica un servidor una vez y cualquier agente compatible lo usa: 3 + 3 = 6». Debajo: «Cada servidor se ejecuta en nuestra máquina o como un servicio remoto».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Qué trae un servidor: Devin, con el conector en su borde, unido al servidor de GitHub, que despliega algunas de sus tools; resaltada, `create_pull_request`, la del ejemplo de Tools propias (E15). «Sus tools se suman a las de serie, con el mismo sistema de permisos» y «La del ejemplo de \"Tools propias\" llega por aquí: el agente la ve como `mcp__github__create_pull_request`».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "Los MCPs del departamento: el servidor de GitHub pasa a su sitio en una columna con los demás, cada uno con el logo de su servicio y un cable desde el conector. Externos: GitHub, Atlassian y Sonar; internos: DS-Workspace (con la llave de Openbank). Al pie, centrado: «La guía de instalación completa está disponible en el repositorio Master-Control-Program».", detalle: [], avanzado: false, detalleAvanzado: false, hub: "mcp", encuadre: null},
    ],
  },
  {
    id: "E17", titulo: "Subagentes", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "un subagente resuelve parte de la tarea en su propio contexto.", guion: "2.8", minutos: 3, zona: "subagentes", region: "centro", x: -2080, y: -1240, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "El agente lanza un subagente por el camino de puntos, con su propia ventana, vacía: no hereda la conversación.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "La ventana del subagente se llena y al final queda su resultado, una capa pequeña en rojo. Una flecha roja, por debajo de las dos ventanas, la lleva al final de la del agente, donde aparece la misma capa. Bajo la flecha: «El agente solo ve el resultado y mantiene limpio su contexto». A la vez que la flecha, sube el coste de cada uno (el del subagente, más).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Tipos de subagente: el agente, con el modelo del IDE, lanza tres subagentes, de menos a más complejo, cada uno con su modelo: Documentación (GPT-6 Luna), Research (SWE-2) y Análisis (GPT-6.1 Sol). Debajo, centrado: «El agente usa siempre el modelo que elegimos en el IDE; el subagente puede usar otros para optimizar tanto la efectividad como el coste».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "Cuándo sí, casi sin texto: el agente con su ventana y tres subagentes, cada uno con la suya; cada uno lee lo suyo y devuelve su resultado, en rojo, que es lo único que guarda el agente. «Partes independientes, cada una con su resultado».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 5, texto: "Cuándo no: el agente ya tiene mucho contexto y cada subagente lo vuelve a cargar entero para leer muy poco y devolver un resultado mínimo. «Cada subagente vuelve a cargar el contexto que el agente ya tenía: lo pagamos tres veces por un resultado mínimo».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 6, texto: "En vertical, dos etapas: dos subagentes editan el mismo archivo y aparece un conflicto; debajo, «Un worktree por subagente: pueden editar el mismo archivo», cada uno con su copia de `sesion.ts`. A la derecha: «Contexto separado no significa archivos aislados».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 7, texto: "Consejo, a la derecha, bajo la frase: «No por defecto: cuando separar aporte más que coordinar».", detalle: [], avanzado: false, detalleAvanzado: false, hub: "subagente", encuadre: null},
    ],
  },
  {
    id: "E18", titulo: "Plugins", bloque: "Parte 2 · Principales herramientas", bloqueCorto: "Parte 2", bloqueTitulo: "Principales herramientas", mensaje: "un plugin empaqueta todo lo anterior.", guion: "2.9", minutos: 1, zona: "hub", region: "centro", x: 0, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Las piezas del hub se envuelven en la caja de plugin y, a la derecha, entra toda la columna de una vez, grupo a grupo: lo que trae un plugin, en una cuadrícula de dos columnas y tres filas (Rules, Skills, Tools, Servidores MCP, Subagentes y Hooks); cómo lo marca la organización, en una fila y con el icono en color (obligatorio, opcional y prohibido), y «El departamento tiene:» un plugin (`ods-ds-mcp`), centrado, y debajo lo que incluye (MCPs, Skills, Tools y Rules), unido a él por flechas curvas que se trazan.", detalle: [], avanzado: false, detalleAvanzado: false, hub: "plugin", encuadre: null},
    ],
  },
  {
    id: "E20", titulo: "El coste total", bloque: "Parte 3 · Coste", bloqueCorto: "Parte 3", bloqueTitulo: "Coste", mensaje: "¿De qué depende el coste total?", guion: "3.2", minutos: 1, zona: "parte3", region: "parte3", x: 4960, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Arriba, el coste total (icono de dólar); debajo, una llave que abarca todo lo que lo forma, de izquierda a derecha: Tokens → Modelos → Coste por token → Coste en ACUs.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Debajo de cada pieza, un ejemplo: 50.000 tokens de salida consumidos, el modelo elegido (GPT-6.1 Sol), su precio por token de salida (10 $ por millón, el de E05) y lo que sale en ACUs: ≈ 0,60 $, que sube como un contador (0,50 $ en tokens). El ponente explica de palabra el +20 % (benchmark interno) y que no es una tarifa.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E21", titulo: "Los cuatro tipos", bloque: "Parte 3 · Coste", bloqueCorto: "Parte 3", bloqueTitulo: "Coste", mensaje: "no todos los tokens cuestan lo mismo.", guion: "3.3", minutos: 2, zona: "parte3", region: "parte3", x: 4960, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Los cuatro tipos, seguidos, en una sola animación, cada uno con su fila: input sin caché (capa sólida, sin corchete); cache write (el corchete se alarga sobre las capas); cache read (en la llamada siguiente, corchete continuo con ✓ sobre lo ya visto; barra de precio pequeña: «2,5–10 % del input»), y output («el más caro por token»).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E22", titulo: "La caché", bloque: "Parte 3 · Coste", bloqueCorto: "Parte 3", bloqueTitulo: "Coste", mensaje: "lo ya visto se relee barato, mientras la caché no caduque.", guion: "3.4", minutos: 1.5, zona: "parte3", region: "parte3", x: 4960, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Dos llamadas seguidas, una al lado de la otra: el principio es idéntico y el corchete lo cubre. Eso se relee de caché: toma su color y se encoge hasta su coste, un 10 % del input. Solo lo nuevo se paga completo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Un temporizador de cinco minutos («Anthropic ofrece por defecto 5 minutos de caché») se agota: el corchete pasa a discontinuo con ✕ y lo cacheado vuelve a su tamaño, porque todo se vuelve a escribir.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Nota: «Duración en Devin: pendiente de verificar».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E23", titulo: "Una conversación, paso a paso", bloque: "Parte 3 · Coste", bloqueCorto: "Parte 3", bloqueTitulo: "Coste", mensaje: "la caché ahorra mucho, y las pausas largas la desperdician.", guion: "3.5. Es la animación principal de la charla", minutos: 3.5, zona: "parte3", region: "parte3", x: 4960, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Situación inicial: 20.000 tokens fijos (AGENTS.md e instrucciones) en ambos lados.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Llamada 1: con caché cuesta un poco más (0,123 $ frente a 0,102 $, +21 %).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Llamadas 2 a 10 en reproducción continua: sin caché, cada llamada cuesta más; con caché, el coste por llamada apenas crece. Totales: 3,09 $ frente a 0,94 $, un −70 %.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "Variante pausa: el lado con caché rebobina, llamada a llamada (capas, corchete y desglose a la vez), hasta la 5. En la 6 la caché caduca: todo se vuelve a escribir (0,41 $, más que la misma llamada sin caché, 0,33 $). Total 1,26 $, un +34 %.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 5, texto: "Dos conclusiones, una a una, centradas en la columna derecha y con su número grande: «La caché es lo que más ahorra» (−70 % en 10 llamadas) y «Las pausas largas y los reinicios la desperdician» (una sola pausa: +34 %).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E24", titulo: "Definir la tarea", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", bloqueTitulo: "Buenas prácticas", mensaje: "una buena petición responde cinco preguntas.", guion: "4.1", minutos: 2.5, zona: "parte4", region: "parte4", x: 0, y: 3280, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Las cinco preguntas en lista.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "La petición inicial: «Arregla la paginación».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "La petición mejorada, en mono.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 4, texto: "La petición mejorada se subraya de un trazo rápido, en orden de lectura y fila a fila; cada fragmento, en el color de la pregunta que responde (sin números en el texto).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E25", titulo: "Contexto progresivo", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", bloqueTitulo: "Buenas prácticas", mensaje: "primero lo esencial, el resto accesible.", guion: "4.2", minutos: 1.5, zona: "parte4", region: "parte4", x: 0, y: 3280, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Lo primero: error exacto, pasos de reproducción y archivos relacionados.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "La hipótesis como sugerencia, no como orden (la cita del guion).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "Mil líneas de log se filtran hasta el fragmento relevante.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E26", titulo: "Planificar", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", bloqueTitulo: "Buenas prácticas", mensaje: "un plan solo cuando aporta.", guion: "4.3", minutos: 1.5, zona: "parte4", region: "parte4", x: 0, y: 3280, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Dos caminos: cambio pequeño → ejecutar; tarea amplia → modo planificación.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "La tarjeta del plan: qué cambiar, por qué, riesgos y cómo validarlo.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E27", titulo: "Intervenir", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", bloqueTitulo: "Buenas prácticas", mensaje: "corregir pronto y con datos concretos.", guion: "4.4", minutos: 1.5, zona: "parte4", region: "parte4", x: 0, y: 3280, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "El agente se desvía del camino; la corrección con información concreta lo devuelve (la cita).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Pausa de diagnóstico: la petición en mono.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E28", titulo: "Verificar", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", bloqueTitulo: "Buenas prácticas", mensaje: "una respuesta convincente no demuestra que funcione.", guion: "4.5", minutos: 1.5, zona: "parte4", region: "parte4", x: 0, y: 3280, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Rótulo: «Convincente ≠ funciona».", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Lista de comprobación: archivos cambiados, alcance y pruebas, más lo que no se ha podido comprobar.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 3, texto: "La petición de cierre.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E29", titulo: "Hábitos", bloque: "Parte 4 · Buenas prácticas", bloqueCorto: "Parte 4", bloqueTitulo: "Buenas prácticas", mensaje: "lo que gasta sin aportar.", guion: "4.6", minutos: 1, zona: "parte4", region: "parte4", x: 0, y: 3280, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Los cuatro hábitos genéricos con su alternativa.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Recordatorio de los hábitos propios de cada pieza, con líneas hacia sus zonas: effort (E08), contexto (E11) y subagentes (E17).", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E30", titulo: "Antes de pulsar Enter", bloque: "Cierre · Preguntas", bloqueCorto: "Cierre", bloqueTitulo: "Preguntas", mensaje: "cinco preguntas antes de empezar.", guion: "Cierre", minutos: 2, zona: "cierre", region: "cierre", x: -4960, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Las cinco preguntas entran en cascada, rápida y sin pausas (`--escalonado-filas`), cada una con la etiqueta de donde se explica: resultado → Buenas prácticas, configuración → Modelo, Effort y Modo, contexto → Contexto, herramientas → Tools y Skills, terminado → Verificar.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
      {n: 2, texto: "Mensaje final y logo de Openbank.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
  {
    id: "E31", titulo: "Preguntas", bloque: "Cierre · Preguntas", bloqueCorto: "Cierre", bloqueTitulo: "Preguntas", mensaje: "turno de preguntas.", guion: "", minutos: null, zona: "cierre", region: "cierre", x: -4960, y: 0, ancho: 1920, alto: 1080,
    pasos: [
      {n: 1, texto: "Una moneda en 3D con el signo «?» en relieve, en el centro, que gira despacio y sin parar sobre su eje vertical desde que llega, y el logo de Openbank.", detalle: [], avanzado: false, detalleAvanzado: false, hub: null, encuadre: null},
    ],
  },
];
