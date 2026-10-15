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
  parte1: { nombre: 'Primeros pasos', region: 'parte1', icono: 'footprints', x: 0, y: -3280 },
  hub: { nombre: 'Devin', region: 'centro', icono: 'bot', x: 0, y: 0 },
  modelos: { nombre: 'Modelos', region: 'centro', icono: 'cpu', x: 0, y: -1240 },
  effort: { nombre: 'Effort', region: 'centro', icono: 'gauge', x: 2080, y: -1240 },
  contexto: { nombre: 'Contexto', region: 'centro', icono: 'app-window', x: 2080, y: 0 },
  rules: { nombre: 'Rules', region: 'centro', icono: 'scroll-text', x: 2080, y: 1240 },
  skills: { nombre: 'Skills', region: 'centro', icono: 'puzzle', x: 0, y: 1240 },
  tools: { nombre: 'Tools propias', region: 'centro', icono: 'wrench', x: -2080, y: 1240 },
  mcp: { nombre: 'MCP', region: 'centro', icono: 'plug', x: -2080, y: 0 },
  subagentes: { nombre: 'Subagentes', region: 'centro', icono: 'git-fork', x: -2080, y: -1240 },
  parte3: { nombre: 'Coste', region: 'parte3', icono: 'coins', x: 4960, y: 0 },
  parte4: { nombre: 'Buenas prácticas', region: 'parte4', icono: 'route', x: 0, y: 3280 },
  cierre: { nombre: 'Preguntas', region: 'cierre', icono: 'message-circle-question', x: -4960, y: 0 },
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
  E20: 'parte3', E21: 'parte3', E22: 'parte3', E23: 'parte3',
  E24: 'parte4', E25: 'parte4', E26: 'parte4', E27: 'parte4', E28: 'parte4', E29: 'parte4',
  E30: 'cierre', E31: 'cierre',
};

/**
 * Pasos con un encuadre distinto del de su escena: el id de otra escena (se encuadra su
 * pantalla), 'general' o 'portada' (el logo y el nombre de la tapa del centro, src/tapas.js).
 */
export const ENCUADRES = {
  'E01/1': 'portada',   // Portada: el logo de Devin y su nombre, en la tapa del centro
};

/**
 * Las tapas de los bloques (src/tapas.js). Cubren su bloque con una holgura en px del mundo,
 * para que el borde no asome al encuadrar una de sus pantallas: [x, y]. Las de fuera son más
 * holgadas, porque llevan su icono (el de su zona, en ZONAS) encima del título. La del centro
 * lleva el logo de Devin y, debajo, su nombre en lugar del título de la parte; su logo va encima
 * del centro del hub, no en el centro de la tapa, y su holgura es la que necesita la portada,
 * que encuadra ese logo y ese nombre, para quedar dentro.
 * - tituloCentro y lemaCentro: el nombre bajo el logo de Devin y, debajo, discreto, el resto del
 *   título de la charla (el de «Guion Devin.md»), sobre el logo de Openbank.
 * - portada: lo que ocupan el logo, el nombre y ese pie del alto de la portada (encuadre
 *   'portada'); así el encuadre queda dentro de la tapa, sin que asomen sus esquinas.
 * - fundido: en qué punto del vuelo que entra en un bloque empieza a fundirse su tapa (0,5 = a
 *   la mitad); termina cuando llega la cámara. Así se va mientras la cámara se acerca, sin
 *   esperar a que llegue.
 * - fundidoContenido: en qué punto del vuelo empiezan a fundirse su icono (o logo) y su título;
 *   terminan cuando empieza la tapa. Así no cruzan, enormes, el título de la escena.
 */
export const TAPAS = { holgura: [440, 380], holguraFuera: [360, 420], tituloCentro: 'Devin', lemaCentro: 'en el día a día: cómo aprovecharlo mejor y controlar el consumo', portada: 0.8, fundido: 0.5, fundidoContenido: 0.25 };

/**
 * El hub: el agente (un círculo, con Devin) en el centro, sus herramientas de serie pegadas a él
 * sobre el bucle y, alrededor, un anillo con una pieza por tema: todas, círculos iguales con su
 * icono y su nombre, cada una en la dirección de su pantalla en la cuadrícula (Modelo arriba,
 * Effort arriba a la derecha, Contexto a la derecha…), a 45° unas de otras.
 * Va centrado en su pantalla (y así, en su bloque y bajo el logo de la tapa del centro), salvo en
 * las escenas con panel (conPanel: E14 y E18), en las que ocupa la izquierda y a la derecha queda
 * el panel, con su cabecera y su contenido. Pasa de un sitio a otro sin animación, con la cámara
 * en otra pantalla. Medidas en px dentro de la pantalla del hub, con el hub a la izquierda.
 * - centro: el del agente, el del bucle y el del anillo, a la izquierda (centrado, en el centro
 *   de la pantalla). anillo: el radio del anillo de piezas.
 * - llega: cuándo entra la pieza.
 *   · Una escena ('E07'): al terminarla, sin animación; el hub no está a la vista, y al
 *     volver a Devin ya la tiene.
 *   · Un paso de una escena del hub ('E14/1'): entra animada, con el hub a la vista.
 * - angulo: su sitio en el anillo, en grados desde arriba y en sentido horario.
 * - forma: herramientas (las cuatro de serie, sobre el bucle, a 45°, 135°, 225° y 315°), bucle
 *   (rodea al agente) y plugin (la caja que lo envuelve todo, x, y, ancho y alto) no van en el anillo.
 * - aparece: el paso en que entra el hub (Devin, sus herramientas y los huecos de las piezas,
 *   uno tras otro); antes no se ve.
 * - Contexto se transforma en la ventana de contexto en los pasos en que se anima el contexto
 *   (contextoComoVentana); allí, ventana es su sitio y ventanaCapas, lo que cada pieza deja en
 *   ella (ancho en px): así se ve que todo acaba en el contexto. Las escenas del hub dibujan
 *   encima lo que añade la sesión.
 */
export const HUB = {
  centro: { x: 670, y: 540 },
  anillo: 319,
  panel: { x: 1240, y: 96, ancho: 560, alto: 888 },
  piezas: [
    { id: 'modelo', nombre: 'Modelo', icono: 'cpu', llega: 'E07', angulo: 0 },
    { id: 'effort', nombre: 'Effort', icono: 'gauge', llega: 'E08', angulo: 45 },
    { id: 'contexto', nombre: 'Contexto', icono: 'app-window', llega: 'E11', angulo: 90, ventana: { x: 850, y: 492, ancho: 310, alto: 96 } },
    { id: 'rules', nombre: 'Rules', icono: 'scroll-text', llega: 'E12', angulo: 135 },
    { id: 'skills', nombre: 'Skills', icono: 'puzzle', llega: 'E13', angulo: 180 },
    { id: 'herramientas', nombre: 'Herramientas', icono: 'terminal', llega: 'E14/1', forma: 'herramientas' },
    { id: 'bucle', nombre: 'Bucle', llega: 'E14/2', forma: 'bucle' },
    { id: 'propias', nombre: 'Tools propias', icono: 'wrench', llega: 'E15', angulo: 225 },
    { id: 'mcp', nombre: 'MCP', icono: 'plug', llega: 'E16', angulo: 270 },
    { id: 'subagente', nombre: 'Subagente', icono: 'git-fork', llega: 'E17', angulo: 315 },
    { id: 'plugin', nombre: 'Plugin', icono: 'package', llega: 'E18/1', forma: 'plugin', x: 160, y: 123, ancho: 1020, alto: 834 },
  ],
  ventanaCapas: [['contexto', 32, 'Instrucciones'], ['rules', 24, 'Rules'], ['skills', 8, 'Skills: descripciones'], ['herramientas', 12, 'Herramientas: definiciones'], ['propias', 8, 'Tools propias: definiciones']],
  contextoComoVentana: ['E14/2'],
  conPanel: ['E14', 'E18'],
  aparece: 'E04/1',
};

/**
 * El circuito de Buenas prácticas: fijo arriba a la derecha de su pantalla mientras sus escenas
 * se relevan; una parada por escena, con su nombre. La de la escena en curso va en acento y,
 * al pasar a la siguiente, el punto recorre la pista hasta ella. Medidas en px dentro de la pantalla.
 */
export const CIRCUITO = {
  zona: 'parte4', x: 1180, y: 84, ancho: 620, alto: 280,
  paradas: { E24: 'Definir', E25: 'Contexto', E26: 'Planificar', E27: 'Intervenir', E28: 'Verificar', E29: 'Hábitos' },
};
