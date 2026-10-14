// Dónde está cada cosa en el mundo. Se edita a mano; el texto de las escenas sale
// de escenas.md. `npm run escenas` junta los dos en src/datos/escenas.js.
//
// Unidades: px del mundo. Cada pantalla mide --escena-ancho × --escena-alto y se ve a
// escala 1. Las posiciones son la esquina superior izquierda de la pantalla.
//
// El mapa es una cruz de cinco bloques (regiones), separados 960 px:
// - centro: Devin y sus herramientas, una cuadrícula de 3 × 3 pantallas separadas
//   160 px, con Devin (el hub) en medio y los temas alrededor en sentido horario;
// - arriba, Primeros pasos; a la derecha, Coste; abajo, Buenas prácticas; a la izquierda, Preguntas.
//
//                        [Primeros pasos]
//
//             [Subagentes] [Modelos] [Effort]
//   [Preguntas] [MCP]      [ Devin ] [Contexto]  [Coste]
//             [Tools]      [Skills]  [Rules]
//
//                       [Buenas prácticas]

/**
 * Zonas: cada una es una pantalla del mapa. Varias escenas pueden compartir zona:
 * entonces se suceden en la misma pantalla, sin mover la cámara.
 * La región es el bloque de la cruz y decide el vuelo (camara.js): mismo bloque →
 * corto y en línea recta; otro bloque → estándar; vista general → largo.
 */
export const ZONAS = {
  general: { nombre: 'Vista general', region: 'general', icono: 'map-pin' },
  parte1: { nombre: 'Primeros pasos', region: 'parte1', icono: 'map-pin', x: 0, y: -3280 },
  hub: { nombre: 'Devin', region: 'centro', icono: 'bot', x: 0, y: 0 },
  modelos: { nombre: 'Modelos', region: 'centro', icono: 'cpu', x: 0, y: -1240 },
  effort: { nombre: 'Effort', region: 'centro', icono: 'gauge', x: 2080, y: -1240 },
  contexto: { nombre: 'Contexto', region: 'centro', icono: 'app-window', x: 2080, y: 0 },
  rules: { nombre: 'Rules', region: 'centro', icono: 'file-text', x: 2080, y: 1240 },
  skills: { nombre: 'Skills', region: 'centro', icono: 'puzzle', x: 0, y: 1240 },
  tools: { nombre: 'Tools propias', region: 'centro', icono: 'wrench', x: -2080, y: 1240 },
  mcp: { nombre: 'MCP', region: 'centro', icono: 'plug', x: -2080, y: 0 },
  subagentes: { nombre: 'Subagentes', region: 'centro', icono: 'git-fork', x: -2080, y: -1240 },
  parte3: { nombre: 'Coste', region: 'parte3', icono: 'coins', x: 4960, y: 0 },
  parte4: { nombre: 'Buenas prácticas', region: 'parte4', icono: 'list-checks', x: 0, y: 3280 },
  cierre: { nombre: 'Preguntas', region: 'cierre', icono: 'map-pin', x: -4960, y: 0 },
};

/** La zona de cada escena. Las de «general» se ven desde la vista general y no tienen pantalla propia. */
export const ZONA_DE = {
  E01: 'general',
  E02: 'parte1', E03: 'parte1',
  E04: 'hub',
  E05: 'modelos', E06: 'modelos', E07: 'modelos',
  E08: 'effort',
  E09: 'contexto', E10: 'contexto', E11: 'contexto',
  E12: 'rules',
  E13: 'skills',
  E14: 'hub',
  E15: 'tools',
  E16: 'mcp',
  E17: 'subagentes',
  E18: 'hub',
  E19: 'hub',
  E20: 'parte3', E21: 'parte3', E22: 'parte3', E23: 'parte3',
  E24: 'parte4', E25: 'parte4', E26: 'parte4', E27: 'parte4', E28: 'parte4', E29: 'parte4',
  E30: 'cierre', E31: 'cierre',
};

/**
 * Pasos con un encuadre distinto del de su escena: el id de otra escena (se encuadra su
 * pantalla) o 'general'.
 */
export const ENCUADRES = {
  'E01/1': 'E04',   // Portada: la pantalla de Devin, aún con la tapa del centro (su logo)
};

/**
 * El hub: la tarjeta del agente en el centro y un hueco por pieza, en la misma
 * dirección que su pantalla en la cuadrícula (Modelo arriba, Contexto a la derecha…).
 * Medidas en px dentro de la pantalla del hub.
 * - llega: cuándo entra la pieza.
 *   · Una escena ('E07'): al terminarla, sin animación; el hub no está a la vista, y al
 *     volver a Devin ya la tiene.
 *   · Un paso de una escena del hub ('E14/1'): entra animada, con el hub a la vista.
 * - forma: la del hueco (circulo, recipiente, documento o la tarjeta por defecto).
 *   bucle y plugin no tienen hueco: el bucle rodea al agente (centrado en su tarjeta)
 *   y el plugin lo envuelve todo.
 * - Las herramientas de serie quedan sobre el bucle, que pasa por ellas.
 */
export const HUB = {
  agente: { x: 383, y: 445 },
  panel: { x: 1160, y: 96, ancho: 640, alto: 888 },
  piezas: [
    { id: 'modelo', nombre: 'Modelo', icono: 'cpu', llega: 'E07', x: 500, y: 160, ancho: 220, alto: 96 },
    { id: 'effort', nombre: 'Effort', icono: 'gauge', llega: 'E08', x: 740, y: 160, ancho: 220, alto: 96 },
    { id: 'contexto', nombre: 'Contexto', icono: 'app-window', llega: 'E11', forma: 'recipiente', x: 910, y: 300, ancho: 150, alto: 240 },
    { id: 'rules', nombre: 'AGENTS.md', icono: 'file-text', llega: 'E12', forma: 'documento', x: 910, y: 560, ancho: 150, alto: 200 },
    { id: 'skills', nombre: 'Skills', icono: 'puzzle', llega: 'E13', x: 690, y: 840, ancho: 220, alto: 110 },
    { id: 'herramientas', nombre: 'Herramientas', icono: 'terminal', llega: 'E14/1', forma: 'circulo', x: 480, y: 716, ancho: 260, alto: 88 },
    { id: 'bucle', nombre: 'Bucle', llega: 'E14/2', forma: 'bucle' },
    { id: 'propias', nombre: 'Tools propias', icono: 'wrench', llega: 'E15', forma: 'circulo', x: 290, y: 840, ancho: 240, alto: 96 },
    { id: 'mcp', nombre: 'MCP', icono: 'plug', llega: 'E16', forma: 'circulo', x: 250, y: 476, ancho: 88, alto: 88 },
    { id: 'subagente', nombre: 'Subagente', icono: 'git-fork', llega: 'E17', x: 160, y: 160, ancho: 280, alto: 96 },
    { id: 'plugin', nombre: 'Plugin', icono: 'package', llega: 'E18/1', forma: 'plugin', x: 120, y: 120, ancho: 980, alto: 864 },
  ],
};
