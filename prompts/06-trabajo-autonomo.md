# Trabajo autónomo: primera versión de todas las pantallas

Encargo del usuario (15-10-2026): trabajar muchas horas seguidas, sin él, y dejar hecha una primera versión de **todas las pantallas de la presentación, con sus animaciones**. Cuando vuelva, solo quiere revisar las diapositivas y pedir cambios.

- No te pares a preguntar: decide con criterio, anota la decisión y sigue.
- **No hagas commit** (sigue vigente «No hagas commit hasta que lo revise»), ni push.
- No toques `Guion Devin.md`.

## 0. Al empezar (y al retomar tras una compactación)

1. Si existe `prompts/07-revision.md`, léelo primero: es el registro de progreso. Continúa por la primera pantalla que no esté terminada.
2. Lee `CLAUDE.md` (manda sobre todo lo demás), `prompts/05-pantallas.md`, `escenas.md` y el apartado del guion de la pantalla en curso.
3. Lee el código base:
   - `src/escenas/contrato.js`, `comun.js` y las escenas reales que ya existan;
   - `design/motion.js`, las cabeceras de `design/componentes.css` y `design/dibujos.js`;
   - `src/pasos.js`, `src/hub.js` y `src/datos/mapa.js`.
4. Servidor:
   - Comprueba si `http://localhost:5173/` responde (`curl -s -o /dev/null -w "%{http_code}"`).
   - Si no responde, arranca `npx vite --port 5173 --strictPort --host 127.0.0.1` en segundo plano. Nunca arranques un segundo servidor.
5. Playwright:
   - Usa siempre `http://localhost:5173`.
   - Pon la ventana a 1920×1080 con `browser_resize` y comprueba `innerWidth` después de navegar, porque a veces vuelve a 1200×728.
   - Tras editar, recarga dos veces cambiando `?r=N`: la primera carga suele servir el módulo antiguo.
   - No cierres la pestaña del usuario.

## 1. Reglas que no cambian

- **Pantalla libre:**
  - sin isla ni borde;
  - el encuadre es 1920×1080 a escala 1;
  - zona segura: x de 120 a 1800 e y de 96 a 984;
  - ningún texto por debajo de 24 px.
- **Cabecera común** (`cabecera()` de `comun.js`): la etiqueta con el icono de la zona y el título de la escena, y debajo el mensaje.
- **Marcas:**
  - `ficticio()` si hay cifras de ejemplo;
  - `fuente()` si hay datos reales.
- **Color:**
  - solo `var(--color-…)` de rol o semántica;
  - un solo acento (rojo) por pantalla, para lo que hay que mirar.
- **Movimiento:**
  - solo efectos de `motion.js` y tiempos con `s()`/`v()`, sin duraciones ni curvas literales;
  - las escenas nunca mueven la cámara;
  - nada decorativo: ni partículas, ni brillos, ni giros 3D.
- **Contrato de escena:**
  - `irA(paso, { animar: false })` pone al instante el estado final del paso, y tiene que funcionar en cualquier orden (saltar, retroceder, recargar);
  - con `animar: true` añade al `tl` la animación del paso anterior a ese;
  - los cambios de clase van con `tl.set(…, { attr: { class } })`.
- **Si una escena necesita algo que el design system no tiene**, se añade en `design/` siguiendo `CLAUDE.md`:
  - la variable, con su comentario;
  - el componente, con su cabecera completa y su muestra en una lámina;
  - el efecto, con su demo.

  Las comprobaciones de `design-system.html` tienen que seguir en 22/22.
- **Lo que no se cambia:** la identidad (fuentes, paleta de marca y acento).
- **Impeccable:** solo se usa para revisar. El hook de diseño se atiende según `CLAUDE.md`.

## 2. Decisiones ya tomadas con el usuario

- **E09 y E10, versión 2:** el usuario está iterando sobre ellas. Mantén su composición y solo añade lo que pide este encargo (migración y animación). Detalle en `prompts/05-pantallas.md`.
- **La ventana de contexto es horizontal en toda la presentación.** Haz primero la migración pendiente que describe `prompts/05-pantallas.md`:
  - **E11:** compactar es que la barra llena se reduce a una capa «Resumen de la sesión».
  - **Efectos, con sus demos:**
    - `apilarCapa` crece desde la izquierda;
    - el nivel se mueve en x;
    - el corchete de caché cubre el prefijo desde la izquierda, debajo o encima de la barra;
    - `caerAlRecipiente` pasa a entrar en la ventana.

    Si el nombre de un efecto deja de describir lo que hace, renómbralo con un verbo en infinitivo y actualiza sus usos.
  - **Otros dibujos:** la ventana pequeña del subagente, el hueco del hub con forma de recipiente y las láminas (vocabulario, E09 y E23).
  - **Limpieza:**
    - quita `.recipiente`, `.escala` y `--recipiente-*`;
    - cambia «recipiente» por «ventana» en `escenas.md` y en las cabeceras.
- **Gráficas:**
  - un color por serie (`--color-serie-1/2/3`);
  - franjas con su nombre encima;
  - la franja crítica en el tinte del acento (`--color-franja-critica`);
  - tabla con columnas teñidas (`.tabla__franja`).
- **El hub (E04, E14, E18 y E19):** su disposición es provisional (el bucle de 480 px y la tarjeta). Puedes rehacerla si mejora la lectura, siempre que respetes las piezas de `HUB` en `mapa.js`.
- **Contenido [A] cuando los pasos [A] se saltan:**
  - una clase en esos elementos que se oculte bajo `.sin-avanzados`, la clase que pone `pasos.js` en `<html>`;
  - va en el CSS de `src/`, porque es navegación y no vocabulario.

## 3. Método por pantalla

Las escenas de una misma zona comparten pantalla y se relevan en ella. Hazlas juntas.

1. **Composición.**
   - Dibuja el estado final de cada escena con los componentes del design system.
   - El contenido sale de `escenas.md` (pasos y diseño) y del guion (texto y datos).
   - Si un paso de `escenas.md` no funciona en pantalla, cámbialo, siempre con el guion como base, y anótalo.
2. **Pasos y animación** en `irA`.
   - En el piloto, crea en `comun.js` un mecanismo común: cada elemento lleva el paso en que aparece (`data-paso`) y una función común lo muestra o lo anima con `aparecer`, tanto al saltar como al animar.
   - La coreografía propia queda solo para lo especial: capas que se apilan, nivel, líneas que se trazan, cifras que suben, compresión, bucle…
   - Respeta las pausas de lectura.
3. **Verificación ligera.**
   - Una captura del estado final de cada escena, en `.playwright-mcp/pantallas/EXX.png`.
   - Zona segura, mínimo de 24 px y un solo acento.
   - Para cada paso: entra directo por su URL (`#EXX/N`) y compara con llegar animando desde el paso anterior.
   - Comprueba el relevo con la escena anterior de la misma pantalla.
   - La consola, sin errores.
4. **Registro:** actualiza `prompts/07-revision.md` (ver el apartado 6) antes de pasar a la siguiente pantalla.
5. **No te atasques.** Si algo no sale tras dos intentos, deja la mejor versión, anótalo como duda y sigue.

## 4. Orden

1. Migración de la ventana horizontal (apartado 2).
2. **Piloto: Contexto (E09–E11).** E11 con la ventana horizontal; después, la animación de las tres.
3. **Devin, el hub:** E04, E14, E18 y E19.
4. **Los temas del centro**, en el orden de la ruta:
   - Modelos (E05–E07);
   - Effort (E08);
   - Rules (E12);
   - Skills (E13);
   - Tools propias (E15);
   - MCP (E16);
   - Subagentes (E17).
5. **Coste (E20–E23).** E23 es la animación principal de la charla: dale el tiempo que necesite.
6. **Buenas prácticas (E24–E29)** y **Preguntas (E30–E31)**.
7. **Primeros pasos (E02–E03).**
8. **Apertura (E01):** la portada y la vista general. Revisa que el recorrido completo encaja.

## 5. Contenido que falta

Consulta la sección «Pendientes de contenido» de `escenas.md`. Nunca presentes como real un dato inventado.

- **E03, capturas de Devin Desktop:** usa el componente «Captura con resaltado» en su estado pendiente, con el texto de lo que irá en cada una.
- **Cifras que faltan** (tarifas de E21, duración de la caché de E22, Haiku 5.5 y SWE-2 en E05):
  - usa las del guion si las hay;
  - si no, cifras de ejemplo con «Cifras ficticias».
- **E15:** herramientas de ejemplo, marcadas como tales.
- **E11, `/compact` en Desktop:** déjalo fuera de pantalla y anótalo.

Cada marcador provisional se apunta en `prompts/07-revision.md`.

## 6. Registro para el usuario: `prompts/07-revision.md`

Créalo al empezar y mantenlo al día. Es lo primero que leerá el usuario y lo que leerás tú al retomar. Contenido:

- **Estado general:** las pantallas hechas y la que está en curso.
- **Por pantalla, en el orden de la ruta:**
  - la URL de cada escena (`http://localhost:5173/#EXX/1`);
  - qué se ve y cómo se anima, en dos o tres líneas;
  - las decisiones tomadas sin él, con la alternativa descartada;
  - las dudas para él;
  - los marcadores de contenido pendiente;
  - la ruta de las capturas.
- **Cambios en `design/`:** qué se añadió o cambió y por qué.

## 7. Al terminar todas las pantallas

1. **Recorrido completo** de principio a fin con → (animado):
   - la consola, sin errores;
   - la vista general (`O`);
   - los pasos [A] con la tecla `A`;
   - `?estatico`;
   - la vista de ponente (`?ponente`).
2. `npm run escenas`, sin errores ni avisos, y el resumen de tiempos de `escenas.md` al día.
3. `npm run build`, sin errores. Sirve `dist/` y comprueba que abre.
4. Comprobaciones de `design-system.html`: 22/22.
5. Regenera `DESIGN.md` y `.impeccable/design.json` con el agente `impeccable:impeccable-documenter`.
6. Actualiza `prompts/05-pantallas.md` (estado) y `CLAUDE.md` si alguna regla ha cambiado (por ejemplo, la pantalla libre y la ventana horizontal).
7. Cierra `prompts/07-revision.md` con un resumen: qué revisar primero, las dudas abiertas y el contenido que tiene que aportar el usuario.
8. No hagas commit. Deja todo en el árbol de trabajo para que el usuario lo revise.
