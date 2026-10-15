# Prototipo 2 · Modo oscuro corporativo

## Dirección

Toda la presentación sobre el navy de Openbank: el fondo es el Prussian oscurecido (`#001E30`) y las superficies (tarjetas, islas, ventanas, tapas) son el Prussian tal cual, un escalón más claras. El blanco pasa a ser la tinta (texto, contornos, tokens de entrada, superficies inversas) y el rojo del logo para fondo oscuro (`#FF0049`) es el único acento. El color «vistoso» sale de openbank.es y solo donde significa algo: cian para la caché, cian y verde para las series, amarillo para el coste y la moneda, y cinco colores de marca para las preguntas de E24.

**Base:** el worktree se sincronizó con el estado actual (sin commit) del árbol principal. El brief solo pedía copiar `motion.js` y `camara.js`, pero el `motion.js` copiado usa variables que no existían en el commit (`--opacidad-atenuado-texto`, `--dur-moneda`…), y la moneda de E31 y los colores de E24 solo existen en ese estado. Con esa base, las comprobaciones daban 22/22 antes de tocar nada.

## Variables cambiadas (`design/design-system.css`)

| Variable | Antes | Después | Motivo |
|---|---|---|---|
| `--color-cian` (nueva, marca) | — | `#31C3DF` | Cian del CSS de openbank.es: caché y serie 2 |
| `--color-amarillo` (nueva, marca) | — | `#FBB800` | Amarillo de openbank.es: coste y moneda |
| `--color-fondo` | old lace | `color-mix(prussian 70 %, negro-devin)` ≈ `#001E30` | Navy más profundo, para que las superficies se separen por luminosidad |
| `--color-superficie` | blanco | prussian | Superficies en el navy de la marca (el acento llega a 3,7:1 sobre ellas) |
| `--color-superficie-2` | cinderella | `blanco 6 %` en prussian ≈ `#0F3850` | Franjas y ventana menor. Con más blanco, el acento baja de 3:1 |
| `--color-superficie-3` | `prussian 12 %` en cinderella | `blanco 10 %` en prussian ≈ `#1A4058` | Ventana más pequeña de E09, un escalón más clara |
| `--color-franja-critica` | `red-ribbon 12 %` en old lace | `rojo-oscuro 14 %` en superficie-2 ≈ `#31304F` | Tinte del acento sobre oscuro |
| `--color-superficie-inversa` | prussian | blanco | Agente, piezas del hub y cabeceras: claros sobre navy (17:1) |
| `--color-texto-1` / `-2` / `-3` | prussian / bluewood / pizarra | blanco / `#CCD5DA` / ≈ `#A6B5BE` | Tinta clara. El texto 3 llega a 4,5:1 hasta la superficie 2 |
| `--color-texto-inverso` / `-inverso-2` | blanco / `#CCD5DA` | prussian / bluewood | Texto sobre la superficie inversa, ahora clara |
| `--color-devin` | negro-devin | blanco | El nombre «Devin» en el blanco de su logo para fondo oscuro |
| `--color-texto-simulado` | `#CCD5DA` | ≈ `#4D6B7D` | Líneas de documento sobre navy |
| `--color-contorno` | prussian | blanco | Contorno de toda superficie |
| `--color-separador` | ≈ `#E6DDD5` | ≈ `#33556A` | Rejillas y separadores sobre navy |
| `--color-acento` | red-ribbon | rojo-oscuro | El rojo del logo para fondo oscuro |
| `--color-acento-sobre-claro` (nueva) | — | red-ribbon | El acento dentro de `.inverso` |
| `--color-placa-logo` (nueva) | — | blanco | Placa bajo los logos que solo existen en negro |
| `--color-entrada` / `sobre-entrada` | prussian / blanco | blanco / prussian | Tokens de entrada sólidos en la tinta |
| `--color-salida` / `-borde` / `sobre-salida` | blanco / prussian / prussian | superficie / blanco / blanco | Hueco sobre navy |
| `--color-razonamiento-borde` | prussian | blanco | Mismo contorno que la salida |
| `--color-cache-acierto` / `-fallo` | bluewood | texto-2 | Corchete neutro sobre navy |
| `--color-cacheado` / `sobre-cacheado` | royal-blue / blanco | cian / prussian | La caché, en cian (7:1 el texto) |
| `--color-serie-1` / `-2` / `-3` | prussian / royal-blue / verde oscurecido | blanco / cian / malachite | Series brillantes sobre navy |
| `--color-coste` / `sobre-coste` | prussian / blanco | amarillo / prussian | Coste en dorado (8,4:1) |
| `--color-obligatorio` / `opcional` | royal-blue / verde oscurecido | cian / malachite | Marcas de plugin sobre navy |
| `--color-moneda` / `-canto` / `-luz` / `sobre-moneda` | navy / prussian / gris / blanco | amarillo / bronce ≈ `#9E8226` / ≈ `#FDDF8C` / prussian | Moneda dorada con el signo en navy |
| `--color-pregunta-1…5` | navy, verde, azul, ocre, turquesa | blanco, malachite, azul aclarado ≈ `#719CF0`, amarillo, cian | Los mismos tonos, versión sobre navy |
| `--elevacion-1` | sombra prussian 14 % | sombra negra 45 % | Una sombra navy no se ve sobre navy |
| `.inverso` (bloque entero) | valores sobre navy | valores sobre claro (los del tema claro) | En un mundo oscuro, lo inverso es lo claro |

Los comentarios del bloque de marca se actualizaron con su nuevo uso. `--color-negro-devin` sirve ahora también para oscurecer el fondo. Es la única mezcla con negro y el único negro de la marca.

## Otros ficheros

- `design/componentes.css`:
  - `.proveedor__logo` y `.servidor__logo`: el logo va sobre una placa (`--color-placa-logo`, `--radio-s`, margen `--esp-1`). La de Devin es su propio cuadro blanco. El servidor ocupa ahora `--icono-l` (12 px más alto).
  - `.tapa__logo`: `mix-blend-mode: screen` para que el cuadro negro del logo de Devin para fondo oscuro se funda con la tapa.
  - `img.icono`: `filter: invert(1)`. Lo usa el icono de Octicons de E15, que es un `<img>` negro.
  - Cabeceras actualizadas.
- `src/tapas.js` y `src/escenas/E31.js`: importan `devin-avatar-fondo-oscuro.svg` y `openbank-logo-fondo-oscuro.svg`. Solo cambia la línea del `import`, como pedía el encargo.
- Documentación:
  - `design/doc/laminas.js`: logo de Openbank para fondo oscuro.
  - `design/design-system.html`: textos de «crema/navy» y «Sobre claro (`.inverso`)».
  - `design/doc/documentacion.js`: un comentario.

**Logos:**
- Devin y Openbank usan sus versiones para fondo oscuro en la portada, la tapa y el cierre.
- OpenAI, Anthropic, GitHub, Atlassian y Sonar solo existen en negro: sobre navy no se verían. Van sin recolorear sobre una placa blanca.
- En E05 y E20, el logo de Devin sigue siendo el de fondo claro, porque va sobre esa misma placa.
- La llave de Openbank (E16) también lleva placa, por coherencia.

## Contraste (WCAG)

| Par | Ratio |
|---|---|
| Texto 1 / fondo · superficie · superficie 2 | 17,1 · 14,7 · 12,3 |
| Texto 2 / fondo · superficie 2 | 11,5 · 8,3 |
| Texto 3 / fondo · superficie · superficie 2 | 8,1 · 7,0 · 5,9 |
| Acento / fondo · superficie · superficie 2 · franja crítica | 4,4 · 3,7 · 3,1 · 3,2 |
| Blanco sobre acento | 3,9 (solo texto ≥ 24 px, como ya era) |
| Prussian sobre cian (caché) · amarillo (coste, moneda) · blanco (entrada) | 7,0 · 8,4 · 14,7 |
| Series sobre la franja crítica: blanco · cian · verde | 12,6 · 6,0 · 7,3 |
| Preguntas 1-5 sobre la superficie | 14,7 · 8,4 · 5,4 · 8,4 · 7,0 |
| Texto inverso / inverso 2 sobre superficie inversa | 14,7 · 10,7 |

Separación por luminosidad:

| Par | Ratio |
|---|---|
| Superficie / fondo | 1,17 |
| Superficie 2 / fondo | 1,39 |
| Superficie 3 / fondo | 1,56 |
| Entrada (blanco) / caché (cian) | 2,1, además del tono |
| Cian / verde (series 2 y 3) | 1,2: los separan el tono y el trazo discontinuo, como ya pasaba con el azul y el verde en claro |

## Comprobaciones y verificación

- **Comprobaciones del design system: 22/22.** Pasan los 73 pares de contraste: los de `:root`, ahora oscuros, y los de `.inverso`, ahora claros.
  - El par fijo «acento-sobre-oscuro sobre superficie-inversa» (3,9:1) ya no describe un caso real: la superficie inversa es blanca. Lo cambiaría por `--color-acento-sobre-claro` / `--color-superficie-inversa` (5:1) en la lista de pares de `documentacion.js`.
- **Verificación de escenas** (88 pasos, con el acento oscuro): mismo resultado que el tema claro, paso a paso. Lo comprobé ejecutándola sobre los dos. Nada sale de la zona segura y no hay texto por debajo de 24 px ni errores de consola.
  - Las diferencias entre llegar animando y saltar son las mismas que antes: E02/4-5 (anillo que gira), E20/1, E24/1 y E30/1 (al avanzar se pasa por la vista general) y E31/1 (la moneda gira).
- **Fluidez de la cámara** (con GPU): 16,7 ms por fotograma y ningún fotograma largo, igual que en claro, con y sin la mezcla `screen`. Medido en portada → general, `o` ida y vuelta, y E20 → E24.
- **Exportación:** `index.html` abierto con `file://` y la red bloqueada: 0 peticiones externas.

## Lo que no me convence o queda pendiente

- **El proyector:** con un proyector, la separación por luminosidad entre fondo y superficies (1,2–1,6:1) puede desaparecer. El contorno blanco sigue separándolo todo, como hacía el navy en claro, pero conviene probarlo en la sala.
- **Superficie 3 y acento:** el acento no llega a 3:1 sobre la superficie 3 (2,8:1). Hoy no coinciden: E09 no pone el nivel sobre la ventana más pequeña.
- **Mucho blanco en las ventanas:** las ventanas de E22 y E23 llenas de capas blancas pesan mucho, igual que antes el navy sobre crema. Una alternativa sería la entrada en gris claro (`#CCD5DA`), pero bajaría la distancia con el cian.
- **Amarillo del coste:** es muy luminoso. En E07, E08 y E20 compite algo por la atención, aunque no es rojizo. Si molesta, el contador de coste podría ir en blanco (como el antiguo `.inverso`) y dejar el amarillo solo para la moneda.
- **Laterales del signo de la moneda:** están en dorado claro (`--color-moneda-luz`, compartido con los filos). Se leen como un relieve esmaltado. Si se quieren en navy, haría falta una variable propia, `--color-moneda-pared`.
- **Icono de E15:** `img.icono { filter: invert(1) }` es un apaño. Lo correcto sería que el icono del pull request fuera SVG en línea con `currentColor` (`git-pull-request` de Lucide, o el de Octicons añadido a `iconos.js`), y eso toca la escena.
- **Mezcla con el negro de Devin:** el fondo mezcla `--color-negro-devin`, el único negro de la marca. Si se prefiere no depender del logo de Devin, el fondo puede ser el Prussian tal cual. Las superficies tendrían que bajar a 4-6 % de blanco, y apenas se separarían.
- **El hub:** queda en blanco y navy, sin color de marca. Calculé la alternativa con las piezas en azul cobalto (`royal-blue` con navy, ≈ `#1A54B7`): sería más vistosa, pero se distinguiría del fondo solo por el tono (2,1:1), el acento no llegaría a 3:1 sobre ella y el par «acento sobre superficie inversa» fallaría.

## Cómo se aplicaría al sistema real

1. `design/design-system.css`:
   - Añadir `--color-cian` y `--color-amarillo` al bloque de marca.
   - Sustituir los bloques «Color · roles» y «Color · semántica» y el bloque `.inverso`.
   - Cambiar `--elevacion-1`.
2. `design/componentes.css`:
   - Placas de `.proveedor__logo` y `.servidor__logo`.
   - `mix-blend-mode` de `.tapa__logo`.
   - `img.icono`, o mejor el icono en línea.
   - Cabeceras.
3. Logos para fondo oscuro en `src/tapas.js`, `src/escenas/E31.js` y `design/doc/laminas.js`.
4. Textos de `design/design-system.html` y el par fijo de `design/doc/documentacion.js`.
5. Regenerar `DESIGN.md` (`/impeccable document`) y revisar «Comprobaciones».
