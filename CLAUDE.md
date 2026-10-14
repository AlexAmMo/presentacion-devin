# Presentación «Devin en el día a día»

Presentación HTML para una charla interna de Openbank: un único gran mapa por el que se mueve una cámara (GSAP). El guion está en `Guion Devin.md`.

## Fuentes únicas del diseño

Todo lo visual y todo el movimiento salen de estos ficheros. No se copian ni se duplican: se importan.

- `design/design-system.css`: todas las variables (color, tipografía, espaciado, radios, trazos, elevación y movimiento).
- `design/componentes.css`: el CSS de los componentes del vocabulario visual (ficha de token, capa, recipiente, corchete de caché, contador de coste, agente, subagente, documento, skill y herramienta). Cada componente se escribe una sola vez aquí y las escenas lo reutilizan.
- `design/motion.js`: el único módulo que lee las variables de movimiento. Exporta `v(nombre)` (valor en texto) y `s(nombre)` (segundos como número) y registra las animaciones reutilizables con `gsap.registerEffect({ …, extendTimeline: true })`.
- `design/design-system.html`: documentación y referencia visual. El aspecto y las medidas de cada componente salen de aquí.

Si `componentes.css` o `motion.js` todavía no existen, créalos en esa ruta la primera vez que hagan falta, siguiendo estas reglas.

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
7. **Documenta en el mismo cambio, en `design/design-system.html`:**
   - Su muestra: en `MARCA`/`NEUTROS` o en las tarjetas de semántica.
   - Su par de contraste en `PARES`.
   - Si es un concepto nuevo, su fila en la ficha técnica del vocabulario.

## Cómo ampliar las animaciones

1. Busca primero un efecto existente en `motion.js`. Si sirve con otras opciones, úsalo.
2. **Nueva duración, curva, escalonado o pausa:** añade una variable al bloque «Movimiento» de `design-system.css`.
   - Nómbrala por propósito (`--ease-aparicion`, no `--ease-power3`).
   - Las duraciones llevan la unidad `s`; las curvas son nombres de GSAP (`power3.out`, `back.out(1.4)`, `elastic.out(1, 0.6)`).
   - Rangos: micro ≤ 0,3 s; entrada entre 0,4 y 0,6 s; cámara entre 0,8 y 1,5 s.
   - Curvas por propósito: apariciones con ease-out, salidas con ease-in, cámara con ease-in-out, interfaz con `back` o `elastic`.
3. **Animación que se repite en más de una escena o forma parte del vocabulario** (por ejemplo, «una ficha cae al recipiente»): regístrala como efecto en `motion.js`.
   - Sus `defaults` se leen de las variables.
   - Se nombra con un verbo en infinitivo (`aparecer`, `volarCamara`, `subirContador`).
4. **Coreografía de una sola escena:** va en el fichero de la escena, como un timeline que encadena efectos y usa `s()`/`v()`. Ninguna duración ni curva literal; las distancias y posiciones sí pueden ir en px.
5. **Reglas de movimiento:**
   - Primero llega la cámara, luego pasa `--pausa-tras-camara` y después anima la zona. La cámara nunca se mueve mientras algo se anima dentro de la zona.
   - Se respetan las pausas de lectura (`--pausa-lectura-corta`, `--pausa-lectura`).
   - Nada de partículas, brillos, destellos ni giros 3D decorativos.
6. **Documenta en el mismo cambio, en `design/design-system.html`:**
   - La variable nueva en la sección Movimiento (`EASES`, `DURS` o la tabla de escalonado y pausas).
   - Si cambia cómo se anima un concepto, la columna «Movimiento» de la ficha técnica.

## Cambiar un valor existente

Cambia la variable en `design-system.css`; nunca la sobrescribas dentro de una escena. Si una sola escena necesita un valor distinto, crea una variable con nombre propio siguiendo los pasos anteriores. Lo mismo vale para tipografía, espaciado, radios y trazos.

## Herramientas del agente

Declaradas en el repositorio: plugins en `.claude/settings.json` y MCP en `.mcp.json`.

- **GSAP** (`gsap-skills`): para escribir las animaciones y la cámara.
- **Impeccable** (`/impeccable <comando>`): criterio de diseño y revisión. Sustituye a frontend-design, que no se usa en este proyecto.
- **Playwright MCP**: para ver lo que se construye, con capturas y grabación de vídeo (`--caps=devtools`).

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
