# Revisión del esqueleto: ideas

Fichero de referencia. Recoge las ideas de revisión del esqueleto (`796a214`) según van llegando, cada una con lo que implica y las dudas que deja abiertas. Al terminar, de aquí sale un plan coherente. Mientras tanto no se implementa nada.

Estado: **ideas 1 a 5 aplicadas** el 15-10-2026, pendientes de revisión y sin commit. Se pueden seguir añadiendo ideas debajo.

## Decisiones tomadas

- **Tapas:** cada una se levanta al entrar en su bloque, cuando la cámara ya ha llegado. Con `O`, los bloques aún no visitados siguen tapados.
- **Títulos de las tapas:** son los de cada parte en `escenas.md`, que pasan a ser «Primeros pasos», «Principales herramientas», «Coste», «Buenas prácticas» y «Preguntas».
- **La tapa del centro:** es la portada. Lleva el logo oficial de Devin centrado en su pantalla, con el título debajo, fuera de la portada.
- **Logo:** el oficial de Cognition, `cognition.com/brand` → «Brand Logos 2026» › Devin › SVG, `DEVIN_AVATAR_SQUARE_WHITE.svg`. Está sin modificar en `design/assets/logos/devin-avatar-fondo-claro.svg`, con su procedencia en `design/assets/licencias/devin-marca.txt`.
- **Disposición:** una cruz, con el centro en una cuadrícula de 3 × 3. Las pantallas del centro están separadas 160 px y los bloques, 960.
- **Una pantalla por tema:**
  - Modelos (E05–E07) y Contexto (E09–E11) comparten pantalla.
  - Cada bloque de fuera es una sola pantalla: Primeros pasos (E02–E03), Coste (E20–E23), Buenas prácticas (E24–E29) y Preguntas (E30–E31).
  - Effort sigue con pantalla propia, así que hay 8 temas alrededor de Devin.
- **Relevo dentro de una pantalla:** la escena anterior se va con `desaparecer` y la nueva entra con `aparecer`. No ha hecho falta un efecto nuevo.
- **E30 «Antes de pulsar Enter»:** pasa a ser la primera escena del bloque Preguntas, porque son cinco preguntas que hacerse. Va seguida de E31 «Preguntas», que es nueva. El caso práctico pasa a ser E32 y sigue fuera.
- **Piezas del hub:**
  - Se colocan sin animación al terminar su escena (`llega: 'E07'` en `mapa.js`).
  - Las de E14 y E18 entran animadas con el hub a la vista.
  - Se quitan los pasos «Pieza al hub», E01/3 y E19/3, que solo movían la cámara.
  - Se borra el efecto `encajarPieza`.
- **Menos movimiento:**
  - Los [A] ya no acercan la cámara.
  - E08/3 muestra la gráfica en pequeño junto al dial, sin volar a E06.
  - Dentro de un bloque, la cámara va en línea recta.
- **Recorrido completo:** pasa de 44 vuelos de cámara a 16: 2 largos (portada → vista general → Primeros pasos), 4 entre bloques y 10 cortos, en línea recta, entre las casillas del centro.

## Forma de trabajar en esta fase

- Iterar rápido: verificación mínima (un vistazo o una captura de lo que cambia) hasta tener una versión final que justifique las pruebas extensas (recorrido completo de los 122 pasos, vídeo, auditorías).
- No hacer commit hasta que lo revises.

## Punto de partida: cuánto se mueve hoy la cámara

Un recorrido completo hace **44 vuelos** en unos 57 minutos:

| Motivo | Vuelos |
|---|---:|
| Cambio de escena | 17 |
| «Pieza al hub»: alejar a zona + hub y volver | 16 (8 + 8) |
| Zoom de los pasos [A]: ida y vuelta | 8 |
| Encuadres propios (E01/3 → E02, E08/3 → E06, E19/3 → E20) | 3 |

Además, los vuelos entre zonas usan la trayectoria «alejar, viajar, acercar», que es la que más marea.

---

## 1. Portada: Devin en el centro

**Idea.** La presentación empieza en el centro del mapa, con el icono oficial de Devin en grande y la pantalla centrada en él.

**Implica.**
- E01 cambia: el primer paso ya no es la vista general con la capa fija, sino el logo encuadrado.
- El logo oficial de Devin no está en `design/assets/logos/` (hoy solo están Openbank y by Santander). Hay que traerlo de la fuente oficial (Cognition), con sus condiciones de uso, y usarlo tal cual, como los demás logos.
- El centro es también donde vive el agente de la Parte 2, así que hay continuidad: la charla empieza y vuelve a ese punto cuando se explica cómo funciona Devin.

**Dudas.**
- ¿El logo sigue en el centro durante la Parte 2, como identidad del agente, o solo es la portada?

## 2. Zoom out a los 5 bloques, con «tapadera»

**Idea.** Desde la portada, un zoom out que deja ver los 5 grandes bloques: los 4 actuales y una pantalla final de preguntas y respuestas. En ese zoom out, cada bloque lleva una «tapadera» con su título, para que se lea como conjunto («Primeros pasos», «Principales herramientas», «Coste»…). Al terminar esa introducción, cuando se navega a las secciones, ya no hay tapadera: se ve directamente el contenido.

**Implica.**
- La «tapadera» es un componente nuevo del vocabulario. Va en `design/componentes.css`, con su cabecera, su lámina y sus comprobaciones.
- Sus títulos se dimensionan para la escala de la vista general, no para la escala 1. A la escala del mapa entero (del orden de 1:10), cada título mide cientos de px en el mundo.
- Los títulos definitivos de los bloques los decides tú.
- La capa fija de E01 probablemente sobra, porque las tapaderas ya dicen qué hay en cada bloque.

**Dudas.**
- **La tapadera del centro.** Si el logo de Devin está en el centro, puede que la tapadera del bloque central sea el propio logo con su título. Así, la portada sería esa tapadera vista de cerca y el zoom out solo mostraría a su alrededor las otras cuatro.
- **Cuándo se quitan.** ¿Todas a la vez al acabar la introducción, o cada una la primera vez que se entra en su bloque? En cualquier caso, la tapadera se retira antes de que se mueva la cámara o después de que llegue, nunca durante el vuelo.
- **La vista general (`O`) después de la introducción.** ¿Con tapaderas, como índice, o sin ellas, como mapa real?
- **El orden.** ¿Es fijo, o quieres poder elegir bloque desde la vista general, por ejemplo según el público? Por defecto se asume un orden fijo.

## 3. Disposición en cruz

**Idea.** Simplificar la disposición:
- en el centro, Devin y sus herramientas (Parte 2);
- arriba, Primeros pasos (Parte 1);
- a la derecha, Tokens y coste (Parte 3);
- abajo, Buenas prácticas (Parte 4);
- a la izquierda, Preguntas (nuevo).

**Implica.**
- Hoy el anillo de la Parte 2 ocupa también la izquierda (E15, E16 y E17, en x −4480) y se alarga hacia la derecha con Contexto (hasta x 8640). Hay que compactarlo dentro del bloque central para dejar libre la izquierda.
- Con una pantalla por tema (idea 4), la Parte 2 queda en unos 8 temas alrededor de Devin. Encaja en una **cuadrícula de 3×3, con Devin en la casilla central y un tema en cada una de las 8 de alrededor**. Es una propuesta.
- Recorrido: portada (centro) → vista general → arriba → centro → derecha → abajo → izquierda.
- Hay que actualizar la sección «El mapa» de `escenas.md` (idea, esquema, ruta y hub), `src/datos/mapa.js`, `CLAUDE.md` («La presentación») y el mapa de referencia de `design/design-system.html`, que ya estaba desfasado.

**Dudas.**
- **E30 «Antes de pulsar Enter»** (hoy, el cierre sobre la vista general): ¿pasa a ser la última pantalla de Buenas prácticas, la primera de Preguntas, o sigue sobre la vista general antes de ir a Preguntas?
- **E31 «Caso práctico»**: sigue fuera.

## 4. Una pantalla fija por tema

**Idea.** Hay demasiadas subsecciones. Cuando un tema, como el contexto, ocupa varias pantallas, en lugar de moverse entre ellas, la misma pantalla fija cambia su contenido sin movimiento de cámara. Hoy hay tanto movimiento que marea un poco.

**Implica.**
- En `escenas.md` las escenas pueden seguir como unidades de texto (EXX). Lo que cambia es que varias escenas compartan una sola pantalla en `mapa.js`: entre ellas la cámara no se mueve y la pantalla cambia su contenido.
- El cambio de contenido necesita una transición del vocabulario. Puede bastar con `desaparecer` + `aparecer`, que ya existen. Si se repite en todas, se registra como efecto.

**Propuesta de agrupación, a decidir:**

| Bloque | Tema | Escenas | Pantallas hoy | Propuesta |
|---|---|---|---:|---:|
| Primeros pasos | Local y Cloud · Controles | E02, E03 | 2 | 1 o 2 |
| Devin y sus herramientas | Modelos | E05–E07 | 3 | 1 |
| | Effort | E08 | 1 | 1 (¿junto a Modelos?) |
| | Contexto | E09–E11 | 3 | 1 |
| | Rules, Skills, Herramientas propias, MCP, Subagentes | E12, E13, E15, E16, E17 | 5 | 5 |
| | En Devin: vacío, bucle, plugins, token | E04, E14, E18, E19 | centro | centro |
| Tokens y coste | Qué pagamos, tipos, caché, conversación | E20–E23 | 4 | 1 o 2 |
| Buenas prácticas | El circuito del método | E24–E29 | 6 | 1 |
| Preguntas | Preguntas y respuestas | nueva | — | 1 |

**Propuestas relacionadas, para reducir aún más el movimiento:**
- Quitar el zoom ×1,5 de los pasos [A] (8 vuelos) y mostrarlos en la misma pantalla.
- Que E08/3 deje de volar a E06. Si Modelos y Effort comparten pantalla, sale solo.
- Dentro del bloque central, vuelos rectos y cortos entre casillas, sin «alejar, viajar, acercar». Esa trayectoria queda solo para los saltos entre bloques.

## 5. Sin animación de la pieza que se une al centro

**Idea.** Eliminar la animación de cuando se cierra la sección de cada herramienta del agente y la pieza «se une en el centro».

**Implica.**
- Desaparecen la silueta que viaja hasta el hub (8 piezas) y el encuadre «pieza al hub» (16 vuelos).
- `encajarPieza` se queda sin uso. Hay que decidir si se borra de `design/`.

**Dudas.**
- **¿El centro sigue llenándose?** Propuesta: sí, pero sin verse. La pieza se coloca en su hueco sin animación, y al volver al centro (E14, el bucle; E18, los plugins) Devin aparece con lo que ya tiene. Así se mantiene la revelación de E14 («esto es un agente») sin vuelos de ida y vuelta.
- La otra opción es quitar el diagrama que se va completando y dejar que la cuadrícula de temas alrededor de Devin sea el propio «Devin y sus herramientas».

---

## Dudas transversales

- **`escenas.md`.** Estos cambios tocan su parte estructural (mapa, ruta, hub, E01, E30 y la escena nueva de Preguntas). ¿La actualizo yo en esa parte y tú te quedas con el texto de las escenas, o la cambias tú entera?

## Lo que tocará el plan (provisional)

- `escenas.md`: mapa, ruta, hub, E01, E30 y Preguntas.
- `src/datos/mapa.js` y `scripts/escenas.mjs`: varias escenas por pantalla.
- `src/camara.js`: menos tipos de vuelo, sin «pieza» y quizá sin [A].
- `src/pasos.js` y `src/hub.js`: sin viajeros y con las tapaderas de la introducción.
- `design/`: tapadera, logo de Devin, quizá un efecto de cambio de contenido, y el futuro de `encajarPieza`. Con su documentación y `DESIGN.md`.
- `CLAUDE.md`: la sección «La presentación».
