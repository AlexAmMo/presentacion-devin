# Prototipo 1 · Claro corporativo, más contraste y más llamativo

## Dirección

El mismo sistema claro de Openbank: tinta Prussian sobre crema y el rojo como único acento. Lo que cambia es la firmeza. El fondo pasa a una crema que el proyector no confunde con el blanco (Cinderella), así que las tarjetas blancas se despegan. Los textos 2 y 3 se oscurecen, los contornos y los ejes engordan y los títulos pasan de 300 a 400.

Para hacerlo algo más llamativo, los colores del CSS de openbank.es entran en la semántica, siempre por roles y sin nada rojizo:

- azul para todo lo de la caché (también su corchete);
- cian para el razonamiento;
- amarillo y cian oscurecidos para las preguntas 4 y 5 de E24;
- porcelana neutra para los apoyos, que así se distinguen por tono de la franja crítica, rosada.

## Base de trabajo

Hice el prototipo sobre una copia del árbol principal tal como estaba el 16-10-2026 a las 00:58, con sus cambios aún sin commit. No partí del `HEAD` con solo `motion.js` y `camara.js` copiados.

El motivo: con solo esos dos ficheros, `motion.js` usaba variables que el `design-system.css` del commit no tiene (`--dur-moneda`, `--ease-moneda`, `--opacidad-atenuado-texto`…). Las comprobaciones se quedaban en 20/22 y el efecto `atenuar` recibía `NaN`. Además, ni las preguntas en color de E24 ni la moneda de E31 existían en el commit.

Mis cambios van sobre esa copia y solo tocan `design/design-system.css` y una frase de `design/design-system.html`.

## Variables cambiadas (antes → después)

| Variable | Antes | Después | Motivo |
|---|---|---|---|
| `--color-old-lace` | `#FFF9F4` | (eliminada) | Ya no la usa ningún rol |
| `--color-porcelain` | — | `#E3E9E9` (nueva, marca) | Porcelana de openbank.es para la superficie 2 |
| `--color-cian` | — | `#31C3DF` (nueva, marca) | Rayado del razonamiento y pregunta 5 |
| `--color-amarillo` | — | `#FBB800` (nueva, marca) | Pregunta 4, solo oscurecido |
| `--color-fondo` | Old lace `#FFF9F4` | Cinderella `#FFF1E5` | Blanco/fondo: de 1,04:1 a 1,11:1, más visible en el proyector |
| `--color-superficie-2` | Cinderella | Porcelana `#E3E9E9` | Un escalón más oscura que el fondo y neutra: la franja normal ya no se confunde con la crítica |
| `--color-superficie-3` | navy 12 % sobre Cinderella `#E0D9D3` | navy 14 % sobre porcelana `#C3CED2` | Sigue un escalón por debajo de la superficie 2 |
| `--color-franja-critica` | rojo 12 % sobre Old lace `#FBDBDF` | rojo 12 % sobre Cinderella `#FBD4D2` | Sigue al nuevo fondo |
| `--color-texto-2` | Bluewood `#2C4054` | Bluewood 75 % + Prussian `#213B50` | Más firme: 10,5:1 |
| `--color-texto-3` | Pizarra `#546E7A` | Pizarra 50 % + Bluewood `#405767` | Escalas y notas legibles al fondo de la sala: de 5,2:1 a 6,8:1 |
| `--color-separador` | navy 10 % `#E6DDD5` | navy 18 % `#D1CDC8` | Rejillas y separadores visibles (1,4:1), sin significado |
| `--color-razonamiento` | navy 40 % `#99AAB5` | cian 55 % + blanco `#8EDEED` | Le da color al razonamiento; texto navy encima, 9,7:1 |
| `--color-razonamiento-rayado` | navy 27 % `#BAC6CD` | cian 25 % + blanco `#CBF0F7` | La raya clara del patrón |
| `--color-cache-acierto` / `--color-cache-fallo` | Bluewood | Royal blue `#2566E8` | El corchete, del mismo azul que los tokens leídos de caché; acierto y fallo se siguen distinguiendo por el trazo y el icono |
| `--color-serie-3` | verde 55 % `#18904A` | verde 52 % `#168A4A` | Para llegar a 3:1 sobre la franja crítica, más oscura (3,2:1) |
| `--color-pregunta-4` | verde + rojo `#85714C` | amarillo 60 % + Prussian `#97801C` | Ocre que sale del amarillo de la marca, más vivo |
| `--color-pregunta-5` | verde + azul `#289EA3` (3,1:1) | cian 65 % + Prussian `#208EA9` | Cian de la marca; sobre el nuevo fondo, el anterior bajaba de 3:1 |
| `--peso-display` | 300 | 400 | A 300, el proyector lava los títulos y las cifras |
| `--trazo-fino` | 2px | 3px | Ejes, separadores y bordes de etiqueta más firmes |
| `--trazo-contorno` | 3px | 4px | Contornos y líneas de gráfica legibles desde el fondo |
| `--trazo-fuerte` | 6px | 6px (sin cambio) | Probé 8 px: el subrayado de E24 tapaba los rasgos del texto |
| `--icono-trazo` | 2 | 2.5 | Iconos al peso del nuevo contorno (3,75 px a 36 px) |
| `--elevacion-1` | navy 14 % | navy 22 % | La sombra plana se ve en el proyector |

He actualizado la descripción de cada variable (con su hex aproximado y su contraste). También he cambiado el título del grupo «Color · semántica» (ahora «derivada de la marca») y la introducción de la sección Color de `design-system.html`. `componentes.css` no cambia: ningún componente necesitó un rol nuevo.

## Contraste medido (WCAG)

| Par | Antes | Ahora | Mínimo |
|---|---|---|---|
| texto 1 / fondo | 14,0 | 13,2 | 4,5 |
| texto 2 / fondo | 10,2 | 10,5 | 4,5 |
| texto 3 / fondo · superficie · superficie 2 | 5,2 · 5,4 · 4,9 | 6,8 · 7,6 · 6,2 | 4,5 |
| texto 2 / superficie 3 | — | 7,2 | 4,5 |
| acento / fondo · superficie | 4,75 · 5,0 | 4,5 · 5,0 | 3 |
| blanco / acento | 5,0 | 5,0 | 3 |
| blanco / cacheado | 5,1 | 5,1 | 4,5 |
| corchete de caché / fondo · superficie | — | 4,6 · 5,1 | 3 |
| navy / razonamiento · rayado | 6,1 | 9,7 · 12,1 | 4,5 |
| serie 2 / fondo · superficie 2 · franja crítica | — | 4,6 · 4,1 · 3,7 | 3 |
| serie 3 / fondo · superficie 2 · franja crítica | — | 4,0 · 3,6 · 3,2 | 3 |
| preguntas 1–5 / fondo | — | 13,2 · 4,0 · 4,6 · 3,5 · 3,5 | 3 (números ≥ 24 px y subrayado) |
| preguntas 1–5 / superficie | — | 14,7 · 4,4 · 5,1 · 3,9 · 3,8 | 3 |
| texto 1 · 2 atenuados (0,6) / fondo | ≈ 4 · 3,4 | 4,05 · 3,44 | — (lo atenuado) |
| separador / fondo | 1,28 | 1,43 | — (no lleva significado) |

La tabla de contraste de `design-system.html` tiene 73 pares, entre fondo claro e inverso, y todos llegan al mínimo.

## Comprobaciones y verificación

- **Comprobaciones del design system:** 22 de 22.
- **Verificación de escenas** (`verificar`, de E02 a E31, llegando animando o saltando): el resultado es línea a línea el mismo que con el CSS original. No hay nada fuera de la zona segura, ningún texto baja de 24 px y el número de acentos no cambia. Las únicas diferencias son las que ya existían y no dependen del color: el anillo que gira en E02/4-5, la moneda que gira en E31 y la llegada a E20/1, E24/1 y E30/1, que pasa por la vista general.
- **Fluidez de la cámara** (GPU, mismos vuelos que el original): todos van a ≈ 16,7 ms por fotograma, sin empeorar. No añado filtros ni nada que se pinte en todo el mapa.
- **Exportación:** `index.html` se abre servido en estático, sin ninguna petición externa.

## Lo que no me convence o queda pendiente

- **Títulos a 400:** ganan presencia, pero el contraste con las palabras en negrita del título de E05 (600) se reduce. Aun así, el título sigue cabiendo en una línea.
- **Franja normal:** la porcelana se distingue bien de la crítica, pero es un gris frío sobre una crema cálida. Si se quiere más calor, habría que separar el rol de la franja del de la superficie 2, por ejemplo con un tinte del amarillo.
- **Serie 3:** el verde es algo más oscuro, no más vivo. Con una franja crítica más oscura, un verde más claro no llega a 3:1.
- **Preguntas 2 y 4:** el verde y el ocre tienen una luminosidad parecida (4,0 y 3,5). Los separa el tono y su número, como ya pasaba antes; para la deuteranopía sigue siendo el par más débil.
- **El hub:** sigue en navy. Darle color exigiría tocar `--color-superficie-inversa` (la identidad) o crear un rol nuevo, y `src/hub.js` anima con `v('--color-superficie-inversa')`. No lo he forzado.
- **Problemas que ya estaban en la base:** en E03/4 el resaltado cae sobre una zona vacía de la captura, igual que en la base. En E06/3, la serie del acento atenuada al 12 % se ve rosa.

## Cómo aplicarlo al sistema real

1. En `design/design-system.css`, aplicar los valores de la tabla: bloque de marca (añadir porcelana, cian y amarillo, y quitar Old lace), roles, semántica, `--peso-display`, trazos, `--icono-trazo` y `--elevacion-1`, con sus comentarios.
2. En `design/design-system.html`, la frase de introducción de la sección Color (ya hecha en el worktree).
3. `componentes.css`, `motion.js`, `dibujos.js` y las escenas no cambian.
4. Revisar «Comprobaciones» y regenerar `DESIGN.md` con `/impeccable document`.

El fichero completo está en el worktree: `/Users/ton/Desktop/Presentacion/.claude/worktrees/agent-ad6916ee6ed9eb9b6/design/design-system.css`.
