// Texto de escenas.md en HTML: escapado, `código` en mono, **negrita** con --peso-enfasis y los caracteres que Outfit
// no tiene, resueltos según CLAUDE.md: flechas, ✓ y ✕ como icono; ≈ y ≠ en DM Mono, que sí los tiene.
import { icono } from '../design/iconos.js';

export const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ICONOS = { '→': 'arrow-right', '↩': 'corner-down-left', '✓': 'check', '✕': 'x' };

export const enLinea = t => esc(t)
  .replace(/`([^`]+)`/g, '<code class="texto__codigo">$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<b class="texto__fuerte">$1</b>')
  .replace(/[→↩✓✕]/g, c => icono(ICONOS[c], 'icono--s texto__icono'))
  .replace(/[≈≠]/g, c => `<span class="texto__simbolo">${c}</span>`);

// Las acotaciones técnicas de escenas.md (variables entre paréntesis o en `código`) no son para
// el ponente ni para el lector de pantalla: se quitan.
export const sinTecnica = t => String(t ?? '')
  .replace(/\s*\((?=[^()]*`--)[^()]*\)/g, '')
  .replace(/\s*`--[\w-]+`/g, '')
  .replace(/\s{2,}/g, ' ')
  .trim();

/** La primera frase (o el texto entero si no hay punto), sin acotaciones técnicas. */
export const primeraFrase = t => {
  const limpio = sinTecnica(t);
  return limpio.match(/^.+?[.:;](?=\s|$)/)?.[0].replace(/[:;]$/, '.') ?? limpio;
};

/** Texto plano, sin marcas de markdown: para el anuncio del lector de pantalla. */
export const plano = t => sinTecnica(t).replace(/\*\*|`/g, '');
