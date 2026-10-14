// Los pasos: una lista plana con todos los pasos de todas las escenas, y la navegación.
// - Avanzar anima: primero la cámara (si cambia de pantalla), después --pausa-tras-camara,
//   después la tapa del bloque si es la primera vez que se entra, el cambio de escena si
//   la pantalla ya mostraba otra, el paso de la escena y la pieza que entra en el hub.
// - Retroceder, saltar y recargar no animan: ponen al instante el estado del paso.
// - Cada paso tiene su URL (#E05/3).
// - Los pasos [A] se pueden saltar (tecla A); la preferencia dura la sesión.
import { gsap } from 'gsap';
import { s, esEstatico } from '../design/motion.js';
import { ESCENAS } from './datos/escenas.js';

export const PASOS = ESCENAS.flatMap((escena, ie) => escena.pasos.map(p => ({ ...p, escena, ie, ref: `${escena.id}/${p.n}` })));
const indiceDe = ref => PASOS.findIndex(p => p.ref === ref);
const LLEGADAS = PASOS.flatMap((p, i) => (p.hub ? [{ id: p.hub, en: i }] : []));
const piezasHasta = i => new Set(LLEGADAS.filter(l => l.en <= i).map(l => l.id));
// Primer paso de cada bloque: desde ahí su tapa está abierta.
const ENTRADAS = new Map();
PASOS.forEach((p, i) => { if (p.escena.region !== 'general' && !ENTRADAS.has(p.escena.region)) ENTRADAS.set(p.escena.region, i); });
const abiertasHasta = i => new Set([...ENTRADAS].filter(([, en]) => en <= i).map(([region]) => region));
// Escenas de cada pantalla, en orden.
const POR_ZONA = new Map();
ESCENAS.forEach(e => { if (e.x != null) POR_ZONA.set(e.zona, [...(POR_ZONA.get(e.zona) ?? []), e]); });
const PREFERENCIA = 'devin-sin-avanzados';
const LIMPIAR = { clearProps: 'opacity,visibility,transform' };

export function crearNavegacion({ mundo, camara, alCambiar = () => {} }) {
  const { escenas, hub, tapas, anuncio } = mundo;
  let actual = 0, general = false, animacion = null;
  let conAvanzados = true;
  try { conAvanzados = sessionStorage.getItem(PREFERENCIA) !== 'si'; } catch { /* sin almacenamiento: se incluyen */ }

  const incluido = i => conAvanzados || !PASOS[i].avanzado;
  const buscar = (desde, paso) => {
    for (let i = desde + paso; i >= 0 && i < PASOS.length; i += paso) if (incluido(i)) return i;
    return null;
  };

  // Completa de golpe lo que esté animándose: el siguiente paso parte de un estado limpio.
  const terminar = () => {
    if (!animacion) return;
    animacion.progress(1).kill();
    animacion = null;
    camara.reposar();
  };

  // Escenas anteriores, terminadas; posteriores, en su estado 0; la actual, en su paso.
  const ponerEscenas = (i, salvoActual) => {
    const p = PASOS[i];
    for (const x of escenas.values()) {
      const objetivo = x.indice < p.ie ? x.datos.pasos.length : x.indice > p.ie ? 0 : p.n;
      if (salvoActual && x.indice === p.ie) continue;
      if (x.estado !== objetivo) { x.ctrl.irA(objetivo, { animar: false }); x.estado = objetivo; }
    }
  };

  // Qué escena se ve en una pantalla con la escena ie en curso: ella si es de esa pantalla;
  // si no, la última ya vista; si no, la primera.
  const indice = e => escenas.get(e.id).indice;
  const vistaEn = (lista, ie) => lista.find(e => indice(e) === ie) ?? [...lista].reverse().find(e => indice(e) < ie) ?? lista[0];

  const ponerVisibles = i => {
    const p = PASOS[i];
    // Solo la escena actual está en el árbol de accesibilidad; las demás, inert.
    for (const x of escenas.values()) {
      x.raiz.classList.toggle('escena--actual', x.indice === p.ie);
      x.raiz.inert = x.indice !== p.ie;
    }
    for (const lista of POR_ZONA.values()) {
      const vista = vistaEn(lista, p.ie);
      for (const e of lista) escenas.get(e.id).raiz.classList.toggle('oculto', e !== vista);
    }
  };

  function ir(i, { animar = false } = {}) {
    terminar();
    const p = PASOS[i], antes = PASOS[actual];
    const destino = camara.vistaDe(p);
    general = false;
    if (!animar) {
      ponerEscenas(i, false);
      hub.pintar(piezasHasta(i));
      tapas.pintar(abiertasHasta(i));
      camara.poner(destino);
      ponerVisibles(i);
    } else {
      const x = escenas.get(p.escena.id);
      const enHub = p.escena.zona === 'hub';
      const region = p.escena.region;
      // La tapa del bloque se levanta a la vista si se entra en él con este paso.
      const abre = ENTRADAS.get(region) > actual && ENTRADAS.get(region) <= i;
      const abiertas = abiertasHasta(i);
      if (abre) abiertas.delete(region);
      ponerEscenas(i, true);
      // Las piezas de los temas se colocan sin animación; la que entra con el hub a la vista, se anima.
      const piezas = piezasHasta(i);
      if (p.hub && enHub) piezas.delete(p.hub);
      hub.pintar(piezas);
      tapas.pintar(abiertas);

      const tl = gsap.timeline();
      const vuela = camara.volar(tl, destino);
      // Misma pantalla y otra escena: la anterior se va y la nueva aparece en su sitio.
      const lista = POR_ZONA.get(p.escena.zona);
      const previa = lista && vistaEn(lista, antes.ie);
      const cambia = !vuela && lista && previa !== p.escena;
      if (!cambia) ponerVisibles(i);
      if (vuela && !esEstatico()) tl.to({}, { duration: s('--pausa-tras-camara') });
      if (abre) tapas.abrir(region, tl);
      // El contrato anima desde el paso anterior: si se ha saltado un [A], primero se pone ese estado.
      if (x.estado !== p.n - 1) x.ctrl.irA(p.n - 1, { animar: false });
      if (cambia) {
        const salir = escenas.get(previa.id).raiz;
        tl.desaparecer(salir)
          .add(() => ponerVisibles(i))
          .set(salir, LIMPIAR)
          .aparecer(x.raiz)
          .set(x.raiz, LIMPIAR);
      }
      x.ctrl.irA(p.n, { animar: true, tl });
      x.estado = p.n;
      if (p.hub && enHub) hub.llegar(p.hub, tl);
      animacion = tl;
    }
    actual = i;
    history.replaceState(null, '', `#${p.ref}`);
    anuncio.textContent = `${p.escena.id} · ${p.escena.titulo}. Paso ${p.n} de ${p.escena.pasos.length}: ${p.texto}`;
    alCambiar();
  }

  const nav = {
    get actual() { return PASOS[actual]; },
    get general() { return general; },
    get conAvanzados() { return conAvanzados; },
    get animando() { return Boolean(animacion && animacion.progress() < 1); },

    avanzar() {
      const i = buscar(actual, 1);
      if (i != null) ir(i, { animar: true });
    },
    retroceder() {
      const i = buscar(actual, -1);
      if (i != null) ir(i);
    },
    irA: ref => {
      const i = indiceDe(ref);
      if (i >= 0) ir(i);
      return i >= 0;
    },

    /** Vista general del mapa, y volver al paso. Las tapas de los bloques aún no visitados siguen puestas. */
    alternarGeneral() {
      terminar();
      const tl = gsap.timeline();
      general = !general;
      camara.volar(tl, general ? camara.general() : camara.vistaDe(PASOS[actual]));
      animacion = tl;
      alCambiar();
    },

    /** Incluir o saltar los pasos [A]. */
    alternarAvanzados() {
      conAvanzados = !conAvanzados;
      document.documentElement.classList.toggle('sin-avanzados', !conAvanzados);
      try { sessionStorage.setItem(PREFERENCIA, conAvanzados ? 'no' : 'si'); } catch { /* sin almacenamiento */ }
      alCambiar();
    },

    /** Posición entre los pasos que se van a dar (sin los [A] si se saltan). */
    progreso() {
      const incluidos = PASOS.map((_, i) => i).filter(incluido);
      return { n: incluidos.filter(i => i <= actual).length, total: incluidos.length };
    },
    siguiente() {
      const i = buscar(actual, 1);
      return i == null ? null : PASOS[i];
    },
  };

  document.documentElement.classList.toggle('sin-avanzados', !conAvanzados);
  addEventListener('hashchange', () => nav.irA(decodeURIComponent(location.hash.slice(1))));
  if (!nav.irA(decodeURIComponent(location.hash.slice(1)))) ir(0);
  return nav;
}
