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
  gris-marca: "#CCD5DA"
  separador: "#E6DDD5"
  razonamiento: "#99AAB5"
  razonamiento-rayado: "#BAC6CD"
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
    padding: "0 24px"
  recipiente:
    backgroundColor: "{colors.blanco}"
    rounded: "{rounded.l}"
    width: "440px"
    height: "760px"
  agente:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.m}"
    padding: "0 32px"
    width: "390px"
    height: "150px"
  subagente:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.m}"
    padding: "0 24px"
    width: "312px"
    height: "112px"
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
  conector:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pildora}"
    size: "88px"
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
  etiqueta:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.pildora}"
    padding: "8px 24px"
  marca-ficticio:
    textColor: "{colors.bluewood}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.pildora}"
    padding: "8px 24px"
  consejo:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.m}"
    padding: "32px"
    width: "760px"
---

<!-- Derivado: generado con `/impeccable document` a partir de design/ (design-system.css, componentes.css, motion.js, dibujos.js, iconos.js y assets/logos/). No se edita a mano: si cambia design/, se regenera. Si este fichero y design/ discrepan, manda design/. -->

# Design System: Devin en el día a día

## Overview

**Creative North Star: "Usted está aquí"**

La charla es un único mapa dibujado con tinta navy sobre papel crema, como un plano de orientación. Islas, recipientes, fichas y rutas se trazan con el mismo navy y se separan con un contorno de 3 px. El rojo es el punto «usted está aquí»: marca la zona actual, el nivel que importa o la cifra protagonista, y nunca hay dos a la vez. Una cámara recorre el mapa; al llegar se detiene y solo entonces se anima la zona.

El sistema está hecho para un proyector que lava los colores e iguala crema y blanco. Por eso la separación nunca depende del tono: depende del contorno, de la luminosidad (oscuro, medio, hueco) y de la forma (sólido, rayado o contorno; continuo, discontinuo o punteado). La paleta se ciñe a la marca Openbank y todo lo que no es color de marca se deriva de navy. Cada escena se diseña a 1920×1080 y ningún texto baja de 24 px.

La densidad es baja y deliberada: una idea por zona, mucho aire y un vocabulario cerrado de treinta componentes en el que cada concepto tiene un único dibujo. Las formas son redondeadas y planas, con una sola elevación sin difuminado. Quedan fuera las partículas, los brillos, los destellos, los degradados (el rayado del razonamiento es de franjas duras, no un degradado), las sombras difusas y los giros 3D decorativos: hasta el volteo de una tarjeta es plano.

**Key Characteristics:**
- Tinta navy sobre crema, con superficies blancas siempre contorneadas a 3 px.
- Un único acento rojo por pantalla; los tres rojos de la marca cuentan como uno.
- Conceptos distinguidos por luminosidad y forma, no por tono.
- Escala tipográfica que empieza en 24 px; Outfit ligera en grande y DM Mono para tokens y código, ambas alojadas en el proyecto.
- Plano: una sola elevación, también plana.
- Cámara que llega, espera `--pausa-tras-camara` y después anima la zona.
- Todo funciona sin conexión: fuentes, iconos y logos van dentro y la presentación se exporta a un único HTML.

## Colors

Cinco colores de marca de openbank.es hacen todo el trabajo: navy para el contenido, rojo para el foco, cremas de suelo y blanco para separar superficies; el resto se deriva de navy con `color-mix()`.

### Primary
- **Red ribbon** (`--color-red-ribbon`): el acento sobre fondo claro (`--color-acento`). Zona actual del mapa, línea de nivel del recipiente y su cifra, parada actual del circuito, serie protagonista de una gráfica, resaltado de una captura o de una definición. El blanco encima da 4,96:1 y sobre Old Lace da 4,75:1.
- **Rojo del logo para fondo oscuro** (`--color-rojo-oscuro`): el mismo acento sobre superficies navy (`--color-acento-sobre-oscuro`, y `--color-acento` dentro de `.inverso`). Sobre Prussian da 3,74:1: solo texto de 24 px o más y gráficos.
- **Rojo del logo para fondo claro** (`--color-rojo-logo`): solo existe dentro del logo. No se usa en interfaz.

### Neutral
- **Prussian blue** (`--color-prussian`): la tinta. Texto 1, contornos, fichas y capas de entrada, contorno de salida y de razonamiento, agente, conector MCP, cabeceras de documento y de definición, pestaña de skill, contador de coste y superficie inversa. Sobre Old Lace, 14,05:1.
- **Pickled bluewood** (`--color-bluewood`): texto 2 y corchete de caché, tanto acierto como fallo. Sobre Old Lace, 10,22:1.
- **Pizarra** (`--color-pizarra`): texto 3 para escalas, anotaciones, rótulos de apoyo, guías del árbol, pista del temporizador, siluetas del hub y el borde de la marca «Cifras ficticias». 5,17:1 sobre fondo, 5,40:1 sobre blanco y 4,88:1 sobre Cinderella.
- **Old lace** (`--color-old-lace`): fondo de escena (`--color-fondo`). Es un color de marca de openbank.es, no un crema por defecto.
- **Blanco** (`--color-blanco`): superficies (islas, recipiente, tarjetas, fichas de salida) y texto sobre navy y sobre rojo. Contra Old Lace solo da 1,04:1, de ahí el contorno obligatorio.
- **Cinderella** (`--color-cinderella`): superficie 2, para apoyos muy suaves: la franja de una gráfica y el marcador de captura pendiente.
- **Gris claro de marca** (navy al 20 % sobre blanco): `--color-texto-inverso-2`, texto 2 sobre navy (9,85:1); y `--color-texto-simulado`, las líneas que simulan texto dentro de un documento, que no se leen.
- **Separador** (`--color-separador`, navy al 10 % sobre Cinderella): líneas finas de tablas, rejillas y campos. Contra el fondo da 1,28:1, así que solo separa; nunca lleva significado.
- **Razonamiento** y **razonamiento rayado** (`--color-razonamiento`, navy al 40 %; `--color-razonamiento-rayado`, navy al 27 %): las dos franjas del patrón de razonamiento. Texto navy encima, 6,13:1. El rayado solo no llega a 3:1 sobre el fondo, así que lleva siempre su contorno (`--color-razonamiento-borde`, Prussian).
- **Valores sobre navy** (solo dentro de `.inverso`): superficie 2 inversa (blanco al 6 % sobre Prussian; con un 10 % el texto 3 no llegaría a 4,5:1), texto 3 inverso (navy al 42 % sobre blanco, 5,83:1 sobre Prussian), texto simulado inverso (blanco al 30 % sobre Prussian) y separador inverso (blanco al 20 % sobre Prussian).

### Roles
El código nunca usa las variables de marca: usa los roles.
- **Superficies:** `--color-fondo` (Old Lace), `--color-superficie` (blanco), `--color-superficie-2` (Cinderella), `--color-superficie-inversa` (Prussian).
- **Texto:** `--color-texto-1` (Prussian), `--color-texto-2` (Bluewood), `--color-texto-3` (Pizarra), `--color-texto-inverso` (blanco), `--color-texto-inverso-2` y `--color-texto-simulado` (gris claro de marca).
- **Líneas y foco:** `--color-contorno` (Prussian), `--color-separador`, `--color-acento`, `--color-acento-sobre-oscuro`, `--color-sobre-acento` (blanco).
- **Semántica del vocabulario:** `--color-entrada` (relleno sólido Prussian) con `--color-sobre-entrada` (blanco); `--color-salida` (blanco hueco) con `--color-salida-borde` y `--color-sobre-salida` (Prussian); `--patron-razonamiento` (rayas a 135°, 10 px cada una) con `--color-razonamiento-borde` y `--color-sobre-razonamiento` (Prussian); `--color-cache-acierto` y `--color-cache-fallo` (Bluewood); `--color-coste` (Prussian) con `--color-sobre-coste` (blanco).
- **`.inverso`:** sobre navy, el fondo y la superficie pasan a Prussian (las separa el contorno blanco), el texto 1 y el contorno a blanco, el texto 2 al gris claro de marca, el texto 3, el texto simulado, la superficie 2 y el separador a sus valores sobre navy, y el acento al rojo del logo para fondo oscuro. La semántica se invierte: la entrada pasa a sólido blanco con texto Prussian, la salida a hueca del color del fondo con contorno blanco, el contorno del razonamiento a blanco, el corchete al gris claro de marca y el coste a blanco con texto Prussian.

### Named Rules
**La regla del único acento.** El rojo marca lo que hay que mirar ahora. Nunca hay dos elementos rojos a la vez en pantalla, ni en escena ni en una lámina de referencia.

**La regla del rojo según el fondo.** Red ribbon sobre claro, el rojo del logo para fondo oscuro sobre navy y el rojo del logo para fondo claro solo dentro del logo, que nunca se recolorea.

**La regla de luminosidad y forma.** Un concepto nuevo se distingue por luminosidad (oscuro, medio, hueco) y por forma, nunca por un tono nuevo. Acierto y fallo de caché comparten color: los separa el trazo, continuo o discontinuo, y el icono ✓ o ✕.

**La regla del hex de marca.** Solo los colores de marca llevan hex, en `design-system.css`. Todo lo demás es `color-mix()` de una variable de marca, y el código usa siempre `var(--color-<rol>)`.

## Typography

**Display Font:** Outfit variable (con system-ui, sans-serif), en peso 300
**Body Font:** Outfit, en pesos 400, 500 y 600
**Label/Mono Font:** DM Mono (con ui-monospace, monospace), en pesos 400 y 500

**Character:** Outfit es la tipografía de openbank.es: geométrica, y ligera en los tamaños grandes para que los títulos respiren. DM Mono da un tono técnico a tokens, código y nombres de fichero, y deja claro que eso es texto del modelo. Las dos van alojadas en `design/assets/fonts/` en woff2, con su licencia OFL, y se cargan con `font-display: block`; no hay Google Fonts ni ninguna fuente por CDN.

### Hierarchy
Cada estilo tiene su clase `.tipo-*` en `componentes.css`; las escenas no escriben `font` a mano.
- **Cifra XL** (300, 240 px, 1, −3 %, dígitos tabulares): una cifra protagonista sola.
- **Cifra** (300, 176 px, 1, −3 %, dígitos tabulares): contadores de tokens y coste.
- **Título XL** (300, 112 px, 1,04, −1,5 %): portada y cierre.
- **Título** (300, 80 px, 1,04, −1,5 %): título de zona.
- **Título S** (300, 56 px, 1,04, −1,5 %): títulos secundarios; también el número de isla (con interlineado 1 y dígitos tabulares) y, en DM Mono 400, el tiempo del temporizador.
- **Entradilla** (400, 40 px, 1,35): ideas clave y citas.
- **Texto** (400, 32 px, 1,35): la frase principal de una zona y la de una tarjeta de consejo. A 500 y con interlineado 1,04, el nombre del agente y el título de la skill; a 600, la cifra del nivel.
- **Texto S** (400, 28 px, 1,35): texto secundario, celdas de tabla y valores de una definición. A 500 e interlineado 1,04, los nombres de isla, subagente y servidor.
- **Etiqueta** (500, 24 px, 1,35): etiquetas, leyendas, escalas, rótulos y nombres en gráficas y circuitos. Es el mínimo absoluto.
- **Mono** (DM Mono 400, 28 px, 1,3): fichas de token y código. A 500, la cifra de un contador en píldora.
- **Mono S** (DM Mono 400, 24 px, 1,3): nombres de fichero y de herramienta, escalas, marcas de eje y notas de fuente.

### Named Rules
**La regla de los 24 px.** Nada se escribe por debajo de 24 px a 1920×1080, ni siquiera una escala o una nota.

**La regla de las cifras quietas.** Toda cifra que se anima o se compara usa dígitos tabulares (`--cifras: tabular-nums`) para que no baile al contar.

## Layout

Cada escena mide `--escena-ancho` × `--escena-alto` (1920×1080) y se diseña para verse a escala 1, que es la escala de proyección. La zona segura deja `--margen-x` a los lados y `--margen-y` arriba y abajo. El espaciado sigue una base de 8 px (`--esp-1` a `--esp-8`): 8 entre capas y entre un icono y su texto, 16 dentro de una etiqueta o una fila, 24 de relleno en fichas y tarjetas pequeñas, 32 en tarjetas, 48 entre bloques, 64 entre grupos, 96 entre secciones y 128 para distancias de caída y grandes separaciones.

No hay diseño adaptable: la presentación se proyecta a 1920×1080. Todas las escenas viven en un único mundo, el mapa, y una cámara las encuadra transformando ese mundo. En el mapa, cada zona es una isla y la ruta de la cámara se dibuja como un camino de puntos navy de 10 px con huecos de 24 px (`--ruta-grosor`, `--ruta-hueco`).

Las medidas de cada pieza viven en el grupo «Componentes · medidas» de `design-system.css` (ficha 60 px y 52 px la pequeña, contador 64 px, recipiente 440×760 y 64×112 el del subagente, agente 390×150, subagente 312×112, documento 300×340, skill 390×250 con pestaña de 150×40, herramienta 112 px, isla 320×190 como mínimo, definición 600 px, conector 88 px, candado 96 px, consejo 760 px como máximo, dial de 200 px de radio, temporizador de 240 px, parada de circuito de 64 px, punto de 28 px y bucle de 480 px). La geometría SVG (gráfica, dial, temporizador, circuito, bucle y curvas para caminos) sale de `dibujos.js`, que lee esas mismas variables y no lleva colores.

### Cámara y movimiento
Solo `motion.js` lee las variables de movimiento; las escenas encadenan sus efectos con `s()` y `v()` y nunca escriben una duración ni una curva literal. Las duraciones van por categoría:
- **Micro** (≤ 0,3 s): `--dur-micro` (0,2 s) para estados, ticks y pulsaciones; `--dur-salida` (0,3 s) para salidas.
- **Entrada** (0,4–0,6 s): `--dur-entrada` (0,5 s) para la aparición de elementos.
- **Progresión** (0,8–1,5 s): `--dur-contador` (0,9 s) para cifras que suben; `--dur-trazado` (1,2 s) para líneas que se dibujan y puntos que recorren un camino.
- **Cámara** (0,8–1,5 s): `--dur-camara-corta` (0,8 s) entre zonas vecinas, `--dur-camara` (1,2 s) como vuelo estándar y `--dur-camara-larga` (1,5 s) para saltos largos y la vista general.
- **Tiempo simulado** (2–5 s, siempre lineal): `--dur-temporizador` (3 s), cinco minutos comprimidos. Es el paso del tiempo dentro de la escena y no se usa para transiciones.

Las curvas van por propósito: apariciones con `--ease-aparicion` (`power3.out`), salidas con `--ease-salida` (`power2.in`), cámara con `--ease-camara` (`power2.inOut`) y `--ease-camara-larga` (`sine.inOut`), interfaz con `--ease-interfaz` (`back.out(1.4)`), cambios de estado breves con `--dur-micro` (atenuar, avivar, pulsar, caducar) con un ease-out suave, `--ease-estado` (`power1.out`), caídas al recipiente con `--ease-caida` (`power2.in`), asentado de capas con `--ease-asentado` (`back.out(1.2)`, cuyo rebote corto se ve porque la capa crece en escala vertical), cifras con `--ease-contador` (`power1.out`), trazados y recorridos con `--ease-trazado` (`power1.inOut`) y el temporizador con `--ease-temporizador` (`none`). Los escalonados son de 0,06 s para listas, tarjetas y leyendas (`--escalonado`), 0,03 s para fichas de token (`--escalonado-tokens`) y 0,12 s para capas (`--escalonado-capas`).

Al llegar, la cámara espera `--pausa-tras-camara` (0,3 s) y después anima la zona. Hay que dejar tiempo de lectura: un mínimo de 1,5 s con una etiqueta o una cifra (`--pausa-lectura-corta`) y de 3 s con una frase (`--pausa-lectura`). En general, la pausa es el máximo entre 1,5 s y el número de palabras × 0,3 s (`--pausa-por-palabra`).

El vocabulario de movimiento son los 18 efectos registrados en `motion.js`: `aparecer`, `desaparecer`, `entrarConMuelle`, `atenuar` y `avivar`; `caerAlRecipiente`, `apilarCapa`, `subirNivel`, `alargarCorchete`, `caducarCache` y `subirContador`; `pulsar`, `voltear` (plano, sin 3D) y `desplegar`; y `trazar`, `recorrerCamino`, `girarDial` y `agotarTemporizador`. Ninguno mueve la cámara. Todos son reversibles: los cambios de clase (`caducarCache`, `voltear`, `girarDial`, `agotarTemporizador`, `desplegar`) van dentro del timeline como un `set` de atributo, nunca en un callback, así que la escena se puede rebobinar paso a paso. En modo estático (`?estatico`, `prefers-reduced-motion` o `data-movimiento="estatico"`) duran 0 y saltan a su estado final.

### Named Rules
**La regla de la cámara quieta.** La cámara nunca se mueve mientras algo se anima dentro de la zona: primero llega, luego espera y después anima.

## Elevation & Depth

El sistema es plano. La profundidad la dan el contorno de 3 px y el contraste entre superficie blanca y suelo crema, no las sombras. Existe una única elevación, plana y sin difuminado, porque el proyector se come las sombras difusas. Los anillos interiores de las fichas de salida, el contador y el resaltado de una definición son contornos, no elevación.

### Shadow Vocabulary
- **Elevación 0** (`--elevacion-0`: `none`): todo lo que está quieto en la escena.
- **Elevación 1** (`--elevacion-1`: `0 6px 0` con navy al 14 %): solo para lo que flota, como una ficha que se arrastra o el documento que queda delante en una pila.

### Named Rules
**La regla del contorno.** Toda superficie clara lleva un contorno de 3 px en `--color-contorno` (`--trazo-contorno`): navy sobre crema, blanco dentro de `.inverso`. Las piezas sólidas navy (agente, conector, entrada, coste) son tinta y no lo necesitan. El tono por sí solo no separa nada.

**La regla de la sombra plana.** Una sola sombra, sin difuminado. Lo demás queda a `--elevacion-0`.

## Shapes

Formas redondeadas con cuatro radios: 12 px (`--radio-s`) para capas, documentos, definiciones, capturas, resaltados y las esquinas del corchete; 24 px (`--radio-m`) para tarjetas (agente, subagente, skill, consejo, servidor, candado) y siluetas del hub; 48 px (`--radio-l`) para islas del mapa, el recipiente y la caja de plugin; y píldora (`--radio-pildora`) para fichas de token, etiquetas, contadores, la línea de nivel, las líneas de un documento y los círculos (herramienta, conector, paradas).

Hay tres trazos: 2 px (`--trazo-fino`) para separadores, ejes, rejillas, marcas de escala, guías del árbol, la guía que une una etiqueta con lo que señala, la pista del temporizador y el borde de las etiquetas; 3 px (`--trazo-contorno`) para el contorno de toda superficie, las líneas de gráfica, los cables, el bucle y el circuito; y 6 px (`--trazo-fuerte`) para el corchete de caché, la línea de nivel, los resaltados, la caja de plugin, el candado, la aguja del dial, el progreso del temporizador y la serie protagonista. El trazo también lleva significado: continuo, discontinuo (`--grafica-discontinua`, 18/12 px) o de puntos (`--grafica-punteada`), y punteado para lo que aún no está (el hueco del hub). Los puntos redondos del camino son siempre movimiento: la ruta de la cámara y la salida del subagente.

Los iconos son de Lucide v1.57.0, en línea en `design/iconos.js` (se generan con `npm run iconos -- nombre`), con `stroke-width 2` sobre una caja de 24 y el color por `currentColor`. A 36 px (`--icono-m`) el trazo real es de 3 px, igual que el contorno, y ese es el tamaño por defecto. A 24 px (`--icono-s`) van dentro de etiquetas, cabeceras y fichas; a 48 px (`--icono-l`), solo el icono principal de una pieza grande (agente, skill desplegada, candado). Si una fuente no tiene un carácter (→, ↩, ✓, ✕, ≥, ≈), se usa su icono.

### Named Rules
**La regla del icono a 36.** Un icono suelto en escena va a 36 px, para que su trazo coincida con el contorno; 24 dentro de una etiqueta y 48 solo para el icono principal de una pieza grande.

## Components

El vocabulario visual: treinta componentes en `componentes.css`, cada uno con su cabecera (clase, forma, color, medidas, icono, movimiento y escenas). Cada concepto tiene un único dibujo y se reconoce igual en todas las zonas. Si una zona necesita algo nuevo, primero se añade al design system. Cuatro utilidades los acompañan: los estilos de texto `.tipo-*`, el icono `.icono` (36, 24 o 48), el estado atenuado (opacidad 0,3, con `atenuar` y `avivar`) y el volteo de dos caras.

### Tokens y contexto

**Ficha de token.** Una píldora en DM Mono que se lee como un trozo de texto del modelo.
- **Forma:** píldora de 60 px de alto (52 px la pequeña, en Mono S), DM Mono 400 a 28 px y 24 px de relleno lateral. Un espacio inicial se dibuja como un punto medio «·» atenuado.
- **Color:** entrada en sólido Prussian con texto blanco; salida hueca, blanca, con contorno interior Prussian de 3 px; razonamiento con el patrón rayado y contorno Prussian.
- **Movimiento:** `aparecer` con `--escalonado-tokens`, y `caerAlRecipiente`.

**Capa.** Muchos tokens del mismo tipo forman una capa del recipiente.
- **Forma:** alto proporcional a los tokens, radio de 12 px y 24 px de relleno, con la etiqueta en Outfit 500 a 24 px. Las capas se separan 3 px entre sí y 8 px de las paredes (`--esp-1`).
- **Color:** el mismo relleno que su ficha (entrada, salida o razonamiento).
- **Movimiento:** `apilarCapa`: crece en escala vertical desde su borde inferior, con `--ease-asentado` y `--escalonado-capas`, y se asienta con un rebote corto.

**Ventana de contexto.** El recipiente que se llena de abajo arriba.
- **Forma:** rectángulo vertical de 440×760 con contorno de 3 px y radio de 48 px; la versión mini del subagente mide 64×112 con radio de 24 px. A la izquierda, la escala en Mono S y texto 3 con marcas de 2 px.
- **Nivel:** una línea de 6 px en píldora, en el color de acento, con la cifra en Outfit 600 a 32 px y dígitos tabulares a su derecha, también en acento.
- **Icono:** `app-window`, en etiquetas.
- **Movimiento:** `apilarCapa` y `subirNivel`.

**Corchete de caché.**
- **Forma:** corchete de 24 px de ancho y trazo de 6 px a la derecha de lo que cubre, abierto por la izquierda y con las esquinas derechas a 12 px, en Bluewood.
- **Acierto y fallo:** se distinguen por trazo e icono, no por tono. Acierto: trazo continuo e icono `check`. Fallo: trazo discontinuo e icono `x`. Al lado va una etiqueta en Outfit 500 a 24 px con el detalle en Mono S y texto 2.
- **Movimiento:** `alargarCorchete` (crece desde abajo) y `caducarCache` (se desvanece, pasa a su variante de fallo y vuelve, con `--ease-estado`).

**Leyenda.** Muestras en fila con su nombre en etiqueta y texto 2: píldoras de 48×24 px con los rellenos de token, y un corchete pequeño. Entra con `aparecer`.

### Piezas del agente

**Agente.** Tarjeta navy sólida de 390×150 con radio de 24 px y texto blanco. Lleva el icono `bot` a 48 px, el nombre en Outfit 500 a 32 px y una línea de configuración en Mono S en gris claro de marca. Entra con `entrarConMuelle`.

**Subagente.** La tarjeta del agente, más pequeña (312×112, ≈ 80 %) y hueca: blanca con contorno de 3 px, nombre en Outfit 500 a 28 px y detalle en Mono S y texto 3. Lleva el icono `bot` y siempre va acompañado de su ventana mini. Sale del agente por el camino de puntos (`recorrerCamino`) y devuelve una ficha de resumen con el icono `corner-down-left` (`caerAlRecipiente`).

**Bucle del agente.** Círculo de 480 px con flechas en sentido horario alrededor del agente y sus herramientas, en trazo de 3 px del color de contorno, con cuatro etiquetas en texto 2. Un punto de 28 px en texto 1 lo recorre en cada llamada. Aparece con `trazar` y da vueltas con `recorrerCamino`.

**Documento** (rules y AGENTS.md). Hoja blanca de 300×340 con radio de 12 px y contorno de 3 px, una cabecera navy con el icono `file-text` a 24 px y el nombre de fichero en Mono S en blanco, y líneas en píldora de 16 px de alto en el color de texto simulado. Es lo primero que entra en la ventana (`caerAlRecipiente`) y siempre va al fondo del recipiente. En una pila, el de delante lleva `--elevacion-1`.

**Skill.** Tarjeta-pieza blanca de 390 px de ancho, con radio de 24 px, contorno de 3 px y una pestaña navy de 150×40 encima a la izquierda. Plegada solo muestra el título (icono `puzzle` a 36 px y nombre en Outfit 500 a 32 px), el identificador en Mono S y la descripción en etiqueta y texto 2. Desplegada mide 250 px de alto, el icono pasa a 48 px y añade su anatomía numerada (cuándo, qué necesita, pasos, resultado) sobre un separador de 2 px. Entra con `entrarConMuelle` y se abre con `desplegar`, que recibe la skill, le quita la variante plegada y hace crecer su anatomía, y se puede rebobinar; solo entra en la ventana cuando se usa.

**Árbol de repositorio.** Carpetas y ficheros en Mono S y texto 1, con iconos (`folder`, `folder-open`, `file`, `file-text`) y guías de sangría de 2 px en texto 3. Un AGENTS.md cargado se rellena como ficha de entrada. Las filas entran con `aparecer` y `--escalonado`.

### Hub

**Hueco del hub.** La silueta punteada (3 px, texto 3, sin relleno) de una pieza que aún no está en el agente, con su icono y su nombre en etiqueta. Toma la forma de la pieza que la ocupará: 24 px de radio por defecto, círculo, el radio del recipiente o el del documento. Desaparece con `desaparecer` cuando la pieza llega.

### Herramientas y MCP

**Herramienta.** Círculo blanco de 112 px con contorno de 3 px, el icono de la acción (`file-text`, `pencil`, `search`, `terminal` o `wrench`) y el nombre debajo en Mono S. Entra con `entrarConMuelle`, da un pulso con `pulsar` (`--ease-estado`) al usarse y se da la vuelta con `voltear` para mostrar su definición. Su resultado entra en la ventana como ficha de entrada.

**Definición de herramienta.** Lo que el agente lee de una herramienta: tarjeta de 600 px con radio de 12 px y contorno de 3 px, cabecera navy con `wrench` a 24 px y el nombre en Mono, y campos (clave en etiqueta y texto 3; valor en Texto S o Mono S) separados por líneas finas. La descripción, el disparador, se resalta con un anillo interior de 6 px en acento, el mismo dibujo que el resaltado de una captura. Aparece con `voltear` o `aparecer`.

**Conector MCP.** Un nodo navy de 88 px con el icono `plug` en el borde del agente y un cable continuo de 3 px hasta cada servidor: una tarjeta blanca con radio de 24 px y contorno de 3 px, icono `laptop` (local) o `cloud` (remoto), nombre en Outfit 500 a 28 px y detalle en Mono S y texto 3. Nodo y servidores entran con `entrarConMuelle`; el cable, con `trazar`.

**Candado.** Cuadrado blanco de 96 px con trazo de 6 px y radio de 24 px, con `lock` a 48 px y la regla al lado en Outfit 500 a 28 px: lo que no debe cruzar. Entra con `entrarConMuelle`.

**Caja de plugin.** Caja sin relleno con trazo de 6 px y radio de 48 px que envuelve las piezas que empaqueta, con su nombre en una pestaña en píldora blanca (contorno de 3 px, icono `package` a 24 px) sobre el borde. Entra con `entrarConMuelle`.

### Datos y tiempo

**Contador.** Píldora de 64 px de alto con icono y cifra en DM Mono 500 a 28 px con dígitos tabulares y la unidad en etiqueta: blanca con contorno de 3 px para llamadas (`repeat`) o latencia (`hourglass`), y navy sólida sin contorno para el coste (`coins`). La variante grande es una cifra en `--tipo-cifra` (o `--tipo-cifra-xl`) con su etiqueta en texto 3 encima y la unidad en Texto S y texto 2. Siempre lleva su unidad. Sube con `subirContador`.

**Tabla.** Sin caja: cabecera en etiqueta y texto 3 con una línea de contorno de 3 px debajo, filas en Texto S separadas por líneas finas y celdas con 16 px arriba y abajo y 48 px a la derecha. Las cifras van a la derecha y con dígitos tabulares. Entra fila a fila con `aparecer`.

**Gráfica de líneas.** Ejes de 2 px, rejilla en separador, marcas en Mono S y texto 3, y una línea de 3 px por serie con su nombre al final, sin leyenda aparte. Las series se separan por luminosidad y trazo (texto 1 continua, texto 2 discontinua, texto 3 continua y texto 3 de puntos); solo la protagonista va en acento, a 6 px. La franja de apoyo va en superficie 2 con borde discontinuo. Siempre lleva su nota de fuente. Las líneas se dibujan una a una con `trazar` y los puntos y etiquetas entran con `aparecer`.

**Dial de effort.** Semicírculo de 200 px de radio con una marca por nivel (Low, Medium, High, XHigh, Max) en etiqueta y texto 3, y una aguja de 6 px en texto 1. El nivel actual pasa a texto 1 y peso 600. Icono `gauge` en etiquetas. Gira con `girarDial`.

**Temporizador.** Anillo de 240 px que se vacía (pista de 2 px en texto 3, progreso de 6 px en texto 1), con el tiempo restante en DM Mono a 56 px en el centro e icono `timer`. Al agotarse, todo pasa a texto 3. Corre con `agotarTemporizador`, en tiempo simulado y con curva lineal.

### Mapa y apoyo

**Isla del mapa.** Zona del mapa o agrupación de una escena: tarjeta blanca de 320×190 como mínimo, con radio de 48 px, contorno de 3 px y 24×32 px de relleno. Arriba, el número en Outfit 300 a 56 px con dígitos tabulares y el icono de la zona a 36 px; abajo, el nombre en Outfit 500 a 28 px. La actual va en relleno y contorno de acento con texto blanco: es el «usted está aquí» del mapa. Las demás pueden atenuarse. Entra con `entrarConMuelle` y cambia de foco con `atenuar` y `avivar`.

**Camino de puntos y guía.** El camino es la ruta de la cámara en el mapa y el camino por el que sale un subagente: puntos redondos de 10 px cada 24 px en el color de contorno. Los puntos son siempre movimiento. La guía es otra cosa: una línea fina continua de 2 px en texto 3 que une una etiqueta con lo que señala. Los dos se dibujan con `trazar`.

**Circuito.** Circuito cerrado de 3 px con una parada numerada de 64 px por paso del método: pendientes en blanco con contorno, hechas en sólido de entrada y la actual en acento; los nombres en etiqueta y texto 2 y los números en Mono S. Al pasar a la siguiente, un punto de 28 px en acento recorre la pista con `recorrerCamino`. Cuando el acento está en otra parte (el mapa con otra zona actual), el circuito va sin parada actual ni punto. Icono `list-checks` en etiquetas.

**Etiqueta.** Píldora blanca con borde de 2 px en el color de contorno, en Outfit 500 a 24 px, con 8×24 px de relleno y un icono opcional a 24 px. La variante ventaja es más grande (Texto S, contorno de 3 px, icono `check`). Entra con `aparecer`.

**Marca «Cifras ficticias».** La misma píldora sin relleno, con borde de 2 px en texto 3, texto 2 y el icono `info` a 24 px. Es obligatoria en toda escena con cifras de ejemplo y aparece con la primera cifra.

**Nota de fuente.** «Fuente:» en etiqueta y la referencia en Mono S, todo en texto 3, bajo toda cifra real o gráfica. Aparece con la gráfica.

**Captura con resaltado.** Captura enmarcada con contorno de 3 px y radio de 12 px. El control que se explica se rodea con un resaltado de 6 px en acento y una etiqueta unida a él por la guía fina continua. Sin captura real, un marcador «Captura pendiente» visible sobre superficie 2, con el icono `image`. El resaltado entra con `entrarConMuelle`, la etiqueta con `aparecer` y la guía con `trazar`.

**Tarjeta de consejo.** Tarjeta blanca de hasta 760 px con radio de 24 px, contorno de 3 px y 32 px de relleno: la bombilla (`lightbulb`) a la izquierda, el rótulo «Consejo» en etiqueta y texto 3, y una sola frase en Texto y texto 1. Entra con `entrarConMuelle`.

## Do's and Don'ts

### Do:
- **Do** usar las variables de rol y de semántica (`--color-texto-1`, `--color-acento`, `--color-entrada`…) en componentes y escenas; en SVG, el color va por CSS y en GSAP se lee con `v()`.
- **Do** contornear cada superficie clara con 3 px de `--color-contorno`, porque el proyector iguala crema y blanco.
- **Do** reservar el rojo para una sola cosa por pantalla, y también por lámina de referencia: la zona actual, el nivel, la parada actual o la cifra protagonista.
- **Do** mantener el texto en 24 px o más, con contraste de al menos 4,5:1; el mínimo de 3:1 solo vale para texto de 24 px o más y para gráficos.
- **Do** usar las clases `.tipo-*` y la escala `--tipo-*` para todo texto.
- **Do** marcar «Cifras ficticias» en toda escena con cifras de ejemplo, y poner la nota de fuente bajo toda cifra real o gráfica.
- **Do** usar iconos Lucide de `design/iconos.js` a 36 px con `stroke-width 2` (24 dentro de etiquetas, 48 para el icono principal de una pieza grande), y el icono cuando la fuente no tenga el carácter.
- **Do** encadenar cámara, `--pausa-tras-camara` y animación de zona, y dejar las pausas de lectura (1,5 s con una etiqueta o una cifra, 3 s con una frase).
- **Do** animar con los efectos de `motion.js` y, en una coreografía de escena, con `s()` y `v()`; el tiempo simulado, siempre con curva lineal.
- **Do** unir una etiqueta con lo que señala mediante la guía fina continua; los puntos redondos quedan para el movimiento (ruta de la cámara y salida del subagente).
- **Do** usar los logos oficiales de `design/assets/logos/` tal cual.

### Don't:
- **Don't** escribir un color a mano (hex, `rgb()`, `hsl()` o nombres como `red`) en el código de la presentación, ni en atributos SVG ni en una animación.
- **Don't** poner dos elementos rojos a la vez ni introducir tonos rojizos que compitan con el acento.
- **Don't** usar partículas, brillos, destellos, degradados, sombras difusas ni giros 3D decorativos.
- **Don't** mover la cámara mientras algo se anima dentro de la zona.
- **Don't** dibujar un concepto de otra forma: un token es siempre una píldora en DM Mono y la caché, siempre un corchete.
- **Don't** sobrescribir una variable dentro de una escena, ni poner una medida suelta a un componente cuando existe su variable; si una escena necesita otro valor, se crea una variable con nombre propio en `design-system.css`.
- **Don't** escribir duraciones ni curvas literales, ni usar el tiempo simulado para transiciones.
- **Don't** cargar fuentes, iconos ni librerías por CDN: todo va dentro del proyecto y funciona sin conexión.
- **Don't** recolorear los logos.
