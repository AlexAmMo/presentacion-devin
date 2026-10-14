# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML, CSS y JavaScript sin framework, con Vite, GSAP y d3-interpolate (`d3.interpolateZoom` para los vuelos de cámara). Todo local: la presentación debe funcionar sin conexión el día de la charla.

## Users

- **Ponente:** Alex, de MLOps (departamento de Data Science de Openbank). Presenta en directo con portátil, proyector y mando de presentación, y usa una vista de ponente en una segunda pantalla.
- **Público:** compañeros del departamento con perfil técnico y niveles muy distintos de uso de Devin, desde quien apenas lo ha probado hasta usuarios avanzados.

## Product Purpose

Una presentación en HTML para un Show and Tell interno de ~1 hora: «Devin en el día a día: cómo aprovecharlo mejor y controlar el consumo». Enseña a usar el agente de programación Devin y a controlar su consumo (modelos, effort, contexto, rules, skills, herramientas, subagentes, plugins, tokens y caché, buenas prácticas). Tiene éxito si el público sale sabiendo elegir modelo y esfuerzo, gestionar el contexto y entender qué hace subir el coste.

## Positioning

No es un deck de diapositivas: es un único gran mapa por el que se mueve una cámara (desplazamiento y zoom) de zona en zona. En el centro, un diagrama del agente se construye pieza a pieza y se reutiliza para explicar el coste. Cada concepto se explica con una animación propia.

## Operating Context

- Se proyecta a 1920×1080. El proyector lava los colores e iguala crema y blanco.
- Se avanza con flechas, espacio o AvPág/RePág (mando). Cada paso tiene su URL.
- Hay pasos «avanzados» en un zoom más profundo que el ponente puede saltarse según el público.
- Documentos de referencia: `Guion Devin.md` (qué se dice) y `escenas.md` (qué se ve en cada click).

## Capabilities and Constraints

- Charla interna: el contenido se cuenta en español.
- Todo el diseño y el movimiento salen de `design/` y de las reglas de `CLAUDE.md`.
- Pendiente de decidir: si se incluye un caso práctico final.

## Brand Commitments

- Marca Openbank (Grupo Santander). Logos oficiales en `design/assets/logos/`, que se usan sin recolorear.
- Tipografías Outfit y DM Mono. Un único acento rojo por pantalla.
- El design system de `design/` es vinculante y prevalece sobre cualquier propuesta estética genérica.

## Evidence on Hand

- Guion: `Guion Devin.md`. Escenas: `escenas.md`.
- Gráficas de referencia con fuente: `referencias/graficas/` (coste-rendimiento de Anthropic y Cognition; degradación del contexto de Context Arena y Chroma).
- Investigación: `research_notes/`.
- Ausencias que no deben inventarse: tarifas reales de la cuenta, capturas reales de Devin Desktop y herramientas reales del departamento. Mientras falten, se usan marcadores de posición visibles.
- Las cifras de ejemplo son ficticias y se marcan como tales en pantalla.

## Product Principles

1. Cada concepto tiene un único dibujo y se reconoce igual en todas las zonas.
2. La cámara nunca se mueve mientras algo se anima dentro de una zona: primero llega, después se anima.
3. Nada decorativo: ni partículas, ni brillos, ni degradados, ni giros 3D sin función.
4. Ningún dato inventado: cifras reales con fuente visible, o «Cifras ficticias».
5. Robustez en directo: sin conexión, con modo estático y sin depender del equipo del público.

## Accessibility & Inclusion

Texto mínimo de 24 px a 1920×1080 y contraste ≥ 4,5:1 (≥ 3:1 solo desde 24 px y en gráficos). Modo estático con cortes en lugar de vuelos, también cuando el sistema pide `prefers-reduced-motion`.
