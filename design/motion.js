// Movimiento · Charla «Devin en el día a día» · Openbank
// El único módulo que lee las variables de movimiento de design-system.css.
// Importa design-system.css antes que este módulo.
//
// Contrato de los efectos (design-system.html, sección «Uso en código»):
// - Se registran con gsap.registerEffect y extendTimeline: true, así que se usan
//   igual sueltos (gsap.effects.aparecer(…)) que en un timeline (tl.aparecer(…, pos)).
// - Sus valores por defecto se leen de las variables cada vez que se llaman: un
//   cambio en design-system.css llega a todos sin tocar código. Las opciones que
//   se pasen ganan, pero nunca son duraciones ni curvas literales: se pasan con s()/v().
// - Devuelven el tween o timeline, y animan solo dentro de su zona: ningún efecto
//   mueve la cámara, salvo volarCamara, que es la cámara.
// - En modo estático (?estatico, prefers-reduced-motion o data-movimiento="estatico"
//   en <html>) duran 0: saltan a su estado final.
import { gsap } from 'gsap';
import { interpolateZoom } from 'd3-interpolate';

const raiz = document.documentElement;

/** Valor de una variable, en texto: v('--ease-aparicion') → 'power3.out'. */
export const v = (nombre, el = raiz) => getComputedStyle(el).getPropertyValue(nombre).trim();

/** Variable de tiempo en segundos: s('--dur-entrada') → 0.5. */
export const s = (nombre, el = raiz) => {
  const texto = v(nombre, el);
  return texto.endsWith('ms') ? parseFloat(texto) / 1000 : parseFloat(texto);
};

/** Variable de distancia en px, como número: px('--esp-3') → 24. */
export const px = (nombre, el = raiz) => parseFloat(v(nombre, el));

/** Modo estático: cortes en lugar de animaciones. */
export const esEstatico = () =>
  raiz.dataset.movimiento === 'estatico' ||
  new URLSearchParams(location.search).has('estatico') ||
  matchMedia('(prefers-reduced-motion: reduce)').matches;

// Los cambios de clase van con tl.set(…, { attr: { class } }): así un timeline se puede
// rebobinar o saltar hacia atrás sin dejar estados colgados.
const conClase = (el, clase, poner) =>
  [...(el.getAttribute('class') ?? '').split(/\s+/).filter(x => x && x !== clase), ...(poner ? [clase] : [])].join(' ');

// Opciones de tiempo que se anulan en modo estático (repeat también: sin bucles).
const TIEMPO = /^(duration|stagger|delay|repeat|dur[A-Z]\w*)$/;

function registrar(name, efecto, porDefecto) {
  gsap.registerEffect({
    name,
    extendTimeline: true,
    effect: (targets, opciones) => {
      const c = { ...porDefecto(), ...opciones };
      if (esEstatico()) for (const k of Object.keys(c)) if (TIEMPO.test(k)) c[k] = 0;
      return efecto(targets, c);
    },
  });
}

// ── Aparecer y desaparecer ────────────────────────────────────────────────

/** Entra desde abajo y se hace visible. Fichas: stagger s('--escalonado-tokens'). */
registrar('aparecer', (t, c) =>
  gsap.fromTo(t, { autoAlpha: 0, y: c.distancia },
    { autoAlpha: 1, y: 0, duration: c.duration, ease: c.ease, stagger: c.stagger }),
() => ({ duration: s('--dur-entrada'), ease: v('--ease-aparicion'), stagger: s('--escalonado'), distancia: px('--esp-3') }));

/** Se desvanece. */
registrar('desaparecer', (t, c) =>
  gsap.to(t, { autoAlpha: 0, duration: c.duration, ease: c.ease, stagger: c.stagger }),
() => ({ duration: s('--dur-salida'), ease: v('--ease-salida'), stagger: 0 }));

/** Elemento de interfaz que entra con muelle: agente, skill, tarjetas, resaltado. */
registrar('entrarConMuelle', (t, c) =>
  gsap.fromTo(t, { autoAlpha: 0, scale: c.escala },
    { autoAlpha: 1, scale: 1, duration: c.duration, ease: c.ease, stagger: c.stagger }),
() => ({ duration: s('--dur-entrada'), ease: v('--ease-interfaz'), stagger: s('--escalonado'), escala: 0.8 }));

/** Pasa a segundo plano: opacidad --opacidad-atenuado. */
registrar('atenuar', (t, c) =>
  gsap.to(t, { opacity: c.opacidad, duration: c.duration, ease: c.ease }),
() => ({ duration: s('--dur-micro'), ease: v('--ease-estado'), opacidad: parseFloat(v('--opacidad-atenuado')) }));

/** Vuelve a primer plano lo atenuado. */
registrar('avivar', (t, c) =>
  gsap.to(t, { opacity: 1, duration: c.duration, ease: c.ease }),
() => ({ duration: s('--dur-micro'), ease: v('--ease-estado') }));

// ── Tokens y contexto ─────────────────────────────────────────────────────

/** Una ficha o un documento entra en la ventana de contexto: cae desde arriba hasta su sitio. */
registrar('entrarEnVentana', (t, c) =>
  gsap.fromTo(t, { autoAlpha: 0, y: -c.altura },
    { autoAlpha: 1, y: 0, duration: c.duration, ease: c.ease, stagger: c.stagger }),
() => ({ duration: s('--dur-entrada'), ease: v('--ease-caida'), stagger: s('--escalonado-tokens'), altura: px('--esp-8') }));

/**
 * La ventana se llena: sus capas aparecen de izquierda a derecha, una tras otra, sin deformar su
 * texto. Con «immediateRender: false», no se recortan hasta que empiezan: para capas que aún se
 * ven y vuelven a llenarse más tarde en el mismo timeline (rebobinar y seguir).
 */
registrar('llenarVentana', (t, c) =>
  gsap.fromTo(t, { clipPath: 'inset(0% 100% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: c.duration, ease: c.ease, stagger: c.stagger, immediateRender: c.immediateRender, clearProps: 'clipPath' }),
() => ({ duration: s('--dur-entrada'), ease: v('--ease-llenado'), stagger: s('--escalonado-capas'), immediateRender: true }));

/** La ventana se vacía: sus capas se recogen hacia la izquierda, de la última a la primera (compactar, empezar de nuevo). */
registrar('vaciarVentana', (t, c) =>
  gsap.fromTo(t, { clipPath: 'inset(0% 0% 0% 0%)' },
    { clipPath: 'inset(0% 100% 0% 0%)', duration: c.duration, ease: c.ease, stagger: { each: c.stagger, from: 'end' } }),
() => ({ duration: s('--dur-salida'), ease: v('--ease-salida'), stagger: s('--escalonado-capas') }));

/** La línea de nivel de la ventana se desplaza en horizontal hasta x px (relativos a su sitio en el dibujo). */
registrar('moverNivel', (t, c) =>
  gsap.to(t, { x: c.x, duration: c.duration, ease: c.ease }),
() => ({ duration: s('--dur-entrada'), ease: v('--ease-aparicion'), x: 0 }));

/**
 * Lo ocupado de la ventana crece o se recoge hasta un borde nuevo (continuar, compactar, empezar
 * de nuevo): el relleno se recorta por la derecha y la línea de nivel va pegada a su borde, con su
 * cifra cambiando a la vez. targets: el relleno. de y a: el borde, en px desde el principio del
 * relleno. nivel: la línea, dibujada al principio del relleno (se desplaza en x hasta el borde).
 * cifra: el elemento con su porcentaje, de «desde» a «hasta».
 */
registrar('ajustarVentana', (t, c) => {
  const relleno = gsap.utils.toArray(t)[0];
  const corte = x => `inset(0px ${relleno.offsetWidth - x}px 0px 0px)`;
  // Sin render inmediato: parte de «de» cuando empieza, no al montarse el timeline.
  const tiempo = { duration: c.duration, ease: c.ease, immediateRender: false };
  const tl = gsap.timeline().fromTo(relleno, { clipPath: corte(c.de) }, { clipPath: corte(c.a), ...tiempo }, 0);
  if (c.nivel) tl.fromTo(c.nivel, { x: c.de }, { x: c.a, ...tiempo }, 0);
  if (c.cifra) tl.subirContador(c.cifra, { desde: c.desde, hasta: c.hasta, sufijo: c.sufijo, duration: c.duration, ease: c.ease }, 0);
  return tl;
}, () => ({ duration: s('--dur-ajustar'), ease: v('--ease-ajustar'), de: 0, a: 0, sufijo: ' %' }));

/** El modelo relee el contexto: la línea de lectura recorre lo ocupado de la ventana hasta x px y se apaga. */
registrar('releerVentana', (t, c) =>
  gsap.timeline()
    .fromTo(t, { autoAlpha: 1, x: 0 }, { x: c.hasta, duration: c.duration, ease: c.ease })
    .to(t, { autoAlpha: 0, duration: c.durSalida, ease: c.easeSalida }),
() => ({ duration: s('--dur-trazado'), ease: v('--ease-trazado'), durSalida: s('--dur-salida'), easeSalida: v('--ease-salida'), hasta: 0 }));

/** El corchete de caché se alarga desde la izquierda bajo (o sobre) el principio de la ventana que cubre. */
registrar('alargarCorchete', (t, c) =>
  gsap.fromTo(t, { clipPath: 'inset(-50% 100% -50% 0%)' },
    { clipPath: 'inset(-50% 0% -50% 0%)', duration: c.duration, ease: c.ease, clearProps: 'clipPath' }),
() => ({ duration: s('--dur-entrada'), ease: v('--ease-aparicion') }));

/** La caché caduca: el corchete (y su etiqueta) pasan a su variante --fallo. */
registrar('caducarCache', (t, c) => {
  const els = gsap.utils.toArray(t);
  return gsap.timeline()
    .to(els, { autoAlpha: 0, duration: c.duration, ease: c.ease })
    .set(els, { attr: { class: (i, el) => conClase(el, `${el.classList[0]}--fallo`, true) } })
    .to(els, { autoAlpha: 1, duration: c.duration, ease: c.ease });
}, () => ({ duration: s('--dur-micro'), ease: v('--ease-estado') }));

/**
 * Lo que se relee de caché pesa poco: sus capas toman el color de la caché y se encogen hasta su
 * coste. Con «cacheadas: false» (la caché caduca), vuelven a ser de entrada y a su ancho; las capas
 * de detrás se desplazan con ellas. ancho: px de cada capa al terminar (número o función (i, capa)).
 */
registrar('cachearCapas', (t, c) => {
  const capas = gsap.utils.toArray(t);
  const [de, a] = c.cacheadas ? ['--color-entrada', '--color-cacheado'] : ['--color-cacheado', '--color-entrada'];
  return gsap.timeline()
    .fromTo(capas, { backgroundColor: v(de) },
      { backgroundColor: v(a), ...(c.ancho != null && { width: c.ancho }), duration: c.duration, ease: c.ease, immediateRender: false })
    .set(capas, { attr: { class: (i, el) => conClase(el, 'capa--cacheada', c.cacheadas) } })
    .set(capas, { clearProps: 'backgroundColor' });
}, () => ({ duration: s('--dur-ajustar'), ease: v('--ease-ajustar'), cacheadas: true }));

/** Una cifra sube hasta «hasta», con formato español y dígitos tabulares. */
registrar('subirContador', (t, c) => {
  const formato = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: c.decimales, maximumFractionDigits: c.decimales, useGrouping: 'always',
  });
  const tl = gsap.timeline();
  gsap.utils.toArray(t).forEach(el => {
    const n = { valor: c.desde ?? (parseFloat(el.textContent.replace(/\./g, '').replace(',', '.')) || 0) };
    tl.to(n, {
      valor: c.hasta, duration: c.duration, ease: c.ease,
      onUpdate: () => { el.textContent = formato.format(n.valor) + c.sufijo; },
    }, 0);
  });
  return tl;
}, () => ({ duration: s('--dur-contador'), ease: v('--ease-contador'), decimales: 0, sufijo: '', hasta: 0 }));

// ── Piezas del agente ─────────────────────────────────────────────────────

/** Una herramienta se usa: pulso breve. */
registrar('pulsar', (t, c) =>
  gsap.timeline()
    .to(t, { scale: c.escala, duration: c.duration, ease: c.ease })
    .to(t, { scale: 1, duration: c.duration, ease: c.ease }),
() => ({ duration: s('--dur-micro'), ease: v('--ease-estado'), escala: 1.12 }));

/** Se da la vuelta en plano (sin 3D): se encoge, alterna la clase «volteado» y se abre. */
registrar('voltear', (t, c) => {
  const els = gsap.utils.toArray(t);
  return gsap.timeline()
    .to(els, { scaleX: 0, duration: c.durSalida, ease: v('--ease-salida') })
    .set(els, { attr: { class: (i, el) => conClase(el, 'volteado', !el.classList.contains('volteado')) } })
    .to(els, { scaleX: 1, duration: c.duration, ease: c.ease });
}, () => ({ duration: s('--dur-entrada'), durSalida: s('--dur-salida'), ease: v('--ease-aparicion') }));

/** Una skill plegada se despliega: pierde «skill--plegada» y su anatomía crece hasta su alto natural. */
registrar('desplegar', (t, c) => {
  const tl = gsap.timeline();
  gsap.utils.toArray(t).forEach(skill => {
    // La clase cambia en cuanto el tween avanza y vuelve al rebobinar a 0 (un set en 0 no volvería).
    tl.fromTo(skill, { attr: { class: (i, el) => el.getAttribute('class') } },
      { attr: { class: (i, el) => conClase(el, 'skill--plegada', false) }, duration: c.duration, immediateRender: false }, 0)
      .fromTo(skill.querySelector('.skill__anatomia'), { height: 0, autoAlpha: 0, overflow: 'hidden' },
        { height: 'auto', autoAlpha: 1, duration: c.duration, ease: c.ease, immediateRender: false, clearProps: 'height,overflow' }, 0);
  });
  return tl;
}, () => ({ duration: s('--dur-entrada'), ease: v('--ease-interfaz') }));

// ── Trazados, recorridos y tiempo ─────────────────────────────────────────

/**
 * Una captura se amplía hasta la zona que se explica (o vuelve a verse entera): su lienzo escala
 * y se desplaza dentro del marco. Opciones: escala y x, y (px del marco, con origen arriba a la izquierda).
 */
registrar('ampliarCaptura', (t, c) =>
  gsap.to(t, { scale: c.escala, x: c.x, y: c.y, transformOrigin: '0 0', duration: c.duration, ease: c.ease }),
() => ({ duration: s('--dur-ampliar'), ease: v('--ease-ampliar'), escala: 1, x: 0, y: 0 }));

/**
 * Una pieza cambia de forma (el círculo de Contexto pasa a ser la ventana de contexto, y vuelta):
 * su caja se estira o se encoge hasta la indicada (desplazamiento y tamaño, en px) y toma los
 * colores de fondo y borde indicados, leídos de las variables. Su contenido se va antes de
 * cambiar o, si se pide, vuelve después.
 */
registrar('transformar', (t, c) => {
  const el = gsap.utils.toArray(t)[0];
  const tl = gsap.timeline();
  if (!c.contenido) tl.to(el.children, { autoAlpha: 0, duration: c.durSalida, ease: v('--ease-salida') });
  tl.to(el, { ...c.caja, backgroundColor: c.fondo, borderColor: c.borde, duration: c.duration, ease: c.ease });
  if (c.contenido) tl.to(el.children, { autoAlpha: 1, duration: c.durSalida, ease: v('--ease-aparicion') });
  return tl;
}, () => ({ duration: s('--dur-entrada'), durSalida: s('--dur-salida'), ease: v('--ease-aparicion'), contenido: false }));

/** Una línea SVG se dibuja. Las continuas, a lo largo; las discontinuas, de izquierda a derecha. */
registrar('trazar', (t, c) => {
  const tl = gsap.timeline();
  gsap.utils.toArray(t).forEach((el, i) => {
    const posicion = i * c.stagger;
    if (getComputedStyle(el).strokeDasharray === 'none') {
      const largo = el.getTotalLength();
      tl.fromTo(el, { strokeDasharray: largo, strokeDashoffset: largo },
        { strokeDashoffset: 0, duration: c.duration, ease: c.ease, clearProps: 'strokeDasharray,strokeDashoffset' }, posicion);
    } else {
      tl.fromTo(el, { clipPath: 'inset(-50% 100% -50% -50%)' },
        { clipPath: 'inset(-50% -50% -50% -50%)', duration: c.duration, ease: c.ease, clearProps: 'clipPath' }, posicion);
    }
  });
  return tl;
}, () => ({ duration: s('--dur-trazado'), ease: v('--ease-trazado'), stagger: s('--escalonado') }));

/** Un punto (círculo SVG) recorre un camino SVG desde la fracción «desde» hasta «hasta». */
registrar('recorrerCamino', (t, c) => {
  const camino = typeof c.camino === 'string' ? document.querySelector(c.camino) : c.camino;
  const largo = camino.getTotalLength();
  const avance = { f: c.desde };
  const colocar = () => {
    const p = camino.getPointAtLength(((avance.f % 1) + 1) % 1 * largo);
    gsap.set(t, { attr: { cx: p.x, cy: p.y } });
  };
  return gsap.to(avance, { f: c.hasta, duration: c.duration, ease: c.ease, repeat: c.repeat, onStart: colocar, onUpdate: colocar });
}, () => ({ duration: s('--dur-trazado'), ease: v('--ease-trazado'), desde: 0, hasta: 1, repeat: 0 }));

/** La aguja del dial de effort gira hasta la posición indicada (0 = la primera). */
registrar('girarDial', (t, c) => {
  const dial = gsap.utils.toArray(t)[0];
  const aguja = dial.querySelector('.dial__aguja');
  const etiquetas = dial.querySelectorAll('.dial__etiqueta');
  const angulo = -90 + (180 * c.posicion) / (etiquetas.length - 1);
  return gsap.timeline()
    .to(aguja, { rotation: angulo, svgOrigin: dial.dataset.centro, duration: c.duration, ease: c.ease })
    .set(etiquetas, { attr: { class: (i, el) => conClase(el, 'dial__etiqueta--actual', i === c.posicion) } });
}, () => ({ duration: s('--dur-entrada'), ease: v('--ease-interfaz'), posicion: 0 }));

/** El temporizador se agota: el anillo se vacía y el tiempo baja hasta 0:00. */
registrar('agotarTemporizador', (t, c) => {
  const temporizador = gsap.utils.toArray(t)[0];
  const anillo = temporizador.querySelector('.temporizador__progreso');
  const tiempo = temporizador.querySelector('.temporizador__tiempo');
  const vuelta = anillo.getTotalLength();
  const resto = { segundos: c.segundos };
  const pintar = () => {
    const total = Math.ceil(resto.segundos);
    tiempo.textContent = `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  };
  return gsap.timeline()
    .fromTo(anillo, { strokeDasharray: vuelta, strokeDashoffset: 0 },
      { strokeDashoffset: vuelta, duration: c.duration, ease: c.ease }, 0)
    .to(resto, { segundos: 0, duration: c.duration, ease: c.ease, onUpdate: pintar }, 0)
    .set(temporizador, { attr: { class: (i, el) => conClase(el, 'temporizador--agotado', true) } });
}, () => ({ duration: s('--dur-temporizador'), ease: v('--ease-temporizador'), segundos: 300 }));

/**
 * Gira sin parar, despacio y a ritmo constante: el anillo de la repetición (una tarea que se
 * repite sola). Devuelve el tween, que se para con kill(). En modo estático no gira.
 */
registrar('girar', (t, c) =>
  gsap.to(t, { rotation: '+=360', duration: c.duration, ease: c.ease, repeat: c.repeat }),
() => ({ duration: s('--dur-repeticion'), ease: v('--ease-repeticion'), repeat: -1 }));

// ── Cámara ────────────────────────────────────────────────────────────────

/**
 * La cámara vuela entre dos vistas del mundo, cada una [centro x, centro y, ancho visible].
 * Entre zonas sigue la trayectoria «alejar, viajar, acercar» (d3.interpolateZoom); dentro
 * de una zona, línea recta. Escribe translate y scale en el mundo (con transform-origin 0 0),
 * redondea la traslación y solo pone will-change mientras vuela, así el texto llega nítido.
 * Opciones: desde, hasta, pantalla ([ancho, alto] del escenario en px, o una función que los
 * devuelve: así un cambio de tamaño a mitad de vuelo se respeta) y trayectoria ('zoom' o 'recta').
 */
registrar('volarCamara', (t, c) => {
  const mundo = gsap.utils.toArray(t)[0];
  const [a, b] = [c.desde, c.hasta];
  const ruta = c.trayectoria === 'zoom' ? interpolateZoom(a, b)
    // En línea recta, el ancho cambia en proporción (escala logarítmica), como un zoom real.
    : u => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] * (b[2] / a[2]) ** u];
  const pintar = ([x, y, ancho]) => {
    const [w, h] = typeof c.pantalla === 'function' ? c.pantalla() : c.pantalla;
    const k = w / ancho;
    mundo.style.transform = `translate(${Math.round(w / 2 - x * k)}px, ${Math.round(h / 2 - y * k)}px) scale(${k})`;
  };
  const avance = { u: 0 };
  return gsap.to(avance, {
    u: 1, duration: c.duration, ease: c.ease,
    // will-change se pone en cada fotograma (también si se rebobina) y se quita al llegar a cualquiera de los dos extremos.
    onUpdate: () => { mundo.style.willChange = 'transform'; pintar(avance.u === 1 ? b : ruta(avance.u)); },
    onComplete: () => { pintar(b); mundo.style.willChange = 'auto'; },
    onReverseComplete: () => { pintar(a); mundo.style.willChange = 'auto'; },
  });
}, () => ({ duration: s('--dur-camara'), ease: v('--ease-camara'), trayectoria: 'zoom' }));
