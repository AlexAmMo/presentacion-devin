// Piezas comunes de las escenas reales.
// - Las escenas no van dentro de una isla: dibujan directamente sobre el fondo del mapa,
//   dentro de la zona segura (--margen-x, --margen-y). La pantalla la marca la cámara.
// - Todas empiezan igual: arriba a la izquierda, dónde estamos (etiqueta con el icono de la
//   zona y el título de la escena) y, debajo, su mensaje como título.
// - Posiciones y tamaños en px de 1920×1080 (composición); el aspecto, de componentes.css.
// - Los pasos se declaran en el marcado (data-paso y compañía, abajo) y crearPasos los pone
//   al instante o los anima: cada escena solo programa a mano lo que es propio de ella.
import { gsap } from 'gsap';
import { s, v, esEstatico } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { ZONAS } from '../datos/mapa.js';
import { esc, enLinea } from '../texto.js';

// ── Composición ─────────────────────────────────────────────────────────────

/**
 * Atributos de paso para el marcado (ver crearPasos):
 * paso(2) → ' data-paso="2"'; paso(2, { hasta: 4, efecto: 'entrarConMuelle', orden: 1 }).
 */
export const paso = (n, { hasta, atenua, aviva, efecto, salida, orden, clase, avanzado, propio, opciones } = {}) =>
  [
    n != null && ` data-paso="${n}"`, hasta != null && ` data-hasta="${hasta}"`,
    atenua != null && ` data-atenua="${atenua}"`, aviva != null && ` data-aviva="${aviva}"`,
    efecto && ` data-efecto="${efecto}"`, salida && ` data-salida="${salida}"`,
    orden != null && ` data-orden="${orden}"`, clase && ` data-clase="${clase}"`,
    avanzado && ' data-avanzado', propio && ' data-propio',
    opciones && ` data-opciones='${JSON.stringify(opciones)}'`,
  ].filter(Boolean).join('');

/** Pone atributos de paso a elementos ya montados (partes de un SVG de dibujos.js, filas de una tabla…). */
export function marcar(els, n, opciones = {}) {
  const molde = document.createElement('i');
  molde.innerHTML = `<i${paso(n, opciones)}></i>`;
  const atributos = [...molde.firstChild.attributes];
  for (const el of els instanceof Element ? [els] : [...els]) for (const a of atributos) el.setAttribute(a.name, a.value);
}

/**
 * Un elemento colocado en la escena. El cuarto argumento es su estilo extra o, si es un objeto,
 * sus opciones de paso (las de paso()) más «estilo». No pongas transform en el estilo de un
 * elemento con paso: los efectos lo usan y al saltar se limpia. Si hace falta, va en un hijo.
 */
export const en = (x, y, html, opciones = '') => {
  const { estilo = '', ...pasos } = typeof opciones === 'string' ? { estilo: opciones } : opciones;
  const n = pasos.paso;
  delete pasos.paso;
  const clase = pasos.avanzado ? ' class="solo-avanzado"' : '';
  return `<div${clase} style="position:absolute;left:${x}px;top:${y}px;${estilo}"${paso(n, pasos)}>${html}</div>`;
};

/** «El contexto es…» a partir del mensaje de escenas.md: mayúscula inicial y sin punto final. */
const comoTitulo = t => t.charAt(0).toUpperCase() + t.slice(1).replace(/\.$/, '');

/** Dónde estamos y el mensaje de la escena, arriba a la izquierda. Si son dos frases, cada una en su línea. Un título largo que debe caber en una línea usa la clase tipo-titulo-ajustado. */
export const cabecera = (escena, ancho = 900, x = 120, clase = 'tipo-titulo-s') =>
  en(x, 96, `<span class="etiqueta">${icono(ZONAS[escena.zona].icono, 'icono--s')}${esc(escena.titulo)}</span>`) +
  en(x, 168, `<h2 class="${clase}" style="margin:0">${enLinea(comoTitulo(escena.mensaje)).replace(/\. (?=[A-ZÁÉÍÓÚ¿¡«])/g, '.<br>')}</h2>`, `width:${ancho}px`);

/** Nota de fuente: «Fuente:» y la referencia en mono. */
export const fuente = referencia => `<div class="fuente">Fuente:<span class="fuente__referencia">${esc(referencia)}</span></div>`;

/** Una petición al agente, en mono, con su cabecera (el documento a la altura de su texto). */
export const peticion = (titulo, texto, ancho = 760) =>
  `<div class="documento" style="width:${ancho}px;height:auto;box-sizing:border-box"><div class="documento__cabecera">${icono('message-square', 'icono--s')}${esc(titulo)}</div>
    <div class="documento__cuerpo"><p class="tipo-mono-s" style="margin:0;line-height:var(--interlineado-texto)">${texto}</p></div></div>`;

/** Tarjeta de consejo. */
export const consejo = (texto, extra = '') =>
  `<div class="consejo"${extra}>${icono('lightbulb')}<span class="consejo__rotulo">Consejo</span><span class="consejo__texto">${enLinea(texto)}</span></div>`;

/** 12000 → «12.000». */
export const miles = n => n.toLocaleString('es-ES', { useGrouping: 'always' });

/** 0.058 → «0,058» (decimales fijos). */
export const decimal = (n, decimales) =>
  n.toLocaleString('es-ES', { minimumFractionDigits: decimales, maximumFractionDigits: decimales, useGrouping: 'always' });

// ── Pasos ───────────────────────────────────────────────────────────────────

/** Pausa de lectura dentro de un paso (--pausa-lectura-corta, --pausa-lectura…). En modo estático, nada. */
export const pausa = (tl, nombre = '--pausa-lectura-corta') => (esEstatico() ? tl : tl.to({}, { duration: s(nombre) }));

/** Añade a tl, seguidas, las animaciones dadas (timelines de grupos): cada una empieza
 *  --escalonado-solape antes de que acabe la anterior, sin pausas. Las vacías no cuentan. */
export function encadenar(tl, animaciones) {
  animaciones.filter(a => a.duration() > 0).forEach((a, i) => tl.add(a, i ? `-=${s('--escalonado-solape')}` : undefined));
  return tl;
}
//
// Cada elemento dice en el marcado cuándo cambia (todas opcionales):
// - data-paso="N": aparece en el paso N; antes, oculto.
// - data-hasta="M": se va en el paso M; desde entonces, oculto.
// - data-atenua="K" (y data-aviva="L"): atenuado desde el paso K (hasta el L).
// - data-clase="K clase": desde el paso K lleva esa clase (cambio de estado al instante).
// - data-efecto: cómo entra (por defecto aparecer; también entrarConMuelle, entrarEnVentana,
//   llenarVentana, trazar…); data-salida: cómo se va (por defecto desaparecer; vaciarVentana…).
//   data-opciones='{"distancia":0}': opciones del efecto, en JSON. Una duración o una curva, solo
//   leída de su variable al montar (duration: s('--dur-trazado-serie'), como en E03 y E05); nunca literal.
// - data-orden="1": dentro de un paso, los grupos entran uno tras otro, de menor a mayor
//   (por defecto 0). La escena puede animar cada grupo por separado e intercalar lo suyo.
//   Lo que se atenúa, se aviva o cambia de clase lo hace con su grupo (el de su data-orden).
// - data-propio: la escena lo anima a mano; crearPasos solo lo pone al saltar.
// - data-avanzado (o la clase solo-avanzado): es de un paso [A]; se oculta si se saltan.
// Así, irA(n, { animar: false }) y la animación del paso salen del mismo sitio.

const SELECTOR = '[data-paso],[data-hasta],[data-atenua],[data-clase]';
// Efectos que ya hacen visible lo que animan; a los demás se les da visibilidad antes.
const VISIBLES = new Set(['aparecer', 'entrarConMuelle', 'entrarEnVentana']);
const LIMPIAR = 'opacity,visibility,transform,clipPath,strokeDasharray,strokeDashoffset';
const num = (el, k) => (el.dataset[k] == null ? null : Number(el.dataset[k]));
const visibleEn = (el, n) => (num(el, 'paso') ?? 0) <= n && n < (num(el, 'hasta') ?? Infinity);
const atenuadoEn = (el, n) => el.dataset.atenua != null && num(el, 'atenua') <= n && n < (num(el, 'aviva') ?? Infinity);
const claseDe = el => {
  const [desde, ...nombre] = (el.dataset.clase ?? '').split(' ');
  return { desde: Number(desde), nombre: nombre.join(' ') };
};
const conClase = (el, clase, poner) =>
  [...(el.getAttribute('class') ?? '').split(/\s+/).filter(x => x && x !== clase), ...(poner ? [clase] : [])].join(' ');
const ordenDe = el => num(el, 'orden') ?? 0;
const opcionesDe = els => JSON.parse(els.find(el => el.dataset.opciones)?.dataset.opciones ?? '{}');

/**
 * Los pasos declarados en el marcado de una escena. Devuelve:
 * - poner(n): al instante, el estado del paso n (en cualquier orden: saltar, retroceder, recargar).
 * - animar(n, tl, { orden }): añade a tl el cambio del paso n − 1 al n. Por cada grupo, en orden:
 *   se va lo que acaba y después entra lo nuevo, con su efecto, a la vez que se atenúa o aviva
 *   lo que toca y cambian las clases. Con «orden», solo ese grupo.
 * - ordenes(n): los grupos del paso n, de menor a mayor.
 * - salir(n, tl): se va de una vez todo lo que acaba en el paso n, sea cual sea su grupo (cambio
 *   de fase dentro de una pantalla); después, animar(n, tl, { orden, sinSalidas: true }) por grupos.
 */
export function crearPasos(raiz) {
  const todos = () => [...raiz.querySelectorAll(SELECTOR)];
  const conPasoDe = el => el.dataset.paso != null || el.dataset.hasta != null;

  const entrar = (tl, grupo, pos) => {
    const efectos = [...new Set(grupo.map(el => el.dataset.efecto ?? 'aparecer'))];
    efectos.forEach((efecto, i) => {
      const objetivos = grupo.filter(el => (el.dataset.efecto ?? 'aparecer') === efecto);
      const donde = i ? '<' : pos;
      const opciones = opcionesDe(objetivos);
      if (VISIBLES.has(efecto)) tl[efecto](objetivos, opciones, donde);
      else tl.set(objetivos, { autoAlpha: 1 }, donde)[efecto](objetivos, opciones, '<');
    });
  };
  const salir = (tl, grupo, pos) => {
    const efectos = [...new Set(grupo.map(el => el.dataset.salida ?? 'desaparecer'))];
    efectos.forEach((efecto, i) => tl[efecto](grupo.filter(el => (el.dataset.salida ?? 'desaparecer') === efecto), {}, i ? '<' : pos));
  };
  const estados = (tl, lista, n, pos) => {
    if (!lista.length) return;
    const atenuan = lista.filter(el => atenuadoEn(el, n) && !atenuadoEn(el, n - 1));
    const avivan = lista.filter(el => el.dataset.atenua != null && !atenuadoEn(el, n) && atenuadoEn(el, n - 1));
    const cambian = lista.filter(el => el.dataset.clase != null && claseDe(el).desde === n);
    if (atenuan.length) tl.atenuar(atenuan, {}, pos).set(atenuan, { attr: { class: (i, el) => conClase(el, 'atenuado', true) } });
    if (avivan.length) tl.avivar(avivan, {}, pos).set(avivan, { attr: { class: (i, el) => conClase(el, 'atenuado', false) } });
    if (cambian.length) tl.set(cambian, { attr: { class: (i, el) => conClase(el, claseDe(el).nombre, true) } }, pos);
  };

  const pasos = {
    poner(n) {
      for (const el of todos()) {
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: LIMPIAR });
        if (conPasoDe(el) && !visibleEn(el, n)) gsap.set(el, { autoAlpha: 0 });
        if (el.dataset.atenua != null) el.setAttribute('class', conClase(el, 'atenuado', atenuadoEn(el, n)));
        if (el.dataset.clase != null) {
          const { desde, nombre } = claseDe(el);
          el.setAttribute('class', conClase(el, nombre, n >= desde));
        }
      }
    },

    ordenes(n) {
      const cambian = todos().filter(el => el.dataset.propio == null && (num(el, 'paso') === n || num(el, 'hasta') === n));
      const lista = [...new Set(cambian.map(ordenDe))].sort((a, b) => a - b);
      return lista.length ? lista : [0];
    },

    salir(n, tl) {
      const salen = todos().filter(el => el.dataset.propio == null && num(el, 'hasta') === n);
      if (salen.length) salir(tl, salen, tl.duration());
      return tl;
    },

    animar(n, tl, { orden, sinSalidas = false } = {}) {
      // Lo propio no entra ni sale por aquí, pero sí se atenúa o cambia de clase.
      const todosLos = todos();
      const lista = todosLos.filter(el => el.dataset.propio == null);
      const ordenes = pasos.ordenes(n);
      // Lo que se atenúa, se aviva o cambia de clase va con el último grupo que no pase de su orden.
      const grupoDe = el => [...ordenes].reverse().find(o => o <= ordenDe(el)) ?? ordenes[0];
      for (const o of orden != null ? [orden] : ordenes) {
        const deEste = el => ordenDe(el) === o;
        const salen = sinSalidas ? [] : lista.filter(el => num(el, 'hasta') === n && deEste(el));
        const entran = lista.filter(el => num(el, 'paso') === n && visibleEn(el, n) && deEste(el));
        if (salen.length) salir(tl, salen, tl.duration());
        const inicio = tl.duration();
        estados(tl, todosLos.filter(el => grupoDe(el) === o), n, inicio);
        if (entran.length) entrar(tl, entran, inicio);
      }
      return tl;
    },
  };
  return pasos;
}

// ── Gráficas ────────────────────────────────────────────────────────────────

/** Las series de una gráfica (dibujos.js) aparecen en el paso n, con su coreografía (trazarSeries). */
export function marcarSeries(svg, n, porSerie = () => ({})) {
  svg.querySelectorAll('.grafica__serie').forEach((serie, i) => {
    marcar(serie, n, { propio: true, ...porSerie(i) });
    marcar(serie.querySelectorAll(':scope > .grafica__linea, :scope > .grafica__punto:not([data-resalta]), :scope > .grafica__etiqueta:not([data-nota])'), n, { propio: true });
  });
}

// Puntos sin anillo y nombre de una serie (lo que aparece al trazarla).
const PUNTOS_Y_NOMBRE = ':scope > .grafica__punto:not([data-resalta]), :scope > .grafica__etiqueta:not([data-nota])';

/**
 * Las series se trazan seguidas: cada una empieza --escalonado-series después de la anterior (con
 * «escalonado: 0», todas a la vez) y, al acabar su línea, aparecen sus puntos y su nombre.
 * «series»: las que se trazan, por defecto todas las de la gráfica.
 */
export function trazarSeries(tl, svg, { series = svg.querySelectorAll('.grafica__serie'), escalonado = s('--escalonado-series') } = {}) {
  const inicio = tl.duration(), duracion = s('--dur-trazado-serie');
  [...series].forEach((serie, i) => {
    const linea = serie.querySelector('.grafica__linea'), t = inicio + i * escalonado;
    tl.set([serie, linea], { autoAlpha: 1 }, t)
      .trazar(linea, { duration: duracion }, t)
      .aparecer(serie.querySelectorAll(PUNTOS_Y_NOMBRE), { distancia: 0, stagger: s('--escalonado-tokens') }, t + duracion);
  });
  return tl;
}

/**
 * Una serie se traza a su ritmo (--dur-trazado) y cada punto aparece, con su nota, cuando la línea
 * llega a él: se lee que cada punto es un nivel más que el anterior. Al final, su nombre.
 * «inicio»: cuándo empieza en tl (por defecto, al final).
 */
export function trazarPorPuntos(tl, serie, inicio = tl.duration()) {
  const linea = serie.querySelector('.grafica__linea');
  const puntos = [...serie.querySelectorAll(':scope > .grafica__punto[data-punto]')];
  const duracion = s('--dur-trazado'), curva = gsap.parseEase(v('--ease-trazado'));
  // Cuándo llega la línea a una fracción de su largo: la curva, deshecha por bisección.
  const cuando = f => {
    let [a, b] = [0, 1];
    for (let k = 0; k < 24; k++) [a, b] = curva((a + b) / 2) < f ? [(a + b) / 2, b] : [a, (a + b) / 2];
    return inicio + a * duracion;
  };
  const centro = p => [p.cx.baseVal.value, p.cy.baseVal.value];
  const largo = linea.getTotalLength();
  let recorrido = 0;
  tl.set([serie, linea], { autoAlpha: 1 }, inicio).trazar(linea, {}, inicio);
  puntos.forEach((p, i) => {
    if (i) recorrido += Math.hypot(...centro(p).map((c, k) => c - centro(puntos[i - 1])[k]));
    tl.aparecer([p, ...serie.querySelectorAll(`:scope > [data-nota="${i}"]`)], { distancia: 0 }, cuando(recorrido / largo));
  });
  return tl.aparecer(serie.querySelectorAll(':scope > .grafica__etiqueta:not([data-nota])'), { distancia: 0 }, inicio + duracion);
}

/**
 * Controlador de una escena hecha solo con pasos declarados. «propio(n, tl)» añade, si hace
 * falta, la coreografía de la escena después de la común; «alPoner(n)», el estado al saltar.
 */
export function escenaPorPasos({ raiz, montar, propio, alPoner }) {
  let pasos = null;
  return {
    montar() {
      raiz.innerHTML = montar();
      pasos = crearPasos(raiz);
      pasos.poner(0);
      alPoner?.(0);
    },
    irA(n, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(n);
        alPoner?.(n);
        return;
      }
      if (propio) propio(n, tl, pasos);
      else pasos.animar(n, tl);
    },
    desmontar() {
      gsap.killTweensOf(raiz.querySelectorAll('*'));
      raiz.innerHTML = '';
    },
  };
}
