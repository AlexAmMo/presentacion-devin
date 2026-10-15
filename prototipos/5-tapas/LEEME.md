# Prototipo 5 · Nuevas tapas de los bloques

Cuatro variantes para sustituir las tapas actuales, con el tema claro corporativo: misma paleta, tipografía y movimiento. No hay ningún rojo nuevo (en cada pantalla, el único rojo sigue siendo la llave del logo de Openbank), ni partículas ni 3D. El fundido al entrar en un bloque funciona igual que ahora: primero se funde el contenido de la tapa y después la tapa.

- **Cómo verlas.** `variante-a.html` … `variante-d.html` (doble clic, sin conexión). Cada fichero lleva su variante fija; con `?tapa=actual` se ven las tapas de ahora para comparar, y con `?tapa=b` cualquier fichero muestra otra variante.
- **Capturas** (1920 × 1080), en `capturas/<a|b|c|d|actual>/`:
  - `E01-1` (portada) y `E01-2` (vista general).
  - `general-visitado` (en `E23/5`, tecla O).
  - `vuelo-1-contenido` y `vuelo-2-tapa`: el vuelo de la vista general a `E20/1` (Coste), parado a 0,62 s, con el contenido de la tapa fundiéndose, y a 1,0 s, con la tapa fundiéndose sobre la escena.
- **Base.** Copia del árbol principal del 16-10 a las 00:48. Desde entonces han cambiado `pasos.js`, `mapa.js` y `escenas.md`, pero en nada que toque a las tapas.

## Común a las cuatro: la cruz

Las tapas de fuera se alargan de lado: arriba y abajo, hasta el ancho de la del centro; a izquierda y derecha, hasta su alto. Hacia fuera conservan su holgura, así que el encuadre de la vista general no cambia.

El mapa se lee como una cruz de cinco piezas separadas lo mismo (160 px del mundo), en lugar de cuatro tarjetas pequeñas flotando alrededor de una grande. Esto, por sí solo, ya quita mucho del aire «cutre»: llena la vista general y da sitio al diseño.

Es independiente de la variante: `?cruz=0` vuelve a las tarjetas de ahora, pero ninguna variante está cuidada en esa forma.

Lo que llega con la vista general (antes, el icono que subía y el título) es ahora lo marcado con `.tapa__llega`. Entra con `aparecer`, desde `--esp-3` × 8 más abajo, escalonado dentro de cada tapa y todas a la vez. Durante el vuelo desde la portada solo se ve la parte gráfica de cada tapa.

## Las variantes

### A · Capítulo

**Idea.** La portadilla de un libro. En cada tapa, el número de la parte grande y fino (Outfit 300, ≈ 164 px en la vista general), una raya y el título. Las anchas lo ponen en fila (número | raya | título | icono); las altas, en columna (icono arriba; número, raya y título abajo). En la del centro van «02 Principales herramientas» en la esquina, fuera del encuadre de la portada, y una raya corta entre «Devin» y el subtítulo.

- **Pros.** Es la más elegante y la que mejor se lee desde el fondo. Da el orden de la charla (01–05), sigue siendo clara, se funde en blanco como ahora y apenas cambia la portada.
- **Contras.** Es la menos «gráfica» de las cuatro. Preguntas lleva el 05 aunque en `escenas.md` es «Cierre»: es su lugar en el recorrido. El 02 del centro es pequeño, porque solo cabe en la franja que queda fuera de la portada.

### B · Bloque

**Idea.** Bloques de color de marca. Las tapas de fuera son navy (`.inverso`), sin contorno, con el icono de su zona a gran escala (≈ 270 px), de trazo fino y tono sobre tono, cortado por el borde. Encima, «Parte N» y el título en blanco. La del centro es la portada de siempre: el hueco claro en medio de la cruz.

- **Pros.** Es la más vistosa y la que más se parece a openbank.es, con el navy como protagonista. El contraste es altísimo en el proyector (título 14,7:1).
- **Contras.**
  - Casi un tercio de la vista general es navy, así que se aleja del tema claro.
  - Al entrar en un bloque, el velo navy que se funde pasa por un gris pizarra turbio (`capturas/b/vuelo-2-tapa.png`).
  - El icono gigante (2,4:1) es decorativo: si el proyector lava mucho los oscuros, puede perderse.

### C · Órbita

**Idea.** Todo mira a Devin.
- Cada tapa de fuera lleva, en el lado que da al centro, un semicírculo navy con su icono en blanco, dentro de una órbita fina.
- En la del centro, un anillo rodea a Devin con un punto hacia cada bloque, alineado con su semicírculo. Es un eco del anillo del hub.
- La portada queda enmarcada por ese anillo y sus dos puntos laterales.

- **Pros.** Es la más conceptual: la composición dice que Devin es el centro y que todo se conecta con él. Es geométrica sin ser decorativa.
- **Contras.**
  - Las formas son círculos del vocabulario, no geometría propia de Openbank (de la marca solo tenemos los logos, que no se pueden recolorear ni recortar).
  - Las tapas altas tienen la mitad de abajo vacía.
  - El anillo añade algo de ruido a la portada.

### D · Índice

**Idea.** Un índice que adelanta lo que viene.
- Cada tapa de fuera lleva su número, su título y las escenas del bloque, numeradas y sacadas de `escenas.md`.
- La del centro rodea la portada (algo menor, `--tapa-escala-indice`) con los ocho temas, cada uno en el lado de su pantalla: Modelos arriba, Contexto a la derecha… Es la leyenda del mapa.

- **Pros.** Es la que mejor sirve al mensaje de E01 («esto es lo que vamos a recorrer»): la vista general es la agenda de la charla. Los temas del centro anticipan el hub.
- **Contras.**
  - Es la más cargada de texto (≈ 26 px en la vista general, justo por encima del mínimo) y pide tiempo de lectura.
  - Es menos vistosa gráficamente.
  - Si se añaden escenas (por ejemplo, E33), la lista crece sola y hay que vigilar que quepa.

## Recomendación

**A · Capítulo**, en cruz:
- es la que más mejora respecto a ahora sin cambiar el carácter claro de la presentación;
- se lee perfectamente desde el fondo, y el fundido sigue siendo limpio;
- convierte la vista general en un sumario numerado.

Como mejora, le añadiría el centro de D (los ocho temas alrededor de la portada) en lugar de su esquina «02», que ocupa la misma franja. Bastaría con reutilizar el marcado y las reglas del centro de D, y daría la leyenda del mapa sin cargar las tapas de fuera.

Si se busca el máximo impacto y no importa oscurecer la vista general, la alternativa es **B**.

## Qué cambia en el código

| Fichero | Cambio |
|---|---|
| `src/datos/mapa.js` | `TAPAS.variante` y `TAPAS.variantes` (nombre y `cruz` de cada una). Al adoptar una, se queda solo `cruz: true` (o se fija en `tapas.js`). |
| `src/tapas.js` | Marcado por variante (`MARCADO`). Rectángulo en cruz y clases de lado (`--arriba`…) y forma (`--ancha`, `--alta`). Lo que llega con la vista general es genérico (`.tapa__llega`, con `aparecer` escalonado por tapa). `abrir` y `pintar` funden todos los hijos de la tapa, no solo `.tapa__contenido`, para que el marco del centro (temas, anillo, esquina) se vaya también antes que la tapa. La API (`pintar`, `abrir`, `titulos`, `mostrarTitulos`, `portada`) no cambia: `pasos.js`, `camara.js` y `E01.js` quedan igual. |
| `design/componentes.css` | Bloque «Tapa de bloque · variantes» con las cuatro (`.tapa--capitulo`, `--bloque`, `--orbita`, `--indice`) y los elementos nuevos (`__marco`, `__numero`, `__parte`, `__raya`, `__esquina`, `__forma`, `__orbita`, `__anillo`, `__punto`, `__cabecera`, `__indice`, `__tema`). La cabecera del componente está completada. Al adoptar una, su bloque pasa a ser el estilo base y se borran las otras. |
| `design/design-system.css` | Las variables de la tabla de abajo. |

### Variables nuevas

Ninguna variable existente cambia de valor.

| Variable | Antes → después | Motivo |
|---|---|---|
| `--tapa-numero` | — → 176px | A: cuerpo del número de la parte (×8) |
| `--tapa-icono-gigante` | — → 288px | B: icono de la zona, mayor que la tapa |
| `--tapa-icono-trazo` | — → 1.25 | B: trazo fino (viewBox 24) del icono gigante |
| `--tapa-forma` | — → 192px | C: diámetro del semicírculo |
| `--tapa-orbita` | — → 272px | C: diámetro de la órbita que lo rodea |
| `--tapa-anillo` | — → 480px | C: anillo alrededor de Devin |
| `--tapa-punto` | — → 20px | C: puntos del anillo |
| `--tapa-escala-indice` | — → 6.4 | D: escala de la portada, para que los temas quepan fuera de su encuadre |
| `--color-tapa-dibujo` (rol) | — → `color-mix(prussian 14 %, blanco)` ≈ #DBE1E5; en `.inverso`, `color-mix(blanco 28 %, prussian)` ≈ #476679 | B: icono gigante, tono sobre tono. Derivado de navy: nada rojizo, no compite con el acento. |

## Contraste medido (WCAG)

| Par | Contraste |
|---|---|
| Número y título (texto-1) / superficie | 14,7:1 |
| Esquina, iconos y temas (texto-2) / superficie | 10,7:1 |
| D · número y números de escena (texto-3) / superficie | 5,4:1 |
| B · título (blanco) / navy | 14,7:1 |
| B · parte (#CCD5DA) / navy | 9,9:1 |
| B · icono gigante (tapa-dibujo) / navy | 2,4:1 (decorativo: el título dice lo mismo) |
| C · icono blanco / semicírculo navy | 14,7:1 |
| C · órbitas y anillo (contorno) / superficie | 14,7:1 |
| B · tapa navy / fondo de escena | 14,1:1 |

En la vista general, el texto más pequeño mide unos 26 px: la esquina de A, «Parte N» de B y las escenas y los temas de D. Los títulos miden unos 52 px.

## Pruebas

- **Comprobaciones del design system:** 22/22.
- **Tapas, animando y saltando** (prueba propia: E01/1 → E01/2 → E02/1 → retroceder, comparado con cargar cada paso). El estado es idéntico en las cuatro variantes (visibilidad, opacidad y transform de cada tapa y de lo que llega).
- **Verificación de escenas** (E02, E04, E20, E24 y E30, con D y con `actual`): los resultados son idénticos con las dos tapas. Ninguna escena sale de la zona segura y no hay texto de menos de 24 px. Las diferencias de E02/4-5 y de E20/1, E24/1 y E30/1 también salen con las tapas actuales: al llegar animando a la primera escena de un bloque, la verificación pasa antes por la vista general. Nada que ver con este cambio.
- **Fluidez** (Chrome headless con GPU, 1920 × 1080). En las cinco versiones (actual, A, B, C y D), los vuelos portada → general, general → E02, E03/7 → general, general → E04 y O (ida y vuelta) van a 16,6–16,7 ms por fotograma, sin fotogramas de más de 25 ms (algún pico suelto que no se repite al medir de nuevo). No hay filtros ni `will-change`; solo cajas, bordes, texto y SVG.
- **Vista de ponente:** sin errores en consola.

## Lo que queda abierto o no me convence

- **Fundido de B.** El navy que se desvanece sobre la escena crema pasa por un gris turbio a mitad. Se podría fundir antes el fondo navy con el contenido, pero entonces la pantalla pasaría de navy a blanco y de blanco a la escena: un destello en el proyector. No lo he forzado.
- **Numeración de A y D.** Preguntas es «05» porque es el quinto bloque del recorrido, no una «Parte 5». Si molesta, se puede quitar el número solo en esa tapa.
- **Portada.** Solo cambia en A (una raya) y en C (el anillo). En B y D se queda como está a propósito: B necesita el centro claro, y D cambia lo que la rodea, no la portada.
- **Sin cruz** (`?cruz=0`), las variantes no están pulidas: en tarjetas pequeñas, el icono gigante de B y la órbita de C pisan el título.
- **Documentación.** La lámina de vocabulario de `design/design-system.html` sigue mostrando la tapa actual. Al adoptar una variante hay que añadir su muestra a escala 1 en `design/doc/laminas.js` y regenerar `DESIGN.md`.
