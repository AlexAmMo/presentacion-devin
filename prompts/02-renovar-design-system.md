# Renovación completa de `design/design-system.html`

`design/design-system.html` está **desactualizado**. `CLAUDE.md` lo declara la referencia visual de aspecto, medidas y movimiento, así que hasta renovarlo **no se puede usar como referencia**: ni para el esqueleto, ni para las escenas, ni para generar `DESIGN.md`.

Objetivo: que vuelva a ser una referencia fiable y que **no pueda volver a quedarse atrás**.

Esto es renovar la documentación y completar el vocabulario, no rediseñar. No cambies decisiones de diseño existentes (paleta, tipografía, acento único, reglas). Si al auditar ves algo que convendría cambiar en el sistema, proponlo aparte y espera mi decisión.

## Paso 0 · Guardar lo pendiente

Haz commit de lo que dejó la fase de preparación: `DESIGN.md`, `.impeccable/design.json`, `PRODUCT.md`, `prompts/` y el aviso añadido en `CLAUDE.md`. Usa un mensaje como «Preparación: Impeccable (PRODUCT.md, DESIGN.md) y prompts de trabajo».

## Lee primero

- `CLAUDE.md`, incluido el aviso sobre este HTML.
- `design/design-system.css`: la fuente de verdad.
- `design/design-system.html`: lo que hay que renovar.
- `escenas.md`: el mapa nuevo (hub central, anillo de la parte 2, partes 1, 3 y 4), la sección «Componentes que faltan en el vocabulario» y las escenas, para saber qué tiene que cubrir el vocabulario.
- `PRODUCT.md`.
- `DESIGN.md`, solo como contexto: se generó en parte desde este HTML desactualizado.
- `design/ronda-1-direcciones.html` es una exploración antigua y no es referencia.

## Fase A · Auditoría (sin editar nada)

1. Haz la lista de todo lo desactualizado o incorrecto, agrupada. Como mínimo revisa:
   - Valores del HTML que no coinciden con `design-system.css`, y variables del CSS que no aparecen documentadas.
   - Colores escritos a mano en el HTML. He visto al menos `#E7EEF2`, `#93A9B7`, `#2a2a2a` y `#14753A`, que no están en la paleta.
   - Duraciones o curvas literales.
   - El CSS de los componentes, que vive dentro del `<style>` del HTML en lugar de en `design/componentes.css`.
   - GSAP y Lucide cargados desde CDN (unpkg y cdnjs): no funcionan sin conexión.
   - Las fuentes, que se cargan desde Google Fonts.
   - El mapa de «Aplicado», con 8 zonas de la estructura antigua del guion, frente al mapa de `escenas.md`.
   - Los componentes que faltan según `escenas.md`.
   - Las reglas de `CLAUDE.md` que no se reflejan en el HTML.
2. Mira con Playwright cómo se ve hoy, a 1920 de ancho.
3. Entrégame la lista y un plan de renovación. **Espera mi visto bueno.**

## Fase B · Renovación (tras mi visto bueno)

1. **Que no pueda volver a desactualizarse.**
   - El HTML no duplica valores: las muestras y tablas de color, tipografía, espaciado, trazos y movimiento se generan leyendo las variables de `design-system.css` en tiempo de ejecución.
   - El CSS de los componentes pasa a `design/componentes.css` (créalo), y el HTML lo importa para mostrarlos.
   - Las demos de movimiento usan `design/motion.js` (créalo según `CLAUDE.md`, con `v()`, `s()` y los efectos del vocabulario registrados con `gsap.registerEffect`).
   - Así, lo que se ve en el HTML es exactamente lo que usará la presentación.
2. **Vocabulario completo**: los 10 componentes actuales más los nuevos de `escenas.md`.
   - Para cada nuevo: forma, color (con los roles existentes), medidas, icono Lucide y movimiento, siguiendo las reglas.
   - Se dibuja una sola vez en `componentes.css` y tiene su fila en la ficha técnica.
   - **Enséñame los nuevos en capturas antes de cerrarlos.**
3. **Mapa «Aplicado»**: sustituye el de 8 zonas por el de `escenas.md` (hub central, anillo horario de la parte 2, parte 1 arriba, parte 3 a la derecha y parte 4 abajo), con la ruta de cámara. Añade una zona de ejemplo con el vocabulario aplicado; por ejemplo, E09 (el contexto) o un fotograma de E23 (la conversación con y sin caché).
4. **Todo sin conexión**:
   - Outfit y DM Mono alojadas en `design/assets/fonts/` (woff2 + `@font-face`, con su licencia OFL).
   - GSAP y los iconos Lucide que se usen, guardados en el proyecto en lugar de cargados por CDN.
5. **Uso en código**: explica cómo importará la presentación (Vite) `design-system.css`, `componentes.css` y `motion.js`, y qué contrato siguen los efectos.
6. **Cabecera del HTML** con versión y fecha: «Versión 2 · renovado el …».

## Reglas

- Todo lo de `CLAUDE.md`: colores solo con variables, nombres por función y comprobaciones de contraste.
- Las nuevas variables se documentan en el mismo cambio.
- Impeccable:
  - `critique` y `audit` sobre el HTML renovado.
  - Los comandos que cambian el lenguaje visual, solo como propuesta.
  - El hook, según `CLAUDE.md`.

## Cierre

- Regenera `DESIGN.md` con `/impeccable document`, ya desde el HTML renovado.
- Borra el aviso de `CLAUDE.md` y actualiza sus referencias a lo que haya cambiado (por ejemplo, que el HTML ahora importa `componentes.css` y `motion.js`).
- Capturas finales con Playwright de cada sección, a 1920 de ancho.
- Resume los cambios y las propuestas pendientes. **No hagas commit hasta que lo revise.**
