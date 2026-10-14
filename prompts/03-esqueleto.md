# Esqueleto de la presentación

Vamos a construir el **esqueleto** de la presentación: el mapa completo con la cámara y la navegación, sin las animaciones internas de cada escena. Tiene que servir ya como previsualización del recorrido.

**Antes de empezar**, comprueba dos cosas. Si alguna falla, para y avísame:

- `CLAUDE.md` ya no contiene el aviso de que `design/design-system.html` está desactualizado. Si sigue ahí, la renovación (`prompts/02-renovar-design-system.md`) no ha terminado, y el HTML no sirve como referencia.
- No hay cambios sin commit de la renovación.


## Lee primero

- `CLAUDE.md`: reglas del design system. Colores, movimiento y componentes salen solo de `design/`.
- `escenas.md`, sobre todo «El mapa», «Ruta de la cámara», «El hub, estado a estado», «Restricciones para el esqueleto» y la lista de escenas (id, título, pasos, [A] y «Pieza al hub»).
- `design/design-system.css`, `design/componentes.css`, `design/motion.js` y `design/design-system.html`, ya renovado y válido como referencia. Empieza por su sección Movimiento. Las variables de cámara son `--dur-camara-corta`, `--dur-camara`, `--dur-camara-larga`, `--ease-camara`, `--ease-camara-larga` y `--pausa-tras-camara`.

No hace falta leer el guion ni `research_notes/`.

## Stack (ya decidido)

- Vite con JavaScript sin framework. GSAP y `d3-interpolate` desde npm. Nada por CDN: la presentación tiene que funcionar sin conexión.
- Las fuentes (Outfit y DM Mono) ya están alojadas en `design/assets/fonts/`; se hizo en la renovación del design system. Si `design/design-system.css` todavía las carga desde Google Fonts, para y avísame.

## Qué construir

1. **Datos** (`src/datos/escenas.js`), generados a partir de `escenas.md`. Por escena:
   - id, título, bloque y mensaje;
   - el texto de cada paso, qué pasos son [A] y cuáles son «pieza al hub»;
   - su posición y tamaño en el mundo (1920×1080 por escena, vista a escala 1).

   `escenas.md` es la fuente. Si algo no cuadra, pregúntame antes de inventar.
2. **Mundo**: un contenedor `#mundo` con todas las escenas colocadas según el esquema del mapa.
   - Hub en el centro y la parte 2 en anillo horario alrededor.
   - Parte 1 arriba, parte 3 a la derecha y parte 4 abajo, como circuito.
   - Las escenas de una misma zona, contiguas (E05–E07, E09–E11…).
   - E04, E14, E18 y E19 ocurren en el hub: mismo lugar, distinto estado.
3. **Marcador de posición por escena**: isla blanca con contorno navy, con el id, el título, el mensaje y la lista de pasos, donde se resalta el paso actual. Todo con variables del design system y nada de texto por debajo de 24 px.
4. **Hub**: la tarjeta del agente con un hueco en forma de silueta por pieza.
   - En cada paso «pieza al hub», la cámara encuadra la zona y el hub, espera `--pausa-tras-camara` y una silueta viaja de la zona a su hueco.
   - El estado del hub tiene que ser correcto al saltar a cualquier paso.
5. **Cámara** (`src/camara.js`): encuadra una escena (o cualquier rectángulo) a pantalla completa con `transform` sobre `#mundo` y `transform-origin: 0 0`.
   - Entre zonas, trayectoria «alejar, viajar, acercar» con `d3.interpolateZoom`, animada con GSAP.
   - Duración según la ruta de `escenas.md`: corta entre escenas de la misma zona, estándar entre zonas y larga hacia y desde la vista general. Se lee de las variables a través de `design/motion.js`.
   - `will-change: transform` solo durante el vuelo, y traslaciones redondeadas, para que el texto quede nítido al llegar.
   - Algunos pasos llevan su propio encuadre: E08 paso 3 vuelve a la gráfica de E06, y los «pieza al hub» encuadran zona y hub. Modela que un paso pueda tener encuadre propio.
   - Registra el vuelo como efecto `volarCamara` en `design/motion.js`.
6. **Pasos** (`src/pasos.js`): una lista plana con todos los pasos de todas las escenas.
   - Avanzar: →, espacio y AvPág. Los mandos de presentación envían AvPág y RePág.
   - Retroceder: ← y RePág.
   - Primero se agotan los pasos de la escena; después la cámara vuela a la siguiente.
   - Retroceder no anima hacia atrás: salta al estado del paso anterior.
7. **URL por paso** (`#E05/3`): al recargar, se vuelve al mismo paso.
8. **Teclas**:
   - `O`: vista general del mapa, y volver.
   - `A`: saltar o mostrar los pasos [A].
   - `P`: abrir la vista de ponente.
9. **Vista de ponente**: ventana aparte sincronizada con `BroadcastChannel`.
   - Muestra la escena y el paso actuales, el texto del paso siguiente, el mensaje de la escena, el progreso (paso X de N) y un cronómetro.
   - Desde ella también se puede avanzar.
10. **Modo estático** (`?estatico`, y también cuando el sistema pide `prefers-reduced-motion`): cortes en lugar de vuelos.
11. **Contrato de escena**: define y documenta la interfaz que tendrá cada escena real en `src/escenas/EXX.js` (montar, ir a un paso con o sin animación, desmontar). Las escenas sin fichero usan el marcador de posición.

## Reglas

- Todo lo de `CLAUDE.md`: ningún color, duración ni curva literal. Si falta una variable o un componente, añádelo en `design/` siguiendo sus pasos y documéntalo. Si cambias `design/`, documéntalo en `design/design-system.html` y regenera `DESIGN.md`.
- Avisos del hook de Impeccable: trátalos como dice `CLAUDE.md`. Los marcadores de posición son temporales, pero si el aviso es real (contraste, texto que se sale, tamaño), arréglalo. No añadas excepciones solo porque algo sea provisional.
- No uses comandos de Impeccable que cambien el lenguaje visual. En esta fase solo se usa `audit`, al final.
- Fuera de alcance: las animaciones internas de las escenas, las gráficas y el modo de impresión.

## Verificación (con Playwright MCP)

- Recorre todos los pasos. No debe haber errores en la consola, y la URL y el estado del hub deben ser correctos al recargar en pasos al azar.
- Haz capturas de la vista general, del hub completo tras E18 y de una escena de cada parte. Comprueba que el texto se ve nítido al llegar y que nada baja de 24 px.
- Graba un vídeo del recorrido completo y guárdalo en `previsualizacion/` (añade la carpeta al `.gitignore`). Ten en cuenta cómo graba el MCP de Playwright:
  - Graba a 1920×1080: pasa `size` a `browser_start_video` e iguala el viewport con `browser_resize`. El tamaño por defecto es 800×600.
  - Solo graba cuando la página repinta, así que las pausas sin movimiento casi no ocupan tiempo en el vídeo.
  - Si `browser_stop_video` responde «No videos were recorded», la grabación sigue abierta: vuelve a llamarlo antes de grabar otra vez.
- `npm run build` y `npm run preview` deben funcionar sin conexión.
- Pasa el `audit` de Impeccable sobre el esqueleto (accesibilidad, rendimiento, texto que se sale). Arregla lo que aplique y dime qué has descartado y por qué.

## Cómo trabajamos

- Antes de escribir código, enséñame un plan corto con la estructura de ficheros y las coordenadas del mapa.
- Al terminar, resume qué se ha hecho, qué queda pendiente y cómo verlo.
- No hagas commit hasta que lo revise.
