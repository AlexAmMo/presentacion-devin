# Construir las pantallas

Fase siguiente al esqueleto (`3b8f694`): cada escena pasa del marcador de posición a su fichero real, `src/escenas/EXX.js`, que cumple el contrato de `src/escenas/contrato.js`.

## Método por pantalla

1. **Composición.** Se dibuja el estado final de cada escena de la pantalla, estático, a 1920×1080, con los componentes de `design/componentes.css`. En esta pasada, `irA` no hace nada. Se revisa con una captura de cada escena.
2. **Pasos y animación.** Cada click de `escenas.md` se programa en `irA(paso, { animar, tl })`:
   - con los efectos de `design/motion.js` y los tiempos de `s()` y `v()`;
   - los estados, con `tl.set(…, { attr: { class } })`;
   - el estado 0 es el de antes del primer paso.
3. **Verificación ligera** mientras se itera:
   - una captura por escena;
   - zona segura: nada fuera de x 120–1800 ni de y 96–984;
   - ningún texto por debajo de 24 px;
   - un repaso de los pasos.
   `critique` y `audit` de Impeccable se dejan para el cierre de cada bloque.
4. **Revisión del usuario.** Commit solo cuando lo pida.

## Plantilla de escena (`src/escenas/comun.js`)

- **Pantalla libre:** la escena no va dentro de una isla. Dibuja directamente sobre el fondo, dentro de la zona segura, y la pantalla la marca la cámara. Los marcadores de posición siguen como tarjeta, y eso distingue lo que falta por construir.
- **Cabecera común:**
  - en (120, 96), una etiqueta con el icono de la zona y el título de la escena;
  - en (120, 168), el mensaje de la escena con `tipo-titulo-s`, con mayúscula inicial y sin punto final.
- **Marcas:** «Cifras ficticias» (`ficticio`) cuando hay cifras de ejemplo; nota de fuente (`fuente`) cuando hay datos reales.
- **Composición:** posiciones en px dentro de la escena. El aspecto, siempre de los componentes y las clases `tipo-*`; los colores, solo con `var(--color-…)`.

## Orden

1. **Piloto: Contexto (E09–E11).**
2. **Devin (el hub):** E04, E14, E18 y E19. El bucle mide ya 560 px (la tarjeta, 454).
3. **Los temas del centro**, en el orden de la ruta: Modelos, Effort, Rules, Skills, Tools propias, MCP y Subagentes.
4. **Coste** (E20–E23). E23 es la animación principal.
5. **Buenas prácticas** (E24–E29) y **Preguntas** (E30–E31).
6. **Primeros pasos** (E02–E03), al final: E03 necesita capturas reales de Devin Desktop.

## Estado

**Primera versión de todas las pantallas, con sus pasos y animaciones: hecha la noche del 15-10-2026** (trabajo autónomo, `prompts/06-trabajo-autonomo.md`). El detalle de cada pantalla, las decisiones y las dudas están en `prompts/07-revision.md`; lo que sigue es la historia del piloto.

- La ventana horizontal está migrada en toda la presentación (y el recipiente, retirado).
- Los pasos se declaran en el marcado y `crearPasos` (`src/escenas/comun.js`) los pone o los anima; el contenido [A] lleva `solo-avanzado` y la tecla A lo oculta.
- El hub y el circuito de Buenas prácticas son de su pantalla y su estado sale del paso.
- Sin construir: E32 (caso práctico, pendiente de decidir). Pendientes de contenido: captura real de Desktop (E03), herramientas reales del departamento (E15), tarifas de la cuenta (E21), duración de la caché en Devin (E22).

### Historia del piloto

- **Piloto de Contexto, fase 1 (composición):** hecha el 15-10-2026 y aprobada por el usuario como prototipo, también como pantalla libre. Capturas en `.playwright-mcp/contexto/`.
  - **E09:** tres conceptos a la izquierda; a la derecha, el recipiente con la escala, las capas, el nivel al 48 % y solo «Código leído» sin atenuar.
  - **E10:** gráfica de Context Arena con la franja 64K–256K; a la derecha, el remate de Chroma (92 % frente a 38 %) y el detalle [A] (GraphWalks).
  - **E11:**
    - a la izquierda, los tres caminos con sus situaciones;
    - en el centro, el recipiente ya compactado;
    - a la derecha, lo que hay que guardar y los dos consejos.
- **Iteración de la versión base (sin animar), a petición del usuario:** las tres escenas del piloto se refinan hasta que esté satisfecho; después se animan.
  - **E09, versión 2:** una fila por concepto con su ventana de contexto horizontal a todo el ancho.
    - Capacidad: 256K y 512K sobre 1M.
    - Utilizado: cinco capas con su nombre dentro (instrucciones, reglas, conversación, código leído y resultados de herramientas) y el nivel al 65 %.
    - Relevante: el mismo relleno atenuado salvo 16K del código leído, «Contexto útil».
    - Captura: `.playwright-mcp/contexto/E09-ventanas.png`.
  - **E10, versión 2:**
    - A la izquierda, la gráfica, con un color por modelo y dos franjas con su nombre encima: «La caída empieza» (64K–256K) y «Degradación alta» (256K–512K, en rosa).
    - A la derecha, la tabla «Acierto según la ventana usada»: tres modelos con su acierto al ~0 %, 25 % y 50 % de una ventana de 1M (tramos de 8K, 256K y 512K). Las columnas del 25 % y del 50 % llevan el tono de su franja.
    - Fuera de pantalla, solo en el guion: Chroma (92 % frente a 38 %) y el [A] de GraphWalks.
    - Captura: `.playwright-mcp/contexto/E10.png`.
  - **Cambios en `design/` por E10:**
    - colores de marca `--color-royal-blue` y `--color-malachite` (del CSS de openbank.es);
    - roles `--color-serie-1/2/3` (navy, azul y verde oscurecido) y `--color-franja-critica` (tinte del acento);
    - `grafica()` admite varias franjas, con su nombre encima y en varias líneas;
    - la tabla, columnas teñidas como una franja (`.tabla__franja`) y celdas alineadas por la línea base.
- **Decisión: la ventana de contexto pasa a ser horizontal en toda la presentación** (la barra sustituye al recipiente vertical). Ya están `.ventana`, `.ventana__relleno`, `.ventana__capacidad`, `.nivel--vertical` y `--ventana-alto`, con una muestra provisional en la lámina «vocabulario-1». Cuando el usuario apruebe el aspecto, la migración completa:
  - E11 con la ventana horizontal (compactar = la barra se acorta);
  - efectos: `apilarCapa` crece desde la izquierda, `subirNivel` se mueve en x, `alargarCorchete` cubre el prefijo desde la izquierda y `caerAlRecipiente` pasa a entrar en la ventana; con sus demos;
  - ventana pequeña del subagente, hueco del hub con forma de recipiente y láminas (vocabulario, E09 y E23);
  - quitar `.recipiente`, `.escala` y `--recipiente-*`; cambiar «recipiente» por «ventana» en `escenas.md` y en la cabecera de los componentes;
  - regenerar `DESIGN.md`.
- **Pendiente para la fase 2 del piloto:**
  - Los pasos de E09–E11.
  - Lo de los pasos [A] cuando se saltan: con la tecla `A`, el contenido [A] de una escena terminada no debería verse. Propuesta: una clase en esos elementos que `.sin-avanzados` oculte.
  - En E10, valores junto a los puntos de 8K, 128K y 512K: `escenas.md` los pide y `grafica()` aún no los dibuja.
