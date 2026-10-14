# Escenas de la presentación

> Versión 2 · 15 de octubre de 2026 · Basado en `Guion Devin.md` (v3).
> Este documento define **qué se ve y qué pasa en cada click**. El texto que dice el ponente está en el guion; aquí solo se referencia su sección.
> El aspecto y el movimiento salen siempre del design system (`design/`), según `CLAUDE.md`.

## Cómo leer este documento

- **Escena** (E01, E02…): una unidad de contenido con sus pasos. Se ve en una **pantalla** del mapa, de 1920×1080, que la cámara encuadra. Si un tema tiene varias escenas (Modelos, Contexto…), se suceden en la misma pantalla: el contenido cambia y la cámara no se mueve.
- **Paso**: cada número de la lista de pasos es un click de «avanzar». Al llegar a una pantalla, el primer paso empieza cuando la cámara se detiene y pasa `--pausa-tras-camara`.
- **[A] Avanzado**: paso de detalle, en la misma pantalla. Se puede saltar con una tecla según el público.
- **Componentes**: los del vocabulario visual del design system (ficha de token, capa, recipiente, corchete de caché, contador de coste, agente, subagente, documento, skill y herramienta). Los que faltan se listan al final.
- **Cifras ficticias**: toda escena con cifras de ejemplo lleva visible la etiqueta «Cifras ficticias».

---

## El mapa

### Idea

Una **cruz de cinco bloques** con Devin en el centro. Cada bloque es una parte de la charla:

- **Centro, Principales herramientas**: Devin (el *hub*) en medio de una cuadrícula de 3 × 3 pantallas, con un tema en cada una de las ocho de alrededor. Mientras se explica un tema, su pieza se coloca en el hub; al volver a Devin, ya la tiene. Al acabar la parte, el diagrama está completo.
- **Arriba, Primeros pasos.**
- **A la derecha, Coste**: empieza en el hub (el bucle relee el contexto) y continúa en su pantalla.
- **Abajo, Buenas prácticas**: un circuito con los pasos del método de trabajo.
- **A la izquierda, Preguntas**: el cierre y el turno de preguntas.

Los cuatro bloques de fuera son una sola pantalla cada uno: sus escenas se suceden en ella.

### Tapas

- En la apertura, cada bloque está cubierto por una **tapa** con su título, que es el de su parte en este documento. La del centro lleva además el logo de Devin, y la portada es esa tapa vista de cerca.
- La tapa de un bloque se levanta la primera vez que se entra en él: la cámara llega, pasa `--pausa-tras-camara`, la tapa desaparece y empieza el primer paso.
- En la vista general (tecla `O`), los bloques ya visitados se ven abiertos y los demás, tapados.

### Esquema

```
                         ┌────────────────────┐
                         │ PRIMEROS PASOS     │
                         │ E02 · E03          │
                         └────────────────────┘

             ┌────────────┬────────────┬────────────┐
             │ Subagentes │ Modelos    │ Effort     │
             │ E17        │ E05–E07    │ E08        │
┌─────────┐  ├────────────┼────────────┼────────────┤  ┌─────────┐
│PREGUNTAS│  │ MCP        │ DEVIN      │ Contexto   │  │ COSTE   │
│E30 · E31│  │ E16        │ E04 E14    │ E09–E11    │  │ E20–E23 │
└─────────┘  │            │ E18 E19    │            │  └─────────┘
             ├────────────┼────────────┼────────────┤
             │ Tools      │ Skills     │ Rules      │
             │ E15        │ E13        │ E12        │
             └────────────┴────────────┴────────────┘

                         ┌────────────────────┐
                         │ BUENAS PRÁCTICAS   │
                         │ E24–E29 · circuito │
                         └────────────────────┘
```

Alrededor de Devin, en el sentido de las agujas del reloj desde arriba: Modelos (N), Effort (NE), Contexto (E), Rules (SE), Skills (S), Tools propias (SO), MCP (O) y Subagentes (NO).

### Ruta de la cámara

Portada (Devin) → vista general → Primeros pasos → Devin → alrededor de Devin, en sentido horario, de Modelos a Skills → Devin (el bucle) → Tools propias, MCP y Subagentes → Devin (plugins y token) → Coste → Buenas prácticas → Preguntas.

- Entre escenas de una misma pantalla, la cámara no se mueve: el contenido cambia en su sitio.
- Entre pantallas de un mismo bloque (las del centro, siempre contiguas): `--dur-camara-corta`, en línea recta.
- Entre bloques: `--dur-camara`, con la trayectoria «alejar, viajar, acercar» de `d3.interpolateZoom`.
- Hacia y desde la vista general: `--dur-camara-larga`.

### El hub, estado a estado

Las piezas de los temas de alrededor se colocan sin animación al terminar su escena, porque el hub no está a la vista. Las de E14 y E18 entran animadas, con la cámara en Devin.

| Tras la escena | El hub muestra |
|---|---|
| E04 | La tarjeta del agente y huecos vacíos con la silueta de cada pieza. |
| E07 | + modelo. |
| E08 | + dial de effort, unido al modelo. |
| E11 | + recipiente de contexto. |
| E12 | + documento AGENTS.md al fondo del recipiente. |
| E13 | + tarjetas de skill plegadas. |
| E14 | + herramientas de serie y las flechas del bucle. Aquí se revela que «esto es un agente». |
| E15 | + herramientas propias del departamento. |
| E16 | + conector MCP hacia servidores (local y remoto). |
| E17 | + subagente con su propio recipiente. |
| E18 | Todo envuelto en la caja de plugin. |
| E19 | El bucle gira y el contador de llamadas sube: puente a la parte 3. |

### Restricciones para el esqueleto

- Cada pantalla se diseña para verse a **escala 1** (texto nítido, mínimo 24 px a 1920×1080).
- El hub completo debe leerse encuadrado entero: dimensionar sus piezas para que ningún texto baje de 24 px a esa escala.
- Las tapas se leen desde la vista general, a una escala de 1:8 aproximadamente: se dibujan ×8, y su título se ve allí como `--tipo-entradilla`.

---

## Apertura · ~2 min

### E01 · Portada y mapa

Guion: Apertura.

Mensaje: esto es lo que vamos a recorrer.

1. Portada: el logo de Devin, en grande, en el centro del mapa. Es la tapa del bloque central vista de cerca.
2. La cámara se aleja a la vista general: los cinco bloques, cada uno con su tapa y su título (Primeros pasos, Principales herramientas, Coste, Buenas prácticas y Preguntas).

---

## Parte 1 · Primeros pasos · ~8 min

### E02 · Local y Cloud · ~4 min

Guion: 1.1.

Mensaje: dónde se ejecuta decide qué podemos hacer.

1. Dos preguntas: «¿Dónde se ejecuta?» y «¿Desde dónde interactúo?».
2. Se separan dos islas: **Local** (icono `laptop`) y **Cloud** (icono `cloud`).
3. Local: aparecen tres ventajas como etiquetas: «Control de modelo y effort», «Acceso a lo local», «Revisión visual de cambios».
4. Cloud: una tarea se entrega y se ejecuta sola en remoto; después, la misma tarea se repite en bucle sobre un calendario (`calendar-clock`): «Automatizar flujos repetitivos».
5. Dentro de Local aparecen dos tarjetas: **Desktop** (IDE) y **CLI** (terminal).
6. Las tres opciones se conectan con una línea: «Pueden combinarse».

Componentes nuevos: isla, etiqueta de ventaja.

### E03 · Dónde está cada control · ~4 min

Guion: 1.2.

Mensaje: dónde se toca cada cosa; qué hace, después.

1. Captura de Devin Desktop a tamaño grande.
2. Se resalta el **cuadro de mensajes**.
3. Se resalta el **selector de modelo** → etiqueta «Parte 2 · Modelos».
4. Se resalta el **effort** → «Parte 2 · Effort».
5. Se resalta el **modo** → «Parte 4 · Planificar».
6. Se resalta el **indicador de contexto** → «Parte 2 · Contexto».
7. Se resalta el **consumo de la sesión** → «Parte 3 · Coste».
8. Mensaje final: «Antes de empezar: modelo, effort y modo».

Cada etiqueta lleva una línea de puntos que sale hacia la región del mapa donde se explica (se ve en el siguiente vuelo).

Pendiente: capturas reales de Desktop, con los controles y el consumo localizados.

---

## Parte 2 · Principales herramientas · ~25 min

### E04 · El agente, vacío · ~0,5 min

Guion: transición a la parte 2.

Mensaje: vamos a montar el agente pieza a pieza.

1. La tarjeta del agente, con los huecos vacíos de cada pieza.

### E05 · Modelos: niveles y generaciones · ~2 min

Guion: 2.1, hasta la tabla y las generaciones.

Mensaje: los niveles de OpenAI y Anthropic se corresponden, y la generación también cuenta.

1. Familias como píldoras: GPT (OpenAI), Claude (Anthropic), SWE (Cognition) y otras.
2. La tabla de niveles se construye fila a fila, de arriba abajo:

   | Nivel | OpenAI | Anthropic | Entrada / salida por 1M |
   |---|---|---|---|
   | Máximo | GPT-6 Astra | Fable 5.1 | 10 $ / 50 $ |
   | Alto | — | Opus 5.5 | 4 $ / 20 $ |
   | Medio | GPT-6 Sol · 6.1 Sol | Sonnet 5.5 | 2 $ / 10 $ |
   | Económico | GPT-6 Luna | Haiku 5.5 | 0,10 $ / 0,50 $ |

3. Generaciones: una línea de tiempo por familia (GPT-5.5 → 5.6 → 6 → 6.1; Claude 4.x → 5 → 5.5). «El nombre del nivel no basta: mira la generación.»
4. [A] «Sol cambió de nivel»: en GPT-5.6, Sol ≈ Opus y Terra ≈ Sonnet; en GPT-6 no hay Terra y Sol ≈ Sonnet.

Datos: `research_notes/Graficas y tools para el guion/modelos_y_coste_rendimiento.md`, §3.

Pendiente: confirmar Haiku 5.5 y SWE-2 en el selector de la cuenta.

### E06 · Modelos: coste y rendimiento · ~2 min

Guion: 2.1, «La relación entre rendimiento y coste».

Mensaje: arriba a la izquierda es mejor, y la generación pesa tanto como el nivel.

1. Ejes de la gráfica: coste por intento (escala logarítmica) y porcentaje de acierto. Nota de fuente visible: «Terminal-Bench 4.0 · Anthropic, 22-09-2026».
2. Las líneas se dibujan una a una: GPT-5.6 Sol, Opus 5, Fable 5.1, GPT-6 Astra y, la última y en acento, Opus 5.5.
3. Lectura 1: se resaltan Opus 5 en Max y Opus 5.5 en su esfuerzo por defecto. Flecha: «más acierto por ~1/5 del coste».
4. Lectura 3: dos puntos a la misma altura, uno de un modelo barato con más esfuerzo y otro de uno caro con menos.

La lectura 2 (rendimientos decrecientes del esfuerzo) se hace en E08, con esta misma gráfica en pequeño junto al dial.

Datos: redibujar desde `referencias/graficas/coste-rendimiento_anthropic-opus55-terminalbench4_2026-09.png`, con los valores aproximados leídos de la imagen. Es una referencia de potencia, no una medida exacta.

Componente nuevo: gráfica de líneas.

### E07 · Modelos: cómo elegir · ~1 min

Guion: 2.1, «Cómo elegir».

Mensaje: lo que importa es el coste de completar bien la tarea.

1. Tabla de tipo de tarea y estrategia inicial, con escalonado.
2. Dos contadores: un modelo barato que necesita tres intentos frente a uno bueno que acierta a la primera; el barato acaba costando más. Etiqueta «Cifras ficticias».

### E08 · Effort · ~2,5 min

Guion: 2.2.

Mensaje: subir el esfuerzo encarece más de lo que mejora.

1. Dial de effort con cinco posiciones: Low, Medium, High, XHigh, Max. Nota pequeña: «Depende del modelo: SWE-2 solo tiene tres niveles».
2. El dial gira de Low a Max: crecen las fichas de razonamiento (rayadas) y suben dos contadores, latencia y coste.
3. Junto al dial, la gráfica de E06 en pequeño. Se resaltan los puntos de una línea: de Low a Medium, salto grande; de XHigh a Max, casi nulo.
4. «El esfuerzo no sustituye al contexto». Una pieza de información falta y pensar más no la crea.
5. Tarjeta de consejo: «Empieza por un nivel medio; sube cuando lo justifique la tarea».

Componentes nuevos: dial de effort, tarjeta de consejo.

### E09 · Contexto: qué es · ~1,5 min

Guion: 2.3, definición y tres conceptos.

Mensaje: el contexto es todo lo que el modelo lee en cada llamada.

1. Aparece el recipiente vacío y entran capas, de abajo arriba: instrucciones, conversación, código leído, resultados de herramientas.
2. Capacidad: se resalta la escala completa del recipiente.
3. Utilizado: la línea de nivel en acento.
4. Relevante: solo algunas capas quedan resaltadas; el resto se atenúa.

### E10 · Contexto: degradación · ~2 min

Guion: 2.3, «Por qué no conviene llenarlo».

Mensaje: el modelo rinde peor con más contexto, y empieza a caer pronto.

1. Ejes: tokens de contexto (8K → 1M, logarítmica) y acierto (%). Fuente: «Context Arena · GDM-MRCR v2 · 14-10-2026».
2. Las líneas se dibujan: Claude Sonnet 5, Claude Opus 5 y GPT-5.6 Sol, con etiquetas en 8K, 128K y 512K.
3. Se sombrea la franja 64K–256K: «La caída empieza con una cuarta parte de la ventana o menos».
4. El remate, con cifras grandes: misma pregunta y mismo modelo. Con 300 tokens relevantes acierta el **92 %**; con 113.000 tokens de historial, el **38 %**. Fuente: «Chroma · Context Rot · 2025».
5. [A] Modelos actuales (GraphWalks, ficha de Gemini 4 Argon): Opus 5.5 pasa de 90,6 a 66,8 y GPT-6 Astra de 98,7 a 71,8.

Datos: `research_notes/Graficas y tools para el guion/degradacion_contexto.md`.

### E11 · Contexto: gestionar la sesión · ~1,5 min

Guion: 2.3, «Continuar, compactar o empezar de nuevo».

Mensaje: decidir con criterio cuándo seguir, compactar o empezar de cero.

1. Tres caminos desde una sesión: continuar, compactar y sesión nueva, cada uno con sus situaciones de la tabla.
2. Compactar: el recipiente lleno se comprime en una capa de resumen. Al lado aparece la lista de lo que hay que guardar (cinco puntos).
3. Consejos: «Una sesión por objetivo» y «No reinicies continuamente (y la caché… en la parte 3)».

Pendiente: comando `/compact` y limpiar contexto en Desktop.

### E12 · Rules y AGENTS.md · ~2 min

Guion: 2.4.

Mensaje: lo que va siempre debe ser breve y estable.

1. El documento AGENTS.md cae al fondo del recipiente: «Lo primero que entra».
2. Niveles: árbol del repositorio. El AGENTS.md de la raíz se carga al inicio; el de un subdirectorio aparece cuando el agente entra en esa carpeta.
3. Un AGENTS.md largo engorda la capa del fondo, y en cada llamada se relee: un contador hace tic en cada llamada.
4. Consejo: «Breve y estable; para lo largo, una skill». Una rule apunta a una skill.

Componente nuevo: árbol de repositorio.

### E13 · Skills · ~2 min

Guion: 2.5.

Mensaje: una skill solo ocupa contexto cuando se usa.

1. Varias skills plegadas: solo se ve su nombre y su descripción.
2. Llega una tarea que encaja con una: esa skill se despliega y su contenido entra en el recipiente. Las demás siguen plegadas.
3. Dos formas de activarla: `/nombre-de-la-skill` (nosotros) o el agente la elige por su descripción.
4. Cuándo crear una: tres ejemplos y su anatomía (cuándo se aplica, qué necesita, pasos, resultado).

### E14 · El bucle del agente · ~1,5 min · en el hub

Guion: 2.6, primeros párrafos.

Mensaje: las herramientas convierten un modelo en un agente.

1. Aparecen las herramientas de serie: `file-text` (leer), `pencil` (editar), `search` (buscar) y `terminal` (ejecutar).
2. El bucle da una vuelta lenta: el modelo decide, una herramienta pulsa y su resultado entra como ficha en el recipiente. Rótulo: «Esto es un agente».
3. El bucle da tres vueltas más rápidas y el recipiente crece. Esto prepara la parte 3.

### E15 · Herramientas del departamento · ~2,5 min

Guion: 2.6, desde «Cómo las usa el agente».

Mensaje: el agente decide por la descripción; una tool da manos, una skill da oficio.

1. Herramientas propias como círculos con su nombre en mono: documentación, incidencias, validación y revisión (provisionales).
2. Una herramienta se da la vuelta: el código queda oculto y se ve lo que el agente lee, que es nombre, descripción y parámetros. La descripción se resalta: «La descripción es el disparador».
3. [A] Los tres pasos en Local:
   - lista de servidores (poco contexto);
   - el agente pide las herramientas de uno y sus definiciones entran en el recipiente;
   - la llamada: solo entran argumentos y resultado, mientras código y credenciales se quedan tras un muro.
4. Comparación en dos columnas, «Manos» (tool) y «Oficio» (skill), con las filas de la tabla del guion apareciendo de dos en dos.
5. «No compiten»: una skill se acopla a una herramienta.
6. Nuestras herramientas: tabla con dónde está cada una, qué permisos necesita y quién la mantiene.
7. Consejos para quien las crea (tres).

Pendiente: herramientas reales del departamento.

Componente nuevo: tarjeta de definición de herramienta (nombre, descripción, parámetros).

### E16 · MCP · ~1 min

Guion: 2.7.

Mensaje: MCP es el enchufe para nuestras herramientas.

1. Conector MCP del hub hacia dos servidores: uno local (`laptop`) y uno remoto (`cloud`).
2. Cómo se añaden: `devin mcp add` (fichero local o de proyecto) y Cloud → Customize → MCPs.
3. Candado: «Credenciales nunca en el repositorio».

Componentes nuevos: conector MCP, candado.

### E17 · Subagentes · ~2,5 min

Guion: 2.8.

Mensaje: contexto separado, coste propio.

1. El agente lanza un subagente por el camino de puntos, con su propio recipiente vacío: no hereda la conversación.
2. El recipiente del subagente se llena mientras el del agente apenas crece. Vuelve una ficha «↩ resumen + evidencias».
3. El subagente tiene su propio contador de coste. Nota: «General: hereda el modelo; exploración: otro».
4. Cuándo compensan: lista de sí y lista de no.
5. El encargo de ejemplo, en una tarjeta en mono.
6. Dos subagentes editan el mismo archivo y aparece un conflicto. Solución: repartir archivos.
7. Consejo: «No por defecto: cuando separar aporte más que coordinar».

### E18 · Plugins · ~1 min · en el hub

Guion: 2.9.

Mensaje: un plugin empaqueta todo lo anterior.

1. Las piezas del hub (skills, AGENTS.md, conector MCP y subagente) se envuelven en la caja de plugin. [A] Etiqueta de hooks.
2. Etiquetas de la organización: obligatorio, recomendado y prohibido.
3. El patrón del departamento: MCP + skills + AGENTS.md mínimo. Rótulo de transición: «Ya conocemos las piezas. ¿Cuánto cuesta usarlas?».

Componente nuevo: caja de plugin.

---

## Parte 3 · Coste · ~10 min

### E19 · Qué es un token · ~1,5 min · en el hub

Guion: 3.1.

Mensaje: en cada llamada el modelo relee todo el contexto.

1. La frase «Arregla la paginación» se parte en fichas de token.
2. El bucle del agente gira y en cada vuelta una línea recorre todo el recipiente («se relee»). Un contador de llamadas sube: 1, 2, 3…

### E20 · Qué pagamos · ~1 min

Guion: 3.2.

Mensaje: ACUs ≈ coste en tokens + 20 %.

1. Fichas → «coste en tokens» → ×1,2 → «ACUs».
2. Etiqueta bien visible: «Benchmark interno · pocas tareas · aproximación».

### E21 · Los cuatro tipos · ~2 min

Guion: 3.3.

Mensaje: no todos los tokens cuestan lo mismo.

1. **Input sin caché**: capa sólida, sin corchete.
2. **Cache write**: el corchete se alarga sobre una capa nueva.
3. **Cache read**: corchete continuo con ✓ sobre las capas ya vistas. Barra de precio pequeña: «2,5–10 % del input».
4. **Output**: fichas huecas, y rayadas para el razonamiento: «el más caro por token».
5. [A] Tabla de tarifas reales de los modelos de la cuenta.

Pendiente: tarifas reales.

### E22 · La caché · ~1,5 min

Guion: 3.4.

Mensaje: lo ya visto se relee barato, mientras la caché no caduque.

1. Dos llamadas seguidas, una al lado de la otra: el principio es idéntico y el corchete lo cubre. Solo lo nuevo se paga completo.
2. Un temporizador de cinco minutos se agota: el corchete pasa a discontinuo con ✕ y todo se vuelve a escribir.
3. Nota: «Duración en Devin: pendiente de verificar».

### E23 · Una conversación, paso a paso · ~4 min

Guion: 3.5. Es la animación principal de la charla.

Mensaje: la caché ahorra mucho, y las pausas largas la desperdician.

Diseño: dos recipientes lado a lado, «Sin caché» y «Con caché». Bajo cada uno, cuatro contadores (input sin caché, cache write, cache read y output) y un total. Encima, una gráfica pequeña del coste acumulado de los dos lados. Etiqueta «Cifras ficticias».

1. Situación inicial: 20.000 tokens fijos (AGENTS.md e instrucciones) en ambos lados.
2. Llamada 1: con caché cuesta un poco más (0,070 frente a 0,058).
3. Llamadas 2 a 12 en reproducción continua: sin caché, cada llamada cuesta más; con caché, el coste por llamada apenas crece. Totales: **1,36 frente a 0,43, un −69 %**.
4. Variante pausa: el lado con caché rebobina a la llamada 6. En la 7 la caché caduca y la llamada cuesta 0,145. Total **0,54, un +27 %**.
5. Variante compactación: tras la llamada 8 el recipiente se comprime; las llamadas siguientes son más baratas, pero la compactación también cuesta. Total 0,445: en una sesión corta no ahorra. [A] En 30 llamadas, un −12 %.
6. Tres conclusiones, una a una: «La caché es lo que más ahorra», «Las pausas largas y los reinicios la desperdician» y «Compactar es sobre todo calidad».

Datos: guion, Anexo A, con los valores por llamada.

---

## Parte 4 · Buenas prácticas · ~9,5 min

La pantalla es un circuito fijo. Cada escena es una parada del método: al pasar de una a otra, un punto recorre el circuito hasta la parada siguiente y su contenido sustituye al de la anterior, sin mover la cámara.

### E24 · Definir la tarea · ~2,5 min

Guion: 4.1.

Mensaje: una buena petición responde cinco preguntas.

1. Las cinco preguntas en lista.
2. La petición inicial: «Arregla la paginación».
3. La petición mejorada, en mono.
4. Cada fragmento de la petición mejorada se subraya con el número de la pregunta que responde (1 a 5).

### E25 · Contexto progresivo · ~1,5 min

Guion: 4.2.

Mensaje: primero lo esencial, el resto accesible.

1. Lo primero: error exacto, pasos de reproducción y archivos relacionados.
2. La hipótesis como sugerencia, no como orden (la cita del guion).
3. Mil líneas de log se filtran hasta el fragmento relevante.

### E26 · Planificar · ~1,5 min

Guion: 4.3.

Mensaje: un plan solo cuando aporta.

1. Dos caminos: cambio pequeño → ejecutar; tarea amplia → modo planificación.
2. La tarjeta del plan: qué cambiar, por qué, riesgos y cómo validarlo.

### E27 · Intervenir · ~1,5 min

Guion: 4.4.

Mensaje: corregir pronto y con datos concretos.

1. El agente se desvía del camino; la corrección con información concreta lo devuelve (la cita).
2. Pausa de diagnóstico: la petición en mono.

### E28 · Verificar · ~1,5 min

Guion: 4.5.

Mensaje: una respuesta convincente no demuestra que funcione.

1. Rótulo: «Convincente ≠ funciona».
2. Lista de comprobación: archivos cambiados, alcance y pruebas, más lo que no se ha podido comprobar.
3. La petición de cierre.

### E29 · Hábitos · ~1 min

Guion: 4.6.

Mensaje: lo que gasta sin aportar.

1. Los cuatro hábitos genéricos con su alternativa.
2. Recordatorio de los hábitos propios de cada pieza, con líneas hacia sus zonas: effort (E08), contexto (E11) y subagentes (E17).

---

## Cierre · Preguntas · ~2 min

Una sola pantalla: el cierre y, en su sitio, el turno de preguntas.

### E30 · Antes de pulsar Enter · ~2 min

Guion: Cierre.

Mensaje: cinco preguntas antes de empezar.

1. Las cinco preguntas aparecen una a una, cada una con la etiqueta del bloque donde se explica: resultado → Buenas prácticas, configuración → Primeros pasos y Principales herramientas, contexto → Contexto, herramientas → Tools y plugins, terminado → Verificar.
2. Mensaje final y logo de Openbank.

### E31 · Preguntas

Mensaje: turno de preguntas.

1. Rótulo «¿Preguntas?», con el título de la charla, «Devin en el día a día», y el logo de Openbank.

### E32 · Caso práctico (pendiente de decidir)

Si se incluye, sería un recorrido de unos 5 minutos por el mapa: el bug de paginación pasa por cada bloque con la decisión que toca en cada uno.

---

## Resumen de tiempos

| Bloque | Escenas | Pasos | Tiempo |
|---|---|---:|---:|
| Apertura | E01 | 2 | ~2 min |
| Parte 1 · Primeros pasos | E02–E03 | 14 | ~8 min |
| Parte 2 · Principales herramientas | E04–E18 | 59 | ~25 min |
| Parte 3 · Coste | E19–E23 | 18 | ~10 min |
| Parte 4 · Buenas prácticas | E24–E29 | 16 | ~9,5 min |
| Cierre · Preguntas | E30–E31 | 3 | ~2 min + preguntas |
| **Total** | **31** | **112** | **~57 min + preguntas** |

Lo marcado con [A] se puede saltar: cuatro pasos completos (E05, E10, E15 y E21) y dos detalles dentro de otros pasos (E18 y E23). Saltarlo todo ahorra unos 3 minutos.

## Componentes que faltan en el vocabulario

Siguiendo la regla «cada concepto, un único dibujo», hay que diseñarlos una vez en `design/componentes.css` y documentarlos en `design/design-system.html`:

- Isla y etiqueta de ventaja (E02).
- Captura con resaltado de un control (E03).
- Gráfica de líneas con fuente visible (E06, E08, E10, E23).
- Dial de effort (E08).
- Tarjeta de consejo (E08, E11, E12, E15, E17).
- Árbol de repositorio (E12).
- Tarjeta de definición de herramienta (E15).
- Conector MCP y candado (E16).
- Caja de plugin (E18).
- Temporizador (E22).
- Circuito con punto que lo recorre (Parte 4).

## Pendientes de contenido

- [ ] Capturas reales de Devin Desktop con los controles, el consumo y el indicador de contexto (E03).
- [ ] Haiku 5.5 y SWE-2 en el selector de la cuenta (E05).
- [ ] Comando `/compact` y limpiar contexto en Desktop (E11).
- [ ] Herramientas reales del departamento (E15).
- [ ] Tarifas reales de los modelos de la cuenta (E21).
- [ ] Duración de la caché en Devin (E22).
- [ ] Decidir el caso práctico (E32).
