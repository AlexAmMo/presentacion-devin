> **Completada el 14-10-2026.** Se conserva como registro. Siguiente paso: `prompts/02-renovar-design-system.md` y después `prompts/03-esqueleto.md`.

Preparación del entorno y de Impeccable antes de construir la presentación.

# Fase 0 · Preparación

En esta fase no escribas código de la presentación ni toques `design/`.

1. **Comprueba el entorno** sin instalar nada:
   - Tienes disponibles las skills de GSAP (`gsap-skills`) y la de Impeccable. frontend-design no debe estar activa.
   - Tienes las herramientas del servidor MCP `playwright`, incluidas las de grabar vídeo (`browser_start_video` / `browser_stop_video`).
     - Arranca `python3 -m http.server 8765 --directory design` en segundo plano.
     - Abre `http://localhost:8765/design-system.html` y haz una captura.
     - Graba 3 segundos de vídeo de esa página y dime dónde se guarda.
     - Cierra el navegador y para el servidor.
   - Versiones de node y npm.
2. **Prepara Impeccable**, siguiendo las reglas de la sección «Impeccable, siempre por debajo del design system» de `CLAUDE.md`:
   - Lee `PRODUCT.md`. Ya está escrito, así que no relances `init`. Si ves algo incorrecto o que falta, pregúntame.
   - Genera `DESIGN.md` con el comando `document` de Impeccable a partir de `design/` (`design-system.css`, `design-system.html` y los logos).
     - Es un derivado: no cambies nada de `design/` en este paso.
     - Si el proceso sugiere cambios en el design system, no los apliques; anótalos como propuestas para que yo decida.
   - Comprueba el estado del hook de diseño (`hooks status`) y confirma que está activo.
3. **Respóndeme** con una tabla «Comprobación · Estado (✓/✗) · Detalle», un resumen de `DESIGN.md`, las propuestas de cambio que hayan salido y, para cada ✗, cómo arreglarlo. Espera mi visto bueno.
