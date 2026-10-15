// E09 · Contexto: qué es. Comparte pantalla con E10 y E11.
// Una fila por concepto, cada una con su ventana de contexto a todo el ancho:
// - Capacidad: tres ventanas superpuestas, de 256K, 512K y 1M tokens (depende del modelo).
// - Utilizado: una ventana de 256K, llena en parte con lo que lee el modelo, y la línea de nivel.
// - Relevante: el mismo relleno, atenuado salvo el trozo que ayuda de verdad.
// Las dos últimas comparten escala: cada capa queda justo debajo de la de arriba.
// Pasos: 1 capacidad · 2 utilizado (la ventana se llena y aparece el nivel) · 3 relevante.
import { px } from '../../design/motion.js';
import { en, cabecera, crearPasos, pausa } from './comun.js';

const X = 120, ANCHO = 1680;
// Miles de tokens. Capacidades habituales, de mayor a menor: la mayor da la escala de su fila.
const CAPACIDADES = [1000, 512, 256];
const VENTANA = 256;   // la de las filas de utilizado y relevante
const tokens = n => (n >= 1000 ? `${n / 1000}M tokens` : `${n}K tokens`);
// Guion 2.3: lo que lee el modelo en cada llamada, en miles de tokens (cifras ficticias).
const CAPAS = [['Instrucciones', 28], ['Reglas', 18], ['Conversación', 28], ['Código leído', 38], ['Resultados de herramientas', 54]];
// El trozo útil, dentro del código leído: 12K atenuados, 16K útiles y el resto atenuado.
const UTIL = { capa: 'Código leído', antes: 12, tokens: 16 };
const CONCEPTOS = [
  ['Capacidad', 'Cuánto puede admitir el modelo'],
  ['Utilizado', 'Cuánto se está ocupando'],
  ['Relevante', 'Qué parte ayuda realmente a resolver la tarea'],
];
const FILAS = [280, 485, 690];

/** Una ventana de contexto horizontal: contorno, capas y su capacidad en el extremo derecho. */
const ventana = (ancho, capacidad, capas = '', clase = '') =>
  `<div class="ventana${clase}" style="width:${ancho}px">${capas && `<div class="ventana__relleno">${capas}</div>`}<span class="ventana__capacidad">${capacidad}</span></div>`;

export default function ({ escena, raiz }) {
  let pasos = null;
  // Ancho útil: el de la ventana menos el contorno y la holgura de cada lado.
  const borde = () => px('--trazo-contorno') + px('--esp-1');
  const porMil = () => (ANCHO - 2 * borde()) / VENTANA;
  const usado = CAPAS.reduce((a, [, n]) => a + n, 0);
  const porcentaje = Math.round((usado / VENTANA) * 100);
  const cifra = () => raiz.querySelector('[data-cifra]');

  return {
    montar() {
      const hueco = px('--trazo-contorno');
      const capa = (n, texto = '', atrs = '') =>
        `<div class="capa capa--entrada" style="width:${Math.round(n * porMil()) - hueco}px"${atrs}>${texto}</div>`;

      // Utilizado: las capas entran de izquierda a derecha (grupo 1, tras la ventana vacía).
      const utilizadas = CAPAS.map(([nombre, n]) => capa(n, nombre, ' data-paso="2" data-orden="1" data-efecto="llenarVentana"')).join('');
      // Relevante: llega llena y, después, se atenúa todo salvo el trozo útil.
      const atenua = ' data-atenua="3" data-orden="1"';
      const relevantes = CAPAS.flatMap(([nombre, n]) => nombre !== UTIL.capa ? [capa(n, '', atenua)] : [
        capa(UTIL.antes, '', atenua), capa(UTIL.tokens), capa(n - UTIL.antes - UTIL.tokens, '', atenua),
      ]).join('');
      // Dónde empieza el trozo útil, para poner su nombre debajo.
      const antesUtil = CAPAS.slice(0, CAPAS.findIndex(([nombre]) => nombre === UTIL.capa)).reduce((a, [, n]) => a + n, 0) + UTIL.antes;
      const centroUtil = X + borde() + (antesUtil + UTIL.tokens / 2) * porMil();

      const alto = px('--ventana-alto'), sobra = px('--esp-3') / 2;
      const barra = y => y + 59;   // la ventana, bajo la línea del concepto (tipo-texto + --esp-2)
      const concepto = ([nombre, texto], i) => en(X, FILAS[i],
        `<p class="tipo-texto" style="margin:0;display:flex;gap:var(--esp-3)"><span style="font-weight:var(--peso-enfasis)">${nombre}</span><span style="color:var(--color-texto-2)">${texto}</span></p>`,
        { paso: i + 1 });
      const [y1, y2, y3] = FILAS.map(barra);

      raiz.innerHTML =
        cabecera(escena, ANCHO) +
        CONCEPTOS.map(concepto).join('') +
        // Capacidad: cada ventana, encima de la mayor y a su escala.
        CAPACIDADES.map((n, i) => en(X, y1,
          ventana(Math.round((ANCHO * n) / CAPACIDADES[0]), tokens(n), '', i ? ' ventana--menor' : ''), { paso: 1 })).join('') +
        // Utilizado: las capas y la línea de nivel donde acaban.
        en(X, y2, ventana(ANCHO, tokens(VENTANA), utilizadas), { paso: 2 }) +
        en(X + borde() + usado * porMil() - hueco / 2 - px('--trazo-fuerte') / 2, y2 - sobra,
          `<div class="nivel" style="position:static"><span class="nivel__cifra" data-cifra>${porcentaje} %</span></div>`,
          { paso: 2, propio: true }) +
        // Relevante: el mismo relleno, atenuado salvo el trozo útil.
        en(X, y3, ventana(ANCHO, tokens(VENTANA), relevantes), { paso: 3 }) +
        en(centroUtil, y3 + alto + px('--esp-2'),
          '<span class="tipo-etiqueta" style="display:block;transform:translateX(-50%);white-space:nowrap">Contexto útil</span>', { paso: 3, orden: 1 });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        cifra().textContent = `${porcentaje} %`;
        return;
      }
      if (paso === 2) {
        // La ventana vacía; después se llena capa a capa y, donde acaba, aparece el nivel con su
        // cifra, que sube hasta lo ocupado. (Si el nivel acompañara al relleno, su cifra pisaría las capas.)
        const nivel = raiz.querySelector('[data-propio]');
        pasos.animar(2, tl, { orden: 0 });
        pasos.animar(2, tl, { orden: 1 });
        tl.aparecer(nivel)
          .subirContador(cifra(), { desde: 0, hasta: porcentaje, sufijo: ' %' }, '<');
      } else if (paso === 3) {
        // La fila llega llena; tras una pausa de lectura, se atenúa todo salvo el trozo útil.
        pasos.animar(3, tl, { orden: 0 });
        pausa(tl);
        pasos.animar(3, tl, { orden: 1 });
      } else {
        pasos.animar(paso, tl);
      }
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
