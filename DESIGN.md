---
name: Devin en el día a día
description: Un único mapa en tinta navy sobre papel crema para una charla interna de Openbank; el rojo solo marca dónde mirar ahora.
colors:
  prussian: "#002B45"
  bluewood: "#2C4054"
  red-ribbon: "#DF0049"
  rojo-oscuro: "#FF0049"
  rojo-logo: "#E9004C"
  pizarra: "#546E7A"
  old-lace: "#FFF9F4"
  cinderella: "#FFF1E5"
  blanco: "#FFFFFF"
  royal-blue: "#2566E8"
  malachite: "#2BE24E"
  negro-devin: "#000000"
  gris-marca: "#CCD5DA"
  separador: "#E6DDD5"
  superficie-3: "#E0D9D3"
  franja-critica: "#FBDBDF"
  serie-3: "#188F4A"
  razonamiento: "#99AAB5"
  razonamiento-rayado: "#BAC6CD"
  pregunta-4: "#85714C"
  pregunta-5: "#289EA3"
  moneda: "#26495E"
  moneda-luz: "#8CA0AC"
  superficie-2-inversa: "#0F3850"
  texto-3-inverso: "#94A6B1"
  texto-simulado-inverso: "#4D6B7D"
  separador-inverso: "#33556A"
typography:
  titulo-xl:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "112px"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  titulo:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "80px"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  titulo-s:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "56px"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  entradilla:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: 1.35
  texto:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.35
  texto-s:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.35
  etiqueta:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.35
  cifra:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "176px"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  cifra-xl:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "240px"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  mono:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.3
  mono-s:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.3
  nombre-devin:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "640px"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "normal"
rounded:
  s: "12px"
  m: "24px"
  l: "48px"
  pildora: "999px"
spacing:
  esp-1: "8px"
  esp-2: "16px"
  esp-3: "24px"
  esp-4: "32px"
  esp-5: "48px"
  esp-6: "64px"
  esp-7: "96px"
  esp-8: "128px"
  escena-ancho: "1920px"
  escena-alto: "1080px"
  margen-x: "120px"
  margen-y: "96px"
components:
  ficha-entrada:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    typography: "{typography.mono}"
    rounded: "{rounded.pildora}"
    padding: "0 24px"
    height: "60px"
  ficha-salida:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    typography: "{typography.mono}"
    rounded: "{rounded.pildora}"
    padding: "0 24px"
    height: "60px"
  ficha-razonamiento:
    backgroundColor: "{colors.razonamiento}"
    textColor: "{colors.prussian}"
    typography: "{typography.mono}"
    rounded: "{rounded.pildora}"
    padding: "0 24px"
    height: "60px"
  capa:
    typography: "{typography.etiqueta}"
    rounded: "{rounded.s}"
    padding: "0 16px"
  capa-cacheada:
    backgroundColor: "{colors.royal-blue}"
    textColor: "{colors.blanco}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.s}"
  capa-resultado:
    backgroundColor: "{colors.red-ribbon}"
    textColor: "{colors.blanco}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.s}"
  ventana:
    backgroundColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    height: "96px"
  ventana-menor:
    backgroundColor: "{colors.cinderella}"
    rounded: "{rounded.pildora}"
    height: "96px"
  ventana-minima:
    backgroundColor: "{colors.superficie-3}"
    rounded: "{rounded.pildora}"
    height: "96px"
  ventana-mini:
    backgroundColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    height: "48px"
  agente:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.m}"
    padding: "0 32px"
    width: "390px"
    height: "150px"
  agente-circulo:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    size: "170px"
  subagente:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.m}"
    padding: "0 24px"
    width: "312px"
    height: "112px"
  hueco-pieza:
    textColor: "{colors.pizarra}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.pildora}"
    size: "160px"
  hueco-lleno:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    size: "160px"
  documento:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.s}"
    width: "300px"
    height: "340px"
  documento-cabecera:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    typography: "{typography.mono-s}"
    padding: "16px 24px"
  skill:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.m}"
    padding: "24px 32px"
    width: "390px"
    height: "250px"
  herramienta:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.pildora}"
    size: "112px"
  definicion:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.s}"
    width: "720px"
  conector:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    size: "88px"
  servidor:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.m}"
    padding: "16px 32px 16px 24px"
  contador:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.pildora}"
    padding: "0 32px 0 24px"
    height: "64px"
  contador-coste:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    padding: "0 32px 0 24px"
    height: "64px"
  isla:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.l}"
    padding: "24px 32px"
    width: "320px"
    height: "190px"
  isla-actual:
    backgroundColor: "{colors.red-ribbon}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.l}"
    padding: "24px 32px"
    width: "320px"
    height: "190px"
  tapa:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
  tapa-centro:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.negro-devin}"
    typography: "{typography.nombre-devin}"
  etiqueta:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.pildora}"
    padding: "8px 24px"
  etiqueta-compacta:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.pildora}"
    padding: "8px 16px"
  marca-ficticio:
    textColor: "{colors.bluewood}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.pildora}"
    padding: "8px 24px"
  hito:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.pildora}"
    size: "62px"
  consejo:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.m}"
    padding: "32px"
    width: "760px"
  moneda:
    backgroundColor: "{colors.moneda}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    size: "400px"
---

<!-- Derivado: generado con `/impeccable document` a partir de design/ (design-system.css, componentes.css, motion.js, dibujos.js, iconos.js y assets/) y de CLAUDE.md. No se edita a mano: si cambia design/, se regenera. Si este fichero y design/ discrepan, manda design/. -->

# Design System: Devin en el día a día

## Overview

**Creative North Star: "Usted está aquí"**

La charla es un único mapa dibujado con tinta navy sobre papel crema, como un plano de orientación. Islas, ventanas de contexto, fichas y rutas se trazan con el mismo navy y se separan con un contorno de 3 px. El rojo es el punto «usted está aquí»: marca la zona actual, el nivel que importa o la cifra protagonista, y nunca hay dos a la vez. Una cámara recorre el mapa; al llegar se detiene y solo entonces se anima la zona.

El sistema está hecho para un proyector que lava los colores e iguala crema y blanco. Por eso la separación nunca depende solo del tono: depende del contorno, de la luminosidad (oscuro, medio, hueco) y de la forma (sólido, rayado o contorno; continuo, discontinuo o punteado). La paleta se ciñe a la marca Openbank y todo lo que no es color de marca se deriva de él con `color-mix()`. Cada escena se diseña a 1920×1080 y ningún texto baja de 24 px.

La densidad es baja y deliberada: una idea por zona, mucho aire y un vocabulario cerrado de cuarenta y dos componentes en el que cada concepto tiene un único dibujo. Las formas son redondeadas y planas. Quedan fuera las partículas, los brillos, los destellos, los degradados de color (el rayado del razonamiento es de franjas duras y el subrayado, una línea de un solo color), las sombras difusas y los giros 3D decorativos: el volteo de una tarjeta es plano. La única excepción, pedida expresamente, es la moneda del turno de preguntas (E31), que gira en 3D.

**Key Characteristics:**
- Tinta navy sobre crema, con superficies blancas siempre contorneadas a 3 px.
- Un único acento rojo por pantalla; los tres rojos de la marca cuentan como uno.
- Conceptos distinguidos por luminosidad y forma; cuando se suma el tono, siempre va con otra señal (trazo, icono, número o nombre).
- La ventana de contexto es siempre una barra horizontal que se llena de izquierda a derecha.
- Escala tipográfica que empieza en 24 px; Outfit ligera en grande y DM Mono para tokens y código, alojadas en el proyecto (y una Inter recortada solo para el nombre «Devin» de la portada).
- Plano: lo quieto no tiene sombra.
- Cámara que llega, espera `--pausa-tras-camara` y después anima la zona.
- Todo funciona sin conexión: fuentes, iconos y logos van dentro y la presentación se exporta a un único HTML.

## Colors

Cinco colores de marca de openbank.es hacen casi todo el trabajo: navy para el contenido, rojo para el foco, cremas de suelo y blanco para separar superficies. Otros dos colores del CSS de openbank.es, un azul y un verde, dan las pocas señales de tono del sistema (series de gráfica, tokens leídos de caché, las preguntas de E24 y las marcas de plugin). El negro del logo de Devin solo escribe su nombre. El resto se deriva con `color-mix()`.

### Primary
- **Red ribbon** (`--color-red-ribbon`): el acento sobre fondo claro (`--color-acento`). Zona actual del mapa, línea de nivel de la ventana y su cifra, línea de lectura, parada actual del circuito y su punto, serie protagonista de una gráfica, resaltado de una captura (con su guía) o de una definición, resultado de un subagente (capa y flecha de traspaso), salto de precio protagonista y la marca de plugin prohibido (`--color-prohibido`). El blanco encima da 4,96:1 y sobre Old Lace da 4,75:1.
- **Rojo del logo para fondo oscuro** (`--color-rojo-oscuro`): el mismo acento sobre superficies navy (`--color-acento-sobre-oscuro`, y `--color-acento` dentro de `.inverso`). Sobre Prussian da 3,74:1: solo texto de 24 px o más y gráficos.
- **Rojo del logo para fondo claro** (`--color-rojo-logo`): solo existe dentro del logo. No se usa en interfaz.
- **Franja crítica** (`--color-franja-critica`, red ribbon al 12 % sobre Old Lace): fondo de la franja de una gráfica donde el resultado se degrada mucho, más oscuro que la superficie 2, y de la columna de tabla que se enlaza con esa franja. Es un fondo de apoyo, nunca texto ni línea.

### Secondary
- **Royal blue** (`--color-royal-blue`): azul del CSS de openbank.es. Se usa por sus roles: `--color-serie-2` (la serie discontinua de una gráfica), `--color-cacheado` (tokens leídos de caché, E21–E23, sólidos con texto blanco a 5,1:1; 4,9:1 sobre el fondo y 2,9:1 de luminosidad frente a la entrada), `--color-obligatorio` (el icono del plugin obligatorio, E18) y `--color-pregunta-3`.
- **Malachite** (`--color-malachite`): verde del CSS de openbank.es. Nunca se usa tal cual: oscurecido con Prussian (malachite al 55 %) es `--color-serie-3`, `--color-opcional` (el icono del plugin opcional) y `--color-pregunta-2`; mezclado con otro color de marca da `--color-pregunta-4` y `--color-pregunta-5`.
- **Las cinco preguntas** (E24, subrayado): `--color-pregunta-1` (Prussian, el resultado), `--color-pregunta-2` (verde oscurecido, el contexto), `--color-pregunta-3` (azul, el alcance), `--color-pregunta-4` (ocre, malachite al 50 % con red ribbon, cálido sin ser rojizo, 4,5:1 sobre el fondo; las restricciones) y `--color-pregunta-5` (turquesa, malachite al 45 % con royal blue, la más clara, 3,1:1: solo números de 24 px o más y el subrayado; cómo se comprueba).

### Tertiary
- **Negro de Devin** (`--color-negro-devin`, de cognition.com/brand): solo como `--color-devin`, el nombre «Devin» de la portada, junto a su logo. 19:1 sobre la superficie.
- **Moneda** (`--color-moneda`, Prussian al 85 % sobre blanco): la cara de la moneda de E31, un navy algo más claro para que el canto (`--color-moneda-canto`, Prussian) y el relieve se lean más oscuros. **Luz de la moneda** (`--color-moneda-luz`, Prussian al 45 %): los filos del reborde y las paredes del signo. El signo va en blanco (`--color-sobre-moneda`, 9:1).

### Neutral
- **Prussian blue** (`--color-prussian`): la tinta. Texto 1, contornos, fichas y capas de entrada, contorno de salida y de razonamiento, agente, conector MCP, cabeceras de documento y de definición, pestaña de skill, contador de coste, serie 1 de una gráfica y superficie inversa. Sobre Old Lace, 14,05:1.
- **Pickled bluewood** (`--color-bluewood`): texto 2 (también la capacidad de una ventana, el nombre de un hito y el subtítulo de la portada) y corchete de caché, tanto acierto como fallo. Sobre Old Lace, 10,22:1.
- **Pizarra** (`--color-pizarra`): texto 3 para escalas, anotaciones, rótulos de apoyo, guías del árbol y la guía fina, flechas de un abanico, pista del temporizador, siluetas del hub, serie 4 de una gráfica y su flecha discontinua, y el borde de la marca «Cifras ficticias». 5,17:1 sobre fondo, 5,40:1 sobre blanco y 4,88:1 sobre Cinderella.
- **Old lace** (`--color-old-lace`): fondo de escena (`--color-fondo`). Es un color de marca de openbank.es, no un crema por defecto.
- **Blanco** (`--color-blanco`): superficies (islas, ventana de contexto, tarjetas, fichas de salida) y texto sobre navy, sobre rojo y sobre azul. Contra Old Lace solo da 1,04:1, de ahí el contorno obligatorio.
- **Cinderella** (`--color-cinderella`): superficie 2, para apoyos muy suaves: la franja de una gráfica, la columna de tabla que se enlaza con ella, el interior de las ventanas menores de una comparación y el marcador de captura pendiente.
- **Superficie 3** (`--color-superficie-3`, Prussian al 12 % sobre Cinderella): un escalón más oscura que la superficie 2, solo para la ventana más pequeña de una comparación de capacidades (E09).
- **Gris claro de marca** (navy al 20 % sobre blanco): `--color-texto-inverso-2`, texto 2 sobre navy (9,85:1); y `--color-texto-simulado`, las líneas que simulan texto dentro de un documento, que no se leen.
- **Separador** (`--color-separador`, navy al 10 % sobre Cinderella): líneas finas de tablas, rejillas y campos. Contra el fondo da 1,28:1, así que solo separa; nunca lleva significado.
- **Razonamiento** y **razonamiento rayado** (`--color-razonamiento`, navy al 40 %; `--color-razonamiento-rayado`, navy al 27 %): las dos franjas del patrón de razonamiento. Texto navy encima, 6,13:1. El rayado solo no llega a 3:1 sobre el fondo, así que lleva siempre su contorno (`--color-razonamiento-borde`, Prussian).
- **Valores sobre navy** (solo dentro de `.inverso`): superficie 2 inversa (blanco al 6 % sobre Prussian; con un 10 % el texto 3 no llegaría a 4,5:1), texto 3 inverso (navy al 42 % sobre blanco), texto simulado inverso (blanco al 30 % sobre Prussian) y separador inverso (blanco al 20 % sobre Prussian).

### Roles
El código nunca usa las variables de marca: usa los roles.
- **Superficies:** `--color-fondo` (Old Lace), `--color-superficie` (blanco), `--color-superficie-2` (Cinderella), `--color-superficie-3`, `--color-franja-critica`, `--color-superficie-inversa` (Prussian).
- **Texto:** `--color-texto-1` (Prussian), `--color-texto-2` (Bluewood), `--color-texto-3` (Pizarra), `--color-texto-inverso` (blanco), `--color-texto-inverso-2` y `--color-texto-simulado` (gris claro de marca), `--color-devin` (negro de Devin).
- **Líneas y foco:** `--color-contorno` (Prussian), `--color-separador`, `--color-acento`, `--color-acento-sobre-oscuro`, `--color-sobre-acento` (blanco).
- **Semántica del vocabulario:** `--color-entrada` (relleno sólido Prussian) con `--color-sobre-entrada` (blanco); `--color-salida` (blanco hueco) con `--color-salida-borde` y `--color-sobre-salida` (Prussian); `--patron-razonamiento` (rayas a 135°, 10 px cada una) con `--color-razonamiento-borde` y `--color-sobre-razonamiento` (Prussian); `--color-cache-acierto` y `--color-cache-fallo` (Bluewood); `--color-cacheado` (Royal blue) con `--color-sobre-cacheado` (blanco); `--color-serie-1` (Prussian), `--color-serie-2` (Royal blue) y `--color-serie-3` (verde oscurecido); `--color-coste` (Prussian) con `--color-sobre-coste` (blanco); `--color-obligatorio`, `--color-opcional` y `--color-prohibido` (las marcas de plugin); `--color-pregunta-1` a `--color-pregunta-5`; y la moneda (`--color-moneda`, `--color-moneda-canto`, `--color-moneda-luz`, `--color-sobre-moneda`).
- **`.inverso`:** sobre navy, el fondo y la superficie pasan a Prussian (las separa el contorno blanco), el texto 1 y el contorno a blanco, el texto 2 al gris claro de marca, el texto 3, el texto simulado, la superficie 2 y el separador a sus valores sobre navy, y el acento al rojo del logo para fondo oscuro. La semántica se invierte: la entrada pasa a sólido blanco con texto Prussian, la salida a hueca del color del fondo con contorno blanco, el contorno del razonamiento a blanco, el corchete al gris claro de marca y el coste a blanco con texto Prussian. Las series, la franja crítica, el cacheado, las preguntas y las marcas de plugin no tienen valor sobre navy: van sobre claro.

### Named Rules
**La regla del único acento.** El rojo marca lo que hay que mirar ahora. Nunca hay dos elementos rojos a la vez en pantalla, ni en escena ni en una lámina de referencia. Un resaltado y su guía, o la capa de resultado y su flecha, son un solo acento.

**La regla del rojo según el fondo.** Red ribbon sobre claro, el rojo del logo para fondo oscuro sobre navy y el rojo del logo para fondo claro solo dentro del logo, que nunca se recolorea.

**La regla de luminosidad y forma.** Un concepto se distingue por luminosidad (oscuro, medio, hueco) y por forma, no solo por tono. Acierto y fallo de caché comparten color: los separa el trazo, continuo o discontinuo, y el icono ✓ o ✕. Cuando se suma el tono, va siempre con otra señal: en las series de una gráfica, el trazo (Prussian continua, azul discontinua, verde continua y texto 3 de puntos); en los tokens leídos de caché, la luminosidad frente a la entrada; en las preguntas, su número; en las marcas de plugin, el icono y el nombre.

**La regla del hex de marca.** Solo los colores de marca (de openbank.es, y el negro del logo de Devin) llevan hex, en `design-system.css`. Todo lo demás es `color-mix()` de una variable de marca, y el código usa siempre `var(--color-<rol>)`.

## Typography

**Display Font:** Outfit variable (con system-ui, sans-serif), en peso 300
**Body Font:** Outfit, en pesos 400, 500 y 600
**Label/Mono Font:** DM Mono (con ui-monospace, monospace), en pesos 400 y 500

**Character:** Outfit es la tipografía de openbank.es: geométrica, y ligera en los tamaños grandes para que los títulos respiren. DM Mono da un tono técnico a tokens, código y nombres de fichero, y deja claro que eso es texto del modelo. Inter (`--fuente-devin`), la libre más parecida a la del logotipo de Devin, solo escribe su nombre en la portada, en peso 500; el fichero (`Inter-Devin-wght.woff2`, 2 KB) está recortado a los glifos de «Devin». Las tres van alojadas en `design/assets/fonts/` en woff2, con su licencia OFL, y se cargan con `font-display: block`; no hay Google Fonts ni ninguna fuente por CDN.

### Hierarchy
Cada estilo tiene su clase `.tipo-*` en `componentes.css`; las escenas no escriben `font` a mano.
- **Cifra XL** (300, 240 px, 1, −3 %, dígitos tabulares): una cifra protagonista sola.
- **Cifra** (300, 176 px, 1, −3 %, dígitos tabulares): contadores de tokens y coste.
- **Título XL** (300, 112 px, 1,04, −1,5 %): portada y cierre.
- **Título** (300, 80 px, 1,04, −1,5 %): título de zona.
- **Nombre de Devin** (Inter 500, `--tipo-titulo` × `--tapa-escala` = 640 px en el mundo, 1,04, espaciado normal, `--color-devin`): solo el nombre «Devin» de la tapa del centro, bajo su logo.
- **Título S** (300, 56 px, 1,04, −1,5 %): títulos secundarios; también el número de isla (con interlineado 1 y dígitos tabulares) y, en DM Mono 400, el tiempo del temporizador.
- **Entradilla** (400, 40 px, 1,35): ideas clave y citas. ×8 y en Outfit 300, el título de una tapa.
- **Texto** (400, 32 px, 1,35): la frase principal de una zona y la de una tarjeta de consejo. A 500 y con interlineado 1,04, el nombre del agente y el título de la skill; a 600, interlineado 1 y dígitos tabulares, la cifra del nivel de la ventana.
- **Texto S** (400, 28 px, 1,35): texto secundario, celdas de tabla y valores de una definición. A 500, la capacidad de una ventana, el título de una viñeta, el nombre de un proveedor y la cifra de un salto de precio; con interlineado 1,04, los nombres de isla, subagente y servidor.
- **Etiqueta** (500, 24 px, 1,35): etiquetas, leyendas, escalas, rótulos, nombres de capa, notas, detalle de una viñeta, nombre de un hito y nombres en gráficas y circuitos. Es el mínimo absoluto.
- **Mono** (DM Mono 400, 28 px, 1,3): fichas de token y código. A 500, la cifra de un contador en píldora.
- **Mono S** (DM Mono 400, 24 px, 1,3): nombres de fichero y de herramienta, escalas, marcas de eje, números de parada y notas de fuente.

### Named Rules
**La regla de los 24 px.** Nada se escribe por debajo de 24 px a 1920×1080, ni siquiera una escala o una nota. Las tapas se miden a escala 1 y se dibujan ×8.

**La regla de las cifras quietas.** Toda cifra que se anima o se compara usa dígitos tabulares (`--cifras: tabular-nums`) para que no baile al contar.

## Layout

Cada escena mide `--escena-ancho` × `--escena-alto` (1920×1080) y se diseña para verse a escala 1, que es la escala de proyección. La zona segura deja `--margen-x` a los lados y `--margen-y` arriba y abajo. Las escenas no van en una tarjeta: dibujan directamente sobre el fondo, dentro de la zona segura. El espaciado sigue una base de 8 px (`--esp-1` a `--esp-8`): 8 entre capas, entre un icono y su texto y entre la ventana y su relleno, 16 dentro de una etiqueta o una fila, 24 de relleno en fichas y tarjetas pequeñas, 32 en tarjetas, 48 entre bloques (y entre viñetas), 64 entre grupos, 96 entre secciones y 128 para distancias de caída y grandes separaciones.

No hay diseño adaptable: la presentación se proyecta a 1920×1080. Todas las escenas viven en un único mundo, el mapa (una cruz de cinco bloques; cada zona es una pantalla), y una cámara (`volarCamara`) las encuadra transformando ese mundo. El esqueleto de la presentación (`index.html` y `src/`) compone este vocabulario; este documento describe `design/`, no `src/`. La ruta de la cámara se dibuja como un camino de puntos navy de 10 px con huecos de 24 px (`--ruta-grosor`, `--ruta-hueco`).

Las medidas de cada pieza viven en el grupo «Componentes · medidas» de `design-system.css`: ficha 60 px y 52 px la pequeña, contador 64 px, ventana de contexto de 96 px de alto y 48 px la pequeña (su ancho lo da la escena, a escala de su capacidad), patas del corchete de 24 px, agente 390×150 y 170 px en círculo (el del hub), subagente 312×112, pieza del hub 160 px, documento 300×340, skill 390×250 con pestaña de 150×40, herramienta 112 px, logo de proveedor 48 px, isla 320×190 como mínimo, definición 720 px, conector 88 px, candado 96 px, consejo 760 px como máximo, dial de 200 px de radio, temporizador de 240 px, parada de circuito de 64 px, hito de 62 px, punto de 28 px, anillo de repetición de 52 px, bucle de 306 px (rodea el agente en círculo; sus herramientas, pegadas a él, van sobre el bucle) y moneda de 400 px con canto de 40 px, signo de 88 px de grosor y perspectiva de 2000 px. La tapa de bloque se dibuja ×8 (`--tapa-escala`), con medidas a escala 1: logo de Devin de 180 px (`--tapa-logo`), icono de 60 px (`--tapa-icono`), subtítulo de 16 px (`--tapa-lema`) y logo de Openbank de 20 px de alto (`--tapa-marca`). La geometría SVG (gráfica, dial, temporizador, guía en codo, saltos de precio, abanico, llave, traspaso, circuito, repetición, bucle, curvas para caminos y moneda) sale de `dibujos.js`, que lee esas mismas variables y no lleva colores.

### Cámara y movimiento
Solo `motion.js` lee las variables de movimiento; las escenas encadenan sus efectos con `s()` y `v()` y nunca escriben una duración ni una curva literal. Las duraciones van por categoría:
- **Micro** (≤ 0,3 s): `--dur-micro` (0,2 s) para estados, ticks y pulsaciones; `--dur-salida` (0,3 s) para salidas.
- **Entrada** (0,4–0,6 s): `--dur-entrada` (0,5 s) para la aparición de elementos; `--dur-llamada` (0,4 s) para cada llamada de una conversación en reproducción continua (E23): sus capas entran, su coste sube y la gráfica avanza un tramo.
- **Progresión** (0,8–1,5 s): `--dur-contador` (0,9 s) para cifras que suben; `--dur-trazado` (1,2 s) para líneas que se dibujan, un texto que se subraya entero y puntos que recorren un camino; `--dur-trazado-serie` (0,8 s) para líneas seguidas (series de una gráfica, la flecha de una lectura, el traspaso de un subagente); `--dur-ampliar` (1 s) para una captura que se amplía; `--dur-ajustar` (1,2 s) para lo ocupado de una ventana que crece o se recoge, o sus capas cacheadas que se encogen; `--dur-desplazar` (0,8 s) para columnas que se desplazan un sitio; `--dur-vuelta` (1,5 s) para la media vuelta lenta del bucle del agente, una llamada explicada paso a paso; y `--dur-vuelta-rapida` (0,8 s) para una vuelta rápida, llamadas que se suceden.
- **Cámara** (0,8–1,5 s): `--dur-camara-corta` (0,8 s) entre pantallas de un mismo bloque (las casillas del centro), en línea recta; `--dur-camara` (1,2 s) como vuelo estándar, entre bloques del mapa, «alejar, viajar, acercar»; y `--dur-camara-larga` (1,5 s) para los saltos largos: hacia o desde la vista general.
- **Tiempo simulado** (2–5 s, siempre lineal, nunca para transiciones): `--dur-temporizador` (2,2 s), cinco minutos comprimidos; `--dur-repeticion` (4 s), una vuelta del anillo de repetición; y `--dur-moneda` (6 s), una vuelta de la moneda, que queda fuera de ese rango.

Las curvas van por propósito: apariciones con `--ease-aparicion` (`power3.out`), salidas con `--ease-salida` (`power2.in`), cámara con `--ease-camara` (`power2.inOut`) y `--ease-camara-larga` (`sine.inOut`, para los saltos largos y la vista general), interfaz con `--ease-interfaz` (`back.out(1.4)`), cambios de estado breves con `--dur-micro` (atenuar, avivar, pulsar, caducar) con un ease-out suave, `--ease-estado` (`power1.out`), fichas y documentos que entran en la ventana desde arriba con `--ease-caida` (`power2.in`), el llenado de la ventana con `--ease-llenado` (`power2.out`: cada capa entra desde la izquierda y frena al llegar), cifras con `--ease-contador` (`power1.out`), trazados y recorridos con `--ease-trazado` (`power1.inOut`), y ampliar, ajustar y desplazar con `--ease-ampliar`, `--ease-ajustar` y `--ease-desplazar` (`power2.inOut`, sin rebote). Lo que corre a ritmo constante va con curva lineal (`none`): `--ease-llamada` (la línea de la gráfica crece sin tirones de un tramo al siguiente), `--ease-temporizador`, `--ease-repeticion` y `--ease-moneda`. Los escalonados son de 0,06 s para listas, tarjetas y leyendas (`--escalonado`), 0,03 s para fichas de token (`--escalonado-tokens`), 0,12 s para capas de la ventana (`--escalonado-capas`), 0,2 s entre las series de una gráfica (`--escalonado-series`), 0,15 s de solape entre animaciones encadenadas sin pausas (`--escalonado-solape`) y 0,15 s para filas grandes que entran en cascada (`--escalonado-filas`).

Al llegar, la cámara espera `--pausa-tras-camara` (0,3 s) y después anima la zona. Hay que dejar tiempo de lectura: un mínimo de 1,5 s con una etiqueta o una cifra (`--pausa-lectura-corta`) y de 3 s con una frase (`--pausa-lectura`). En general, la pausa es el máximo entre 1,5 s y el número de palabras × 0,3 s (`--pausa-por-palabra`).

El vocabulario de movimiento son los 28 efectos registrados en `motion.js`: `aparecer`, `desaparecer`, `entrarConMuelle`, `atenuar` y `avivar`; `entrarEnVentana`, `llenarVentana`, `vaciarVentana`, `moverNivel`, `ajustarVentana`, `releerVentana`, `alargarCorchete`, `caducarCache`, `cachearCapas`, `subrayar` y `subirContador`; `pulsar`, `voltear` (plano, sin 3D) y `desplegar`; `ampliarCaptura`, `transformar`, `trazar`, `recorrerCamino`, `girarDial`, `agotarTemporizador`, `girar` y `girarMoneda`; y `volarCamara`. Ningún efecto mueve la cámara salvo `volarCamara`, que es la cámara: vuela el mundo entre dos vistas (centro x, centro y y ancho visible) y, por defecto, con `--dur-camara` y `--ease-camara`. Entre zonas sigue la trayectoria «alejar, viajar, acercar» (`d3.interpolateZoom`); dentro de una zona, línea recta, con el ancho cambiando en escala logarítmica. Redondea la traslación y solo pone `will-change` mientras vuela, para que el texto llegue nítido. Lo que crece de izquierda a derecha (las capas al llenar la ventana, lo ocupado al ajustarla, el corchete, las líneas discontinuas al trazarse) se descubre con un recorte, sin deformar su texto ni su trazo, y el recorte se limpia al acabar. Todos son reversibles: los cambios de clase (`caducarCache`, `cachearCapas`, `subrayar`, `voltear`, `girarDial`, `agotarTemporizador`, `desplegar`) van dentro del timeline como un `set` de atributo, nunca en un callback, así que la escena se puede rebobinar paso a paso. `girar` y `girarMoneda` giran sin parar mientras se ven y se paran con `kill()`. En modo estático (`?estatico`, `prefers-reduced-motion` o `data-movimiento="estatico"`) duran 0, sin bucles, y saltan a su estado final.

### Named Rules
**La regla de la cámara quieta.** La cámara nunca se mueve mientras algo se anima dentro de la zona: primero llega, luego espera y después anima.

## Elevation & Depth

El sistema es plano. La profundidad la dan el contorno de 3 px y el contraste entre superficie blanca y suelo crema, no las sombras: el proyector se come las sombras difusas. Todo lo que está en escena va a `--elevacion-0` (`none`). Los anillos interiores de las fichas de salida, el contador, el resaltado de una definición y el reborde de la moneda son contornos (`box-shadow: inset`), no elevación.

### Shadow Vocabulary
- **Elevación 0** (`--elevacion-0`: `none`): todo lo que está en la escena.
- **Elevación 1** (`--elevacion-1`): existe en `design-system.css`, pero ninguna escena ni componente la usa; solo aparece en una lámina de referencia.

### Named Rules
**La regla del contorno.** Toda superficie clara lleva un contorno de 3 px en `--color-contorno` (`--trazo-contorno`): navy sobre crema, blanco dentro de `.inverso`. Las piezas sólidas navy (agente, conector, entrada, coste, hueco lleno) son tinta y no lo necesitan. El tono por sí solo no separa nada.

**La regla de lo plano.** Lo quieto no tiene sombra: la profundidad la dan el contorno y la luminosidad.

## Shapes

Formas redondeadas con cuatro radios: 12 px (`--radio-s`) para capas, documentos, definiciones, capturas, resaltados, las esquinas del corchete, la pestaña de la skill y las esquinas de las guías en codo y del traspaso; 24 px (`--radio-m`) para tarjetas (agente, subagente, skill, consejo, servidor, candado) y los huecos del hub; 48 px (`--radio-l`) para islas del mapa, tapas (×8) y la caja de plugin; y píldora (`--radio-pildora`) para fichas de token, la ventana de contexto y su relleno, etiquetas, contadores, la línea de nivel y la de lectura, las líneas de un documento y los círculos (herramienta, conector, agente y piezas del hub, hito, paradas, moneda).

Hay tres trazos: 2 px (`--trazo-fino`) para separadores, ejes, rejillas, el borde de las franjas de una gráfica, marcas de escala, guías del árbol, la guía fina que une una etiqueta con lo que señala, la pista del temporizador y el borde de las etiquetas; 3 px (`--trazo-contorno`) para el contorno de toda superficie, la separación entre capas, las líneas y flechas de gráfica, los cables, el bucle, el circuito, la llave, los arcos de salto, las flechas de abanico, el traspaso, la guía de una captura y el anillo de repetición; y 6 px (`--trazo-fuerte`) para el corchete de caché, la línea de nivel, la línea de lectura, los resaltados (también el de un punto de gráfica), el subrayado, la caja de plugin, el candado, la aguja del dial, el progreso del temporizador y la serie protagonista. El trazo también lleva significado: continuo, discontinuo (`--grafica-discontinua`, 18/12 px) o de puntos (`--grafica-punteada`), y punteado para lo que aún no está (el hueco del hub). Los puntos redondos del camino son siempre movimiento: la ruta de la cámara, la salida del subagente y los recorridos que llegan a un hito.

Los iconos son de Lucide v1.57.0, en línea en `design/iconos.js` (se generan con `npm run iconos -- nombre`; hoy son 58, entre ellos `scroll-text` para Rules, `receipt` para las ACUs, `monitor` para Desktop, `list-ordered` y `shield-check`), con `stroke-width 2` sobre una caja de 24 y el color por `currentColor`. A 36 px (`--icono-m`) el trazo real es de 3 px, igual que el contorno, y ese es el tamaño por defecto. A 24 px (`--icono-s`) van dentro de etiquetas, cabeceras y fichas; a 48 px (`--icono-l`), solo el icono principal de una pieza grande (agente, skill desplegada, candado). Si una fuente no tiene un carácter (→, ↩, ✓, ✕, ≥, ≈, ≠), se usa su icono. Los logos oficiales (Openbank, Devin, OpenAI, Anthropic, GitHub, Atlassian, Sonar) van tal cual desde `design/assets/logos/`.

### Named Rules
**La regla del icono a 36.** Un icono suelto en escena va a 36 px, para que su trazo coincida con el contorno; 24 dentro de una etiqueta y 48 solo para el icono principal de una pieza grande.

## Components

El vocabulario visual: cuarenta y dos componentes en `componentes.css`, cada uno con su cabecera (clase, forma, color, medidas, icono, movimiento y escenas). Cada concepto tiene un único dibujo y se reconoce igual en todas las zonas. Si una zona necesita algo nuevo, primero se añade al design system. Cuatro utilidades los acompañan: los estilos de texto `.tipo-*`, el icono `.icono` (36, 24 o 48), el estado atenuado y el volteo de dos caras.

**Estado atenuado.** Lo que no toca mirar ahora. El texto baja a `--opacidad-atenuado-texto` (0,6), para que se siga leyendo desde el fondo de la sala; lo que no es texto (capas, líneas de documento, trazos SVG), a `--opacidad-atenuado` (0,3); y las series de una gráfica, a `--opacidad-atenuado-serie` (0,12), para que la comparación se lea sola. `atenuar` aplica la misma regla que la clase `.atenuado`, así que saltar y animar dan el mismo estado; `avivar` lo devuelve a 1.

### Tokens y contexto

**Ficha de token.** Una píldora en DM Mono que se lee como un trozo de texto del modelo.
- **Forma:** píldora de 60 px de alto (52 px la pequeña, en Mono S y con 16 px de relleno), DM Mono 400 a 28 px y 24 px de relleno lateral. Un espacio inicial se dibuja como un punto medio «·» atenuado.
- **Color:** entrada en sólido Prussian con texto blanco; salida hueca, blanca, con contorno interior Prussian de 3 px; razonamiento con el patrón rayado y contorno Prussian.
- **Movimiento:** `aparecer` con `--escalonado-tokens`, y `entrarEnVentana` (cae desde 128 px por encima hasta su sitio, con `--ease-caida`).

**Capa.** Muchos tokens del mismo tipo forman una capa de la ventana.
- **Forma:** ancho proporcional a sus tokens (sin texto, exactamente el de sus tokens) y alto el de la ventana menos la holgura de 8 px; radio de 12 px y, si cabe, su nombre dentro en Outfit 500 a 24 px con 16 px de relleno. Las capas se separan 3 px entre sí.
- **Color:** el mismo relleno que su ficha (entrada, salida o razonamiento).
- **Movimiento:** `llenarVentana`: cada capa se descubre de izquierda a derecha, sin deformar su texto, con `--ease-llenado` y `--escalonado-capas`; y `vaciarVentana`: se recogen hacia la izquierda, de la última a la primera, con `--dur-salida` y `--ease-salida` (compactar, empezar de nuevo).

**Tokens leídos de caché.** Las capas del principio de la ventana que una llamada relee de la caché, bajo el corchete, en sólido azul (`--color-cacheado`) con texto blanco, el mismo en todas las pantallas del coste (E21–E23); las de salida conservan su dibujo. Cuando la ventana se pesa por coste, su ancho se multiplica por lo que cuesta un token leído de caché respecto a uno de entrada (un 10 % en Anthropic), como mínimo 3 px. `cachearCapas` les da el color y las encoge hasta su coste (`--dur-ajustar`, `--ease-ajustar`); al caducar la caché, vuelven a ser de entrada y a su ancho.

**Resultado de un subagente.** Lo único que vuelve de un subagente: una capa pequeña en acento al final de su ventana y una flecha en codo (3 px, esquinas de 12 px, punta de 8 px), por debajo de las ventanas, hasta la misma capa al final de la del agente. Capa y flecha son el único acento de la pantalla. La capa entra con `llenarVentana`, la flecha con `trazar` (`--dur-trazado-serie`) y, al llegar, la capa del agente con `llenarVentana`.

**Ventana de contexto.** Una barra horizontal que se llena de izquierda a derecha, en toda la presentación.
- **Forma:** barra en píldora de 96 px de alto con contorno de 3 px y su relleno a 8 px del contorno. Su ancho es proporcional a su capacidad: varias ventanas superpuestas, cada una a la escala de la mayor, comparan capacidades, y cada una lleva un tono más oscuro cuanto más pequeña (superficie, superficie 2 y, la más pequeña, superficie 3). La capacidad va en el extremo derecho, a 32 px del borde, en Outfit 500 a 28 px y texto 2.
- **Nivel:** una línea vertical de 6 px en píldora y en acento, 24 px más alta que la barra, donde acaba lo ocupado, con su cifra a 16 px a la derecha en Outfit 600 a 32 px, dígitos tabulares y acento.
- **Lectura:** cuando el modelo relee el contexto, una línea de 6 px en acento recorre lo ocupado por dentro de la barra y se apaga.
- **Pequeña:** de 48 px de alto y sin texto dentro; es la del subagente.
- **Icono:** `app-window`, en etiquetas.
- **Movimiento:** `llenarVentana` y `vaciarVentana` (las capas), `moverNivel` (la línea de nivel se desplaza en horizontal, con `--ease-aparicion`), `ajustarVentana` (lo ocupado crece o se recoge con el nivel pegado a su borde y su cifra subiendo a la vez, con `--dur-ajustar` y `--ease-ajustar`), `entrarEnVentana` (lo que entra desde fuera) y `releerVentana` (la línea de lectura, con `--dur-trazado` y `--ease-trazado`, y luego se apaga con una salida).

**Corchete de caché.**
- **Forma:** corchete bajo el tramo de la ventana que cubre (o sobre él, en la variante de arriba), siempre desde la izquierda: el principio del contexto, que se repite en cada llamada. Su ancho es el del tramo, sus patas miden 24 px, el trazo es de 6 px y las esquinas, de 12 px; queda abierto hacia la ventana. En Bluewood.
- **Acierto y fallo:** se distinguen por trazo e icono, no por tono. Acierto: trazo continuo e icono `check`. Fallo: trazo discontinuo e icono `x`. Debajo va su etiqueta en Outfit 500 a 24 px con el detalle en Mono S y texto 2 debajo; si falta alto, todo en una línea, con el detalle a 16 px.
- **Movimiento:** `alargarCorchete` (se alarga desde la izquierda, descubierto con un recorte que se limpia al acabar) y `caducarCache` (se desvanece, pasa a su variante de fallo y vuelve, con `--ease-estado`).

**Leyenda.** Muestras en fila con su nombre en etiqueta y texto 2: píldoras de 48×24 px con los rellenos de token (también el cacheado) y un corchete pequeño. Entra con `aparecer`.

**Llave.** Llave horizontal de 3 px en el color de contorno y 64 px de alto que abarca todo lo que hay debajo y señala con su pico, arriba en el centro, lo que lo resume encima (el coste total sobre lo que lo forma, E20). Sus dos brazos se trazan a la vez, del pico hacia fuera, con `trazar`.

### Piezas del agente

**Agente.** Tarjeta navy sólida de 390×150 con radio de 24 px y texto blanco. Lleva el icono `bot` a 48 px, el nombre en Outfit 500 a 32 px y una línea de configuración en Mono S en gris claro de marca. En círculo (el del hub) mide 170 px y solo lleva el icono y su nombre debajo, en Outfit 500 a 28 px, en el centro de sus piezas. Entra con `entrarConMuelle`.

**Subagente.** La tarjeta del agente, más pequeña (312×112, ≈ 80 %) y hueca: blanca con contorno de 3 px, nombre en Outfit 500 a 28 px y detalle en Mono S y texto 3. Lleva el icono `bot` y siempre tiene debajo su propia ventana pequeña: no hereda la del agente. Entra con `entrarConMuelle` al final del camino de puntos que se traza desde el agente, llena su ventana con lo que lee y devuelve su resultado (ver «Resultado de un subagente»).

**Bucle del agente.** Círculo de 306 px con flechas en sentido horario alrededor del agente en círculo; sus herramientas, pegadas a él, van sobre el bucle. Trazo de 3 px del color de contorno y cuatro etiquetas en texto 2. Un punto de 28 px en texto 1 lo recorre en cada llamada: media vuelta lenta (`--dur-vuelta`) cuando una llamada se explica paso a paso, vuelta rápida (`--dur-vuelta-rapida`) cuando las llamadas se suceden. Aparece con `trazar` y da vueltas con `recorrerCamino`.

**Documento** (rules y AGENTS.md). Hoja blanca de 300×340 con radio de 12 px y contorno de 3 px, una cabecera navy con el icono `file-text` a 24 px y el nombre de fichero en Mono S en blanco, y líneas en píldora de 16 px de alto en el color de texto simulado. Es lo primero que entra en la ventana (`entrarEnVentana`).

**Skill.** Tarjeta-pieza blanca de 390 px de ancho, con radio de 24 px, contorno de 3 px y una pestaña navy de 150×40 encima a la izquierda. Plegada solo muestra el título (icono `puzzle` a 36 px y nombre en Outfit 500 a 32 px), el identificador en Mono S y la descripción en etiqueta y texto 2. Desplegada mide 250 px de alto, el icono pasa a 48 px y añade su anatomía numerada (cuándo, qué necesita, pasos, resultado) sobre un separador de 2 px. Entra con `entrarConMuelle` y se abre con `desplegar`, que le quita la variante plegada y hace crecer su anatomía, y se puede rebobinar; solo entra en la ventana cuando se usa.

**Árbol de repositorio.** Carpetas y ficheros en Mono S y texto 1, con iconos (`folder`, `folder-open`, `file`, `file-text`) y guías de sangría de 2 px en texto 3. Un AGENTS.md cargado se rellena como ficha de entrada. Las filas entran con `aparecer` y `--escalonado`.

### Hub

**Hueco del hub.** La silueta punteada (3 px, texto 3, sin relleno) de una pieza que aún no está en el agente, con su icono (`cpu`, `gauge`, `app-window`, `file-text`, `puzzle`, `terminal`, `wrench`, `plug` o `git-fork`) y su nombre en etiqueta. En el hub, todas las piezas son círculos iguales de 160 px; las herramientas de serie, círculos de herramienta.
- **Lleno:** la misma silueta en sólido, superficie inversa con texto inverso y trazo continuo.
- **Movimiento:** `entrarConMuelle` cuando se llena con el hub a la vista (herramientas, E14); los demás huecos se llenan fuera de cámara, sin animación, mientras se explica su tema. `transformar` convierte el círculo de Contexto en la ventana de contexto cuando se anima el contexto, y lo devuelve a círculo: su contenido se va antes de cambiar y su caja toma el tamaño y los colores indicados.

### Herramientas y MCP

**Herramienta.** Círculo blanco de 112 px con contorno de 3 px, el icono de la acción (`file-text`, `pencil`, `search`, `terminal` o `wrench`) y el nombre debajo en Mono S. Entra con `entrarConMuelle`, da un pulso con `pulsar` (`--ease-estado`) al usarse y se da la vuelta con `voltear` para mostrar su definición. Su resultado entra en la ventana como ficha de entrada.

**Definición de herramienta.** Lo que el agente lee de una herramienta: tarjeta de 720 px (su descripción cabe en dos líneas) con radio de 12 px y contorno de 3 px, cabecera navy con `wrench` a 24 px y el nombre en Mono, y campos (clave en etiqueta y texto 3; valor en Texto S o Mono S) separados por líneas finas. La descripción, el disparador, se resalta con un anillo interior de 6 px en acento, el mismo dibujo que el resaltado de una captura. Aparece con `aparecer`, junto a su herramienta.

**Conector MCP.** Un nodo navy de 88 px con el icono `plug` y un aro punteado blanco por dentro que lo separa del agente, y un cable continuo de 3 px hasta cada servidor: una tarjeta blanca con radio de 24 px y contorno de 3 px, icono `laptop` (local), `cloud` (remoto) o `database` (Datahub), nombre en Outfit 500 a 28 px y detalle en Mono S y texto 3. Un servidor real lleva el logo oficial de su servicio (GitHub, Atlassian, Sonar; la llave de Openbank para los internos) del alto de un icono de 36 px; el apaisado se dibuja a 24 px dentro de esa misma caja. Para explicar el estándar, el nodo va solo, entre los agentes y los servicios, y todos los cables pasan por él. Nodo y servidores entran con `entrarConMuelle`; el cable, con `trazar`.

**Candado.** Cuadrado blanco de 96 px con trazo de 6 px y radio de 24 px, con `lock` a 48 px y la regla al lado en Outfit 500 a 28 px: lo que no debe cruzar. Entra con `entrarConMuelle`. Hoy ninguna escena lo usa.

**Caja de plugin.** Caja sin relleno con trazo de 6 px y radio de 48 px que envuelve las piezas que empaqueta, con su nombre en una pestaña en píldora blanca (contorno de 3 px, icono `package` a 24 px) sobre el borde. Entra con `entrarConMuelle`.

**Abanico.** Flechas curvas de 3 px en texto 3, con punta de 8 px, que salen de un mismo punto a la derecha de un concepto y llegan en horizontal a cada una de sus partes, en lista (o, en vertical, del concepto arriba a sus partes en fila); también una por etiqueta, hacia la parte que nombra. Sin caja; las partes en Texto S y texto 1. Se trazan una tras otra con `trazar` y `--escalonado`, y las partes aparecen con sus flechas.

### Datos y tiempo

**Contador.** Píldora de 64 px de alto con icono y cifra en DM Mono 500 a 28 px con dígitos tabulares y la unidad en etiqueta: blanca con contorno de 3 px para llamadas (`repeat`) o latencia (`hourglass`), y navy sólida sin contorno para el coste (`coins`, o `receipt` para las ACUs). La variante grande es una cifra en `--tipo-cifra` (o `--tipo-cifra-xl`) con su etiqueta en texto 3 encima y la unidad en Texto S y texto 2. Siempre lleva su unidad. Sube con `subirContador`.

**Tabla.** Sin caja: cabecera en etiqueta y texto 3 con una línea de contorno de 3 px debajo, filas en Texto S separadas por líneas finas y celdas con 16 px arriba y abajo y 48 px a la derecha. Los bordes van separados, no colapsados: cada línea es de su fila, así que una fila oculta no deja su línea. Las cifras van a la derecha y con dígitos tabulares. Una columna puede llevar el tono de una franja de gráfica (superficie 2 o franja crítica, con 16 px a cada lado) para enlazar sus cifras con ese tramo. Entra fila a fila con `aparecer`.

**Salto de precio.** Arco de 3 px que une dos filas de una tabla por su derecha, con punta de 8 px en la fila más cara, y cuántas veces cuesta más (×20) en Outfit 500 a 28 px con dígitos tabulares, pegado al vértice o, si los saltos se anidan, en una columna a la derecha de todos los arcos. Cuanto mayor el salto, más abierto el arco. En texto 1; el protagonista, en acento. El arco se traza con `trazar`, la cifra entra con `aparecer` y los saltos que dejan su sitio se van con `desaparecer`.

**Gráfica de líneas.** Ejes de 2 px en el color de contorno, rejilla en separador, marcas en Mono S y texto 3, y una línea de 3 px por serie con su nombre al final, sin leyenda aparte. Las series se separan por color, luminosidad y trazo: serie 1 en Prussian continua, serie 2 en azul discontinua, serie 3 en verde oscurecido continua y serie 4 en texto 3 de puntos; solo la protagonista va en acento, a 6 px. Un modelo se dibuja igual en todas las gráficas: GPT-5.6 Sol, serie 1; Opus 5, serie 2; GPT-6 Astra y Sonnet 5, serie 3; Fable 5.1, serie 4 (los que comparten serie nunca coinciden en una gráfica). Los puntos son círculos de 8 px de radio, rellenos de superficie, con el trazo de su serie. Franjas opcionales marcan tramos del eje x: la normal en superficie 2 y la crítica (donde el resultado se degrada mucho) en franja crítica, las dos con bordes discontinuos de 2 px en texto 3 y su texto encima, centrado. Anotaciones opcionales para una lectura: notas (el nombre de un punto, como su esfuerzo, del color de su serie), puntos resaltados (un anillo de 16 px de radio y 6 px de trazo) y flechas entre dos puntos con su texto (3 px en texto 1 y punta de 16 px; discontinua, sin punta y en texto 3 si une dos puntos a la misma altura). Siempre lleva su nota de fuente. Las líneas se dibujan seguidas con `trazar` (`--dur-trazado-serie` y `--escalonado-series`; la protagonista, a su ritmo, nombrando cada punto según llega); los puntos, etiquetas y notas entran con `aparecer`, y las series que no toca mirar se atenúan con `atenuar` y `avivar`.

**Dial de effort.** Semicírculo de 200 px de radio con una marca por nivel (Low, Medium, High, XHigh, Max) en etiqueta y texto 3, y una aguja de 6 px en texto 1. El nivel actual pasa a texto 1 y peso 600. Icono `gauge` en etiquetas. Gira con `girarDial`.

**Temporizador.** Anillo de 240 px que se vacía (pista de 2 px en texto 3, progreso de 6 px en texto 1), con el tiempo restante en DM Mono a 56 px en el centro e icono `timer`. Al agotarse, todo pasa a texto 3. Corre con `agotarTemporizador`, en tiempo simulado y con curva lineal.

### Mapa y apoyo

**Isla del mapa.** Zona del mapa o agrupación de una escena: tarjeta blanca de 320×190 como mínimo, con radio de 48 px, contorno de 3 px y 24×32 px de relleno. Arriba, el número en Outfit 300 a 56 px con dígitos tabulares y el icono de la zona a 36 px; abajo, el nombre en Outfit 500 a 28 px. La actual va en relleno y contorno de acento con texto blanco: es el «usted está aquí» del mapa. Las demás pueden atenuarse. Entra con `entrarConMuelle` y cambia de foco con `atenuar` y `avivar`.

**Tapa de bloque.** La isla de un bloque del mapa dibujada ×8 (`--tapa-escala`), porque la vista general se ve a ≈ 1:8 y desde allí se lee como una isla a escala 1. En la apertura cubre el bloque entero, para que desde la vista general se lean los cinco bloques. Superficie blanca con contorno, radio y relleno de la isla multiplicados por la escala; dentro, el icono de su zona (`footprints`, `coins`, `route` o `message-circle-question`, a 60 px ×8) y, debajo, su título centrado en Outfit 300 a ×8 de la entradilla, en texto 1. Sus títulos llegan con la vista general (`aparecer`), mientras el icono sube a su sitio.
- **La del centro:** en lugar del icono, el logo oficial de Devin (`devin-avatar-fondo-claro.svg`) a 180 px ×8, tal cual; debajo, su nombre, más grande, en Inter 500 a ×8 del título y en el negro de su logo; y, discretos, un pie con el resto del título de la charla (`.tapa__lema`, 16 px ×8, texto 2) y el logo de Openbank (`.tapa__marca`, 20 px ×8 de alto, tal cual), a 16 px ×8 uno de otro y pegados al nombre. La portada es esa tapa vista de cerca y encuadra logo, nombre y pie.
- **Movimiento:** se levanta con `desaparecer` la primera vez que se entra en su bloque: antes, su contenido (icono o logo y título), desde `TAPAS.fundidoContenido` del vuelo; después, la tapa, en la segunda mitad del vuelo, con `--ease-camara`, y ha desaparecido cuando llega la cámara.

**Camino de puntos y guía.** El camino es la ruta de la cámara en el mapa, el camino por el que sale un subagente y los recorridos que llegan a un hito: puntos redondos de 10 px cada 24 px en el color de contorno. Los puntos son siempre movimiento. La guía es otra cosa: una línea fina continua de 2 px en texto 3 que une una etiqueta con lo que señala. Los dos se dibujan con `trazar`.

**Hito de un recorrido.** Un círculo blanco de 62 px con contorno de 3 px y un icono a 36 px en texto 1, donde llega (o se desvía) un camino de puntos, con su nombre centrado encima (o debajo) en etiqueta y texto 2, a 16 px del círculo. El desvío equivocado lleva `x` y el bueno, `check`. Entra con `entrarConMuelle` al llegar el camino; el desvío se atenúa con `atenuar` cuando llega la vuelta.

**Circuito.** Circuito cerrado de 3 px con una parada numerada de 64 px (del 1 al 6) por paso del método: pendientes en blanco con contorno, hechas en sólido de entrada y la actual en acento; los nombres en etiqueta y texto 2 y los números en Mono S. Al pasar a la siguiente, un punto de 28 px en acento recorre la pista con `recorrerCamino`. Cuando el acento está en otra parte (el mapa con otra zona actual), el circuito va sin parada actual ni punto. Icono `list-checks` en etiquetas.

**Etiqueta.** Píldora blanca con borde de 2 px en el color de contorno, en Outfit 500 a 24 px, con 8×24 px de relleno (la compacta, 8×16, para que quepan varias en una fila estrecha) y un icono opcional a 24 px. Las tres marcas de plugin (obligatorio, opcional, prohibido) llevan el icono en su color. Entra con `aparecer`.

**Viñeta.** Un punto de una lista, sin caja: su icono a 36 px, centrado en altura respecto a todo su texto, y un título en Outfit 500 a 28 px con un detalle opcional debajo en etiqueta y texto 2, a 24 px del icono. Las viñetas de una lista van a 48 px unas de otras, se centran juntas en su alto y alinean sus iconos en una columna; si una lleva repetición, esa columna mide lo que el anillo (52 px). Entra con `aparecer`.

**Repetición.** Anillo abierto de 52 px con una flecha, en trazo de 3 px del color de contorno, alrededor de un icono a 24 px: lo que se repite solo, como una tarea programada (`calendar-clock`). El anillo no ocupa sitio, así que su viñeta no parece mayor que las demás. Gira sin parar con `girar` (`--dur-repeticion`, lineal).

**Subrayado.** Una línea de 6 px al pie de un fragmento de texto, que sigue sus filas: marca qué parte de un texto responde a qué pregunta, en el color de la pregunta, que lleva su número en ese color (E24); sin variante, en el color de contorno. `subrayar` lo dibuja en orden de lectura, de izquierda a derecha y fila a fila, como un solo trazo (`--dur-trazado`).

**Marca «Cifras ficticias».** La misma píldora sin relleno, con borde de 2 px en texto 3, texto 2 y el icono `info` a 24 px. Marca un dato que falta por verificar; las cifras de ejemplo ya no la llevan, porque se da por hecho que lo son. Entra con `entrarConMuelle` en su paso.

**Nota de fuente.** «Fuente:» en etiqueta y la referencia en Mono S, todo en texto 3, bajo toda cifra real o gráfica. Aparece con la gráfica.

**Proveedor de modelos.** El logo oficial del proveedor a 48 px (el de Devin, ampliado, porque su símbolo solo ocupa el 64 % de su cuadro) y, a 16 px, su familia de modelos en Outfit 500 a 28 px y texto 1 con quién la hace en 400 y texto 2. Sin caja, sobre el color del fondo para que el blanco del logo se funda con la pantalla. Entran con `entrarConMuelle`, grandes y uno tras otro; después la fila se coloca bajo el título (`--dur-desplazar`).

**Captura con resaltado.** Captura enmarcada con contorno de 3 px y radio de 12 px. Su lienzo (la imagen a tamaño real y sus estados encima) se escala para verla entera o ampliada en la zona que se explica (`ampliarCaptura`). El control se rodea con un resaltado de 6 px en acento y una guía en ángulo recto de 3 px, también en acento y con las esquinas redondeadas a 12 px, lo une a su etiqueta: resaltado y guía son un solo acento. Sin captura real, un marcador «Captura pendiente» visible sobre superficie 2, con el icono `image`. El resaltado entra con `entrarConMuelle`, la guía con `trazar` y la etiqueta con `aparecer`; resaltado y guía se van juntos con `desaparecer` antes del siguiente.

**Tarjeta de consejo.** Tarjeta blanca de hasta 760 px con radio de 24 px, contorno de 3 px y 32 px de relleno: la bombilla (`lightbulb`) a la izquierda, el rótulo «Consejo» en etiqueta y texto 3, y una sola frase en Texto y texto 1. Entra con `entrarConMuelle`.

**Moneda.** El turno de preguntas (E31): una moneda en 3D de 400 px, sola en el centro, con dos caras con reborde (32 px, con filos de 3 px en luz y un surco del color del canto), un canto de 40 px de grosor que se ve al girar y un signo de interrogación geométrico de 88 px de grosor que la atraviesa y sobresale 24 px por cada cara. Cara en `--color-moneda`, signo blanco con paredes en luz, canto en Prussian. Entra con `entrarConMuelle` y gira sin parar sobre su eje vertical con `girarMoneda` (`--dur-moneda`, lineal, con perspectiva de 2000 px para que no se deforme). Es la única excepción, a petición expresa, a «nada de giros 3D».

## Do's and Don'ts

### Do:
- **Do** usar las variables de rol y de semántica (`--color-texto-1`, `--color-acento`, `--color-entrada`…) en componentes y escenas; en SVG, el color va por CSS y en GSAP se lee con `v()`.
- **Do** contornear cada superficie clara con 3 px de `--color-contorno`, porque el proyector iguala crema y blanco.
- **Do** reservar el rojo para una sola cosa por pantalla, y también por lámina de referencia: la zona actual, el nivel, la parada actual, el resaltado o la cifra protagonista.
- **Do** mantener el texto en 24 px o más, con contraste de al menos 4,5:1; el mínimo de 3:1 solo vale para texto de 24 px o más y para gráficos.
- **Do** usar las clases `.tipo-*` y la escala `--tipo-*` para todo texto.
- **Do** dibujar la ventana de contexto como la barra horizontal, con su ancho a escala de su capacidad, y comparar capacidades superponiendo ventanas a la escala de la mayor.
- **Do** acompañar todo tono con otra señal: las series de una gráfica por trazo y luminosidad (`--color-serie-1` a `--color-serie-3` y texto 3), las preguntas por su número y las marcas de plugin por su icono y su nombre.
- **Do** dibujar cada modelo con la misma serie en todas las gráficas.
- **Do** atenuar el texto a `--opacidad-atenuado-texto` y lo gráfico a `--opacidad-atenuado`, siempre con `atenuar` o la clase `.atenuado`.
- **Do** poner la nota de fuente bajo toda cifra real o gráfica, y la marca «Cifras ficticias» solo en un dato que falta por verificar.
- **Do** usar iconos Lucide de `design/iconos.js` a 36 px con `stroke-width 2` (24 dentro de etiquetas, 48 para el icono principal de una pieza grande), y el icono cuando la fuente no tenga el carácter.
- **Do** encadenar cámara, `--pausa-tras-camara` y animación de zona, y dejar las pausas de lectura (1,5 s con una etiqueta o una cifra, 3 s con una frase).
- **Do** animar con los efectos de `motion.js` y, en una coreografía de escena, con `s()` y `v()`; el tiempo simulado, siempre con curva lineal.
- **Do** unir una etiqueta con lo que señala mediante la guía fina continua (o, en una captura, la guía en codo del resaltado); los puntos redondos quedan para el movimiento.
- **Do** usar los logos oficiales de `design/assets/logos/` tal cual: los de Openbank, Devin, los proveedores y los servicios (procedencia en `design/assets/licencias/`).

### Don't:
- **Don't** escribir un color a mano (hex, `rgb()`, `hsl()` o nombres como `red`) en el código de la presentación, ni en atributos SVG ni en una animación.
- **Don't** poner dos elementos rojos a la vez ni introducir tonos rojizos que compitan con el acento.
- **Don't** usar el azul y el verde de marca directamente: solo por sus roles (series, cacheado, preguntas, marcas de plugin), y el verde nunca sin oscurecer o mezclar.
- **Don't** usar partículas, brillos, destellos, degradados de color, sombras difusas ni giros 3D decorativos; la moneda de E31 es la única excepción, pedida expresamente.
- **Don't** mover la cámara mientras algo se anima dentro de la zona.
- **Don't** dibujar un concepto de otra forma: un token es siempre una píldora en DM Mono, la ventana de contexto siempre una barra horizontal y la caché, siempre un corchete.
- **Don't** sobrescribir una variable dentro de una escena, ni poner una medida suelta a un componente cuando existe su variable; si una escena necesita otro valor, se crea una variable con nombre propio en `design-system.css`.
- **Don't** escribir duraciones ni curvas literales, ni usar el tiempo simulado para transiciones.
- **Don't** cargar fuentes, iconos ni librerías por CDN: todo va dentro del proyecto y funciona sin conexión.
- **Don't** recolorear los logos.
