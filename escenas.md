# Escenas de la presentación

> Versión 2 · 15 de octubre de 2026 · Basado en `Guion Devin.md` (v3).
> Este documento define **qué se ve y qué pasa en cada click**. El texto que dice el ponente está en el guion; aquí solo se referencia su sección.
> El aspecto y el movimiento salen siempre del design system (`design/`), según `CLAUDE.md`.

## Cómo leer este documento

- **Escena** (E01, E02…): una unidad de contenido con sus pasos. Se ve en una **pantalla** del mapa, de 1920×1080, que la cámara encuadra. Si un tema tiene varias escenas (Modelos, Contexto…), se suceden en la misma pantalla: el contenido cambia y la cámara no se mueve.
- **Paso**: cada número de la lista de pasos es un click de «avanzar». Al llegar a una pantalla, el primer paso empieza cuando la cámara se detiene y pasa `--pausa-tras-camara`.
- **[A] Avanzado**: paso de detalle, en la misma pantalla. Se puede saltar con una tecla según el público.
- **Componentes**: los del vocabulario visual del design system (ficha de token, capa, ventana de contexto, corchete de caché, contador de coste, agente, subagente, documento, skill y herramienta). Los que faltan se listan al final.
- **Cifras ficticias**: las cifras de ejemplo no se rotulan; se da por hecho que lo son y la etiqueta solo distrae. Los costes de ejemplo van en ACUs, la unidad de consumo de Devin (nunca en una unidad sin explicar).

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

- En la apertura, cada bloque está cubierto por una **tapa** con el icono de su zona y su título, que es el de su parte en este documento. La del centro lleva el logo de Devin y, debajo, «Devin» y, discretos, el resto del título de la charla y el logo de Openbank; la portada encuadra ese conjunto, y el logo y el nombre se ven grandes también desde la vista general. Al entrar en un bloque, su icono y su título se funden antes que la tapa, para no cruzar el título de la escena.
- La tapa de un bloque se levanta la primera vez que se entra en él: se funde mientras la cámara se acerca (en la segunda mitad del vuelo, con su curva), la cámara llega, pasa `--pausa-tras-camara` y empieza el primer paso.
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
└─────────┘  │            │ E18        │            │  └─────────┘
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

Portada (Devin) → vista general → Primeros pasos → Devin → alrededor de Devin, en sentido horario, de Modelos a Skills → Devin (el bucle) → Tools propias, MCP y Subagentes → Devin (plugins) → Coste → Buenas prácticas → Preguntas.

- Entre escenas de una misma pantalla, la cámara no se mueve: el contenido cambia en su sitio.
- Entre pantallas de un mismo bloque (las del centro, siempre contiguas): `--dur-camara-corta`, en línea recta.
- Entre bloques: `--dur-camara`, con la trayectoria «alejar, viajar, acercar» de `d3.interpolateZoom`.
- Hacia y desde la vista general: `--dur-camara-larga`.

### El hub, estado a estado

Disposición: centrado en su pantalla (y así, en el centro del bloque y bajo el logo de la tapa del centro), Devin en un círculo oscuro (sin «Agente»), con sus cuatro herramientas de serie pegadas a él, sobre el bucle. Alrededor, un anillo simétrico con las ocho piezas, todas círculos iguales con su icono y su nombre, cada una en la dirección de su pantalla (Modelo arriba, Effort arriba a la derecha, Contexto a la derecha…). En E14 y E18, el diagrama pasa a la mitad izquierda y a la derecha queda el panel de la escena, con su cabecera y su contenido; cambia de sitio sin animación, con la cámara en otra pantalla, así que no se ve moverse.

Contexto es un círculo como las demás; cuando una escena del hub anima el contexto (E14, paso 2), el círculo se transforma en la ventana de contexto, con una capa por cada pieza que deja algo en ella (instrucciones, rules, descripciones de skills y definiciones de herramientas): todo acaba en el contexto. Después vuelve a ser círculo.

Las piezas de los temas de alrededor se colocan sin animación al terminar su escena, porque el hub no está a la vista. Las de E14 y E18 entran animadas, con la cámara en Devin, antes que el paso.

| Tras la escena | El hub muestra |
|---|---|
| E04 | Devin y, alrededor, los huecos vacíos de cada pieza: círculos punteados. |
| E07 | + modelo. |
| E08 | + effort. |
| E11 | + contexto. |
| E12 | + rules (la pieza se llama «Rules»: es el concepto canónico; E12 explica que AGENTS.md comparte sus características). |
| E13 | + skills. |
| E14 | + herramientas de serie y las flechas del bucle. Contexto se transforma en la ventana y se llena. Aquí se revela que «esto es un agente». |
| E15 | + tools propias del departamento. |
| E16 | + MCP. |
| E17 | + subagente. |
| E18 | Todo envuelto en la caja de plugin. |

### Restricciones para el esqueleto

- Cada pantalla se diseña para verse a **escala 1** (texto nítido, mínimo 24 px a 1920×1080).
- El hub completo debe leerse encuadrado entero: dimensionar sus piezas para que ningún texto baje de 24 px a esa escala.
- Las tapas se leen desde la vista general, a una escala de 1:8 aproximadamente: se dibujan ×8, y su título se ve allí como `--tipo-entradilla`.

---

## Apertura · ~2 min

### E01 · Portada y mapa

Guion: Apertura.

Mensaje: esto es lo que vamos a recorrer.

1. Portada: el logo de Devin y, debajo, «Devin», en grande, en el centro del mapa; pegado al nombre y discreto, el resto del título de la charla («en el día a día: cómo aprovecharlo mejor y controlar el consumo») y, debajo, el logo de Openbank. Es la tapa del bloque central vista de cerca.
2. La cámara se aleja a la vista general: los cinco bloques, cada uno con su tapa. En la del centro siguen el logo, «Devin» y su pie; en las de fuera, al principio solo su icono (Primeros pasos `footprints`, Coste `coins`, Buenas prácticas `route` y Preguntas `message-circle-question`). Cuando la cámara llega, cada icono sube y aparece su título debajo.

---

## Parte 1 · Primeros pasos · ~8 min

### E02 · Devin Desktop, CLI y Cloud · ~4 min

Guion: 1.1.

Mensaje: dónde se ejecuta decide qué podemos hacer.

1. Dos preguntas, centradas juntas: «¿Dónde voy a ejecutar Devin?» y «¿Cómo interactúo con él?»; en la misma animación, debajo, dos islas: **Local** (icono `laptop`) y **Cloud** (icono `cloud`). Primero se explica Local entero; después, Cloud.
2. Local: aparecen tres ventajas: «Control de modelo y effort», «Acceso a lo local», «Revisión visual de cambios».
3. Dentro de Local aparecen sus dos interfaces: **Desktop** (IDE) y **CLI** (terminal), separadas de las ventajas por una línea vertical fina.
4. Cloud, en cascada y sin pausas (cada uno empieza un poco antes de que acabe el anterior): una tarea se entrega y se ejecuta sola en remoto; la misma tarea se repite cada semana (`calendar-clock`, con una flecha que gira sin parar); y su ventaja: «Trabajar con múltiples repositorios».
5. Las tres opciones se conectan con una línea: «Pueden combinarse».

Componentes nuevos: isla, viñeta, repetición.

Diseño: arriba, las dos preguntas, centradas juntas; debajo, dos islas: Local (a la izquierda las ventajas; a la derecha, Desktop y CLI; entre las dos columnas, una línea vertical fina en `--color-separador`, tan alta como la columna más alta) y Cloud (la tarea que se entrega, la tarea de cada semana y la ventaja, centradas en su isla). Las viñetas van sin caja, con su icono centrado en la altura de su texto, y cada columna se centra en el alto de su isla. Al final, un cable une Desktop, CLI y la tarea de Cloud, y «Pueden combinarse» aparece centrada bajo Desktop y CLI.

### E03 · Dónde está cada control · ~4 min

Guion: 1.2.

Mensaje: dónde encontrar cada una de las opciones.

1. Captura de Devin Desktop, entera.
2. La captura se amplía hasta el panel de la sesión y se resalta el **cuadro de mensajes**.
3. Se abre el selector de modelo y se resalta → etiqueta «Modelo».
4. En la ficha del modelo, se resalta el **effort** («Higher effort consumes more tokens») → «Effort».
5. Se abre el selector de **modo** (Code, Smart, Ask, Plan, Bypass Permissions) → «Modo».
6. Al pasar por el **indicador de contexto** sale su aviso (contexto usado y caché) → «Contexto».
7. Mensaje final: «Antes de empezar», centrado sobre modelo, effort y modo, cada uno con su icono.

El consumo de la sesión queda fuera: depende de la organización.

Capturas: grabación de Devin Desktop del 15-10-2026, con una cuenta Free (el effort se ve en la ficha del modelo, pero no se puede elegir).

Diseño: la captura a la izquierda, primero entera y después ampliada en el panel de la sesión; cada paso cambia su estado (un desplegable abierto, el aviso del contexto). A la derecha, las etiquetas, una por paso, en columna. Una guía en rojo, en codo y con las esquinas redondeadas, une el resaltado del paso (el único a la vista) con su etiqueta. Al cambiar de paso, el resaltado y su guía se van juntos antes de que entre el siguiente; el estado, el resaltado, la guía (`--dur-trazado-serie`) y la etiqueta entran encadenados, cada uno un poco antes de que acabe el anterior (`--escalonado-solape`). Las capturas van retocadas (grises medios más claros y algo de enfoque) para que se lean nítidas.

---

## Parte 2 · Principales herramientas · ~27 min

### E04 · El agente, vacío · ~0,5 min

Guion: transición a la parte 2.

Mensaje: vamos a montar el agente pieza a pieza.

1. En una animación rápida y seguida aparecen Devin, en su círculo, sus herramientas de serie y, después, los huecos vacíos de cada pieza, en el orden de la ruta.

Diseño: solo el diagrama, centrado en la pantalla, sin cabecera ni panel: Devin en el centro, sus herramientas de serie pegadas a él y las ocho piezas en un anillo, todas círculos punteados iguales. El logo de la tapa del centro y su nombre, centrados en la tapa, están justo encima del diagrama, centrado en su pantalla: al llegar desde E03, la tapa se funde mientras la cámara se acerca y Devin aparece en su lugar («su núcleo es esto»).

### E05 · Modelos: niveles y generaciones · ~2 min

Guion: 2.1, hasta la tabla y las generaciones.

Mensaje: la efectividad de un LLM depende de: **Modelo**, **Generación** y **Effort**.

Diseño: primero, las tres familias principales, solo con su logo y su nombre (GPT, Claude, SWE), grandes y en el centro; después, en fila bajo el título, sin píldora, con las demás. A la izquierda, la tabla de niveles con su fuente y, a su derecha, los saltos de precio; a la derecha, las generaciones de cada familia (la actual, destacada), con su cabecera a la altura de la de la tabla.

1. Las tres familias principales, con su logo, grandes y centradas: GPT (OpenAI), Claude (Anthropic) y SWE (Cognition, con el logo de Devin).
2. En una sola animación, encadenada y al mismo ritmo (cada parte empieza un poco antes de que acabe la anterior): las familias se colocan despacio bajo el título (`--dur-desplazar`) y aparece «y otros: Gemini, Kimi, GLM…»; la tabla de niveles se construye fila a fila, de arriba abajo, con su fuente; y, a su derecha, un arco por salto de nivel, de abajo arriba, cada uno con su cifra pegada a él, a la altura de la línea que separa los dos niveles: de Económico a Medio, ×20; de Medio a Alto, ×2; de Alto a Máximo, ×2,5.

   | Nivel | OpenAI | Anthropic | Entrada / salida por 1M |
   |---|---|---|---|
   | Máximo | GPT-6 Astra | Fable 5.1 | 10 $ / 50 $ |
   | Alto | — | Opus 5.5 | 4 $ / 20 $ |
   | Medio | GPT-6 Sol · 6.1 Sol | Sonnet 5.5 | 2 $ / 10 $ |
   | Económico | GPT-6 Luna | Haiku 5.5 | 0,10 $ / 0,50 $ |

3. Desde el económico a todos los demás, arcos cada vez más abiertos: ×20 (Medio), ×40 (Alto) y ×100 (Máximo, en acento: un modelo SOTA frente al más económico), con sus cifras en una columna, cada una en la fila a la que llega. Los otros dos saltos se van.
4. Generaciones: una línea de tiempo por familia (GPT-5.5 → 5.6 → 6 → 6.1; Claude 4.x → 5 → 5.5). «El nombre del nivel no basta: mira la generación.»

Datos: `research_notes/Graficas y tools para el guion/modelos_y_coste_rendimiento.md`, §3.

### E06 · Modelos: coste y rendimiento · ~2 min

Guion: 2.1, «La relación entre rendimiento y coste».

Mensaje: arriba a la izquierda es mejor, y la generación pesa tanto como el nivel.

1. Ejes de la gráfica: coste por intento (escala logarítmica) y efectividad (%). Nota de fuente visible: «Terminal-Bench 4.0 · Anthropic, 22-09-2026». Enseguida, en la misma animación, las líneas se dibujan seguidas y rápidas: GPT-5.6 Sol, Opus 5, Fable 5.1 y GPT-6 Astra. Después, sola y en acento, Opus 5.5: según la línea llega a cada punto, aparece el nombre de su nivel de esfuerzo (Low, Medium, High, XHigh, Max), para que se lea que cada punto es un esfuerzo mayor.
2. Lectura 1: se resaltan Opus 5 en Max y Opus 5.5 en su esfuerzo por defecto (Medium); las demás líneas se atenúan mucho (`--opacidad-atenuado-serie`), para que la comparación se lea sola. Flecha: «más efectividad por ~1/5 del coste».
3. Lectura 3: dos puntos a la misma altura, uno de un modelo barato con más esfuerzo y otro de uno caro con menos: Opus 5 en XHigh (50,6 %) y GPT-6 Astra en Low (49,7 %), unidos por una guía discontinua. La lectura añade el precio de igualarlo: «aunque pagando ~×2,7 por intento» (13,48 $ frente a 4,95 $). Opus 5.5 se atenúa y GPT-6 Astra se aviva: solo se ven bien los dos que se comparan.

Diseño: la gráfica a la izquierda y, a la derecha, centrada en la altura de la gráfica y con el texto justificado, la lectura de cada paso (arriba a la izquierda es mejor · la generación pesa · no hay un modelo «mejor»). En la lectura 1 se atenúan todas las líneas salvo Opus 5 y Opus 5.5.

Transiciones de los pasos 2 y 3: lo resaltado antes (anillos, notas, flecha) y su lectura se van rápido y a la vez; después, a la vez, la lectura nueva, las líneas que se atenúan o se avivan y los anillos nuevos; la flecha, al final.

La lectura 2 (rendimientos decrecientes del esfuerzo) se hace en E08, con esta misma gráfica en pequeño junto al dial.

Datos: redibujar desde `referencias/graficas/coste-rendimiento_anthropic-opus55-terminalbench4_2026-09.png`, con los valores aproximados leídos de la imagen. Es una referencia de potencia, no una medida exacta.

Componente nuevo: gráfica de líneas.

### E07 · Modelos: cómo elegir · ~1 min

Guion: 2.1, «Cómo elegir».

Mensaje: lo que importa es el coste de completar bien la tarea.

Diseño: la tabla a todo el ancho y, debajo, una fila por modelo con sus intentos (✕ o ✓ y su coste) y el total, en ACUs (la unidad, solo en el total). Sin la etiqueta «Cifras ficticias»: se da por hecho y distrae.

1. Tabla de tipo de tarea, estrategia inicial y modelo recomendado, con escalonado. Primero las tareas sencillas (localizar o explicar, cambio pequeño, trabajo repetitivo), con GPT-6 Luna; después, las complejas (diagnóstico, revisión de un cambio importante), con GPT-6.1 Sol / SWE-2 mientras esté en promoción. El modelo va una sola vez por grupo, centrado en la altura de sus tareas.
2. Dos contadores: un modelo barato que necesita tres intentos (0,40 cada uno: 1,20) frente a uno bueno que acierta a la primera (0,90); el barato acaba costando más.

### E08 · Effort · ~2,5 min

Guion: 2.2.

Mensaje: el effort regula cuánto «piensa» el modelo antes de responder.

Diseño: tres columnas, de dos en dos. Primero, a la izquierda, el dial y, centrados debajo, lo que crece al subirlo (latencia en segundos y coste en ACUs; cifras ficticias, sin rótulo) y, a la derecha, la gráfica de E06 en pequeño. Después, las columnas se desplazan un sitio a la izquierda: el dial sale por la izquierda, la gráfica ocupa su sitio y la tercera columna entra entera por la derecha.

1. Dial de effort con cinco posiciones: Low, Medium, High, XHigh, Max.
2. El dial gira de Low a Max y suben dos contadores, latencia y coste.
3. Junto al dial, la gráfica de E06 en pequeño, con las demás líneas atenuadas. Se resaltan los puntos de Opus 5.5: de Low a Medium, +19 puntos; de XHigh a Max, −2.
4. Las columnas se desplazan. La tercera: «El esfuerzo no sustituye al contexto» · «Dar al agente el contexto adecuado es la mejor manera de aumentar su eficacia» · tarjeta de consejo: «Empieza por un nivel medio; sube cuando lo justifique la tarea».

Componentes nuevos: dial de effort, tarjeta de consejo.

### E09 · Contexto: qué es · ~1,5 min

Guion: 2.3, definición y tres conceptos.

Mensaje: el contexto es todo lo que el modelo lee en cada llamada.

Diseño: una fila por concepto, cada una con su ventana de contexto horizontal a todo el ancho. Cifras ficticias, sin rótulo.

1. Capacidad: tres ventanas superpuestas, de 256K, 512K y 1M tokens, cada una en un tono (más oscuro cuanto más pequeña: superficie, superficie 2 y superficie 3). La capacidad depende del modelo.
2. Utilizado: una ventana de 256K se llena de izquierda a derecha con lo que lee el modelo: instrucciones, reglas, conversación, código leído y resultados de herramientas. La línea de nivel, en acento, marca el 65 %.
3. Relevante: el mismo relleno se atenúa salvo un trozo del código leído, «Contexto útil».

### E10 · Contexto: degradación · ~2 min

Guion: 2.3, «Por qué no conviene llenarlo».

Mensaje: cuanto más contexto, peor rendimiento ofrece el modelo.

Diseño: a la izquierda, la gráfica; a la derecha, una tabla con los mismos datos, con su título centrado sobre ella. Cada modelo, con su color.

1. Ejes: tokens de contexto (8K → 1M, logarítmica) y acierto (%). Fuente: «Context Arena · GDM-MRCR v2 · 14-10-2026». Enseguida, en la misma animación, las tres líneas se dibujan a la vez: GPT-5.6 Sol, Claude Opus 5 y Claude Sonnet 5. Al acabar, sin otro clic, se sombrean las franjas, una tras otra: 64K–256K, «Inicio de degradación», y 256K–512K, más oscura y rojiza, «Degradación alta».
2. La tabla «Acierto según la ventana usada»: cada modelo con la ventana casi vacía (8K), al 25 % (256K) y al 50 % (512K). Las tres ventanas son de 1M. Las columnas del 25 % y del 50 % llevan el tono de su franja.

Datos: `research_notes/Graficas y tools para el guion/degradacion_contexto.md` (4-A). Ventanas: `max_context_length` de Context Arena.

Solo en el guion, sin apoyo en pantalla: el remate de Chroma (92 % frente a 38 %) y los datos de GraphWalks de la generación actual.

### E11 · Contexto: gestionar la sesión · ~1,5 min

Guion: 2.3, «Continuar, compactar o empezar de nuevo».

Mensaje: cómo podemos gestionar mejor el contexto.

Diseño: arriba, los tres caminos en columnas, que aparecen uno a uno (el anterior se atenúa); debajo, centrada en el espacio libre, la ventana de la sesión, que muestra cada camino. La línea de nivel va pegada al borde de lo ocupado mientras crece o se recoge, y su cifra cambia a la vez. Cifras ficticias, sin rótulo.

1. Continuar, con sus situaciones. La ventana ya está cargada (68 %): aunque el contexto sea amplio, si es necesario y relevante se puede seguir, y lo ocupado crece un poco más (75 %).
2. Compactar (continuar se atenúa): la conversación y lo explorado se recogen, suave, hasta el resumen de la sesión (12 %).
3. Sesión nueva (compactar se atenúa): sin que la ventana se vaya, lo que queda tras compactar se recoge hasta dejar solo un pequeño trozo, el system prompt (5 %).
4. A la derecha, lo que hay que guardar antes de compactar o cambiar de sesión (cinco puntos, cada check a la altura de la primera línea de su texto); compactar se aviva.

Pendiente: comando `/compact` y limpiar contexto en Desktop.

### E12 · Rules y AGENTS.md · ~2 min

Guion: 2.4.

Mensaje: normas fijas que debe cumplir el agente.

1. «Se incluyen automáticamente en todos los prompts», sobre la ventana vacía.
2. Solo esto: el documento AGENTS.md entra en la ventana y ocupa su principio.
3. Niveles: árbol del repositorio. Las rules (`.devin/rules/rule-1.md`, `rule-2.md`) y el AGENTS.md de la raíz se cargan al inicio; el de un subdirectorio aparece cuando el agente entra en esa carpeta, `api/`, resaltada (el acento del paso).
4. «Las rules y AGENTS.md se releen en cada llamada: 24.000 tokens × 3 llamadas»: si son largos, engordan la capa del fondo; un contador hace tic en cada llamada, hasta 72.000.
5. Consejo: «Deben ser breves y claras. Si necesitas dar una serie de instrucciones → crea una skill».

Componente nuevo: árbol de repositorio.

Diseño: arriba, «Se incluyen automáticamente en todos los prompts» y la ventana a todo el ancho; el documento cae sobre su principio y se convierte en su primera capa. Debajo, a la izquierda, el árbol del repositorio; a la derecha, los contadores (llamadas y tokens releídos) y el consejo. Cifras ficticias, sin rótulo.

### E13 · Skills · ~2 min

Guion: 2.5.

Mensaje: instrucciones sobre cómo realizar una tarea.

1. Una skill plegada, `validar-migracion` (solo se ve su nombre y su descripción) y, a su lado, las dos formas de activarla: `/validar-migracion` (nosotros) o el agente la elige por su descripción. Las dos, centradas juntas.
2. Encadenado: la skill y cómo se activa se corren a la izquierda y, a su derecha, llega una tarea que encaja; su contenido entra en la ventana. La tarjeta no se despliega: sigue mostrando solo nombre y descripción.
3. «Cuándo crear una», a la izquierda, y debajo «Procedimientos propios repetitivos»; a su derecha, cuatro flechas curvas (abanico) hacia lo que debe explicar una skill, una parte encima de otra: cuándo, qué necesita, pasos y resultado. Después, el consejo.

Diseño: arriba, en una fila centrada, la skill plegada, las dos formas de activarla y, al llegar, la tarea. Debajo, la ventana a todo el ancho con la descripción (unas líneas) y, cuando se usa, el contenido de la skill; bajo ella, los contadores: «300 tokens · descripción de validar-migracion» y «10.000 tokens · validar-migracion completa». Abajo, cuándo crear una, con su abanico, y el consejo. Cifras ficticias, sin rótulo.

### E14 · El bucle del agente · ~1,5 min · en el hub

Guion: 2.6, primeros párrafos.

Mensaje: las herramientas convierten un modelo en un agente.

1. «Por defecto, Devin incluye una serie de tools disponibles» y, debajo, las herramientas de serie en una rejilla de 2 × 2, todas del mismo tamaño: `search` (buscar), `file-text` (leer), `pencil` (editar) y `terminal` (ejecutar).
2. El bucle da tres vueltas, todas al mismo ritmo pausado: el modelo decide, una herramienta pulsa y su resultado entra como ficha en la ventana; en la primera, cada fase del panel aparece cuando ocurre. Sin otro clic, la ventana se llena (esto prepara la parte 3). Al final, el rótulo, centrado en su columna: «Esto es un agente».

### E15 · Tools del departamento · ~2,5 min

Guion: 2.6, desde «Cómo las usa el agente».

Mensaje: las tools otorgan nuevas capacidades a nuestro agente.

1. Un solo ejemplo claro: la herramienta `create_pull_request` (el icono oficial de GitHub para un pull request, el Octicon `git-pull-request`, y el nombre en mono) y su ficha, lo que el agente lee de ella: nombre, descripción y parámetros. Las dos, juntas, centradas y en grande: son las piezas principales.
2. La pantalla se reordena en un esquema, de izquierda a derecha: Agente → Tool → sus tres elementos, uno encima de otro (Nombre, Descripción, Parámetros) → la ficha, con una flecha de cada elemento a su campo. Encima de los elementos, a la altura de la parte de arriba de la ficha: «Qué recibe el agente en el contexto:». Sin recuadro rojo.
3. Comparación en dos columnas, «Tool propia → manos» y «Skill → conocimiento», y debajo «No compiten»: una skill se acopla a una herramienta. Todas las filas y el pie entran en una sola animación, escalonada. La etiqueta de arriba pasa a «Tools vs Skills» y el título, a «Una **tool** «da manos» al LLM, una **skill** «da conocimiento»».

Diseño: dos fases en la misma pantalla. Pasos 1–2: la herramienta y su ficha, centradas, que después se colocan en el esquema (con el agente, los elementos y las flechas, abanico). Paso 3: la tabla tool/skill a todo el ancho y, debajo, «No compiten». Quitada la fase de «Nuestras herramientas» y sus consejos, para reducir contenido.

Componente nuevo: tarjeta de definición de herramienta (nombre, descripción, parámetros).


### E16 · MCP · ~2,5 min

Guion: 2.7.

Mensaje: MCP es el estándar con el que conectamos herramientas a Devin.

1. Sin un estándar: arriba, tres agentes (Devin, otro agente y un IDE con IA); abajo, tres servicios (GitHub, Atlassian y Sonar, con su logo); un cable de cada agente a cada servicio. «Sin un estándar, cada agente necesita su propia integración con cada servicio: 3 × 3 = 9».
2. Con MCP: los nueve cables se van y todo pasa por el conector, en el centro. «Con MCP, cada servicio publica un servidor una vez y cualquier agente compatible lo usa: 3 + 3 = 6». Debajo: «Cada servidor se ejecuta en nuestra máquina o como un servicio remoto».
3. Qué trae un servidor: Devin, con el conector en su borde, unido al servidor de GitHub, que despliega algunas de sus tools; resaltada, `create_pull_request`, la del ejemplo de Tools propias (E15). Solo el esquema, sin texto debajo, centrado en la altura del espacio bajo el título (como el paso 4).
4. Los MCPs del departamento: el servidor de GitHub pasa a su sitio en una columna con los demás, cada uno con el logo de su servicio y un cable desde el conector. Externos: GitHub, Atlassian y Sonar; internos: DS-Workspace (con la llave de Openbank) y, en una subrama a su derecha, Datahub (icono `database`), que llega a través de DS-Workspace. Al pie, centrado: «La guía de instalación completa está disponible en el repositorio Master-Control-Program».

Componentes nuevos: conector MCP.

Diseño: dos fases que se relevan en la misma pantalla. En la primera, los agentes en fila arriba y los servicios en fila abajo, en las mismas columnas, y la leyenda centrada debajo; el conector, con «MCP» al lado, entre las dos filas. En la segunda, el agente a la izquierda, con el conector (con su aro punteado) en el borde; en el paso 3, el servidor de GitHub a su altura y sus tools en abanico a la derecha, con la del ejemplo resaltada; en el paso 4, los servidores en columna, agrupados en Externos e Internos, con el nombre del grupo centrado encima, y la nota del repositorio al pie.

### E17 · Subagentes · ~3 min

Guion: 2.8.

Mensaje: un subagente resuelve parte de la tarea en su propio contexto.

1. El agente lanza un subagente por el camino de puntos, con su propia ventana, vacía: no hereda la conversación.
2. La ventana del subagente se llena y al final queda su resultado, una capa pequeña en rojo. Una flecha roja, por debajo de las dos ventanas, la lleva al final de la del agente, donde aparece la misma capa. Bajo la flecha: «El agente solo ve el resultado y mantiene limpio su contexto». A la vez que la flecha, sube el coste de cada uno, en ACUs (el del subagente, más).
3. Tipos de subagente: el agente, con el modelo del IDE, lanza tres subagentes, de menos a más complejo, cada uno con su modelo: Documentación (GPT-6 Luna), Research (SWE-2) y Análisis (GPT-6.1 Sol). Debajo, centrado: «El agente usa siempre el modelo que elegimos en el IDE; el subagente puede usar otros para optimizar tanto la efectividad como el coste».
4. Cuándo sí, casi sin texto: el agente con su ventana y tres subagentes, cada uno con la suya; cada uno lee lo suyo y devuelve su resultado, en rojo, que es lo único que guarda el agente. «Partes independientes, cada una con su resultado».
5. Cuándo no: el agente ya tiene mucho contexto y cada subagente lo vuelve a cargar entero para leer muy poco y devolver un resultado mínimo. «Cada subagente vuelve a cargar el contexto que el agente ya tenía: lo pagamos tres veces por un resultado mínimo».
6. En vertical, dos etapas, seguidas y sin pausa: dos subagentes editan el mismo archivo y aparece un conflicto; debajo, «Un worktree por subagente: pueden editar el mismo archivo», cada uno con su copia de `sesion.ts`. A la derecha: «Contexto separado no significa archivos aislados».
7. Consejo, a la derecha, bajo la frase: «No por defecto: cuando separar aporte más que coordinar».

Componentes nuevos: subagente (con su ventana pequeña), resultado de un subagente (capa en rojo y su flecha).

Diseño: fases que se relevan en la misma pantalla. En la primera (pasos 1 y 2), el agente a la izquierda y el subagente a la derecha, cada uno en una columna centrada con su tarjeta, su ventana (las dos a la misma altura) y su coste; la flecha del resultado, en rojo, en codo por debajo de las ventanas, con su rótulo debajo. En el paso 3, el agente arriba, en el centro, y los tres tipos de subagente en fila debajo, unidos por caminos de puntos, con la frase del modelo centrada abajo. En la segunda (pasos 4 y 5), arriba los tres subagentes en fila, cada uno con su ventana; abajo, el agente con su ventana a la derecha y la leyenda (cuándo sí, cuándo no) a la derecha de esta; las flechas, en codo, de cada resultado a la ventana del agente, sin cruzarse. En la tercera, a la izquierda y en vertical, el conflicto (centrado bajo el archivo) y, debajo, la solución con un worktree por subagente; a la derecha, la frase y el consejo.

### E18 · Plugins · ~1 min · en el hub

Guion: 2.9.

Mensaje: un plugin empaqueta todo lo anterior.

1. Las piezas del hub se envuelven en la caja de plugin y, a la derecha, entra toda la columna de una vez, grupo a grupo: lo que trae un plugin, en una cuadrícula de dos columnas y tres filas (Rules, Skills, Tools, Servidores MCP, Subagentes y Hooks); cómo lo marca la organización, en una fila y con el icono en color (obligatorio, opcional y prohibido), y «El departamento tiene:» un plugin (`ods-ds-mcp`), centrado, y debajo lo que incluye (MCPs, Skills, Tools y Rules), unido a él por flechas curvas que se trazan.

Componente nuevo: caja de plugin. Las marcas de la organización son etiquetas con el icono en color (`--color-obligatorio`, `--color-opcional`, `--color-prohibido`).

---

## Parte 3 · Coste · ~8 min

### E20 · El coste total · ~1 min

Guion: 3.2.

Mensaje: ¿De qué depende el coste total?

1. Arriba, el coste total (icono de dólar); debajo, una llave que abarca todo lo que lo forma, de izquierda a derecha: Tokens → Modelos → Coste por token → Coste en ACUs.
2. Debajo de cada pieza, un ejemplo: 50.000 tokens de salida consumidos, el modelo elegido (GPT-6.1 Sol), su precio por token de salida (10 $ por millón, el de E05) y lo que sale en ACUs: ≈ 0,30 ACUs en la píldora y, debajo, su precio, ≈ 0,60 $ (0,50 $ en tokens), que suben a la vez como contadores. Los ACUs salen de un precio de referencia de 2 $ por ACU (el público del plan Teams; el de Enterprise lo fija el contrato). El ponente explica de palabra el +20 % (benchmark interno) y que no es una tarifa.

Componente nuevo: llave.

Diseño: el coste total centrado bajo el título y, bajo él, la llave, con el pico en el centro, que abarca las cuatro piezas en columnas con flechas entre ellas; el ejemplo, en las mismas columnas, debajo.

### E21 · Los cuatro tipos · ~2 min

Guion: 3.3.

Mensaje: no todos los tokens cuestan lo mismo.

1. Los cuatro tipos, seguidos, en una sola animación, cada uno con su fila: **input sin caché** (la ventana se llena de una vez con todas las capas: input y output); **cache write** (el corchete se alarga sobre las capas y se queda con su nombre, sin pasar a cache read); **cache read** (barra de precio pequeña: «2,5–10 % del input»), y **output** («el más caro por token»).

Diseño: arriba, una ventana (100K) a todo el ancho en la que se ve cada tipo (las capas, la salida de la llamada y el corchete de cache write); debajo, una fila por tipo con qué es y su precio por millón con GPT-6.1 Sol en una barra proporcional (docs.devin.ai: input 2 $, cache write 2,5 $, cache read 0,1 $, output 10 $), con su fuente.

### E22 · La caché · ~1,5 min

Guion: 3.4.

Mensaje: lo ya visto se relee barato, mientras la caché no caduque.

1. La primera llamada.
2. Con un clic, la segunda: el principio es idéntico y el corchete lo cubre. Eso se relee de caché: toma su color y se encoge hasta su coste, un 10 % del input. Solo lo nuevo se paga completo.
3. Un temporizador de cinco minutos («Anthropic ofrece por defecto 5 minutos de caché») se agota: el corchete pasa a discontinuo con ✕ y lo cacheado vuelve a su tamaño, porque todo se vuelve a escribir. El temporizador se agota algo más deprisa (`--dur-temporizador`, 2,2 s) y su texto va centrado debajo.

Diseño: las dos llamadas una sobre otra (no una al lado de la otra: con la ventana horizontal, así se ve que el principio es idéntico), a la misma escala (40K, sin capacidad escrita, como en E23: el ancho pasa de tokens a coste, y así lo cacheado, al 10 %, mide lo bastante para que el corchete no quede como una «U»); a la derecha, el temporizador, con su texto centrado debajo. Los tokens leídos de caché van en su color (el mismo en E21 y E23).

### E23 · Una conversación, paso a paso · ~3,5 min

Guion: 3.5. Es la animación principal de la charla.

Mensaje: la caché ahorra mucho, y las pausas largas la desperdician.

Diseño: dos ventanas, una sobre otra y a la misma escala, «Sin caché» y «Con caché», con el corchete de lo que se lee de caché en cada llamada; eso va en el color de la caché (como en E22), y la línea «Con caché» de la gráfica, también en azul. Sin capacidad escrita: la escala es la de lo que se llega a ocupar; las capas de salida (2.000 tokens), con un ancho mínimo para que se vea su relleno blanco, y nunca en el color de la caché. Desde la llamada 1, a la derecha del rótulo «Sin caché»: «Cada bloque ≈ 20.000 tokens; los de salida, 2.000». Entre las dos ventanas, sitio para la etiqueta de la pausa; la etiqueta del corchete, en una línea («✓ Cache read  225.000 tokens»), para que la gráfica conserve su alto. A la derecha de cada una, su coste por tipo en dólares (input sin caché; cache write, cache read y output) y el total, alineados con su ventana. Encima, a la izquierda, la gráfica del coste acumulado (una línea por variante); a la derecha, las llamadas y el resultado del paso, en acento. En el paso 5, las conclusiones ocupan la columna derecha. Sin la variante de compactación.

1. Situación inicial: 20.000 tokens fijos (AGENTS.md e instrucciones) en ambos lados.
2. Llamada 1: con caché cuesta un poco más (0,123 $ frente a 0,102 $, +21 %).
3. Llamadas 2 a 10 en reproducción continua (`--dur-llamada` cada una, ~6 s en total): sin caché, cada llamada cuesta más; con caché, el coste por llamada apenas crece. Totales: **3,090 $ frente a 0,940 $, un −70 %**.
4. Variante pausa: el lado con caché rebobina, llamada a llamada (capas, corchete y desglose a la vez, al ritmo de una salida), hasta la 5. En la 6 la caché caduca: todo se vuelve a escribir (0,41 $, más que la misma llamada sin caché, 0,33 $). Total **1,259 $: un +34 %** frente a con caché sin pausa (0,940 $).
5. Dos conclusiones, encadenadas y sin pausas: «−70 %, la caché es lo que más ahorra» (en 10 llamadas) y «+34 %, las pausas largas y los reinicios la desperdician» (con una sola pausa larga). Van centradas en la columna derecha, cada una con su cifra grande encima, al tamaño del resultado de los pasos anteriores; solo «−70 %», la cifra que hay que recordar, en acento.

Todas las cifras en dólares de la escena (textos, leyenda de la gráfica y desglose) llevan tres decimales: las de la llamada 1 los necesitan y los porcentajes se calculan sobre esos valores.

Datos: tarifas de GPT-6.1 Sol (las de E21: input 2, cache write 2,5, cache read 0,1 y output 10 $ por millón). 20.000 tokens fijos; en cada llamada, 21.000 nuevos (el mensaje y lo que leen las herramientas) y 2.000 de salida, que entran en el contexto de la siguiente: la llamada 10 lleva 248.000 tokens. Las fórmulas, en `src/escenas/E23.js`; el Anexo A del guion sigue con el caso ficticio anterior.

---

## Parte 4 · Buenas prácticas · ~9,5 min

La pantalla es un circuito fijo. Cada escena es una parada del método: al pasar de una a otra, un punto recorre el circuito hasta la parada siguiente y su contenido sustituye al de la anterior, sin mover la cámara.

### E24 · Definir la tarea · ~2,5 min

Guion: 4.1.

Mensaje: una buena petición responde cinco preguntas.

1. Las cinco preguntas en lista.
2. La petición inicial: «Arregla la paginación».
3. La petición mejorada, en mono.
4. La petición mejorada se subraya de un trazo rápido, en orden de lectura y fila a fila; cada fragmento, en el color de la pregunta que responde (sin números en el texto).

Diseño: arriba a la derecha, el circuito (fijo en las seis escenas). A la izquierda, las cinco preguntas, cada una con su número grande en su color (`--color-pregunta-1` a `5`); a la derecha, las dos peticiones, una sobre otra (la inicial se atenúa).

### E25 · Contexto progresivo · ~1,5 min

Guion: 4.2.

Mensaje: primero lo esencial, el resto accesible.

1. Lo primero: error exacto, pasos de reproducción y archivos relacionados.
2. La hipótesis como sugerencia, no como orden (la cita del guion).
3. Mil líneas de log se filtran hasta el fragmento relevante.

Diseño: a la izquierda, lo primero y la hipótesis; a la derecha, el log, que se atenúa salvo el fragmento, y el fragmento en su tarjeta.

### E26 · Planificar · ~1,5 min

Guion: 4.3.

Mensaje: un plan solo cuando aporta.

1. Dos caminos: cambio pequeño → ejecutar; tarea amplia → modo planificación.
2. La tarjeta del plan: qué cambiar, por qué, riesgos y cómo validarlo.

Diseño: los dos caminos en dos filas (situación → qué hacer); debajo del segundo, la tarjeta del plan.

### E27 · Intervenir · ~1,5 min

Guion: 4.4.

Mensaje: corregir pronto y con datos concretos.

1. El agente se desvía del camino; la corrección con información concreta lo devuelve (la cita).
2. Pausa de diagnóstico: la petición en mono.

Diseño: a la izquierda, el recorrido (tramo común, desvío con ✕ y vuelta con ✓, los dos con el componente hito, `.hito`, con su nombre encima o debajo); a la derecha, la corrección en mono; abajo, la pausa de diagnóstico a todo el ancho.

### E28 · Verificar · ~1,5 min

Guion: 4.5.

Mensaje: una respuesta convincente no demuestra que funcione.

1. Rótulo: «Convincente ≠ funciona».
2. Lista de comprobación: archivos cambiados, alcance y pruebas, más lo que no se ha podido comprobar.
3. La petición de cierre.

Diseño: el rótulo grande arriba; debajo, a la izquierda, la lista y, a la derecha, la petición de cierre.

### E29 · Hábitos · ~1 min

Guion: 4.6.

Mensaje: lo que gasta sin aportar.

1. Los cuatro hábitos genéricos con su alternativa.
2. Recordatorio de los hábitos propios de cada pieza, con líneas hacia sus zonas: effort (E08), contexto (E11) y subagentes (E17).

Diseño: la tabla de hábitos y alternativas a todo el ancho, con la columna «Alternativa» empezando donde la etiqueta «Contexto» de abajo; debajo, los tres de cada pieza con la etiqueta (e icono) de su zona y, como los de arriba, con el icono ⊘ (`ban`).

---

## Cierre · Preguntas · ~2 min

Una sola pantalla: el cierre y, en su sitio, el turno de preguntas.

### E30 · Antes de pulsar Enter · ~2 min

Guion: Cierre.

Mensaje: cinco preguntas antes de empezar.

1. Las cinco preguntas entran en cascada, rápida y sin pausas (`--escalonado-filas`), cada una con la etiqueta de donde se explica: resultado → Buenas prácticas, configuración → Modelo, Effort y Modo, contexto → Contexto, herramientas → Tools y Skills, terminado → Verificar.
2. Mensaje final: «Tareas correctas, verificables y fáciles de revisar, con menos trabajo y consumo innecesarios». Es la frase del guion con el consumo, la promesa de la charla, añadido; esa parte va en acento, el único de la pantalla.

Diseño: las cinco preguntas en filas, cada una con la etiqueta (e icono) de su bloque a la derecha; abajo, el mensaje final.

### E31 · Preguntas

Mensaje: turno de preguntas.

1. Una moneda en 3D con el signo «?» en relieve, en el centro, que gira despacio y sin parar sobre su eje vertical desde que llega, el logo de Openbank y, discreta, la franja con lo que queda para después: «Guía de instalación: repositorio Master-Control-Program» y «Plugin del departamento: ods-ds-mcp».

Diseño: sin título de escena; la moneda (`.moneda`, `moneda()` en `dibujos.js`) sola en el centro: dos caras con un reborde, un «?» con volumen que la atraviesa y sobresale por las dos caras (una pieza geométrica: un solo trazo continuo, gancho, curva de enlace y palo, más el punto, con dos tapas planas y paredes; por detrás se ve en espejo) y un canto con grosor (una banda continua alrededor del borde); gira en 3D, una vuelta cada 6 s (`--dur-moneda`), única excepción pedida a «nada de giros 3D». El logo, abajo a la derecha; a la izquierda, a su altura, la franja de recursos en dos líneas (iconos `git-branch` y `package`, texto `--tipo-etiqueta` en `--color-texto-2`, con el nombre del repositorio y del plugin en `--color-texto-1`).

### E32 · Caso práctico (pendiente de decidir)

Si se incluye, sería un recorrido de unos 5 minutos por el mapa: el bug de paginación pasa por cada bloque con la decisión que toca en cada uno.

---

## Resumen de tiempos

| Bloque | Escenas | Pasos | Tiempo |
|---|---|---:|---:|
| Apertura | E01 | 2 | ~2 min |
| Parte 1 · Primeros pasos | E02–E03 | 12 | ~8 min |
| Parte 2 · Principales herramientas | E04–E18 | 48 | ~27 min |
| Parte 3 · Coste | E20–E23 | 11 | ~8 min |
| Parte 4 · Buenas prácticas | E24–E29 | 16 | ~9,5 min |
| Cierre · Preguntas | E30–E31 | 3 | ~2 min + preguntas |
| **Total** | **30** | **92** | **~57 min + preguntas** |

Ya no queda nada marcado con [A]: la tecla `A` sigue disponible para pasos de detalle que se añadan.

## Componentes del vocabulario

Todos los que necesitan estas escenas ya están dibujados en `design/componentes.css` y documentados en `design/design-system.html`. Entre otros: isla y viñeta, repetición, captura con resaltado, gráfica de líneas con su nota de fuente, dial de effort, tarjeta de consejo, árbol de repositorio, definición de herramienta, conector MCP y candado, caja de plugin, temporizador, circuito y tapa de bloque. Si una escena necesita uno nuevo, se diseña allí primero («cada concepto, un único dibujo»).

## Pendientes de contenido

- [x] Capturas reales de Devin Desktop con los controles y el indicador de contexto (E03). El consumo queda fuera.
- [ ] Haiku 5.5 y SWE-2 en el selector de la cuenta (E05).
- [ ] Comando `/compact` y limpiar contexto en Desktop (E11).
- [ ] Herramientas reales del departamento (E15).
- [ ] Tarifas reales de los modelos de la cuenta (E21).
- [ ] Duración de la caché en Devin (E22).
- [ ] Decidir el caso práctico (E32).
