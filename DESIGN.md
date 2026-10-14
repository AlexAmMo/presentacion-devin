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
  texto-3-inverso: "#94A6B1"
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
    lineHeight: 1
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
    lineHeight: 0.95
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
  margen-x: "120px"
  margen-y: "96px"
components:
  ficha-entrada:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    typography: "{typography.mono}"
    rounded: "{rounded.pildora}"
    padding: "0 22px"
    height: "60px"
  ficha-salida:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    typography: "{typography.mono}"
    rounded: "{rounded.pildora}"
    padding: "0 22px"
    height: "60px"
  ficha-razonamiento:
    backgroundColor: "{colors.razonamiento}"
    textColor: "{colors.prussian}"
    typography: "{typography.mono}"
    rounded: "{rounded.pildora}"
    padding: "0 22px"
    height: "60px"
  capa:
    typography: "{typography.etiqueta}"
    rounded: "{rounded.s}"
    padding: "0 22px"
  recipiente:
    backgroundColor: "{colors.blanco}"
    rounded: "{rounded.l}"
    width: "440px"
    height: "760px"
  agente:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.m}"
    padding: "0 26px"
    width: "390px"
    height: "150px"
  subagente:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.m}"
    padding: "0 20px"
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
    padding: "16px 18px"
  skill:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.m}"
    padding: "26px"
    width: "390px"
    height: "250px"
  herramienta:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.pildora}"
    size: "112px"
  contador-coste:
    backgroundColor: "{colors.prussian}"
    textColor: "{colors.blanco}"
    typography: "{typography.mono}"
    rounded: "{rounded.pildora}"
    padding: "0 26px"
    height: "64px"
  isla:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    rounded: "{rounded.l}"
    padding: "22px 30px"
    width: "320px"
    height: "190px"
  isla-actual:
    backgroundColor: "{colors.red-ribbon}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.l}"
    padding: "22px 30px"
    width: "320px"
    height: "190px"
  etiqueta:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.prussian}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.pildora}"
    padding: "10px 22px"
  marca-ficticio:
    textColor: "{colors.bluewood}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.pildora}"
    padding: "10px 20px"
---

<!-- Derivado: generado con `/impeccable document` a partir de design/design-system.css, design/design-system.html y design/assets/logos/. No se edita a mano: si cambia design/, se regenera. Si este fichero y design/ discrepan, manda design/. -->

# Design System: Devin en el día a día

## Overview

**Creative North Star: "Usted está aquí"**

La charla es un único mapa dibujado con tinta navy sobre papel crema, como un plano de orientación. Islas, recipientes, fichas y rutas se trazan con el mismo navy y se separan con un contorno de 3 px. El rojo es el punto «usted está aquí»: marca la zona actual, el nivel que importa o la cifra protagonista, y nunca hay dos a la vez. Una cámara recorre el mapa; al llegar se detiene y solo entonces se anima la zona.

El sistema está hecho para un proyector que lava los colores e iguala crema y blanco. Por eso la separación nunca depende del tono: depende del contorno, de la luminosidad (oscuro, medio, hueco) y de la forma (sólido, rayado o contorno; continuo o discontinuo). La paleta se ciñe a la marca Openbank y todo lo que no es color de marca se deriva de navy. Cada escena se diseña a 1920×1080 y ningún texto baja de 24 px.

La densidad es baja y deliberada: una idea por zona, mucho aire y un vocabulario cerrado en el que cada concepto tiene un único dibujo. Las formas son redondeadas y planas, con una sola elevación sin difuminado. Quedan fuera las partículas, los brillos, los destellos, los degradados, las sombras difusas y los giros 3D decorativos.

**Key Characteristics:**
- Tinta navy sobre crema, con superficies blancas siempre contorneadas a 3 px.
- Un único acento rojo por pantalla; los tres rojos de la marca cuentan como uno.
- Conceptos distinguidos por luminosidad y forma, no por tono.
- Escala tipográfica que empieza en 24 px; Outfit ligera en grande y DM Mono para tokens y código.
- Plano: una sola elevación, también plana.
- Cámara que llega, espera `--pausa-tras-camara` y después anima la zona.

## Colors

Cinco colores de marca de openbank.es hacen todo el trabajo: navy para el contenido, rojo para el foco, cremas de suelo y blanco para separar superficies; el resto se deriva de navy con `color-mix()`.

### Primary
- **Red ribbon** (`--color-red-ribbon`): el acento sobre fondo claro (`--color-acento`). Zona actual del mapa, línea de nivel del recipiente, cifra protagonista. El blanco encima da 4,96:1 y sobre Old Lace da 4,75:1.
- **Rojo del logo para fondo oscuro** (`--color-rojo-oscuro`): el mismo acento sobre superficies navy (`--color-acento-sobre-oscuro`, y `--color-acento` dentro de `.inverso`). Sobre Prussian da 3,74:1: solo texto de 24 px o más y gráficos.
- **Rojo del logo para fondo claro** (`--color-rojo-logo`): solo existe dentro del logo. No se usa en interfaz.

### Neutral
- **Prussian blue** (`--color-prussian`): la tinta. Texto 1, contornos, fichas de entrada, agente, contador de coste y superficie inversa. Sobre Old Lace, 14,05:1.
- **Pickled bluewood** (`--color-bluewood`): texto 2 y corchete de caché, tanto acierto como fallo. Sobre Old Lace, 10,22:1.
- **Pizarra** (`--color-pizarra`): texto 3 para escalas, anotaciones y el borde de la marca «Cifras ficticias». 5,17:1 sobre fondo, 5,40:1 sobre blanco y 4,88:1 sobre Cinderella.
- **Old lace** (`--color-old-lace`): fondo de escena (`--color-fondo`). Es un color de marca de openbank.es, no un crema por defecto.
- **Blanco** (`--color-blanco`): superficies (islas, recipiente, tarjetas, fichas de salida) y texto sobre navy y sobre rojo. Contra Old Lace solo da 1,04:1, de ahí el contorno obligatorio.
- **Cinderella** (`--color-cinderella`): superficie 2, para apoyos muy suaves.
- **Gris claro de marca** (`--color-texto-inverso-2`, navy al 20 % sobre blanco): texto 2 sobre navy (9,85:1) y líneas de texto simuladas dentro de un documento.
- **Separador** (`--color-separador`, navy al 10 % sobre Cinderella): líneas finas. Contra el fondo da 1,28:1, así que solo separa; nunca lleva significado.
- **Razonamiento** y **razonamiento rayado** (`--color-razonamiento`, navy al 40 %; `--color-razonamiento-rayado`, navy al 27 %): las dos franjas del patrón de razonamiento. Texto navy encima, 6,13:1.
- **Texto 3 inverso** (navy al 42 % sobre blanco): texto 3 dentro de `.inverso`. Sobre Prussian, 5,83:1.

### Roles
El código nunca usa las variables de marca: usa los roles.
- **Superficies:** `--color-fondo` (Old Lace), `--color-superficie` (blanco), `--color-superficie-2` (Cinderella), `--color-superficie-inversa` (Prussian).
- **Texto:** `--color-texto-1` (Prussian), `--color-texto-2` (Bluewood), `--color-texto-3` (Pizarra), `--color-texto-inverso` (blanco), `--color-texto-inverso-2` (gris claro de marca).
- **Líneas y foco:** `--color-contorno` (Prussian), `--color-separador`, `--color-acento`, `--color-acento-sobre-oscuro`, `--color-sobre-acento` (blanco).
- **Semántica del vocabulario:** `--color-entrada` (relleno sólido Prussian) con `--color-sobre-entrada` (blanco); `--color-salida` (blanco hueco) con `--color-salida-borde` y `--color-sobre-salida` (Prussian); `--patron-razonamiento` (rayas a 135°, 10 px cada una) con `--color-sobre-razonamiento` (Prussian); `--color-cache-acierto` y `--color-cache-fallo` (Bluewood); `--color-coste` (Prussian) con `--color-sobre-coste` (blanco).
- **`.inverso`:** sobre navy, el fondo y la superficie pasan a Prussian, el texto 1 y el contorno a blanco, el texto 2 al gris claro de marca, el texto 3 a navy al 42 % y el acento al rojo del logo para fondo oscuro.

### Named Rules
**La regla del único acento.** El rojo marca lo que hay que mirar ahora. Nunca hay dos elementos rojos a la vez en pantalla.

**La regla del rojo según el fondo.** Red ribbon sobre claro, el rojo del logo para fondo oscuro sobre navy y el rojo del logo para fondo claro solo dentro del logo, que nunca se recolorea.

**La regla de luminosidad y forma.** Un concepto nuevo se distingue por luminosidad (oscuro, medio, hueco) y por forma, nunca por un tono nuevo. Acierto y fallo de caché comparten color: los separa el trazo, continuo o discontinuo, y el icono ✓ o ✕.

**La regla del hex de marca.** Solo los colores de marca llevan hex, en `design-system.css`. Todo lo demás es `color-mix()` de una variable de marca, y el código usa siempre `var(--color-<rol>)`.

## Typography

**Display Font:** Outfit (con system-ui, sans-serif), en peso 300
**Body Font:** Outfit, en pesos 400, 500 y 600
**Label/Mono Font:** DM Mono (con ui-monospace, monospace), en pesos 400 y 500

**Character:** Outfit es la tipografía de openbank.es: geométrica, y ligera en los tamaños grandes para que los títulos respiren. DM Mono da un tono técnico a tokens, código y nombres de fichero, y deja claro que eso es texto del modelo.

### Hierarchy
- **Cifra XL** (300, 240 px, 0,95, −3 %, dígitos tabulares): una cifra protagonista sola.
- **Cifra** (300, 176 px, 1, −3 %, dígitos tabulares): contadores de tokens y coste.
- **Título XL** (300, 112 px, 1,04, −1,5 %): portada y cierre.
- **Título** (300, 80 px, 1,04, −1,5 %): título de zona.
- **Título S** (300, 56 px, 1,04, −1,5 %): títulos secundarios.
- **Entradilla** (400, 40 px, 1,35): ideas clave y citas.
- **Texto** (400, 32 px, 1,35): la frase principal de una zona, en texto 2.
- **Texto S** (400 a 500, 28 px): nombres de zona en el mapa y texto secundario.
- **Etiqueta** (500, 24 px): etiquetas, leyendas y escalas. Es el mínimo absoluto.
- **Mono** (DM Mono 400, 28 px, 1,3): fichas de token y código.
- **Mono S** (DM Mono 400, 24 px, 1,3): nombres de fichero, escalas y anotaciones.

### Named Rules
**La regla de los 24 px.** Nada se escribe por debajo de 24 px a 1920×1080, ni siquiera una escala o una nota.

**La regla de las cifras quietas.** Toda cifra que se anima usa dígitos tabulares (`--cifras: tabular-nums`) para que no baile al contar.

## Layout

Cada escena mide 1920×1080 y se diseña para verse a escala 1, que es la escala de proyección. La zona segura deja 120 px a los lados (`--margen-x`) y 96 px arriba y abajo (`--margen-y`). El espaciado sigue una base de 8 px (8, 16, 24, 32, 48, 64, 96, 128).

No hay diseño adaptable: la presentación se proyecta a 1920×1080. Todas las escenas viven en un único mundo, el mapa, y una cámara las encuadra transformando ese mundo. En el mapa, cada zona es una isla y la ruta de la cámara se dibuja como un camino de puntos navy de 10 px con huecos de 24 px (`--ruta-grosor`, `--ruta-hueco`).

### Cámara y movimiento
La cámara vuela entre 0,8 y 1,5 s: `--dur-camara-corta` (0,8 s) entre zonas vecinas, `--dur-camara` (1,2 s) como vuelo estándar con `--ease-camara` (`power2.inOut`) y `--dur-camara-larga` (1,5 s) para saltos largos y la vista general, con `--ease-camara-larga` (`sine.inOut`). Al llegar espera `--pausa-tras-camara` (0,3 s) y después anima la zona.

Dentro de una zona, las curvas van por propósito: apariciones en 0,5 s con `power3.out`, salidas en 0,3 s con `power2.in`, interfaz con `back.out(1.4)`, caídas con `power2.in`, asentado con `back.out(1.2)` y contadores en 0,9 s con `power1.out`. Los escalonados son de 0,06 s para listas, 0,03 s para fichas de token y 0,12 s para capas. Hay que dejar tiempo de lectura: un mínimo de 1,5 s con una etiqueta o una cifra y de 3 s con una frase. En general, la pausa es el máximo entre 1,5 s y el número de palabras × 0,3 s.

### Named Rules
**La regla de la cámara quieta.** La cámara nunca se mueve mientras algo se anima dentro de la zona: primero llega, luego espera y después anima.

## Elevation & Depth

El sistema es plano. La profundidad la dan el contorno navy de 3 px y el contraste entre superficie blanca y suelo crema, no las sombras. Existe una única elevación, plana y sin difuminado, porque el proyector se come las sombras difusas.

### Shadow Vocabulary
- **Elevación 1** (`--elevacion-1`: `0 6px 0` con navy al 14 %): solo para lo que flota sobre la escena, como una ficha que se arrastra, un aviso o el documento que queda delante en una pila.

### Named Rules
**La regla del contorno.** Toda superficie lleva un contorno navy de 3 px (`--trazo-contorno`). El tono por sí solo no separa nada.

**La regla de la sombra plana.** Una sola sombra, sin difuminado. Lo demás queda a `--elevacion-0`.

## Shapes

Formas redondeadas con cuatro radios: 12 px (`--radio-s`) para capas, código y documentos; 24 px (`--radio-m`) para tarjetas como el agente o la skill; 48 px (`--radio-l`) para islas del mapa y el recipiente; y píldora (`--radio-pildora`) para fichas de token, etiquetas y contadores. La herramienta es un círculo.

Hay tres trazos: 2 px (`--trazo-fino`) para separadores, marcas de escala y el borde de las etiquetas; 3 px (`--trazo-contorno`) para el contorno de toda superficie; y 6 px (`--trazo-fuerte`) para el corchete de caché y la línea de nivel.

Los iconos son de Lucide con `stroke-width 2` sobre una caja de 24: a 36 px (`--icono-m`) el trazo real es de 3 px, igual que el contorno, y ese es el tamaño por defecto. A 24 px (`--icono-s`) solo van dentro de etiquetas y a 48 px (`--icono-l`) en tarjetas grandes y herramientas.

### Named Rules
**La regla del icono a 36.** Un icono suelto en escena va a 36 px, para que su trazo coincida con el contorno.

## Components

El vocabulario visual: cada concepto tiene un único dibujo y se reconoce igual en todas las zonas. Si una zona necesita algo nuevo, primero se añade al design system.

### Ficha de token
Una píldora en DM Mono que se lee como un trozo de texto del modelo.
- **Forma:** píldora de 60 px de alto, DM Mono 400 a 28 px y 22 px de relleno lateral. Un espacio inicial se dibuja como un punto medio «·» atenuado.
- **Entrada:** relleno sólido Prussian con texto blanco.
- **Salida:** hueca, blanca, con contorno interior Prussian de 3 px.
- **Razonamiento:** el patrón rayado de navy al 40 % y al 27 %, con texto Prussian.
- **Movimiento:** aparece con `--ease-aparicion` y `--escalonado-tokens`, y cae al recipiente con `--ease-caida`.

### Capa y recipiente (ventana de contexto)
Muchos tokens se convierten en una capa; las capas llenan un recipiente.
- **Recipiente:** rectángulo vertical blanco de 440×760, con contorno de 3 px y radio de 48 px. Se llena de abajo arriba, con una escala a la izquierda en DM Mono 24 px y texto 3, con marcas de 2 px.
- **Capa:** el mismo relleno que su tipo de token, con radio de 12 px, una separación de 3 px entre capas y 10 px de margen con las paredes. La altura es proporcional a los tokens y la etiqueta en Outfit 500 a 24 px solo aparece si la capa mide 40 px o más.
- **Nivel:** una línea de 6 px en el color de acento que sobresale del recipiente, con el porcentaje en Outfit 600 con dígitos tabulares.
- **Movimiento:** cada capa crece desde abajo con `--ease-asentado` y `--escalonado-capas`; la línea de nivel sube con `--ease-aparicion`.

### Corchete de caché
- **Forma:** un corchete de 6 px a la derecha de lo que cubre, abierto por la izquierda y con las esquinas derechas redondeadas, en Bluewood.
- **Acierto:** trazo continuo e icono `check`. **Fallo:** trazo discontinuo e icono `x`. Al lado va una etiqueta en Outfit 500 a 24 px con la cifra en DM Mono.
- **Movimiento:** el corchete se alarga con `--ease-aparicion`.

### Contador de coste
- **Forma:** píldora navy de 64 px de alto con el icono `coins` a 36 px y la cifra en DM Mono 500 a 28 px, o bien una cifra grande en `--tipo-cifra`.
- **Siempre** lleva su unidad y la marca de cifras ficticias.
- **Movimiento:** sube con `--dur-contador` y `--ease-contador`.

### Agente y subagente
- **Agente:** tarjeta navy sólida de unos 390×150, con radio de 24 px y texto blanco. Lleva el icono `bot` a 48 px, el nombre en Outfit 500 a 32 px y una línea en DM Mono a 24 px en gris claro de marca («modelo · effort»). Entra con `--ease-interfaz`.
- **Subagente:** el mismo símbolo al 75 % y hueco (blanco con contorno de 3 px), con el icono `bot` a 36 px y siempre acompañado de su propio recipiente pequeño. Sale del agente por el camino de puntos y devuelve una ficha de resumen.

### Documento (rules y AGENTS.md)
- **Forma:** hoja blanca de 300×340 con radio de 12 px y contorno de 3 px, una cabecera navy con el icono `file-text` y el nombre de fichero en DM Mono a 24 px en blanco, y líneas de texto simuladas en gris claro de marca.
- **Pila:** los documentos se apilan; el de delante lleva `--elevacion-1`.
- **Movimiento:** es lo primero que entra en la ventana y siempre va al fondo del recipiente.

### Skill
- **Forma:** tarjeta-pieza blanca de 390×250 con radio de 24 px y contorno de 3 px, con una pestaña navy encima a la izquierda. Lleva el icono `puzzle` a 48 px, el nombre en Outfit 500 a 32 px, el identificador en DM Mono y etiquetas («cuándo», «pasos», «entrega»).
- **Movimiento:** solo entra en la ventana cuando se usa, con `--ease-interfaz`.

### Herramienta
- **Forma:** círculo blanco de 112 px de diámetro con contorno de 3 px, el icono de la acción a 48 px y el nombre debajo en DM Mono a 24 px.
- **Movimiento:** un pulso de `--dur-micro` al usarse. Su resultado entra en la ventana como ficha de entrada.

### Isla del mapa
- **Forma:** tarjeta blanca de 320×190 (380×220 en la versión grande) con radio de 48 px y contorno de 3 px. Arriba, el número en Outfit 300 con dígitos tabulares y un icono a 36 px a la derecha; abajo, el nombre en Outfit 500 a 28 px.
- **Actual:** relleno y contorno en el color de acento, con el texto en blanco. Es el «usted está aquí» del mapa.

### Etiqueta y marca de cifras ficticias
- **Etiqueta:** píldora blanca con borde Prussian de 2 px, en Outfit 500 a 24 px, con 10×22 px de relleno y un icono opcional a 24 px.
- **Cifras ficticias:** la misma píldora sin relleno, con borde Pizarra de 2 px, texto Bluewood y el icono `info`. Es obligatoria en toda escena con cifras de ejemplo.

## Do's and Don'ts

### Do:
- **Do** usar las variables de rol y de semántica (`--color-texto-1`, `--color-acento`, `--color-entrada`…) en componentes y escenas; en SVG, el color va por CSS y en GSAP se lee con `v()`.
- **Do** contornear cada superficie con 3 px de navy, porque el proyector iguala crema y blanco.
- **Do** reservar el rojo para una sola cosa por pantalla: la zona actual, el nivel o la cifra protagonista.
- **Do** mantener el texto en 24 px o más, con contraste de al menos 4,5:1; el mínimo de 3:1 solo vale para texto de 24 px o más y para gráficos.
- **Do** marcar «Cifras ficticias» en toda escena con cifras de ejemplo.
- **Do** usar iconos Lucide a 36 px con `stroke-width 2`.
- **Do** encadenar cámara, `--pausa-tras-camara` y animación de zona, y dejar las pausas de lectura (1,5 s con una etiqueta o una cifra, 3 s con una frase).
- **Do** usar los logos oficiales de `design/assets/logos/` tal cual.

### Don't:
- **Don't** escribir un color a mano (hex, `rgb()`, `hsl()` o nombres como `red`) en el código de la presentación, ni en atributos SVG ni en una animación.
- **Don't** poner dos elementos rojos a la vez ni introducir tonos rojizos que compitan con el acento.
- **Don't** usar partículas, brillos, destellos, degradados, sombras difusas ni giros 3D decorativos.
- **Don't** mover la cámara mientras algo se anima dentro de la zona.
- **Don't** dibujar un concepto de otra forma: un token es siempre una píldora en DM Mono y la caché, siempre un corchete.
- **Don't** sobrescribir una variable dentro de una escena; si una escena necesita otro valor, se crea una variable con nombre propio en `design-system.css`.
- **Don't** recolorear los logos.
