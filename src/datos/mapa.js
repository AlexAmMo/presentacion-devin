// Dónde está cada cosa en el mundo. Se edita a mano; el texto de las escenas sale
// de escenas.md. `npm run escenas` junta los dos en src/datos/escenas.js.
//
// Unidades: px del mundo. Cada escena mide --escena-ancho × --escena-alto y se ve a
// escala 1. Las posiciones son la esquina superior izquierda de la escena.
// Separaciones: 160 px entre escenas de una zona, 480 entre zonas del anillo y
// 960 entre partes. El hub está en el origen y el anillo lo rodea en sentido horario.
//
//                    [E02][E03]                               Parte 1
//   [E17]   [E05][E06][E07]   [E08]                           anillo, fila de arriba
//   [E16]        [ HUB ]      [E09][E10][E11]       [E20]     Contexto sale hacia la Parte 3
//   [E15]        [E13 ]       [E12]                 [E21]
//                                                   [E22]
//           [E24][E25][E26]                         [E23]
//           [E29][E28][E27]                                   Parte 4, circuito cerrado

/**
 * Zonas: escenas contiguas de un mismo tema. La región decide la duración del vuelo
 * (camara.js): misma zona → corta; zonas de una misma región → estándar; otra región
 * o la vista general → larga.
 */
export const ZONAS = {
  general: { nombre: 'Vista general', region: 'general', icono: 'map-pin' },
  parte1: { nombre: 'Primeros pasos', region: 'parte1', icono: 'map-pin' },
  hub: { nombre: 'El agente', region: 'centro', icono: 'bot' },
  modelos: { nombre: 'Modelos', region: 'centro', icono: 'cpu' },
  effort: { nombre: 'Effort', region: 'centro', icono: 'gauge' },
  contexto: { nombre: 'Contexto', region: 'centro', icono: 'app-window' },
  rules: { nombre: 'Rules', region: 'centro', icono: 'file-text' },
  skills: { nombre: 'Skills', region: 'centro', icono: 'puzzle' },
  tools: { nombre: 'Tools propias', region: 'centro', icono: 'wrench' },
  mcp: { nombre: 'MCP', region: 'centro', icono: 'plug' },
  subagentes: { nombre: 'Subagentes', region: 'centro', icono: 'git-fork' },
  parte3: { nombre: 'Tokens y coste', region: 'parte3', icono: 'coins' },
  parte4: { nombre: 'Buenas prácticas', region: 'parte4', icono: 'list-checks' },
};

/** Posición de cada escena. Las de la zona «general» se ven desde la vista general y no tienen sitio propio. */
export const POSICIONES = {
  E01: { zona: 'general' },
  E02: { zona: 'parte1', x: -1040, y: -3600 },
  E03: { zona: 'parte1', x: 1040, y: -3600 },
  E04: { zona: 'hub', x: 0, y: 0 },
  E05: { zona: 'modelos', x: -2080, y: -1560 },
  E06: { zona: 'modelos', x: 0, y: -1560 },
  E07: { zona: 'modelos', x: 2080, y: -1560 },
  E08: { zona: 'effort', x: 4480, y: -1560 },
  E09: { zona: 'contexto', x: 4480, y: 0 },
  E10: { zona: 'contexto', x: 6560, y: 0 },
  E11: { zona: 'contexto', x: 8640, y: 0 },
  E12: { zona: 'rules', x: 4480, y: 1560 },
  E13: { zona: 'skills', x: 0, y: 1560 },
  E14: { zona: 'hub', x: 0, y: 0 },
  E15: { zona: 'tools', x: -4480, y: 1560 },
  E16: { zona: 'mcp', x: -4480, y: 0 },
  E17: { zona: 'subagentes', x: -4480, y: -1560 },
  E18: { zona: 'hub', x: 0, y: 0 },
  E19: { zona: 'hub', x: 0, y: 0 },
  E20: { zona: 'parte3', x: 11520, y: -1860 },
  E21: { zona: 'parte3', x: 11520, y: -620 },
  E22: { zona: 'parte3', x: 11520, y: 620 },
  E23: { zona: 'parte3', x: 11520, y: 1860 },
  E24: { zona: 'parte4', x: -2080, y: 3600 },
  E25: { zona: 'parte4', x: 0, y: 3600 },
  E26: { zona: 'parte4', x: 2080, y: 3600 },
  E27: { zona: 'parte4', x: 2080, y: 4840 },
  E28: { zona: 'parte4', x: 0, y: 4840 },
  E29: { zona: 'parte4', x: -2080, y: 4840 },
  E30: { zona: 'general' },
};

/**
 * Pasos con encuadre propio, aparte de los automáticos: los «pieza al hub» encuadran
 * su zona y el hub, y los [A] se acercan a su fila del marcador.
 * Valor: el id de otra escena o 'general'.
 */
export const ENCUADRES = {
  'E01/3': 'E02',   // «→ Cámara a la Parte 1»
  'E08/3': 'E06',   // «Cámara corta a la gráfica de E06»
  'E19/3': 'E20',   // «→ Cámara a la región de la parte 3»
};

/**
 * El hub: la tarjeta del agente en el centro y un hueco por pieza, en la misma
 * dirección que su zona del anillo (Modelo arriba, Contexto a la derecha…), así cada
 * pieza llega desde su lado. Medidas en px dentro de la escena del hub.
 * - llega: el paso en el que la pieza entra. Si es un paso «pieza al hub», viaja
 *   desde su zona; si es un paso del hub (E14, E18), aparece en su sitio.
 * - forma: la del hueco (circulo, recipiente, documento o la tarjeta por defecto).
 *   bucle y plugin no tienen hueco: el bucle rodea al agente (centrado en su tarjeta)
 *   y el plugin lo envuelve todo.
 * - Las herramientas de serie quedan sobre el bucle, que pasa por ellas.
 */
export const HUB = {
  agente: { x: 383, y: 445 },
  panel: { x: 1160, y: 96, ancho: 640, alto: 888 },
  piezas: [
    { id: 'modelo', nombre: 'Modelo', icono: 'cpu', llega: 'E07/3', x: 500, y: 160, ancho: 220, alto: 96 },
    { id: 'effort', nombre: 'Effort', icono: 'gauge', llega: 'E08/6', x: 740, y: 160, ancho: 220, alto: 96 },
    { id: 'contexto', nombre: 'Contexto', icono: 'app-window', llega: 'E11/4', forma: 'recipiente', x: 910, y: 300, ancho: 150, alto: 240 },
    { id: 'rules', nombre: 'AGENTS.md', icono: 'file-text', llega: 'E12/5', forma: 'documento', x: 910, y: 560, ancho: 150, alto: 200 },
    { id: 'skills', nombre: 'Skills', icono: 'puzzle', llega: 'E13/5', x: 690, y: 840, ancho: 220, alto: 110 },
    { id: 'herramientas', nombre: 'Herramientas', icono: 'terminal', llega: 'E14/1', forma: 'circulo', x: 480, y: 716, ancho: 260, alto: 88 },
    { id: 'bucle', nombre: 'Bucle', llega: 'E14/2', forma: 'bucle' },
    { id: 'propias', nombre: 'Tools propias', icono: 'wrench', llega: 'E15/8', forma: 'circulo', x: 290, y: 840, ancho: 240, alto: 96 },
    { id: 'mcp', nombre: 'MCP', icono: 'plug', llega: 'E16/4', forma: 'circulo', x: 250, y: 476, ancho: 88, alto: 88 },
    { id: 'subagente', nombre: 'Subagente', icono: 'git-fork', llega: 'E17/8', x: 160, y: 160, ancho: 280, alto: 96 },
    { id: 'plugin', nombre: 'Plugin', icono: 'package', llega: 'E18/1', forma: 'plugin', x: 120, y: 120, ancho: 980, alto: 864 },
  ],
};
