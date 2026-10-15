// E21 · Los cuatro tipos de token. Comparte pantalla con E20, E22 y E23.
// Arriba, una ventana (100K) en la que se ve cada tipo: lo que entra (input), la salida de la
// llamada (output) y el corchete de la caché cuando se guarda (write). Debajo, una fila por tipo: qué es y su precio por
// millón con GPT-6.1 Sol (las de la documentación de Devin), en una barra proporcional. La
// ventana se llena de una vez, con todos los tipos; el corchete se alarga y se queda como cache
// write, y las cuatro filas entran seguidas, en una sola animación.
// Pasos: 1 los cuatro tipos.
import { px } from '../../design/motion.js';
import { en, cabecera, fuente, crearPasos, decimal } from './comun.js';

// Guion 3.3, con las tarifas de GPT-6.1 Sol por millón de tokens (docs.devin.ai/desktop/models,
// nivel estándar, 15-10-2026): input 2, cache write 2,5, cache read 0,1 y output 10.
const TIPOS = [
  ['Input sin caché', 'Entrada que el modelo procesa desde cero', 2, 'entrada'],
  ['Cache write', 'Se guarda en caché para las llamadas siguientes; a veces cuesta algo más', 2.5, 'entrada'],
  ['Cache read', 'Entrada que se reutiliza de la caché: entre un 2,5 % y un 10 % del input', 0.1, 'cacheada'],
  ['Output', 'El más caro por token; incluye el razonamiento', 10, 'salida'],
];
const CAPACIDAD = 100;
const [VX, VY, VANCHO] = [120, 300, 1680];
// Las barras, a escala: px por cada dólar del millón (output, 10 $, ocupa 600 px; cache read, 0,1 $, 6 px).
const POR_UNIDAD = 60;
const FILA = i => 548 + i * 100;
// Las capas de la ventana entran llenándola, en su paso y su grupo.
const LLENA = (paso, orden) => ` data-paso="${paso}" data-orden="${orden}" data-efecto="llenarVentana"`;

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const borde = px('--trazo-contorno') + px('--esp-1');
      const porMil = (VANCHO - 2 * borde) / CAPACIDAD;
      const ancho = n => Math.round(n * porMil) - px('--trazo-contorno');
      const capa = (n, texto, atrs, tipo = 'entrada') => `<div class="capa capa--${tipo}" style="width:${ancho(n)}px"${atrs}>${texto}</div>`;
      const visto = ancho(20) + px('--trazo-contorno') + ancho(4);
      const etiqueta = (contenido, opciones) =>
        en(VX + borde, VY + px('--ventana-alto') + px('--esp-1') + px('--corchete-ancho') + px('--esp-1'), contenido, { paso: 1, ...opciones });
      const fila = ([nombre, descripcion, tarifa, tipo], i) =>
        en(120, FILA(i), `<p class="tipo-texto-s" style="margin:0;font-weight:var(--peso-enfasis)">${nombre}</p>
          <p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-2)">${descripcion}</p>`, { paso: 1, orden: i + 1, estilo: 'width:880px' }) +
        en(1060, FILA(i) + 12, `<div style="display:flex;align-items:center;gap:var(--esp-3)">
            <div class="capa capa--${tipo}" style="width:${Math.max(px('--trazo-contorno'), tarifa * POR_UNIDAD)}px;height:var(--ficha-alto-s);box-sizing:border-box;padding:0"></div>
            <span class="tipo-mono">${decimal(tarifa, tarifa % 1 ? 1 : 0)} $</span></div>`, { paso: 1, orden: i + 1 });

      raiz.innerHTML =
        cabecera(escena, 1680) +
        // La ventana: 20K fijos y 4K del mensaje (input), la salida de la llamada (1K, output) y
        // otro mensaje. Entran todas a la vez.
        en(VX, VY, `<div class="ventana" style="width:${VANCHO}px"><div class="ventana__relleno">
            ${capa(20, 'Fijo', LLENA(1, 1))}${capa(4, '', LLENA(1, 1))}${capa(1, '', LLENA(1, 1), 'salida')}${capa(4, '', LLENA(1, 1))}
          </div><span class="ventana__capacidad">${CAPACIDAD}K</span></div>`, { paso: 1 }) +
        en(VX + borde, VY + px('--ventana-alto') + px('--esp-1'), `<div class="corchete" style="width:${visto}px"></div>`, { paso: 1, orden: 2, efecto: 'alargarCorchete' }) +
        etiqueta('<p class="tipo-etiqueta" style="margin:0;font-weight:var(--peso-enfasis)">Cache write: se guarda para la llamada siguiente</p>', { orden: 2 }) +
        en(1060, 500, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Precio por millón · GPT-6.1 Sol</p>', { paso: 1, orden: 1 }) +
        en(1060, 940, fuente('docs.devin.ai/desktop/models · 15-10-2026'), { paso: 1, orden: 4 }) +
        TIPOS.map(fila).join('');
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      // Los cuatro tipos, seguidos, cada uno con su fila: input (la ventana se llena con todos);
      // cache write (el corchete se alarga y se nombra); cache read y output.
      pasos.animar(paso, tl);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
