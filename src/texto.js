// Texto de escenas.md en HTML: escapado, `código` en mono y los caracteres que Outfit
// no tiene, resueltos según CLAUDE.md: flechas, ✓ y ✕ como icono; ≈ y ≠ en DM Mono, que sí los tiene.
import { icono } from '../design/iconos.js';

export const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ICONOS = { '→': 'arrow-right', '↩': 'corner-down-left', '✓': 'check', '✕': 'x' };

export const enLinea = t => esc(t)
  .replace(/`([^`]+)`/g, '<code class="texto__codigo">$1</code>')
  .replace(/[→↩✓✕]/g, c => icono(ICONOS[c], 'icono--s texto__icono'))
  .replace(/[≈≠]/g, c => `<span class="texto__simbolo">${c}</span>`);
