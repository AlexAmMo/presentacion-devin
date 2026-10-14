# Presentación «Devin en el día a día»

Presentación HTML para una charla interna de Openbank: un único gran mapa por el que se mueve una cámara (GSAP). El guion está en `Guion Devin.md`.

## Fuentes únicas del diseño

Todo lo visual y todo el movimiento salen de estos ficheros. No se copian ni se duplican: se importan.

- `design/design-system.css`: todas las variables (color, tipografía, escena, espaciado, radios, trazos, elevación, opacidad, medidas de los componentes y movimiento) y las fuentes locales (`@font-face`).
  - Cada variable va en una sola línea, dentro de su grupo (`/* ── Grupo ── */`), con su descripción en un comentario.
  - Las curvas dicen con qué duración van (`· con --dur-…`).
- `design/componentes.css`: el CSS de los componentes del vocabulario visual. Cada componente se escribe una sola vez aquí y las escenas lo reutilizan. Su cabecera (`clase`, `forma`, `color`, `medidas`, `icono`, `movimiento`, `escenas`) es su fila en la ficha técnica.
- `design/motion.js`: el único módulo que lee las variables de movimiento. Exporta `v(nombre)` (valor en texto), `s(nombre)` (segundos como número), `px(nombre)` (distancias) y `esEstatico()`, y registra las animaciones reutilizables con `gsap.registerEffect({ …, extendTimeline: true })`.
- `design/dibujos.js`: la geometría de los componentes SVG (gráfica, dial, temporizador, circuito, bucle y curvas para caminos). No lleva colores: devuelve marcado con las clases de `componentes.css`.
- `design/iconos.js`: los iconos de Lucide que se usan, como SVG en línea. Se genera con `npm run iconos -- nombre` y no se edita a mano.
- `design/assets/`: fuentes (Outfit y DM Mono en woff2, con su OFL), logos oficiales y licencias.
- `design/design-system.html`: documentación y referencia visual.
  - No copia ningún valor: al cargarse lee los ficheros anteriores y este `CLAUDE.md`, e importa `componentes.css` y `motion.js` para mostrar los componentes y sus efectos.
  - Su sección «Comprobaciones» avisa de lo que no cuadre entre las fuentes. Revísala tras cada cambio en `design/`.
  - Se abre con `npm run dev` en `/design/design-system.html` y se exporta a un único fichero con `npm run build:design`. Su código está en `design/doc/`.

La presentación se construye con Vite y se exporta a un único HTML autocontenido que funciona con doble clic y sin conexión. Nada se carga por CDN.

## La presentación

- `index.html` y `src/`: el mapa con la cámara, la navegación y la vista de ponente (el mismo HTML con `?ponente`). `npm run dev` la abre en `/`; `npm run build` genera `dist/index.html`, autocontenido; `npm run preview` lo sirve.
- `src/datos/escenas.js` se genera con `npm run escenas` (también antes de `dev` y `build`) a partir de `escenas.md` (texto) y `src/datos/mapa.js` (posición de cada escena, encuadres propios y piezas del hub). No se edita a mano; si los dos ficheros no cuadran, el generador para y dice qué falla.
- Cada escena real va en `src/escenas/EXX.js` y cumple el contrato documentado en `src/escenas/contrato.js` (`montar`, `irA(paso, { animar, tl })`, `desmontar`). Las que no tienen fichero usan el marcador de posición.
- La cámara (`src/camara.js`) solo se mueve con el efecto `volarCamara` y la ruta de `escenas.md`: misma zona → `--dur-camara-corta`; otra zona del hub y su anillo → `--dur-camara`; otra región o la vista general → `--dur-camara-larga`. Las escenas nunca mueven la cámara.
- Teclas: →, espacio y AvPág avanzan; ← y RePág retroceden (sin animar); `O` vista general; `A` incluir o saltar los pasos [A]; `P` vista de ponente. Cada paso tiene su URL (`#E05/3`). `?estatico` (o `prefers-reduced-motion`) corta en lugar de volar.

## Colores: solo variables

- Nunca escribas un color a mano en el código de la presentación: ni hex, ni `rgb()`/`hsl()`, ni nombres como `red`. Usa siempre `var(--color-…)` de `design/design-system.css`. Solo se admiten `currentColor` y `transparent`.
- En componentes y escenas usa las variables de rol y de semántica (`--color-texto-1`, `--color-acento`, `--color-entrada`…), no las de marca (`--color-prussian`…). Así un cambio de paleta se propaga por los roles.
- En SVG, el color va por CSS (`fill`/`stroke` con `var()` o `currentColor`), nunca en atributos como `fill="#…"`.
- En GSAP, los colores se leen de las variables con `v()`; nunca se pasan colores literales a una animación.
- Excepción: los logos oficiales de `design/assets/logos/` se usan tal cual, sin recolorear.

## Cómo ampliar la paleta

1. Busca primero un rol existente que sirva. Si lo hay, úsalo.
2. **Color de marca nuevo** (solo si aparece en el CSS de openbank.es o en el manual de marca): añádelo con su hex al bloque «Color · marca» de `design-system.css`, con un comentario que diga de dónde sale.
3. **Tono derivado** (todo lo demás): añádelo al bloque «roles» o «semántica» como `color-mix()` de una variable de marca, con el hex resultante aproximado en un comentario. Nunca un hex nuevo fuera del bloque de marca.
4. **Nombre por función, nunca por tono:** `--color-<rol>` en español y kebab-case (`--color-cache-fallo`, no `--color-naranja`). El texto encima de ese color es `--color-sobre-<rol>`, su borde `--color-<rol>-borde` y su patrón `--patron-<rol>`.
5. Si el rol se usa también sobre navy, añade su valor en `.inverso`.
6. **Comprueba antes de usarlo:**
   - Contraste de texto ≥ 4,5:1; 3:1 solo para texto de 24 px o más y para gráficos.
   - Que no compita con el acento: nada rojizo, porque el rojo es el único acento.
   - Que se distinga de los demás por luminosidad, no solo por tono.
7. **Documenta en el mismo cambio:**
   - Su descripción, en el comentario de su línea en `design-system.css`. La muestra aparece sola en `design/design-system.html`.
   - Su par de contraste sale solo si sigue los nombres (`--color-sobre-<rol>`, `--color-<rol>-borde`). Si no, añádelo a la lista de pares de `design/doc/documentacion.js`.
   - Si es un concepto nuevo, su componente (ver «Cómo ampliar el vocabulario»).

## Cómo ampliar las animaciones

1. Busca primero un efecto existente en `motion.js`. Si sirve con otras opciones, úsalo.
2. **Nueva duración, curva, escalonado o pausa:** añade una variable a su grupo de movimiento en `design-system.css`.
   - Nómbrala por propósito (`--ease-aparicion`, no `--ease-power3`).
   - Las duraciones llevan la unidad `s`; las curvas son nombres de GSAP (`power3.out`, `back.out(1.4)`, `elastic.out(1, 0.6)`).
   - Rangos de duración (el comentario de cada una empieza por su categoría):
     - micro ≤ 0,3 s;
     - entrada entre 0,4 y 0,6 s;
     - cámara entre 0,8 y 1,5 s;
     - progresión (cifras que suben, líneas que se dibujan, puntos que recorren un camino) entre 0,8 y 1,5 s;
     - tiempo simulado (el paso del tiempo dentro de la escena, como el temporizador de E22) entre 2 y 5 s, siempre con curva lineal (`none`). No se usa para transiciones.
   - Curvas por propósito: apariciones con ease-out, salidas con ease-in, cámara con ease-in-out, interfaz con `back` o `elastic` y cambios de estado breves (`--dur-micro`) con un ease-out suave (`--ease-estado`).
3. **Animación que se repite en más de una escena o forma parte del vocabulario** (por ejemplo, «una ficha cae al recipiente»): regístrala como efecto en `motion.js`.
   - Sus valores por defecto se leen de las variables cada vez que se llama.
   - Se nombra con un verbo en infinitivo (`aparecer`, `volarCamara`, `subirContador`) y lleva encima un comentario `/** … */` con su descripción.
   - En modo estático (`?estatico` o `prefers-reduced-motion`) dura 0 y salta a su estado final.
4. **Coreografía de una sola escena:** va en el fichero de la escena, como un timeline que encadena efectos y usa `s()`/`v()`. Ninguna duración ni curva literal; las distancias y posiciones sí pueden ir en px.
5. **Reglas de movimiento:**
   - Primero llega la cámara, luego pasa `--pausa-tras-camara` y después anima la zona. La cámara nunca se mueve mientras algo se anima dentro de la zona.
   - Se respetan las pausas de lectura (`--pausa-lectura-corta`, `--pausa-lectura`).
   - Nada de partículas, brillos, destellos ni giros 3D decorativos.
6. **Documenta en el mismo cambio:**
   - La variable nueva: su comentario en `design-system.css`. Aparece sola en la sección Movimiento de `design/design-system.html`.
   - El efecto nuevo: su demo en `design/doc/documentacion.js`.
   - Si cambia cómo se anima un concepto, la línea `movimiento:` de la cabecera de su componente en `componentes.css`.

## Cómo ampliar el vocabulario

1. Busca primero un componente existente en `componentes.css`: cada concepto tiene un único dibujo.
2. Dibújalo una sola vez en `componentes.css`, solo con variables (de color, solo roles y semántica) y con su cabecera completa.
   - Si necesita geometría SVG, va en `dibujos.js`.
   - Si necesita medidas propias, van al grupo «Componentes · medidas» de `design-system.css`.
   - Si una fuente no tiene un carácter (→, ↩, ✓, ✕), se usa su icono.
3. Añade su muestra a una lámina de `design/doc/laminas.js` y comprueba en «Comprobaciones» que todo cuadra.
4. Iconos nuevos: `npm run iconos -- nombre`. El color y el grosor van por CSS.

## Cambiar un valor existente

Cambia la variable en `design-system.css`; nunca la sobrescribas dentro de una escena. Si una sola escena necesita un valor distinto, crea una variable con nombre propio siguiendo los pasos anteriores. Lo mismo vale para tipografía, espaciado, radios y trazos.

## Herramientas del agente

Declaradas en el repositorio: plugins en `.claude/settings.json` y MCP en `.mcp.json`.

- **GSAP** (`gsap-skills`): para escribir las animaciones y la cámara.
- **Impeccable** (`/impeccable <comando>`): criterio de diseño y revisión. Sustituye a frontend-design, que no se usa en este proyecto.
- **Playwright MCP**: para ver lo que se construye, con capturas y grabación de vídeo (`--caps=devtools`). Bloquea `file://`: los ficheros exportados se prueban sirviéndolos con un servidor estático simple.

## Impeccable, siempre por debajo del design system

- **Prioridad:** este `CLAUDE.md` y `design/` mandan sobre `PRODUCT.md`, y los dos sobre cualquier propuesta de Impeccable. Si sugiere otra fuente, otro color, otra curva o más decoración, gana el design system.
- **`PRODUCT.md`** es el contexto de producto que lee Impeccable: público, propósito y restricciones. Se actualiza con `/impeccable init` y nunca contradice este fichero.
- **`DESIGN.md`**, si existe, es un derivado: se genera con `/impeccable document` a partir de `design/` y nunca se edita a mano. Cada vez que cambie `design/`, regenéralo (o ejecuta `/impeccable doctor`). La fuente de verdad sigue siendo `design/`.
- **Comandos de revisión**, para usar sobre cada escena al terminarla: `critique`, `audit`, `polish`, `layout`, `clarify` y `optimize`. Corrigen sin cambiar la identidad visual.
- **Comandos que cambian el lenguaje visual** (`bolder`, `quieter`, `colorize`, `typeset`, `animate`, `distill`): solo para proponer. Si se acepta un cambio, se aplica en `design/` (variables, `componentes.css` o `motion.js`) siguiendo las reglas de arriba, nunca dentro de una escena.
- **`delight` y `overdrive`**: no se usan salvo petición expresa; chocan con la regla de «nada decorativo».
- **El hook de diseño** revisa cada edición de CSS, JS o HTML y señala problemas.
  - Si el problema es real, se arregla.
  - Si es una excepción justificada, se suprime de la forma más estrecha posible (`/impeccable hooks ignore-value <regla> "*" --file <ruta>`) y se explica en la respuesta.
  - Nunca se silencia una regla para saltarse el design system.
  - `/impeccable hooks off` lo desactiva en el proyecto.
