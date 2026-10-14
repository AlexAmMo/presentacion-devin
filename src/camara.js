// La cámara: encuadra un rectángulo del mundo a pantalla completa con un transform sobre
// #mundo (transform-origin 0 0). Una vista es { v: [centro x, centro y, ancho visible],
// zona, region }. Los vuelos son el efecto volarCamara de design/motion.js, con la
// duración y la curva de la ruta de escenas.md, leídas de las variables:
// - misma zona → --dur-camara-corta, en línea recta;
// - otra zona de la misma región (el hub y su anillo) → --dur-camara, «alejar, viajar, acercar»;
// - otra región o la vista general → --dur-camara-larga, con --ease-camara-larga.
import { s, v, px } from '../design/motion.js';
import { ESCENAS } from './datos/escenas.js';
import { ZONAS } from './datos/mapa.js';

// Holgura alrededor de los encuadres compuestos, en px del mundo.
const MARGEN_GENERAL = 480;   // vista general: alrededor del mapa entero
const MARGEN_PIEZA = 240;     // «pieza al hub»: alrededor de la zona y el hub

const RUTAS = {
  corta: { duracion: '--dur-camara-corta', curva: '--ease-camara', trayectoria: 'recta' },
  estandar: { duracion: '--dur-camara', curva: '--ease-camara', trayectoria: 'zoom' },
  larga: { duracion: '--dur-camara-larga', curva: '--ease-camara-larga', trayectoria: 'zoom' },
};

const union = rects => {
  const x = Math.min(...rects.map(r => r.x)), y = Math.min(...rects.map(r => r.y));
  return { x, y, ancho: Math.max(...rects.map(r => r.x + r.ancho)) - x, alto: Math.max(...rects.map(r => r.y + r.alto)) - y };
};
const ampliar = (r, m) => ({ x: r.x - m, y: r.y - m, ancho: r.ancho + 2 * m, alto: r.alto + 2 * m });
const rectDe = e => ({ x: e.x, y: e.y, ancho: e.ancho, alto: e.alto });
const enMapa = ESCENAS.filter(e => e.x != null);

/** Tipo de vuelo entre dos vistas. */
export function ruta(a, b) {
  if (!a || a.region === 'general' || b.region === 'general' || a.region !== b.region) return 'larga';
  return a.zona === b.zona ? 'corta' : 'estandar';
}

export function crearCamara({ mundo, escenas, hub }) {
  let pantalla = [px('--escena-ancho'), px('--escena-alto')];
  let actual = null;

  // Encaja un rectángulo en la pantalla (sin recortarlo) y lo centra.
  const vista = (r, zona) => ({
    v: [r.x + r.ancho / 2, r.y + r.alto / 2, Math.max(r.ancho, r.alto * (pantalla[0] / pantalla[1]))],
    zona, region: ZONAS[zona].region,
  });
  const pintar = ([x, y, ancho]) => {
    const k = pantalla[0] / ancho;
    mundo.style.transform = `translate(${Math.round(pantalla[0] / 2 - x * k)}px, ${Math.round(pantalla[1] / 2 - y * k)}px) scale(${k})`;
  };
  const iguales = (a, b) => a && a.v.every((n, i) => Math.abs(n - b.v[i]) < 0.5);

  const camara = {
    get actual() { return actual; },

    /**
     * Vista general: el mapa entero. Con reserva (px de pantalla abajo, a escala de
     * --escena-alto), el mapa se encaja y centra en el hueco que queda encima.
     */
    general(reserva = 0) {
      const r = ampliar(union(enMapa.map(rectDe)), MARGEN_GENERAL);
      const util = 1 - reserva / px('--escena-alto');
      const ancho = Math.max(r.ancho, r.alto * (pantalla[0] / (pantalla[1] * util)));
      const altoVisible = ancho * (pantalla[1] / pantalla[0]);
      return { v: [r.x + r.ancho / 2, r.y + r.alto / 2 + (altoVisible * (1 - util)) / 2, ancho], zona: 'general', region: 'general' };
    },

    /** La vista de un paso: su encuadre propio o el de su escena. */
    vistaDe(paso) {
      const e = paso.escena;
      const encuadre = paso.encuadre ?? (e.zona === 'general' ? 'general' : null);
      // E01 y E30: su capa ocupa la parte de abajo y el mapa sube.
      if (encuadre === 'general') return camara.general(e.zona === 'general' ? escenas.get(e.id).ctrl.reservaInferior?.() ?? 0 : 0);
      if (encuadre === 'pieza') return vista(ampliar(union([...enMapa.filter(o => o.zona === e.zona).map(rectDe), hub]), MARGEN_PIEZA), e.zona);
      if (encuadre === 'avanzado') {
        const r = escenas.get(e.id).ctrl.encuadreAvanzado?.(paso.n);
        return r ? vista({ ...r, x: e.x + r.x, y: e.y + r.y }, e.zona) : vista(rectDe(e), e.zona);
      }
      if (encuadre) {
        const otra = ESCENAS.find(o => o.id === encuadre);
        return vista(rectDe(otra), otra.zona);
      }
      return vista(rectDe(e), e.zona);
    },

    /** Al instante. */
    poner(nueva) {
      actual = nueva;
      mundo.style.willChange = 'auto';
      pintar(nueva.v);
    },

    /** Añade el vuelo a tl. Devuelve false si ya estaba ahí (no hay vuelo ni pausa). */
    volar(tl, nueva) {
      if (iguales(actual, nueva)) { actual = nueva; return false; }
      const r = RUTAS[ruta(actual, nueva)];
      tl.volarCamara(mundo, {
        desde: actual.v, hasta: nueva.v, pantalla: () => pantalla, trayectoria: r.trayectoria,
        duration: s(r.duracion), ease: v(r.curva),
      });
      actual = nueva;
      return true;
    },

    /** Tras completar un vuelo de golpe: quita will-change y vuelve a pintar la vista final. */
    reposar() {
      if (actual) camara.poner(actual);
    },

    /** El escenario cambió de tamaño: misma vista, nueva escala. */
    ajustar(ancho, alto) {
      pantalla = [ancho, alto];
      if (actual) camara.poner(actual);
    },
  };
  return camara;
}
