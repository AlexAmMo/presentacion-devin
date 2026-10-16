# Revisión del trabajo autónomo (noche del 15-10-2026)

Registro del encargo de `prompts/06-trabajo-autonomo.md`: primera versión de todas las pantallas, con sus animaciones. Es lo primero que hay que leer al volver (y lo que lee el agente si retoma tras compactar).

Servidor: `npx vite --port 5173 --strictPort --host 127.0.0.1` → `http://localhost:5173/#E09/1`. Capturas: `.playwright-mcp/pantallas/` (`EXX-N.png` = escena EXX en su paso N).

Verificación que se hace en cada pantalla (script en el scratchpad de la sesión, `verificar-pagina.js`, inyectado en la página): por cada paso, el estado al entrar directo por su URL se compara elemento a elemento con el de llegar animando desde el paso anterior; además, zona segura, texto ≥ 24 px, acentos y consola.

## Resumen para revisar (léelo primero)

**Hecho:** las 31 escenas tienen su fichero real (`src/escenas/E01.js`–`E31.js`; E01 ya venía del esqueleto) con todos sus pasos y animaciones; solo queda fuera E32 (caso práctico, pendiente de decidir). En cada pantalla, cada paso se ha comprobado entrando directo por su URL y llegando animando desde el anterior: los dos estados coinciden elemento a elemento, sin nada fuera de la zona segura ni texto por debajo de 24 px.

**Comprobaciones de cierre (15-10-2026, de madrugada):**
- Recorrido completo, animado, de `#E01/1` a `#E31/1`: sin errores ni avisos de consola. Capturas al final de cada paso en `.playwright-mcp/recorrido/`.
- `?estatico`: los pasos llegan a su estado final al instante (12 pasos en 89 ms). Para eso, `pasos.js` completa la línea de tiempo de cada paso en modo estático: algunas coreografías propias (E23, el hub) usan duraciones de `s()` que el modo estático no anulaba.
- Tecla `A`: desde `#E21/4` salta el [A] y va a `#E22/1`. Tecla `O`: entra y sale de la vista general. `?ponente`: carga (abierta sola, pide abrirse con P desde la presentación, como en el esqueleto).
- `npm run escenas`: 31 escenas, 111 pasos, sin avisos (E32 queda fuera del recorrido, como estaba). `npm run build`: `dist/index.html` de 409 kB; servido con un servidor estático, sin errores, sin peticiones externas y con Outfit y DM Mono cargadas.
- `design/design-system.html`: 22 de 22 comprobaciones. `DESIGN.md` y `.impeccable/design.json`, regenerados con el documentador de Impeccable.

**Lo que más necesita tu criterio** (el detalle, en cada pantalla, abajo):
1. **E23, datos de la compactación:** con el modelo del Anexo sale 0,444 (+4 %), no 0,445; el −12 % en 30 llamadas sale compactando tras la llamada 12.
2. **El hub:** ¿piezas dibujadas o todas como silueta? ¿Nombres de las herramientas en el hub?
3. **E03:** falta la captura de Desktop; los resaltados están en posiciones provisionales y faltan las líneas de puntos hacia la región de cada control.
4. **Parte 4:** el circuito ocupa la esquina superior derecha de las seis escenas; es el acento de esas pantallas, así que no llevan otro.
5. **Pequeñas dudas de diseño:** E08 paso 4 solo texto; E13 sin acento; E02 cable entre islas; E29 sin «líneas hacia sus zonas» (etiquetas con el icono de la zona en su lugar).
6. **`--color-franja-critica` (E10, de antes de esta noche):** es un tinte del rojo del acento, y eso choca con la regla «nada rojizo» de `CLAUDE.md` (y competiría con una serie en acento en la misma gráfica). Lo ha señalado el documentador de Impeccable al regenerar `DESIGN.md`; está documentado tal cual, sin regla que lo justifique. Si se cambia, va en `design/` (por ejemplo, un tono más oscuro de la superficie 2).
7. **Contenido pendiente (no depende de diseño):** herramientas reales del departamento (E15), tarifas de la cuenta (E21), duración de la caché en Devin (E22), servidores MCP habilitados (E16), Haiku 5.5 y SWE-2 en el selector (E05), `/compact` en Desktop (E11).

**Cambios fuera de `src/escenas/`:** `src/circuito.js` (nuevo), `src/mundo.js` y `src/pasos.js` (el circuito y el modo estático), `src/datos/mapa.js` (`CIRCUITO`), `src/escenas/comun.js` (`peticion`, `pasos.salir`, `sinSalidas`), `escenas.md` (líneas «Diseño:»), `CLAUDE.md` (pantalla libre, pasos en el marcado, hub y circuito, modo estático), `prompts/05-pantallas.md` (estado) y `design/` (abajo).

## Estado general

- [x] 1. Migración de la ventana horizontal
- [x] 2. Contexto (E09–E11)
- [x] 3. Devin, el hub (E04, E14, E18, E19)
- [x] 4. Modelos (E05–E07)
- [x] 4. Effort (E08)
- [x] 4. Rules (E12)
- [x] 4. Skills (E13)
- [x] 4. Tools propias (E15)
- [x] 4. MCP (E16)
- [x] 4. Subagentes (E17)
- [x] 5. Coste (E20–E23)
- [x] 6. Buenas prácticas (E24–E29)
- [x] 6. Preguntas (E30–E31)
- [x] 7. Primeros pasos (E02–E03)
- [x] 8. Apertura (E01) y recorrido completo
- [x] Cierre: build, comprobaciones, DESIGN.md, resumen

Terminado. Sin commit: todo está en el árbol de trabajo para que lo revises.

## Mecanismo común de pasos (`src/escenas/comun.js`)

Cada elemento declara en el marcado cuándo cambia: `data-paso` (aparece), `data-hasta` (se va), `data-atenua`/`data-aviva`, `data-clase` (cambio de estado), `data-efecto`/`data-salida` (con qué efecto de `motion.js`), `data-orden` (grupos sucesivos dentro de un paso) y `data-propio` (lo anima la escena a mano). `crearPasos(raiz)` da `poner(n)` (saltar, retroceder, recargar) y `animar(n, tl)` (el paso animado). Así el estado al saltar y al animar salen del mismo sitio; cada escena solo programa lo especial (capas que se llenan, nivel, líneas, cifras…).

- Contenido [A]: `en(…, { avanzado: true })` le pone la clase `solo-avanzado`; con la tecla A (`.sin-avanzados`) no se ve (`src/esqueleto.css`).
- `pausa(tl)`: pausa de lectura dentro de un paso (0 en modo estático).

## Por pantalla

### Contexto (E09–E11) · `http://localhost:5173/#E09/1`

- **E09** (`#E09/1`–`#E09/3`): 1 aparecen las tres capacidades superpuestas; 2 la ventana de 256K vacía, se llena capa a capa de izquierda a derecha y aparece el nivel con su cifra subiendo hasta el 65 %; 3 llega la fila «Relevante» llena y, tras una pausa de lectura, se atenúa todo menos el trozo útil, con «Contexto útil» debajo.
  - Decisión: el nivel aparece al terminar el relleno, no lo acompaña: acompañándolo, su cifra pisaba las capas (probado).
- **E10** (`#E10/1`–`#E10/5`): 1 ejes y fuente; 2 las tres líneas se trazan una a una (cada una empieza a mitad de la anterior) y al acabar salen sus puntos y su nombre; 3 y 4 las franjas, con su nombre, sin desplazarse; 5 el título y la tabla.
  - Decisión: la tabla entra entera (no fila a fila): con bordes colapsados, una fila oculta seguía dibujando su línea.
- **E11** (`#E11/1`–`#E11/3`), rehecha con la ventana horizontal: arriba, los tres caminos en columnas; abajo a la izquierda, la ventana que se compacta; a la derecha, lo que hay que guardar; abajo, los consejos.
  - 1 los caminos; 2 «Continuar» y «Sesión nueva» se atenúan; la ventana llega llena (74 %), pausa, la conversación y lo explorado se recogen hacia la izquierda, el resumen ocupa su sitio y el nivel baja al 16 % con su cifra; después, la lista de lo que hay que guardar; 3 los dos consejos entran con muelle y los caminos se avivan.
  - Cifras ficticias (200K, 74 % → 16 %), con su marca.
  - Fuera de pantalla, pendiente: `/compact` y limpiar el contexto en Desktop.
- Capturas: `E09-1…3.png`, `E10-1…5.png`, `E11-1…3.png`.
- Duda: E10 v2 no la llegaste a confirmar; se mantiene tal cual y solo se ha animado.

### Devin, el hub (E04, E14, E18, E19) · `http://localhost:5173/#E04/1`

- **Disposición nueva del hub** (`src/hub.js`, `HUB` en `src/datos/mapa.js`): en la mitad izquierda, la tarjeta del agente rodeada por el bucle (ahora de 560 px), con las cuatro herramientas de serie sobre él (a 45°, 135°, 225° y 315°); cada pieza en la dirección de su pantalla. A la derecha, un panel (x 1240, 560 px) con la cabecera y el contenido de la escena del hub.
  - Cada pieza tiene dos dibujos en su sitio: el hueco punteado y, al llegar, su componente: herramientas, ventana de contexto, documento AGENTS.md, tarjeta del subagente, bucle y caja de plugin. Modelo, Effort, Skills, Tools propias y MCP siguen como silueta rellena (`hueco--lleno`).
  - La ventana del hub tiene una capa por cada pieza que deja algo en el contexto (instrucciones, AGENTS.md, descripciones de skills, definiciones de herramientas y de tools propias).
  - Las herramientas van sin nombre en el hub (no cabían junto a las piezas); sus nombres los da el panel de E14.
  - La pieza que entra en un paso del hub se anima ahora antes que el paso (`src/pasos.js`): así el bucle está dibujado antes de girar.
  - Las escenas del hub reciben `hub` (contrato actualizado) para recorrer su bucle y pulsar sus herramientas; lo que añade la sesión a la ventana lo dibujan ellas encima (`src/escenas/hub.js`).
- **E04** (`#E04/1`): en el panel, las nueve piezas que vamos a montar, en el orden de la ruta.
- **E14** (`#E14/1`–`#E14/3`): 1 entran las herramientas (en el hub) y su leyenda; 2 se traza el bucle; una vuelta lenta: el punto baja hasta «leer», que pulsa, su resultado viaja como ficha a la ventana y entra como capa; en el panel aparece cada fase cuando ocurre y, al final, «Esto es un agente» (en acento); 3 tres vueltas rápidas (editar, ejecutar, buscar), la ventana se llena y el contador sube de 1 a 4.
- **E18** (`#E18/1`–`#E18/3`): 1 entra la caja de plugin; en el panel, lo que trae (y, en [A], los hooks: se ocultan con la tecla A); 2 obligatorio, recomendado o prohibido; 3 el patrón del departamento y «Ya conocemos las piezas. ¿Cuánto cuesta usarlas?».
- **E19** (`#E19/1`–`#E19/2`): 1 la frase entra entera y se parte en fichas; 2 tres vueltas: al empezar cada una, la línea de lectura (en acento) recorre lo ocupado de la ventana y el contador sube; cada vuelta deja una capa más.
- Decisiones:
  - E18: la caja envuelve todo el hub, como decía el mapa; no se atenúan las piezas que no van en un plugin (habría que tocar el estado del hub). Alternativa descartada: una caja solo alrededor de skills, AGENTS.md, MCP y subagente (no es un rectángulo).
  - E19: el texto final del panel es «Por eso un mensaje corto puede desencadenar una ejecución costosa» (guion 3.1), para no repetir el mensaje.
- Capturas: `E04-1.png`, `E14-1…3.png`, `E18-1…3.png`, `E19-1…2.png`.
- Dudas: ¿te convence el hub con piezas dibujadas o prefieres todas como silueta rellena? ¿Quieres los nombres de las herramientas en el hub?

### Modelos (E05–E07) · `http://localhost:5173/#E05/1`

- **E05** (`#E05/1`–`#E05/4`): 1 las cuatro familias; 2 la tabla de niveles fila a fila, con su fuente (precios de lista a 14-10-2026); 3 a la derecha, las generaciones de GPT y Claude (las anteriores atenuadas, la actual destacada) y «El nombre del nivel no basta: mira la generación»; 4 [A] «Sol cambió de nivel» (se oculta con la tecla A).
- **E06** (`#E06/1`–`#E06/4`): gráfica de Terminal-Bench 4.0 con los datos reales (research_notes, §5.3); a la derecha, la lectura de cada paso.
  - 1 ejes y fuente; 2 las cinco líneas una a una (Opus 5.5 la última, en acento); 3 se atenúan todas salvo Opus 5 y Opus 5.5, salen los anillos de «Max» y «Medium» y una flecha de uno a otro: «más acierto por ~1/5 del coste»; 4 Opus 5.5 se atenúa, GPT-6 Astra se aviva y una guía discontinua une Opus 5 en Xhigh (50,6 %) con GPT-6 Astra en Low (49,7 %).
  - Decisión: el texto de cada lectura va en la columna derecha, no junto a la flecha (la zona de la flecha está llena de líneas).
  - Decisión: para la lectura 3 elegí Opus 5 Xhigh frente a GPT-6 Astra Low (a la misma altura, el barato con más esfuerzo y el caro con poco). Alternativas posibles: GPT-5.6 Sol Max (37,3 %) frente a Fable 5.1 Low (40,2 %).
- **E07** (`#E07/1`–`#E07/2`): 1 la tabla de tipo de tarea y estrategia, fila a fila; 2 dos filas de intentos: el modelo barato falla dos veces (✕ 0,40, ✕ 0,40, ✓ 0,40 = 1,20) y el bueno acierta a la primera (✓ 0,90); «El barato acaba costando más». Cifras ficticias.
- Pendiente de contenido: Haiku 5.5 aún no está en el selector de Devin (está Haiku 4.5) y SWE-2 no está en la tabla. Comprobar en la cuenta.
- Capturas: `E05-1…4.png`, `E06-1…4.png`, `E07-1…2.png`.

### Effort (E08) · `http://localhost:5173/#E08/1`

- 1 el dial en Low, con la nota de SWE-2; 2 la aguja sube nivel a nivel hasta Max: en cada nivel salen más fichas de razonamiento (de 1 a 8) y suben latencia y coste (3 s → 35 s; 0,02 → 0,24 u., cifras ficticias); 3 a la derecha, la gráfica de E06 en pequeño, con Opus 5.5 en acento y las demás atenuadas y sin nombre: «Medium +19», «Max −2»; 4 «El esfuerzo no sustituye al contexto. Si falta un dato, pensar más no lo crea»; 5 el consejo.
- Decisión: la lectura usa Opus 5.5 (de XHigh a Max baja 2 puntos: «casi nulo o incluso negativo», como dice el guion).
- Duda: el paso 4 es solo texto; si quieres un dibujo (una ventana con un hueco punteado, «el dato que falta»), cabría en lugar del texto secundario.
- Capturas: `E08-1…5.png`.

### Rules (E12) · `http://localhost:5173/#E12/1`

- 1 el documento AGENTS.md cae sobre el principio de la ventana (200K) y se convierte en su primera capa (6K): «Lo primero que entra: el AGENTS.md de la raíz, en cada sesión»; 2 el árbol del repositorio con los dos AGENTS.md: el de la raíz, ya cargado; «el agente entra aquí» junto a `api/`, y su AGENTS.md se carga y añade una capa fina (3K); 3 la capa de la raíz crece a 24K y, en tres llamadas, la línea de lectura recorre lo ocupado mientras suben los contadores (3 llamadas · 72.000 tokens releídos); 4 el consejo «Breve y estable; para lo largo, una skill» y, al lado, «Una rule puede apuntar a una skill: «Migraciones: usa /revisar-migracion»».
- Decisión: «Lo primero que entra» va encima de la ventana: el documento cae sobre ella y no queda un hueco vacío entre el título y la ventana cuando el documento ya se ha convertido en capa.
- Decisión: el ejemplo de rule que apunta a una skill (`/revisar-migracion`) es inventado; cámbialo por uno real de Openbank si lo hay.
- Capturas: `E12-1…4.png`.

### Skills (E13) · `http://localhost:5173/#E13/1`

- 1 tres skills plegadas, con su nombre y su descripción (los tres ejemplos del guion: `validar-migracion`, `preparar-revision` y `documentar-api`); debajo, la ventana (200K) con tres capas finísimas, una por descripción, y el contador «900 tokens · 3 descripciones»; 2 llega una tarea («Valida la migración 0042 antes de desplegarla»): las otras dos se atenúan, `validar-migracion` se despliega (con su anatomía: cuándo, qué necesita, pasos, resultado) y su contenido cae en la ventana como una capa de 12K, mientras sube su contador; 3 a la derecha, «Dos formas de activarla»: tú, con `/validar-migracion`, o el agente, por su descripción; 4 las tres vuelven a verse (son los ejemplos), «Cuándo crear una: un procedimiento que repetimos, con pasos y criterios propios…» y el consejo «Descripción clara: con ella decide el agente».
- Decisión: las descripciones, a escala, no se verían (300 tokens de 200K son 2 px); cada una lleva el ancho mínimo que se distingue (`--esp-1`).
- Decisión: iconos nuevos `user` y `message-square` (la tarea y «Tú»).
- Duda: no hay acento en esta pantalla. Si quieres uno, iría en la capa de la skill usada (pero las capas no tienen variante de acento) o en el contador de 12.000.
- Capturas: `E13-1…4.png`.

### Tools propias (E15) · `http://localhost:5173/#E15/1`

Tres fases en la misma pantalla: lo de la anterior se va de una vez y lo nuevo entra por grupos.

- 1 cuatro herramientas de ejemplo (`buscar_docs`, `ver_incidencia`, `validar_proyecto`, `revisar_cambios`) con la marca «Ejemplos: faltan las reales»; 2 a la derecha llega `ver_incidencia.py` (el código, líneas simuladas), se da la vuelta (efecto `voltear`) y queda su definición: nombre, descripción (resaltada en acento) y parámetros; «El agente no ve el código: ve el nombre, la descripción y los parámetros. La descripción es el disparador»; 3 [A] «En Devin Local, en tres pasos», una fila por paso con lo que entra en el contexto (los servidores; las definiciones de uno; la llamada y el resultado) y el candado: el código y las credenciales se quedan fuera.
- 4 la tabla «Tool propia · manos» / «Skill · oficio», con las filas de dos en dos y su pausa de lectura; 5 «No compiten: lo habitual es una herramienta con una skill que explica cuándo y cómo usarla».
- 6 «Nuestras herramientas»: herramienta, para qué, dónde está, permisos y quién la mantiene (las tres últimas, «—»); 7 tres consejos para quien las crea.
- Decisión: tres celdas de la comparación van abreviadas para que cada fila quepa en una línea («Actuar sobre un sistema o consultar sus datos»; «Se quedan en ella; permitir, preguntar o denegar»; «Todo el procedimiento y lo que ejecute»). El texto completo sigue en el guion.
- Decisión: la herramienta elegida se llama `ver_incidencia` (no `consultar_incidencia`): con nombres más largos, los cuatro no caben en una fila junto a la tarjeta.
- Mecanismo: nuevo `pasos.salir(n, tl)` y la opción `sinSalidas` de `animar`, para los cambios de fase dentro de una pantalla (`src/escenas/comun.js`).
- Pendiente de contenido: las herramientas reales del departamento (nombres, dónde están, permisos y quién las mantiene).
- Capturas: `E15-1…7.png`.

### MCP (E16) · `http://localhost:5173/#E16/1`

- 1 el agente, el conector MCP en su borde y un cable a cada servidor: «Local · en nuestra máquina» y «Remoto · un servicio»; 2 dos columnas: «En Devin Local», `devin mcp add` (por defecto, en un fichero local que no se sube; también se puede compartir con el proyecto) y «En Devin Cloud», Customize → MCPs; 3 el candado «Credenciales nunca en el repositorio» y, a su lado, «Variables de entorno, inicio de sesión (OAuth) o los secretos de Devin».
- Decisión: para Devin Local y Devin Cloud uso los iconos `terminal` y `app-window`, no `laptop` y `cloud`, que ya son los de los servidores (local y remoto): son cosas distintas.
- Pendiente de contenido (guion): qué servidores MCP tiene habilitados la organización.
- Capturas: `E16-1…3.png`.

### Subagentes (E17) · `http://localhost:5173/#E17/1`

Tres fases en la misma pantalla, como E15.

- 1 el agente y su ventana (200K, con lo que ya lleva); el camino de puntos se traza y aparece el subagente con su ventana pequeña, vacía: «no hereda la conversación»; 2 la ventana del subagente se llena (cinco lecturas) y, tras una pausa, vuelve una ficha «↩ resumen + evidencias», que entra en la del agente como una capa fina: «Al agente solo vuelve el resultado»; 3 cada uno, su contador de coste (0,06 u. el agente; 0,41 u. el subagente, cifras ficticias) y «El general hereda el modelo; el de exploración puede usar otro».
- 4 «Cuándo compensan: partes independientes con entregables claros» (los tres ejemplos del guion) y «Cuándo no» (los dos), y «Ganas… Pagas…» (ventajas y costes del guion); 5 a la derecha, el encargo de ejemplo en una tarjeta en mono y «Contexto suficiente, no toda la conversación. Y evidencias y referencias…».
- 6 «Mismo archivo»: dos subagentes con cables al mismo `sesion.ts` y «Conflicto» (en acento); tras una pausa, «Repartir archivos (o entornos separados)»: cada uno con el suyo; «Contexto separado no significa archivos aislados»; 7 el consejo.
- Decisión: el conflicto es el acento de la fase 3; en las fases 1 y 2 no hay.
- Capturas: `E17-1…7.png`.

### Coste (E20–E23) · `http://localhost:5173/#E20/1`

Las cuatro escenas comparten pantalla y se relevan sin mover la cámara.

- **E20**: 1 «En nuestra cuenta, el consumo se mide en ACUs…» y la cuenta: fichas → coste en tokens → × 1,2 (en acento) → ≈ coste en ACUs; 2 la etiqueta «Benchmark interno · pocas tareas · aproximación» y «No es una tarifa: la del ACU se fija en el contrato. Por eso nos centramos en los tokens».
- **E21**: arriba, una ventana de 100K: 1 entran «Fijo» y el mensaje (input); 2 el corchete se alarga bajo ellos: «Cache write: se guarda para la llamada siguiente»; 3 entra la llamada siguiente y la etiqueta pasa a «✓ Cache read»; 4 a la derecha, las fichas de razonamiento y de salida. Debajo, una fila por tipo (lo que dice el guion) con su precio por millón en una barra proporcional (2 · 2,5 · 0,2 · 10, tarifas ficticias). 5 [A] las filas dejan paso a las tarifas públicas (Opus 5.5, Sonnet 5.5, GPT-6 Astra; fuente docs.devin.ai/desktop/models), marcadas «Referencia pública: faltan las de la cuenta».
- **E22**: 1 «Llamada 1» y «Llamada 2», una sobre otra: el corchete cubre el principio idéntico, «✓ Cache read: lo mismo que en la llamada 1 · se relee barato; solo lo nuevo se paga completo»; 2 a la derecha, el temporizador de 5:00 se agota (tiempo simulado), la segunda pasa a «tras una pausa de 6 minutos», el corchete pasa a discontinuo con ✕ («Caché caducada: todo se vuelve a escribir») y sus capas se rellenan otra vez; 3 «Duración en Devin: pendiente de verificar».
- **E23** (la principal): gráfica del coste acumulado arriba a la izquierda; a la derecha, las llamadas y el resultado del paso en acento; debajo, «Sin caché» y «Con caché» (100K) con su desglose por tipo a la derecha. 1 los 20.000 fijos en las dos; 2 la llamada 1: «+21 %» (0,070 frente a 0,058); 3 las llamadas 2 a 12 seguidas (capas, corchete de lo leído, desglose y gráfica, llamada a llamada): «−69 %» (0,43 frente a 1,36); 4 variante pausa: «Con caché» rebobina a la llamada 6, la caché caduca en la 7 (corchete discontinuo, todo se reescribe, 0,145) y sigue hasta la 12: «+27 %» (0,538); 5 variante compactación: rebobina a la 8, la historia se recoge en un resumen de 3.000 tokens (la compactación cuesta 0,044; solo lo fijo sigue en caché) y sigue hasta la 12: «+4 %»; [A] «En 30 llamadas, compactando: −12 %»; 6 las tres conclusiones, una a una, en la columna derecha.
  - Las cuentas salen del Anexo A (fórmulas en `src/escenas/E23.js`); el estado de cada paso y la animación usan las mismas, así que saltar y llegar animando dan lo mismo.
  - **Duda (datos):** con el modelo del Anexo (tras compactar, se escriben el resumen y lo nuevo y se lee lo fijo), el total con compactación sale **0,444**, no 0,445; el porcentaje, **+4 %**. Y el −12 % en 30 llamadas sale compactando tras la llamada 12 («a mitad»), no tras la 8. Si el Anexo usaba otra hipótesis, se cambia en una línea.
  - Decisión: los porcentajes, sobre los totales redondeados a milésimas, como el guion (0,538 / 0,425 = +27 %; sin redondear saldría +26 %).
  - Decisión: el diseño sigue la lámina e23 (desglose a la derecha de cada ventana), no «bajo cada uno» como decía `escenas.md` (ya actualizado).
- Cambio en `design/motion.js`: `alargarCorchete` limpia su `clip-path` al terminar (dejaba un recorte residual).
- Capturas: `E20-1…2.png`, `E21-1…5.png`, `E22-1…3.png`, `E23-1…6.png`.

### Buenas prácticas (E24–E29) · `http://localhost:5173/#E24/1`

- **El circuito**, arriba a la derecha, es fijo: no pertenece a ninguna escena sino a la pantalla (`src/circuito.js`, medidas y nombres de las paradas en `CIRCUITO` de `src/datos/mapa.js`), como el hub. Su estado sale del paso (`pasos.js`): la parada de la escena que se ve, en acento; las anteriores, hechas. Al pasar de una escena a la siguiente, mientras cambia el contenido, el punto recorre la pista hasta la parada nueva. Como su parada actual es el acento de la pantalla, las escenas de esta parte no llevan otro.
- **E24**: 1 las cinco preguntas; 2 «Arregla la paginación.»; 3 la petición mejorada (la inicial se atenúa) y «La segunda es más larga, pero reduce la ambigüedad…»; 4 fragmento a fragmento, en el orden de las preguntas, se subraya y aparece su número.
- **E25**: 1 lo primero (error exacto, pasos para reproducirlo, archivos relacionados); 2 «una hipótesis, no una orden» y la cita en mono; 3 `app.log · 1.000 líneas`: tras una pausa, todo se atenúa salvo tres líneas, que pasan a «El fragmento relevante» (texto de ejemplo); «El resto, accesible si hace falta».
- **E26**: 1 los dos caminos (cambio pequeño → ejecución directa; tarea amplia → modo planificación); 2 la tarjeta del plan (qué cambiar, por qué, riesgos, cómo validarlo) y «Con una extensión proporcional a la tarea».
- **E27**: 1 el recorrido: tramo común y desvío hacia «Seguir con el backend» (✕); tras una pausa, la corrección en mono; tras otra, el desvío se atenúa y el recorrido sigue hasta «El fallo real» (✓); 2 la pausa de diagnóstico.
- **E28**: 1 «Convincente ≠ funciona» (el ≠ es el icono `equal-not`, nuevo); 2 qué revisar (archivos, alcance, comprobaciones, y lo que no se ha podido comprobar); 3 la petición de cierre.
- **E29**: 1 la tabla de los cuatro hábitos con su alternativa, fila a fila; 2 «Y los de cada pieza, que ya vimos en su sección»: Effort, Contexto y Subagentes, con la etiqueta de su zona.
- Decisión: en E29, en lugar de «líneas hacia sus zonas» (las zonas están fuera de esta pantalla, en la cuadrícula de arriba), cada hábito lleva la etiqueta con el icono de su zona, la misma que en su pantalla.
- Mecanismo: `peticion(titulo, texto, ancho)` en `comun.js`, la tarjeta en mono de las peticiones al agente (E17, E24, E25, E27, E28).
- Capturas: `E24-1…4.png` … `E29-1…2.png`.

### Preguntas (E30–E31) · `http://localhost:5173/#E30/1`

- **E30**: 1 las cinco preguntas, una a una con su pausa de lectura, cada una con la etiqueta del bloque donde se explica (Buenas prácticas; Primeros pasos y Principales herramientas; Contexto; Tools y Plugins; Verificar); 2 «Tareas correctas, verificables y fáciles de revisar, con menos trabajo innecesario» y el logo de Openbank.
- **E31**: «¿Preguntas?», «Devin en el día a día» y el logo, en el mismo sitio que en E30.
- Decisión: «Principales herramientas» lleva el icono del agente (`bot`), el del bloque central.
- Capturas: `E30-1…2.png`, `E31-1.png`.

### Primeros pasos (E02–E03) · `http://localhost:5173/#E02/1`

- **E02**: 1 «¿Dónde se ejecuta?» y «¿Desde dónde interactúo?»; 2 las dos islas, Local y Cloud; 3 las tres ventajas de Local (etiquetas de ventaja); 4 en Cloud, «Una tarea con objetivo claro» cae y «se entrega y se ejecuta sola»; tras una pausa, el calendario la repite (tres pulsos) «Cada semana» y llega «Automatizar flujos repetitivos»; 5 dentro de Local, Desktop y CLI, con para qué sirve cada una; 6 un cable une Desktop, CLI y la tarea de Cloud: «Pueden combinarse».
- **E03**: la captura de Desktop está pendiente: se ve su marcador. 2–7 un resaltado (el acento) rodea cada control y una guía lo une a su etiqueta, a la derecha: «Cuadro de mensajes», «Parte 2 · Modelos», «Parte 2 · Effort», «Parte 4 · Planificar», «Parte 2 · Contexto», «Parte 3 · Coste»; solo se ve el resaltado del paso; las etiquetas se quedan; 8 «Antes de empezar: modelo, effort y modo».
- Pendiente (E03): la captura real y la posición real de cada control (ahora, provisionales en `CONTROLES`). Tampoco están las líneas de puntos «hacia la región del mapa donde se explica (se ve en el siguiente vuelo)»: necesitan dibujarse en el mundo, fuera de la pantalla; cada etiqueta dice ya la parte.
- Duda (E02): el cable que une las tres opciones se junta entre las dos islas; si se ve forzado, otra opción es una línea bajo las islas.
- Capturas: `E02-1…6.png`, `E03-1…8.png`.

## Cambios en `design/`

- **Ventana horizontal en toda la presentación** (migración):
  - Fuera `.recipiente`, `.recipiente__capas`, `.recipiente--mini`, `.escala`, `.nivel--vertical` y `--recipiente-*`. El nivel (`.nivel`) es ahora siempre vertical.
  - Nuevos: `.ventana--mini` y `--ventana-mini-alto` (48 px: subagente y hub); `.hueco--ventana` (antes `--recipiente`); `.ventana__relleno > .capa:empty` sin relleno lateral (si no, las capas finas sin texto se ensanchaban).
  - Corchete de caché horizontal: va bajo la ventana (o sobre ella, `.corchete--arriba`), desde la izquierda; su muestra en la leyenda también.
  - Efectos: `apilarCapa` → `llenarVentana` (las capas entran de izquierda a derecha con un barrido, sin deformar el texto); `subirNivel` → `moverNivel` (en x); `caerAlRecipiente` → `entrarEnVentana`; `alargarCorchete` crece desde la izquierda; nuevo `vaciarVentana` (compactar). Sus demos, actualizadas.
  - `--ease-asentado` → `--ease-llenado` (power2.out): el rebote no tenía sentido en un barrido.
  - Láminas: vocabulario 1 (ventana, capacidades, corchete con acierto y fallo), 2 (subagente con su ventana pequeña debajo), 3 (hueco en píldora), E23 (dos ventanas, una sobre otra, con el desglose a la derecha) y E09 (la escena real, por pasos).
  - «recipiente» → «ventana» en `escenas.md`, `CLAUDE.md` y las cabeceras.
- `trazar` limpia el `clip-path` al terminar una línea discontinua; `alargarCorchete`, también.
- Hub: `--bucle-diametro` 480 → 560 px (la tarjeta del agente mide 454 px con su relleno: el bucle la rozaba). Nuevas `--dur-vuelta` (1,5 s, media vuelta lenta) y `--dur-vuelta-rapida` (0,8 s, una vuelta rápida).
- Línea de lectura de la ventana (`.ventana__lectura`) y su efecto `releerVentana`: el modelo relee el contexto (E19, y la usará E23). Con su demo.
- Iconos nuevos: `thumbs-up` y `ban` (E18); `user` y `message-square` (E13); `equal-not` (E28).
- Lámina vocabulario 3: el bucle con las herramientas encima y la tarjeta centrada.
- Gráfica: anotaciones opcionales en `grafica()` (dibujos.js): `notas` (el nombre de un punto), `resaltar` (un anillo más grueso encima del punto, `.grafica__punto--resaltado`) y `flechas` (`.grafica__flecha`, y `--discontinua` sin punta para unir dos puntos a la misma altura). Las partes llevan `data-serie`, `data-punto`, `data-resalta`, `data-nota` y `data-flecha` para animarlas por separado. Muestra en la lámina vocabulario 5.
- Tabla: `border-collapse: separate` (con `border-spacing: 0`): así cada línea es de su fila y la tabla se puede construir fila a fila (con bordes colapsados, una fila oculta seguía dibujando su línea).

## Revisión con `Cambios.md` (15-10-2026, tarde)

Cambios pedidos por el usuario en `Cambios.md`, escena a escena. Aquí, solo lo que no se deduce del código o de `escenas.md`: supuestos, decisiones y lo nuevo en `design/`.

### Supuestos que conviene confirmar

- **E07:** «gpt 6.1 Luna» y «sol 6.1 luna» no existen en las notas. Se ha puesto **GPT-6 Luna** para lo sencillo y **GPT-6.1 Sol / SWE-2 en promoción** para lo complejo; «Trabajo repetitivo», con GPT-6 Luna. SWE-2 (no «SWE 2.0») está al 75 % de descuento hasta el 31-12-2026 en Enterprise.
- **E08:** se pidió una introducción de «qué es el contexto» como título; se ha entendido «qué es el effort» (la escena es de effort): «El effort regula cuánto "piensa" el modelo antes de responder», del guion 2.2. El consejo de la tercera columna se ha dejado como estaba («Consejo:...» quedó sin completar).
- **E11:** cifras ficticias nuevas para que la del nivel no choque con «200K»: llena 68 % → continuar 75 % → compactar 12 % → sesión nueva 5 % (system prompt).
- **E12:** la carpeta de rules es `.devin/rules/` (ubicación preferida según docs.devin.ai/cli/extensibility/rules).
- **«Cifras ficticias»:** quitada en todas las escenas (la última, E23). La píldora `.ficticio` queda solo para «Duración en Devin: pendiente de verificar» (E22); el ayudante `ficticio()` de `comun.js` se quita.

### Decisiones

- Las lecturas de E06 van justificadas con guiones (`hyphens: auto`): sin ellos, la columna de 500 px dejaba huecos grandes.
- E06: «Efectividad» también en la gráfica pequeña de E08 (es la misma). E10 sigue con «Acierto»: es otra medida (recuperación en MRCR).
- Si un título tiene dos frases, cada una va en su línea (`cabecera` de `comun.js`). Ahora ninguno las tiene: E15 se quedó en una.
- E15 (reescrita, 3 pasos): un solo ejemplo, `create_pull_request` (icono `git-pull-request`), con su ficha y sin la vuelta. Paso 1: herramienta y ficha, juntas, centradas y ampliadas; paso 2: se reordenan en el esquema Agente → Tool → Nombre/Descripción/Parámetros → ficha; paso 3: la tabla tool/skill y «No compiten», en una sola entrada. `--definicion-ancho` pasa a 720 px para que la descripción quepa en dos líneas. `voltear` y `.volteo` siguen en el design system, pero ninguna escena los usa ya. Se quitan los pasos [A] de Local (queda un solo [A], en E21). En la fila «Credenciales y permisos», la skill dice «Las que existan en el contexto» (interpretación de la nota).
- E16 (rehecha en 4 pasos, a petición del usuario, para explicar por qué hace falta MCP y para qué sirve): 1 sin estándar (3 agentes × 3 servicios = 9 integraciones), 2 con MCP (todo pasa por el conector: 3 + 3), 3 qué trae un servidor (GitHub y algunas de sus tools; resaltada `create_pull_request`, el ejemplo de E15), 4 los MCPs del departamento. El texto nuevo no está en `Guion Devin.md` (no se toca): sale de la documentación de Devin. Supuestos: los agentes de la fase 1 son genéricos («Otro agente», «IDE con IA»); las tools listadas son del servidor MCP oficial de GitHub; el nombre `mcp__github__create_pull_request` es el que documenta la CLI (`mcp__<servidor>__<tool>`). No se dice que cada MCP ocupe contexto: la documentación no aclara si las definiciones se cargan de entrada o bajo demanda. El MCP aporta tools; las skills llegan con los plugins (E18). Logos de GitHub, Atlassian y Sonar de Simple Icons (CC0), monocromos como los de E05; DS-Workspace, con la llave de Openbank sola, como pidió el usuario: `openbank-llave.svg` es el símbolo del logo oficial, con el mismo trazado y color y el cuadro ajustado. Al ser apaisada, se dibuja a la altura de `--icono-s` (`.servidor__logo--apaisado`) para que pese como los demás, pero ocupa la de `--icono-m`, así que todas las cajas miden lo mismo. Los nombres de grupo (Externos, Internos) van centrados sobre sus servidores. La nota al pie va centrada y el nombre del repositorio en `--peso-fuerte` (Outfit: DM Mono no tiene 600). Se quitó la fila de credenciales (candado): ninguna escena lo usa ya (sigue en el design system, como `.volteo`). Tiempo: ~2,5 min (antes ~1).
- E17 (7 pasos): título «Un subagente resuelve parte de la tarea en su propio contexto». Paso 2: la ventana del subagente se llena, al final queda su resultado (capa en rojo) y una flecha roja, por debajo de las ventanas, lo lleva al final de la del agente; el coste de cada uno sube a la vez que la flecha. Columnas centradas (tarjeta, ventana y coste). Paso 3 (nuevo): el agente con el modelo del IDE y tres tipos de subagente con su modelo; supuesto: Documentación con GPT-6 Luna, Research con SWE-2 y Análisis con GPT-6.1 Sol (de menos a más complejo, según E07). La frase del modelo es la del usuario; el guion dice que el subagente general hereda el modelo y el de exploración puede usar otro. Pasos 4 y 5: cuándo sí y cuándo no, en visual (tres subagentes; en el «no», cada uno vuelve a cargar el contexto del agente para un resultado mínimo). Se quitan el encargo (nota «E17/6», que en la numeración del usuario era el encargo, porque la nota de E17:7 habla del conflicto), las listas sí/no, «Ganas/Pagas» y «Cifras ficticias». Paso 6: en vertical, el conflicto y, debajo, un worktree por subagente (icono `git-branch`, nuevo); a la derecha, la frase y el consejo (paso 7).
- E18 (1 paso): toda la columna entra en una sola animación, grupo a grupo. Lo que trae un plugin, en dos columnas y tres filas (en tres columnas no cabía en el panel de 560 px): Rules (sin «y AGENTS.md», como pidió el usuario si no cabía), Skills, Tools, Servidores MCP, Subagentes y Hooks; Hooks deja de ser [A] para que la cuadrícula sea siempre simétrica (queda un solo detalle [A], en E23). «Recomendado» pasa a «Opcional» (icono `circle-check`, nuevo). Las tres marcas, en una fila, como etiquetas compactas con el icono en color. Última fila: «El departamento tiene:» 1 plugin, centrado, y debajo MCPs, Skills, Tools y Rules, con flechas curvas que se trazan (`abanico` admite ahora `vertical: true`). Sin la frase «Ya conocemos las piezas…».
- E19 («Qué es un token», en el hub) eliminada: fuera de `escenas.md` (sección, fila del hub, mapa, ruta y resumen), de `mapa.js` (zona y `contextoComoVentana`), de los ayudantes del hub que solo usaba ella (`finDeSesion`, `lectura`) y de las fichas de los componentes. Su fichero queda en `src/escenas/descartadas/E19.js` (no se carga; se puede borrar). No se renumeran las escenas siguientes, para que las notas de `Cambios.md` sigan cuadrando: la parte 3 empieza en E20. El guion 3.1 («Qué es un token») se queda sin pantalla. Total: 30 escenas y 102 pasos.
- E20 (rehecha, 2 pasos): «¿De qué depende el coste total?». Paso 1: el coste total (icono de dólar, como los precios de E05) y una llave que abarca Tokens → Modelos → Coste por token → Coste en ACUs. Paso 2: el ejemplo bajo cada pieza; supuesto: 50.000 tokens de salida con GPT-6.1 Sol a 10 $ el millón (E05) = 0,50 $ en tokens y ≈ 0,60 $ en ACUs (el +20 % del guion, que el ponente explica de palabra). Sin el benchmark ni «no es una tarifa». La etiqueta de la zona pasa a «El coste total» (con el mensaje, repetía el título).
- E18: el plugin del departamento se llama `ods-ds-mcp` («1 plugin: ods-ds-mcp»).
- E21 (1 paso): sin las fichas ni «Lo que genera el modelo»; los cuatro tipos entran seguidos en una sola animación («Cache write» se ve durante la animación y lo sustituye «Cache read»). Ventana a todo el ancho. Precios de GPT-6.1 Sol según docs.devin.ai/desktop/models (nivel estándar, 15-10-2026): input 2 $, cache write 2,5 $, cache read 0,1 $, output 10 $, con su nota de fuente. Las barras, exactamente a escala (60 px por dólar; cache read, 6 px). Se quita el paso [A] de tarifas (ya no queda ningún paso [A]; solo un detalle [A] en E23). E22 dibuja la caché con el coeficiente de Anthropic (10 %); E23 calcula con GPT-6.1 Sol (cache read al 5 % del input).
- E22: el principio de la llamada 2 ya no se rellena al caducar. En el paso 1, tras el corchete, lo que se relee de caché (los 20K fijos y el primer mensaje) toma el color de la caché y se encoge hasta su coste, un 10 % del input (detalle: «cuesta un 10 % del input; solo lo nuevo se paga completo»); el corchete se encoge con ello. En el paso 2, mientras corre el reloj, sigue así; al caducar, el corchete pasa a discontinuo y lo cacheado vuelve a ser de entrada y a su tamaño. Bajo el reloj: «Anthropic ofrece por defecto 5 minutos de caché». La capa «Fijo» de la llamada 2 va sin texto (encogida, no cabe). En E21, la barra de cache read también va en el color de la caché.
- E23 (caso real, 10 llamadas): tarifas de GPT-6.1 Sol (las de E21). 20.000 fijos; en cada llamada, 21.000 tokens nuevos y 2.000 de salida: la 10 lleva 248.000. Sin caché 3,09 $, con caché 0,94 $ (−70 %); la primera llamada, +21 % (0,123 $ frente a 0,102 $). Pausa a mitad (la caché caduca en la llamada 6, que cuesta 0,41 $): 1,26 $, +34 %. Compactación tras la 7 (relee el contexto de caché y escribe un resumen de 5.000: 0,068 $): 0,968 $, +3 %. Se quita el detalle [A] «En 30 llamadas» y el «−79 % en 30» de la conclusión (eran del caso ficticio): ya no queda nada [A]. Sin «Cifras ficticias»; la gráfica gana alto (306 px) y las ventanas bajan (Sin caché en 590, Con caché en 740), con el desglose alineado con ellas, en dólares. Las ventanas, a escala de 260.000 tokens y sin capacidad escrita (la de GPT-6.1 Sol no consta en la documentación). Lo que se lee de caché va en azul y la línea «Con caché» pasa a la serie 2 (azul), «Sin caché» a la 1; al caducar, lo cacheado vuelve a oscuro (ya no se rellena otra vez).
- E23, segunda ronda: sin la variante de compactación ni su conclusión (5 pasos; 97 en total). La pausa larga rebobina llamada a llamada: las capas de cada llamada se recogen y, a la vez, el corchete, el color de la caché, el desglose y la cuenta vuelven a la anterior (antes, las capas desaparecían de golpe al pulsar: el `llenarVentana` de las llamadas que se vuelven a llenar las recortaba al construir el paso; ahora admite `immediateRender: false`). Las dos conclusiones son viñetas (`.vinetas`, con los iconos `coins` y `timer`), centradas en altura en la columna derecha.
- E24: cada pregunta lleva su número grande en su color y la petición mejorada se subraya en el paso 4 de un solo trazo (fila a fila, en orden de lectura), cada fragmento en el color de su pregunta; fuera los números del texto. Nuevo en `design/`: `--color-pregunta-1` a `5` (azul marino, verde, azul, ocre y turquesa; el ocre y el turquesa, `color-mix` de marca), el componente `.subrayado` (con `--vacio` y una variante por pregunta; muestra en la lámina 2) y el efecto `subrayar` (con `--dur-trazado`, demo incluida).
- E25: «El resto, accesible si hace falta» se solapaba con el fragmento; las líneas del log van más juntas y el fragmento sube, así que el texto queda 32 px por debajo.
- E29: «Y los de cada pieza, que ya vimos en su sección» se solapaba con la tabla; baja a 795 (48 px bajo la tabla) y los tres hábitos de pieza, a 852. Cada etiqueta va centrada sobre su texto, en tres columnas iguales: el conjunto queda centrado en la fila. La columna «Alternativa» sigue donde estaba (x = 808), pero su rótulo va centrado en x = 960, el eje de la pantalla sobre el que también se centra la etiqueta «Contexto».
- E30: las cinco preguntas entran en una sola cascada, sin pausas de lectura (antes, una a una con 1,5 s entre ellas: unos 8,5 s): cada fila, 0,15 s después de la anterior (`--escalonado-filas`, nueva), unos 1,1 s en total. Punto 2: «Modelo», «Effort» y «Modo» (iconos `cpu`, `gauge` y `code-xml`, los de E03); punto 4: «Tools» y «Skills» (`puzzle`).
- E31: solo una moneda en 3D con «?» en relieve, en el centro, girando despacio sobre su eje vertical (una vuelta cada 6 s, lineal), y el logo abajo a la derecha; fuera «¿Preguntas?» y el título de la charla (se queda la etiqueta de la zona). Es la única excepción, pedida expresamente, a «nada de giros 3D decorativos» (anotada en `CLAUDE.md`). Nuevo en `design/`: `.moneda` (dos caras con reborde; un «?» con volumen, más grueso que la moneda, que sobresale 24 px por cada cara y por detrás se ve en espejo; canto en banda continua de segmentos, sin rendijas al pasar de canto; el signo ya no son capas de texto apiladas (con 48 y con 96, sus bordes parpadeaban en Chrome y el giro no iba del todo fluido): es una pieza geométrica (un solo trazo continuo: gancho, curva de enlace que llega en vertical al palo, palo y punto, en proporción al radio) con dos tapas SVG y paredes perpendiculares, como el canto, un píxel por dentro de las tapas, y el signo repetido pegado a cada cara para que no asomen puntos oscuros por las juntas; el cuerpo, `will-change: transform`; `moneda()` en `dibujos.js`), `--color-moneda`, `-canto`, `-luz` y `--color-sobre-moneda`, `--moneda-diametro`, `-grosor` y `-perspectiva`, `--dur-moneda` y `--ease-moneda`, y el efecto `girarMoneda` con su demo; muestra en la lámina 7 (×0,5), con la captura algo más estrecha. En «igual», E31 marca la moneda como distinta: es el ángulo del giro, que no para.
- Navegación: `F` pone y quita la pantalla completa (sin barras del navegador; Esc también la quita) y Fin va a las preguntas (E31) animando, como si se avanzara, por si falta tiempo. En la vista de ponente, botón «Ir a las preguntas (Fin)» y la misma tecla.
- Las flechas con punta (`abanico`, `saltos`, las de `grafica`) son ahora un solo trazo: el discontinuo se reinicia en cada subtrazo y la punta aparecía antes que la línea.

### Nuevo en `design/`

- Variables: `--dur-trazado-serie`, `--escalonado-series` (series de una gráfica, seguidas), `--dur-desplazar` y `--ease-desplazar` (columnas que se desplazan, E08), `--dur-ajustar` y `--ease-ajustar` (lo ocupado de una ventana crece o se recoge, E11).
- Efecto `ajustarVentana`: el relleno se recorta, el nivel va pegado a su borde y su cifra cambia a la vez. Con su demo.
- Componente `.abanico` (`abanico()` en `dibujos.js`): flechas curvas de un concepto a sus partes (E13). Muestra en la lámina 6.
- `.salto` y `.salto--acento` llevan el color (por `currentColor`); muestra de `.proveedor` en la lámina 5.
- `.conector`: aro punteado `--color-texto-inverso` para separarlo del agente (E16 y E18). `.servidor__logo`: un servidor real lleva el logo de su servicio, del alto de `--icono-m`; muestra en la lámina 4. Logos nuevos en `assets/logos/` (github, atlassian, sonar y openbank-llave), con su nota en `assets/licencias/servidores-mcp.txt`.
- Componente nuevo «Tokens leídos de caché»: `.capa--cacheada` y `.leyenda__muestra--cacheada`, con `--color-cacheado` (= royal blue; 4,9:1 sobre el fondo, 2,9:1 de luminosidad con la entrada) y `--color-sobre-cacheado`. Efecto `cachearCapas` (toman el color y se encogen hasta su coste; con `cacheadas: false`, vuelven), con `--dur-ajustar`/`--ease-ajustar` y su demo. Muestra en la lámina 1 (el corchete con acierto, sobre capas cacheadas) y en su leyenda.
- Componente nuevo «Resultado de un subagente»: `.capa--resultado` (capa en `--color-acento`) y `.traspaso` (flecha en codo, `traspaso()` en `dibujos.js`), con su muestra en la lámina 2 en lugar de la ficha «resumen + evidencias». `--dur-trazado-serie` también vale para el traspaso (su comentario lo dice).
- Colores nuevos (rol, semántica): `--color-obligatorio` (royal blue), `--color-opcional` (≈ #18904A, verde de la serie 3) y `--color-prohibido` (el acento: E18 no tiene otro). Su luminosidad es parecida; se distinguen también por el icono (candado, check, prohibido) y por el nombre. Pares de contraste añadidos (sobre la superficie, 3:1). Etiqueta: variantes `.etiqueta--compacta` y de las tres marcas; muestra en la lámina 3, junto a la caja de plugin (la 6 ya tenía su acento).
- Componente nuevo `.llave` (`llave()` en `dibujos.js`): agrupa lo de debajo y señala con su pico lo que lo resume (E20); muestra en la lámina 6. Icono nuevo `circle-dollar-sign`.
- Comprobaciones: 22/22.

## Revisión con `Cambios.md` (15-10-2026, noche · segunda ronda, sin orden de diapositivas)

Las notas ya no van en orden: cada bloque nombra su diapositiva. Pasos: de 96 a 92 (E02, E05, E06, E10 y E13 juntan pasos; E12 gana uno).

### Supuestos que conviene confirmar

- La segunda nota «E05» (las de E06/1, E06/3 y E06/4) es de E06; el título nuevo («La efectividad de un LLM depende de: **Modelo**, **Generación** y **Effort**») sí se aplica a E05, como dice su bloque.
- E03: el título que cambia es el mensaje (el texto grande); la etiqueta sigue «Dónde está cada control».
- E12: el documento que cae en la ventana sigue llamándose AGENTS.md (el usuario lo llama «la rule»); si las rules son el concepto canónico, podría ser `rule-1.md`.
- El atenuado más fuerte de las series (E06) vale para todas las gráficas (E08, E10, E23 también lo usan).

### Decisiones

- E01: «Devin» en Inter (`--fuente-devin`), a peso medio y en el negro del logo (`--color-devin`). Devin usa NB International Pro (de pago, no se puede incrustar); Inter, que su web también carga, es la libre más parecida a su logotipo. Subconjunto latino de Google Fonts (48 KB), con su OFL.
- Tapas: se funden en la segunda mitad del vuelo que entra en su bloque, con la curva de la cámara (`TAPAS.fundido`), y han desaparecido al llegar; antes, la cámara llegaba, esperaba y la tapa desaparecía.
- E04: el logo de la tapa del centro va justo encima del centro del hub: al acercarse la cámara, la tapa se funde y Devin aparece donde estaba su logo. Para que la portada siga dentro de su tapa, la holgura de la del centro pasa a [440, 380]; en la vista general, el logo y el nombre quedan algo a la izquierda y abajo de su tapa.
- Hub: la pieza «AGENTS.md» se llama «Rules» (concepto canónico), también su capa en la ventana.
- E02: las islas entran con las preguntas (5 pasos); una línea fina (`--color-separador`) separa las ventajas de Local de Desktop y CLI; Cloud entra encadenado (`encadenar`, `--escalonado-solape`: ~1,2 s en lugar de ~4,5 s).
- E03: mensaje «Dónde encontrar cada una de las opciones»; capturas retocadas (grises medios más claros sin tocar el negro y algo de enfoque, las cuatro igual); estado, resaltado, guía (`--dur-trazado-serie`) y etiqueta encadenados (~2 s por paso en lugar de ~3 s); «Antes de empezar» centrado sobre los tres controles.
- E05: solo el logo y la familia (GPT, Claude, SWE); los pasos 2 a 4 en uno, encadenado (~6 s): la fila sube despacio (`--dur-desplazar`), la tabla fila a fila, su fuente y cada salto con su cifra; las cifras de los saltos vecinos, pegadas al arco a la altura de la línea entre niveles (`pegada` en `saltos()`); en el paso 3, las de los saltos desde el económico, en columna. Títulos con **negrita** (`enLinea`, `.texto__fuerte`).
- E06: ejes y líneas en el paso 1 (3 pasos); las series que no se comparan, a `--opacidad-atenuado-serie` (0,12).
- E07: tareas agrupadas por modelo (primero Luna) y el modelo una vez por grupo, centrado en su altura.
- E09: cada capacidad con su tono: 1M superficie, 512K superficie 2, 256K superficie 3 (nueva).
- E10: ejes, líneas y franjas en el paso 1 (2 pasos).
- E11: al pasar a sesión nueva, la ventana no se va: lo compactado se recoge hasta el system prompt; los checks de «Antes de compactar…», a la altura de la primera línea.
- E12: paso 1 solo el texto, paso 2 solo el documento que cae (5 pasos); `api/` resaltada en el paso de los niveles; «24.000 tokens × 3 llamadas» explica los 72.000; fuera «Una rule puede apuntar a una skill»; consejo «Deben ser breves y claras. Si necesitas dar una serie de instrucciones → crea una skill» (en minúscula tras el punto, como en el resto).
- E13: una sola skill (`validar-migracion`) y, a su lado, las dos formas de activarla, centradas juntas (paso 1); en el 2, encadenado, se corren a la izquierda (`--dur-desplazar`), llega la tarea a su derecha y el contenido cae en la ventana (3 pasos). Contadores: «300 tokens · descripción de validar-migracion» y «10.000 tokens · validar-migracion completa» (con guion, como el comando, aunque la nota decía «Validar_migracion»).
- E14: tres vueltas del bucle, todas al ritmo de la primera (2 × `--dur-vuelta`; el paso dura ~17,6 s); sin el contador de llamadas; «Esto es un agente», centrado en la columna del panel. `--dur-vuelta-rapida` ya solo la usa la escena descartada E19.
- E16/3: fuera el texto de debajo («Sus tools se suman…» y «La del ejemplo…»); la fase 2 se centra en y = 600 (antes 560), el centro del espacio bajo el título; el paso 4 baja con ella.
- E16/4: subrama de DS-Workspace a Datahub, a su derecha (un cable recto y un servidor con el icono `database`: Simple Icons no tiene logo de DataHub; si es el DataHub de código abierto, su logo está en su repositorio, con licencia Apache 2.0). La columna pasa de x = 1300 a 1180 para que quepa.
- E15: título de los pasos 1 y 2, «Las tools otorgan nuevas capacidades a nuestro agente» (el mensaje de la escena); en el 3, el de antes con «tool» y «skill» en negrita; la etiqueta, «Tools del departamento» (la nota decía «departamente») y, en la comparación (paso 3), «Tools vs Skills». El icono de `create_pull_request` es el oficial de GitHub: el Octicon `git-pull-request` (MIT, `assets/logos/github-pull-request.svg`, licencia en `assets/licencias/octicons-MIT.txt`), tal cual, en negro.
- E20/2: la píldora azul da el coste en ACUs (≈ 0,30 ACUs) y, debajo, su precio (≈ 0,60 $, con «0,50 $ en tokens»); suben a la vez. Los ACUs salen de un precio de referencia de 2 $ por ACU (el público del plan Teams; el de Enterprise lo fija el contrato): con el ejemplo de la nota, 0,5 ACUs, el precio no cuadraría con el +20 %. Se cambia en `EJEMPLO.precioAcu`. Los logos de «Modelos» usan el componente proveedor (el de Devin se salía de su fondo y se veía su cuadro blanco).
- E21: la ventana se llena de una vez con todos los tipos (input y output); el corchete se queda como «Cache write», sin pasar a cache read; las cuatro filas entran seguidas, sin pausa.
- E22: la llamada 2 entra con un clic (paso 2 nuevo); el temporizador se agota algo más deprisa (`--dur-temporizador`, de 3 s a 2,2 s) y su texto va centrado debajo; fuera el paso de la nota «Duración en Devin: pendiente de verificar» (sigue en la lista de pendientes de `escenas.md`). Sigue con 3 pasos.
- E23: «Cada bloque ≈ 20.000 tokens; los de salida, 2.000», a la derecha del rótulo «Sin caché», desde la llamada 1. La línea de la gráfica ya no aparece casi entera al empezar el paso 3 (cada tramo se pintaba al construirse, `immediateRender`). Las capas de «Con caché» ya no dan tirones: con el escalonado, la segunda capa de cada llamada se veía entera antes de recortarse; ahora `llenarVentana` con `immediateRender: false` las recorta todas al empezar. Las capas de salida, con un ancho mínimo (5 × el contorno; no a escala) para que se vea su relleno blanco, y nunca en el color de la caché; la escala pasa a 275.000 tokens para que quepan. Más deprisa: cada llamada, `--dur-llamada` (0,4 s; el paso 3, de ~6,9 s a ~6 s); el rebobinado, al ritmo de una salida (el paso 4, de ~9,7 s a ~8,2 s); las conclusiones, encadenadas sin pausas (el paso 5, de ~2,8 s a ~1,2 s). Más sitio para la etiqueta de la pausa: los rótulos van 52 px sobre su ventana (antes 40) y la gráfica es algo más baja (288 px).
- E24–E29: las paradas del circuito se numeran del 1 al 6 (antes, con el número de su escena).
- E25/3: el log, el filtrado, el fragmento y «El resto, accesible…», encadenados sin pausas (de ~3 s a ~1,2 s). El log entero se marca con discreción como lo que no hay que hacer: el icono `ban` (el de «hábitos a evitar» de E29) tras «app.log · 1.000 líneas», cuando se filtra. Un ✕ a la derecha de la cabecera parecía un botón de cerrar.
- E26: las tres filas comparten columnas; la de la izquierda mide lo que su texto más largo (460 px), así que cada flecha queda a la misma distancia de las dos columnas. El plan va en la columna de la derecha y «Con una extensión proporcional a la tarea.», centrado en su fila, a su izquierda, en dos líneas equilibradas.
- E27/1: los tres tiempos encadenados sin pausas y los tramos del recorrido a `--dur-trazado-serie` (de ~8 s a ~3,9 s, con el recorrido del circuito).
- E30: fuera el logo de Openbank (E31 lo conserva).

### Repaso de todas las notas de `Cambios.md` (las tres rondas)

De unas 190 notas, casi todas estaban aplicadas. Faltaban o estaban a medias:

- E02 (ronda 1, iconos del mismo tamaño): el anillo de «Cada semana» medía 72 px frente a los 36 px de los otros iconos. Ahora el anillo mide 52 px y ciñe un icono de `--icono-s`: la viñeta ocupa poco más que las otras.
- E15/2 (ronda 1): faltaba «Qué recibe el agente en el contexto:». Va encima de los tres elementos, a la altura de la parte de arriba de la ficha (justo encima de «Nombre» lo cruzaría la flecha que sube a la cabecera).
- E17/6 (ronda 1, «acelera la animación inicial»): fuera la pausa entre el conflicto y la solución (de ~5,7 s a ~4,2 s). «Contexto separado no significa archivos aislados», en dos líneas equilibradas.
- E21 (ronda 1, «elimina "lo que genera el modelo"»): la descripción de Output aún lo decía; ahora, «El más caro por token; incluye el razonamiento».
- E23 (ronda 1, gráfica más alta): al hacer sitio a la etiqueta de la pausa la había bajado de 306 a 288 px. Vuelve a 306; la etiqueta del corchete va en una línea (`.corchete-etiqueta--linea`, nueva).
- E29 (ronda 1, «Alternativa» alineada con «Contexto»): solo se había movido el rótulo. Ahora toda la columna (rótulo e iconos) empieza en el borde izquierdo de la etiqueta «Contexto», medido al montar.

Quedan abiertos, sin cambiar:

- E16 (ronda 1, «¿un MCP aporta tools y skills?»): la pantalla dice que el MCP aporta tools; las skills llegan con los plugins (E18). Un servidor MCP puede ofrecer además recursos y prompts.
- Pendientes de confirmar: el consejo de E08 (la nota quedó en «Consejo:....»), la introducción de E08 (se tomó como «qué es el effort»), `validar-migracion` o `validar_migracion` (E13), los 0,30 ACUs de E20, acelerar las vueltas de E14, el logo de DataHub (E16) y `rule-1.md` (E12).

### Nuevo en `design/`

- Fuente Inter (`assets/fonts/Inter-wght.woff2`, `OFL-Inter.txt`) y `--fuente-devin`; `--color-negro-devin` (marca, del logo de Devin) y su rol `--color-devin`.
- `--escalonado-solape` (y `encadenar` en `comun.js`); `--opacidad-atenuado-serie` (atenuar la lee para las series de una gráfica y `.grafica__serie.atenuado` la usa al saltar); `--color-superficie-3` y `.ventana--minima`; `saltos()` con `pegada`; comentarios de `--dur-desplazar` y `--dur-trazado-serie` ampliados.
- `--dur-temporizador`: de 3 s a 2,2 s (dentro del rango del tiempo simulado, 2–5 s).
- `--dur-llamada` (0,4 s) y `--ease-llamada` (`none`, antes literal en E23); `llenarVentana` con `immediateRender: false` recorta todas sus capas al empezar; la cabecera de «Tokens leídos de caché» dice que las de salida conservan su dibujo.
- Circuito: paradas numeradas del 1 al 6 (cabecera del componente y muestras de `laminas.js` y `documentacion.js`).
- `--repeticion-diametro`: de 72 a 52 px, con el icono a `--icono-s`. `.corchete-etiqueta--linea` (la etiqueta del corchete en una línea), con su muestra en la lámina de E23.
- Comprobaciones: 22/22.

### Portada y Devin, centrados (petición del usuario)

- El logo de Devin y su nombre van centrados en la tapa del centro (y en la portada y la vista general), y el diagrama de Devin, centrado en su pantalla, que es el centro del bloque: al levantarse la tapa, el diagrama está justo debajo.
- Antes el diagrama ocupaba la mitad izquierda de su pantalla (x = 670) para dejar sitio al panel de E14 y E18; E04 lo centraba con un encuadre de cámara propio («diagrama»), y el logo se colocaba sobre él, descentrado en su tapa.
- Ahora el hub va centrado (E04, vista general, bajo la tapa) y solo en las escenas con panel (`HUB.conPanel`: E14 y E18) pasa a la izquierda. Cambia de sitio sin animación y sin que se vea: al entrar en su pantalla, antes del vuelo; al salir, al final. Fuera el encuadre «diagrama».
- El logo ya no está exactamente encima del círculo de Devin: el conjunto logo y nombre está centrado sobre él (el logo, algo por encima; el nombre, algo por debajo).


## Revisión con Impeccable (`critique` + `audit`, 15-10-2026, noche)

Crítica de diseño 28/40 y auditoría técnica 16/20 (instantánea en `.impeccable/critique/2026-10-15T17-42-12Z__index-html.md`). Prioridad elegida: robustez en directo. Se aplican todas las recomendaciones, incluidas la portada y el cierre.

### Robustez en directo

- Doble pulsación: si un paso aún se anima, la primera pulsación lo termina y la segunda avanza (antes, la segunda saltaba la animación siguiente: E23/2 → E23/4). `animando` exige una duración mayor que 0.
- Modo estático (`?estatico`, `prefers-reduced-motion`): `ir()` nunca anima; antes, algunos pasos se quedaban a medias (E04/1 sin sus huecos).
- Vista de ponente: a la izquierda, el apartado del guion de la escena (`notas`, que el generador saca de `Guion Devin.md`); el paso actual, sin acotaciones técnicas, y del siguiente, solo su primera frase. Botones con texto por defecto y barra de progreso desde 0.
- `aria-live`: cada paso se anuncia en texto plano («Título. Paso n de m. Primera frase»); la vista general, «Vista general del mapa.».
- El hub y el circuito, `inert` fuera de su pantalla; el giro de E02 se pausa fuera de su escena (gancho opcional `activa(si)` del contrato).

### Lectura

- Texto atenuado a `--opacidad-atenuado-texto` (0,6, nueva); lo gráfico sigue a `--opacidad-atenuado` (0,3).
- Un icono por concepto: Rules `scroll-text` (mapa, hub, E12, E18), contenido de una skill `puzzle` (E13), ACUs `receipt` (E20), Desktop `monitor` (E02), Buenas prácticas `route` y Verificar `shield-check` (E30), pasos para reproducir `list-ordered` (E25).
- Un estilo fijo por modelo en las gráficas: GPT-5.6 Sol 1, Opus 5 2, GPT-6 Astra 3 y Fable 5.1 4 (E06, E08); E10 ya seguía GPT-5.6 Sol 1, Opus 5 2 (Sonnet 5, 3).
- E06/3: la lectura añade el precio de igualar: «aunque pagando ~×2,7 por intento» (13,48 $ frente a 4,95 $; la revisión decía ~×2,5, pero los datos de la gráfica dan 2,7).
- E07, E08 y E17: la unidad «u.» pasa a ACUs, la unidad de consumo de Devin, que el guion ya nombra en la apertura (las cifras siguen siendo ficticias, sin rótulo). En E07 la unidad va solo en el total, para que la fila quepa.
- E22: las ventanas, a la escala de 40K y sin capacidad escrita (como en E23). Lo que se relee de caché, al 10 %, mide ~70 px: el corchete ya no es una «U», sin falsear la proporción; y desaparece el «100K» que contradecía el ancho como coste.
- E23: todas las cifras en dólares con tres decimales (textos, leyenda y desglose: antes «3,090 $» en un sitio y «3,09 $» en otro); el +34 % dice su base («frente a sin pausa: 1,259 $ frente a 0,940 $»); en el paso 5, cada conclusión con su cifra grande encima, al tamaño del resultado de los pasos anteriores, y solo «−70 %» en acento.
- E27: el desvío y el fallo real usan el componente nuevo `.hito` (antes, un marcador de 56 px dibujado dentro de la escena).
- E29/2: los tres hábitos de cada pieza llevan el ⊘ (`ban`) de la tabla; sin él parecían consejos.
- E30/2: el mensaje final, el del guion con el consumo, la promesa de la charla: «Tareas correctas, verificables y fáciles de revisar, con menos trabajo y consumo innecesarios»; la segunda línea, en acento (el único de la pantalla).
- Vuelo E18 → E20 (y cualquier entrada en un bloque): el icono y el título de la tapa se funden antes que ella, desde `TAPAS.fundidoContenido` (0,25) del vuelo hasta que empieza la tapa; ya no cruzan, enormes, el título de la escena.

### Portada y cierre

- Portada (E01/1): bajo «Devin», pegado al nombre y discreto, el resto del título de la charla («en el día a día: cómo aprovecharlo mejor y controlar el consumo», `TAPAS.lemaCentro`) y el logo de Openbank. El encuadre pasa a `TAPAS.portada` 0,8: el logo y el nombre siguen grandes (el logo, de ~350 a ~325 px de alto).
- Cierre (E31): abajo a la izquierda, a la altura del logo de Openbank, la franja con lo que queda para después: «Guía de instalación: repositorio Master-Control-Program» (`git-branch`) y «Plugin del departamento: ods-ds-mcp» (`package`). La moneda sigue sola en el centro.

### Peso y código

- Capturas de E03 en WebP sin pérdida (`cwebp -lossless -z 9`): los mismos píxeles en 469 KB frente a 1.015 KB. Los PNG originales se quedan en `src/escenas/capturas/` (ya no se importan).
- Inter recortada a los glifos de «Devin» (`Inter-Devin-wght.woff2`, `pyftsubset`, con el eje de peso): de 48 KB a 2 KB. La documentación muestra en su fila solo «Devin».
- La nota de `data-opciones` en `comun.js` decía «nunca duraciones»; E03 y E05 pasan `duration: s(…)`. Ahora dice que una duración o una curva solo se leen de su variable.
- Se conservan, aunque ninguna escena los use: `moverNivel`, `voltear` y `desplegar` (vocabulario documentado de la ventana, la herramienta y la skill); `--dur-vuelta-rapida` (la que haría falta para acelerar las vueltas de E14, pendiente de confirmar); `--pausa-por-palabra` y `--elevacion-0` (documentan reglas).

### Nuevo en `design/`

- `--opacidad-atenuado-texto` (0,6); `atenuar` la aplica al texto.
- Iconos `scroll-text`, `receipt`, `monitor`, `list-ordered` y `shield-check` (`npm run iconos`).
- Componente `.hito` (`.hito__circulo`, `.hito__texto`, `.hito--abajo`) con `--hito-diametro` (62 px) y su muestra en la lámina 7 de vocabulario, bajo la moneda.
- Tapa del centro: `.tapa__pie`, `.tapa__lema` y `.tapa__marca`, con `--tapa-lema` (16 px) y `--tapa-marca` (20 px), a escala ×`--tapa-escala`.
- `--fuente-devin` apunta a `Inter-Devin-wght.woff2`.
- Cabeceras al día: gráfica (estilo fijo por modelo), tapa y moneda.
- Comprobaciones: 22/22.

## Revisión con `Cambios.md` (15 y 16-10-2026 · tercera ronda, notas por diapositiva)

Las notas se aplican según se escriben (monitor sobre `Cambios.md`). Pasos: de 92 a 90 (E05 y E08 pierden uno; E14 pierde su pausa final).

### Supuestos que conviene confirmar

- E08: el título de la nota («El Effort o Esfuerzo….») parece incompleto; sigue «El effort regula cuánto «piensa» el modelo antes de responder».
- E01: el subtítulo de la portada cambia («Conceptos básicos y cómo aprovecharlo mejor»), pero el `<title>` y el h1 para lectores de pantalla siguen siendo el título del guion.
- E02: se mantiene el detalle «La misma tarea, sin intervención» bajo «Automatizar tareas repetitivas».
- E03/4: «SWE-1.6 Slow» no admite effort; la etiqueta podría añadir «si el modelo lo admite».
- E07: el rótulo «Modelo recomendado» se centra con su columna.
- E08: «+19 %» y «−2 %» son puntos de efectividad; podrían escribirse «+19 pp».
- E10: la tabla pasa a «Efectividad según la ventana usada», como el eje.
- E25: «Alinea a la izquierda el texto final» se lee como llevarlo a la columna izquierda, bajo la hipótesis (ya estaba alineado a la izquierda bajo el fragmento). El texto, tal cual la nota: «El resto de contexto completo…».

### Decisiones

- Paso intermedio entre bloques: en el último paso de un bloque, avanzar lleva a la vista general y la siguiente pulsación entra en el bloque nuevo (`cambiaDeBloque` y `nav.haciaGeneral` en `src/pasos.js`); retroceder desde esa vista vuelve al paso. La vista de ponente lo anuncia («Siguiente · vista general y, después, …»). Desde E01/2 no hay paso intermedio, y Fin salta directo.
- E01: el nombre, más pegado al logo; subtítulo «Conceptos básicos y cómo aprovecharlo mejor» (`TAPAS.lemaCentro`).
- E02: «Automatizar tareas repetitivas»; el bucle de repetición, de 52 a 64 px; «Trabajar con múltiples repositorios» con el icono `folders`.
- E03/4: el resaltado de Effort, en el hueco a la derecha de «SWE-1.6 Slow / 200K context» (caja `[728, 254, 982, 348]`, guía a y = 301).
- E05: tres pasos (familias · tabla y saltos · generaciones). Los tres arcos pequeños entran a la vez y, sin clic extra, el ×100 como semicírculo con su cifra pegada; desaparece el ×40. Título en una línea: «La efectividad de un modelo depende de su: **Familia**, **Generación** y **Effort**» (`.tipo-titulo-ajustado`, 53 px). Frase final: «El nombre de la familia no basta: **es necesario tener en cuenta la generación**.»
- E06: título «Comparativa Efectividad – Coste».
- E07: la columna del modelo, centrada; «GPT-6.1 Sol / o / SWE-2 en promoción», apilados; las dos filas de intentos en una rejilla (totales alineados, el intento del modelo bueno centrado bajo los tres del barato) y «El barato acaba costando más» centrado en su alto.
- E08: sin el paso 4 (la tercera columna «El esfuerzo no sustituye al contexto»); queda en tres pasos y sale de la tarjeta de consejo.
- E10: eje «Efectividad».
- E14: sin «Esto es un agente» ni su pausa final.
- E15/3: cuatro filas (fuera «Credenciales y permisos», «Reutilización» y «Coste de crearla»); la tabla y su pie, centrados en la banda libre.
- E16: agentes y píldoras de servidor centrados.
- E23: rótulos del desglose en una columna de 180 px (precios alineados); el resultado baja a y = 362; las salidas también se marcan cacheadas cuando se leen de la caché (se escriben en k + 1 y se leen desde k + 2); fuera «225.000 tokens» bajo el corchete.
- E25/3: el log entero se atenúa a la vez que llega el fragmento, como la petición inicial de E24 (las líneas que no son el fragmento, más aún); el texto final, «El resto de contexto completo puede estar disponible para consultarlo», a la izquierda, bajo la hipótesis.

### Nuevo en `design/`

- `--tipo-titulo-ajustado` (53 px) y `.tipo-titulo-ajustado`; `cabecera()` admite una clase para el título.
- `--repeticion-diametro`, de 52 a 64 px.
- `.tapa--centro .tapa__titulo`, con margen superior negativo.
- `saltos()` (`dibujos.js`): opción `redondo` y `aparte` para el salto grande en semicírculo.
- `.capa--cacheada`, sin sombra; también en las salidas.
- Icono `folders` (59 iconos).
- Cabeceras al día (salto, capa, repetición); `DESIGN.md` regenerado.
- Comprobaciones: 22/22. `dist/index.html`: 1,12 MB, sin peticiones externas ni errores.

## Revisión con `Cambios.md` (16-10-2026 · cuarta ronda)

### Decisiones

- E01 (y cualquier alejamiento, también con «O»): los bloques lejanos salían cortados o en blanco durante el vuelo, en Chrome y en Brave, sobre todo con el Mac cargado. La causa era el `will-change` que la cámara ponía en el mundo mientras volaba: Chrome lo partía en una docena de capas pintadas a la escala de salida y, al alejarse, no llegaba a pintar lo que entraba. `volarCamara` ya no lo pone, y Chrome pinta cada fotograma entero, a su escala. Mismos 60 fotogramas por segundo en headless, también con la CPU ×4 más lenta; con la memoria de GPU limitada a 64 MB, todos los fotogramas completos. El usuario lo ha confirmado en su Chrome.

- E33 · Post-créditos (nueva, petición del usuario): después de las preguntas, en la misma pantalla; las tecnologías principales con que se ha hecho la presentación (Claude Code, GSAP, d3-interpolate, Vite y vite-plugin-singlefile, Impeccable, Playwright, Lucide y las tipografías) y una línea sobre el design system. Fin sigue llevando a las preguntas: `PREGUNTAS` en `src/datos/mapa.js` (antes, «la última escena»). `cabecera()` admite el icono de la etiqueta. Pasos: 91.

### Nuevo en `design/`

- `volarCamara`, sin `will-change`; `DESIGN.md` al día.
- Iconos `popcorn`, `clapperboard`, `spline`, `zap`, `pen-tool`, `drama`, `shapes` y `type` (67). `DESIGN.md` pendiente de regenerar por el recuento de iconos.

### Paleta canónica: el prototipo 1, «claro con más contraste» (petición del usuario)

- De los cinco prototipos (`prototipos/`), el usuario fija como canon el 1. Se trae su `design/design-system.css` y la introducción de color de `design/design-system.html`; nada más cambia.
- Color:
  - El fondo pasa a Cinderella y Old lace sale de la marca.
  - Nuevas variables de marca de openbank.es: `--color-porcelain` (superficie 2), `--color-cian` y `--color-amarillo`.
  - Texto 2 (≈ #213B50, 10,5:1) y texto 3 (≈ #405767, 6,8:1) más oscuros, y separador más marcado.
  - La caché, toda en azul, corchete incluido. El razonamiento, en cian aclarado. La serie 3, algo más oscura.
  - Preguntas 4 y 5 de E24 en amarillo y cian oscurecidos.
- Sin color: `--peso-display` pasa a 400, `--trazo-fino` a 3 px, `--trazo-contorno` a 4 px e `--icono-trazo` a 2,5; `--elevacion-1`, navy al 22 %.
- Comentarios corregidos: el negro de Devin da 21:1 (no 19:1); el acento sobre la crema nueva, 4,48:1. Basta, porque todo texto en acento mide 24 px o más y su mínimo es 3:1.
- Comprobaciones 22/22. Todas las escenas verificadas: igual llegando animando que saltando, salvo las diferencias conocidas (giros sin fin y paso por la vista general); nada fuera de zona; nada < 24 px. `DESIGN.md` regenerado.
- E02/2: «Acceso a lo local» pasa a «Acceso completo local».
- Pantalla completa (F) en una pantalla que no es 16:9, como la de un portátil de 16:10: el escenario era un 16:9 centrado y alrededor quedaban bandas del color del fondo. Ahora ocupa la ventana entera y la cámara encaja cada pantalla de 1920 × 1080 sin recortarla, así que alrededor se sigue viendo el mapa (`src/main.js`, `src/esqueleto.css`). Al cambiar el tamaño de la ventana, la vista se vuelve a encajar con su rectángulo: antes reutilizaba el ancho calculado para la proporción anterior, y en una pantalla más ancha que 16:9 recortaba la escena (`src/camara.js`). Probado a 1512 × 982, 16:10, 4:3, 21:9 y 16:9: la pantalla de cada escena cabe entera en todas.
- E33: a pie de página, centrado y en acento (el único de la pantalla), «**DISCLAIMER:** Ninguna ACU sufrió daños durante esta presentación». La rejilla de tecnologías sube a y = 312 y la línea del design system, a y = 840, para separarlas.
