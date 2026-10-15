// Los pasos: una lista plana con todos los pasos de todas las escenas, y la navegación.
// - Avanzar anima: primero la cámara (si cambia de pantalla; la tapa del bloque, si es la primera
//   vez que se entra, se funde mientras se acerca), después --pausa-tras-camara, el cambio de escena si
//   la pantalla ya mostraba otra, la pieza que entra en el hub, el cambio de forma de Contexto
//   (círculo o ventana) y el paso de la escena.
// - Si se pulsa mientras un paso aún se anima, esa pulsación solo lo termina (llega a su estado
//   final); la siguiente avanza. Así un doble toque del mando no se salta una animación.
// - Retroceder, saltar y recargar no animan: ponen al instante el estado del paso. En modo
//   estático (?estatico o prefers-reduced-motion), avanzar tampoco: va por esa misma vía.
// - Al pasar de un bloque a otro avanzando, hay un paso intermedio: la última pulsación de un bloque
//   lleva a la vista general (como la tecla O) y la siguiente entra desde ella en el bloque nuevo.
//   Retroceder desde esa vista vuelve al paso en que se estaba.
// - Ir al final (tecla Fin, por si falta tiempo) anima como avanzar: vuela hasta las preguntas.
// - Cada paso tiene su URL (#E05/3).
// - Los pasos [A] se pueden saltar (tecla A); la preferencia dura la sesión.
import { gsap } from 'gsap';
import { s, v, esEstatico } from '../design/motion.js';
import { ESCENAS } from './datos/escenas.js';
import { plano, primeraFrase } from './texto.js';
import { CIRCUITO, HUB, TAPAS } from './datos/mapa.js';

export const PASOS = ESCENAS.flatMap((escena, ie) => escena.pasos.map(p => ({ ...p, escena, ie, ref: `${escena.id}/${p.n}` })));
const indiceDe = ref => PASOS.findIndex(p => p.ref === ref);
// El primer paso de la última escena: las preguntas.
const FINAL = PASOS.findIndex(p => p.ie === ESCENAS.length - 1);
const LLEGADAS = PASOS.flatMap((p, i) => (p.hub ? [{ id: p.hub, en: i }] : []));
const piezasHasta = i => new Set(LLEGADAS.filter(l => l.en <= i).map(l => l.id));
// Pasos en los que Contexto se ve como ventana de contexto, no como círculo.
const COMO_VENTANA = new Set(HUB.contextoComoVentana);
// El hub va centrado en su pantalla salvo en las escenas con panel.
const CON_PANEL = new Set(HUB.conPanel);
const centradoEn = i => !CON_PANEL.has(PASOS[i].escena.id);
const ventanaEn = i => COMO_VENTANA.has(PASOS[i].ref);
// Desde este paso se ve el hub (antes, ni Devin ni sus huecos).
const HUB_DESDE = PASOS.findIndex(p => p.ref === HUB.aparece);
// Primer paso de cada bloque: desde ahí su tapa está abierta.
const ENTRADAS = new Map();
PASOS.forEach((p, i) => { if (p.escena.region !== 'general' && !ENTRADAS.has(p.escena.region)) ENTRADAS.set(p.escena.region, i); });
const abiertasHasta = i => new Set([...ENTRADAS].filter(([, en]) => en <= i).map(([region]) => region));
// Escenas de cada pantalla, en orden.
const POR_ZONA = new Map();
ESCENAS.forEach(e => { if (e.x != null) POR_ZONA.set(e.zona, [...(POR_ZONA.get(e.zona) ?? []), e]); });
const PREFERENCIA = 'devin-sin-avanzados';
// Del paso a al b se cambia de bloque (desde la apertura, que ya es la vista general, no cuenta).
const cambiaDeBloque = (a, b) => PASOS[a].escena.region !== 'general' && PASOS[a].escena.region !== PASOS[b].escena.region;
const LIMPIAR = { clearProps: 'opacity,visibility,transform' };

export function crearNavegacion({ mundo, camara, alCambiar = () => {} }) {
  const { escenas, hub, circuito, tapas, anuncio } = mundo;
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

  // La parada del circuito en el paso i: la de la escena que se ve en su pantalla, si ya se ha llegado a ella.
  const paradaEn = i => {
    const lista = POR_ZONA.get(CIRCUITO.zona), ie = PASOS[i].ie, vista = vistaEn(lista, ie);
    return indice(vista) <= ie ? lista.indexOf(vista) : null;
  };

  const ponerVisibles = i => {
    const p = PASOS[i];
    // Solo la escena actual está en el árbol de accesibilidad; las demás, inert. La escena que deja
    // de ser la actual (o vuelve a serlo) se entera: así para lo que se mueve sin fin (activa).
    for (const x of escenas.values()) {
      const esActual = x.indice === p.ie;
      x.raiz.classList.toggle('escena--actual', esActual);
      x.raiz.inert = !esActual;
      if (x.activa !== esActual) { x.activa = esActual; x.ctrl.activa?.(esActual); }
    }
    // El hub y el circuito, igual: solo están en el árbol de accesibilidad con su pantalla en cámara.
    hub.raiz.inert = p.escena.zona !== 'hub';
    circuito.raiz.inert = p.escena.zona !== CIRCUITO.zona;
    for (const lista of POR_ZONA.values()) {
      const vista = vistaEn(lista, p.ie);
      for (const e of lista) escenas.get(e.id).raiz.classList.toggle('oculto', e !== vista);
    }
  };

  // Lo que oye el lector de pantalla al cambiar de paso: escena, paso y qué se ve, en texto plano.
  const anunciar = i => {
    const p = PASOS[i];
    anuncio.textContent = `${p.escena.titulo}. Paso ${p.n} de ${p.escena.pasos.length}. ${plano(primeraFrase(p.texto))}`;
  };

  function ir(i, { animar = false } = {}) {
    terminar();
    // En modo estático, cada paso llega a su estado al instante, por la misma vía que al saltar.
    if (esEstatico()) animar = false;
    const p = PASOS[i], antes = PASOS[actual];
    const destino = camara.vistaDe(p);
    general = false;
    if (!animar) {
      ponerEscenas(i, false);
      hub.pintar(piezasHasta(i), { ventana: ventanaEn(i), base: i >= HUB_DESDE });
      hub.centrar(centradoEn(i));
      circuito.pintar(paradaEn(i));
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
      // Contexto cambia de forma a la vista si se queda en el hub; si se sale, conserva su forma
      // mientras vuela la cámara y la cambia al final, fuera de cámara.
      const cambiaForma = ventanaEn(i) !== ventanaEn(actual);
      const transforma = enHub && cambiaForma;
      const aparece = actual < HUB_DESDE && i >= HUB_DESDE;
      hub.pintar(piezas, { ventana: ventanaEn(actual), base: actual >= HUB_DESDE });
      tapas.pintar(abiertas);
      // El hub cambia de sitio (centrado o a la izquierda) sin que se vea: si se entra en su pantalla,
      // antes del vuelo; si se sale, al final, con la cámara ya en la otra.
      const recoloca = centradoEn(i) !== centradoEn(actual);
      hub.centrar(centradoEn(enHub ? i : actual));

      const tl = gsap.timeline();
      const vuela = camara.volar(tl, destino);
      const finVuelo = tl.duration();
      if (recoloca && !enHub) tl.add(() => hub.centrar(centradoEn(i)), finVuelo);
      // Misma pantalla y otra escena: la anterior se va y la nueva aparece en su sitio.
      const lista = POR_ZONA.get(p.escena.zona);
      const previa = lista && vistaEn(lista, antes.ie);
      const cambia = !vuela && lista && previa !== p.escena;
      if (!cambia) ponerVisibles(i);
      if (vuela && !esEstatico()) tl.to({}, { duration: s('--pausa-tras-camara') });
      // La tapa se funde mientras la cámara se acerca: desde TAPAS.fundido del vuelo hasta que llega,
      // con la curva de la cámara; su icono y su título, antes, desde TAPAS.fundidoContenido, para que
      // no crucen el título de la escena. Sin vuelo, se levanta como cualquier salida.
      if (abre) {
        const desde = finVuelo * TAPAS.fundido, contenido = finVuelo * TAPAS.fundidoContenido;
        if (vuela) tapas.abrir(region, tl, desde, { duration: finVuelo - desde, ease: v('--ease-camara') }, { posicion: contenido, duration: desde - contenido });
        else tapas.abrir(region, tl);
      }
      // El contrato anima desde el paso anterior: si se ha saltado un [A], primero se pone ese estado.
      if (x.estado !== p.n - 1) x.ctrl.irA(p.n - 1, { animar: false });
      if (cambia) {
        // En el circuito, el punto va de una parada a la otra mientras cambia el contenido.
        const salir = escenas.get(previa.id).raiz;
        tl.desaparecer(salir)
          .add(() => ponerVisibles(i))
          .set(salir, LIMPIAR);
        if (p.escena.zona === CIRCUITO.zona) circuito.mover(tl, paradaEn(actual), paradaEn(i));
        tl.aparecer(x.raiz)
          .set(x.raiz, LIMPIAR);
      } else circuito.pintar(paradaEn(i));
      // El hub aparece (Devin, sus herramientas y los huecos), con su tapa ya levantada.
      if (aparece) hub.entrar(tl);
      // La pieza que entra en el hub, antes que el paso: el paso cuenta con ella (el bucle gira, el plugin se etiqueta…).
      if (p.hub && enHub) hub.llegar(p.hub, tl);
      if (transforma) hub.transformar(tl, ventanaEn(i));
      else if (cambiaForma) tl.add(() => hub.pintar(piezasHasta(i), { ventana: ventanaEn(i) }));
      x.ctrl.irA(p.n, { animar: true, tl });
      x.estado = p.n;
      // En modo estático, todo corta: también las coreografías propias de las escenas.
      if (esEstatico()) tl.progress(1);
      animacion = tl;
    }
    actual = i;
    history.replaceState(null, '', `#${p.ref}`);
    anunciar(i);
    alCambiar();
  }

  const nav = {
    get actual() { return PASOS[actual]; },
    get general() { return general; },
    get conAvanzados() { return conAvanzados; },
    get animando() { return Boolean(animacion && animacion.duration() > 0 && animacion.progress() < 1); },
    /** La próxima pulsación lleva a la vista general: es el último paso de un bloque. */
    get haciaGeneral() {
      const i = buscar(actual, 1);
      return i != null && !general && cambiaDeBloque(actual, i);
    },

    avanzar() {
      // Si el paso aún se anima, esta pulsación solo lo termina; la siguiente avanza.
      if (nav.animando) {
        terminar();
        return void alCambiar();
      }
      const i = buscar(actual, 1);
      if (i == null) return;
      // Último paso de un bloque: primero, la vista general; desde ella, la siguiente pulsación entra en el nuevo.
      if (nav.haciaGeneral) return void nav.alternarGeneral();
      ir(i, { animar: true });
    },
    retroceder() {
      // Desde la vista general se vuelve, sin animar, al paso en que se estaba.
      if (general) return void ir(actual);
      const i = buscar(actual, -1);
      if (i != null) ir(i);
    },
    irA: ref => {
      const i = indiceDe(ref);
      if (i >= 0) ir(i);
      return i >= 0;
    },
    /** Ir a las preguntas, por si falta tiempo: animando, como si se avanzara hasta ellas. */
    irAlFinal() {
      if (actual < FINAL) ir(FINAL, { animar: true });
    },

    /** Vista general del mapa, y volver al paso. Las tapas de los bloques aún no visitados siguen puestas. */
    alternarGeneral() {
      terminar();
      const tl = gsap.timeline();
      general = !general;
      camara.volar(tl, general ? camara.general() : camara.vistaDe(PASOS[actual]));
      animacion = tl;
      if (general) anuncio.textContent = 'Vista general del mapa.';
      else anunciar(actual);
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
