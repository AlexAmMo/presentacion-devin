// E22 · La caché. Comparte pantalla con E20, E21 y E23.
// Dos llamadas seguidas, una sobre otra y a la misma escala: el principio de la segunda es
// idéntico a la primera y el corchete lo cubre. Eso se relee de caché: toma su color y se encoge
// hasta su coste (un 10 % del input); solo lo nuevo se paga completo. A la derecha, el
// temporizador de la caché: si se agota, el corchete pasa a discontinuo con ✕ y lo cacheado
// vuelve a ser de entrada y a su ancho, porque se vuelve a escribir. Abajo, la duración, por verificar.
// Pasos: 1 dos llamadas y lo que se relee de caché · 2 la caché caduca · 3 nota.
import { gsap } from 'gsap';
import { s, v, px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { temporizador } from '../../design/dibujos.js';
import { en, cabecera, crearPasos, pausa } from './comun.js';

// Miles de tokens (como el Anexo A): 20K fijos y 4K de mensaje; en la segunda, además, la salida
// de la primera (1K) y un mensaje nuevo (4K). Las dos primeras capas de la segunda se releen de caché.
const CAPACIDAD = 100;
const PRIMERA = [[20, 'Fijo'], [4]], SEGUNDA = [[20], [4], [1, '', 'salida'], [4]], CACHEADAS = 2;
// Lo que cuesta un token leído de caché respecto a uno de entrada (Anthropic: un 10 %).
const COEFICIENTE = 0.1;
const [VX, VANCHO] = [120, 1300];
const FILAS = [300, 500];   // y de la etiqueta de cada llamada; la ventana, 44 px más abajo

export default function ({ escena, raiz }) {
  let pasos = null;
  const borde = () => px('--trazo-contorno') + px('--esp-1');
  const ancho = n => Math.max(px('--trazo-contorno'), Math.round((n * (VANCHO - 2 * borde())) / CAPACIDAD) - px('--trazo-contorno'));
  // Ancho de cada capa cacheada y del corchete que las cubre: el de sus tokens o, leídas de caché, el de su coste.
  const factor = cacheadas => (cacheadas ? COEFICIENTE : 1);
  const anchoCapa = cacheadas => i => ancho(SEGUNDA[i][0] * factor(cacheadas));
  const anchoCorchete = cacheadas => SEGUNDA.slice(0, CACHEADAS).reduce((a, _, i) => a + anchoCapa(cacheadas)(i), 0) + (CACHEADAS - 1) * px('--trazo-contorno');
  const $ = q => raiz.querySelector(q);
  const cacheadas = () => [...raiz.querySelectorAll('[data-cacheada]')];
  const caducables = () => [$('.corchete'), $('.corchete-etiqueta')];

  // Lo que se relee (paso 1) y la caché caducada (desde el 2). Al animar lo hacen cachearCapas y caducarCache.
  const ponerCache = paso => {
    const leidas = paso === 1, caducada = paso >= 2;
    gsap.killTweensOf([...cacheadas(), ...caducables()]);
    cacheadas().forEach((capa, i) => {
      gsap.set(capa, { width: anchoCapa(leidas)(i), clearProps: 'backgroundColor' });
      capa.classList.toggle('capa--cacheada', leidas);
    });
    gsap.set($('.corchete'), { width: anchoCorchete(leidas) });
    caducables().forEach(el => {
      gsap.set(el, { clearProps: 'opacity,visibility' });
      el.classList.toggle(`${el.classList[0]}--fallo`, caducada);
    });
  };
  // Y el temporizador, agotado (al animar, agotarTemporizador).
  const ponerTemporizador = paso => {
    const reloj = $('.temporizador'), anillo = reloj.querySelector('.temporizador__progreso');
    const agotado = paso >= 2, vuelta = anillo.getTotalLength();
    gsap.killTweensOf(anillo);
    gsap.set(anillo, agotado ? { strokeDasharray: vuelta, strokeDashoffset: vuelta } : { clearProps: 'strokeDasharray,strokeDashoffset' });
    reloj.querySelector('.temporizador__tiempo').textContent = agotado ? '0:00' : '5:00';
    reloj.classList.toggle('temporizador--agotado', agotado);
  };
  // Las capas cacheadas (y el corchete con ellas) pasan a su coste o, al caducar, vuelven a su ancho.
  const cachear = (tl, leidas) => tl
    .cachearCapas(cacheadas(), { cacheadas: leidas, ancho: anchoCapa(leidas) })
    .to($('.corchete'), { width: anchoCorchete(leidas), duration: s('--dur-ajustar'), ease: v('--ease-ajustar') }, '<');

  return {
    montar() {
      const ventana = (capas, atrs, cacheables = 0) => `<div class="ventana" style="width:${VANCHO}px"><div class="ventana__relleno">${capas.map(([n, texto = '', tipo = 'entrada'], i) =>
        `<div class="capa capa--${tipo}" style="width:${ancho(n)}px"${atrs}${i < cacheables ? ' data-cacheada' : ''}>${texto}</div>`).join('')}</div><span class="ventana__capacidad">${CAPACIDAD}K</span></div>`;
      const rotulo = (y, texto, opciones) => en(VX, y, `<p class="tipo-texto-s" style="margin:0;font-weight:var(--peso-enfasis)">${texto}</p>`, opciones);
      const bajo = FILAS[1] + 44 + px('--ventana-alto') + px('--esp-1');

      raiz.innerHTML =
        cabecera(escena, 1680) +
        rotulo(FILAS[0], 'Llamada 1', { paso: 1 }) +
        en(VX, FILAS[0] + 44, ventana(PRIMERA, ' data-paso="1" data-efecto="llenarVentana"'), { paso: 1 }) +
        rotulo(FILAS[1], 'Llamada 2', { paso: 1, hasta: 2, orden: 1 }) +
        rotulo(FILAS[1], 'Llamada 2, tras una pausa de 6 minutos', { paso: 2, orden: 1 }) +
        en(VX, FILAS[1] + 44, ventana(SEGUNDA, ' data-paso="1" data-orden="1" data-efecto="llenarVentana"', CACHEADAS), { paso: 1, orden: 1 }) +
        en(VX + borde(), bajo, `<div class="corchete" style="width:${anchoCorchete(false)}px"></div>`,
          { paso: 1, orden: 2, efecto: 'alargarCorchete' }) +
        en(VX + borde(), bajo + px('--corchete-ancho') + px('--esp-1'), `<div class="corchete-etiqueta">
            ${icono('check', 'icono--s corchete-etiqueta__acierto')}${icono('x', 'icono--s corchete-etiqueta__fallo')}
            <span class="corchete-etiqueta__acierto">Cache read: lo mismo que en la llamada 1</span><span class="corchete-etiqueta__fallo">Caché caducada: todo se vuelve a escribir</span>
            <span class="corchete-etiqueta__detalle corchete-etiqueta__acierto">cuesta un 10 % del input; solo lo nuevo se paga completo</span>
            <span class="corchete-etiqueta__detalle corchete-etiqueta__fallo">a precio de cache write</span></div>`, { paso: 1, orden: 2 }) +
        // El temporizador de la caché, a la derecha.
        en(1500, 300, temporizador({ segundos: 300 }), { paso: 2, efecto: 'entrarConMuelle' }) +
        en(1500, 300 + px('--temporizador-diametro') + px('--esp-3'), '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-2);width:300px">Anthropic ofrece por defecto 5 minutos de caché</p>',
          { paso: 2 }) +
        en(VX, 860, `<span class="ficticio">${icono('info', 'icono--s')}Duración en Devin: pendiente de verificar</span>`, { paso: 3, efecto: 'entrarConMuelle' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
      ponerCache(0);
      ponerTemporizador(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        ponerCache(paso);
        ponerTemporizador(paso);
        return;
      }
      if (paso === 1) {
        // Las dos llamadas y el corchete; después, lo que se relee de caché pasa a su coste.
        pasos.animar(1, tl);
        return void cachear(pausa(tl), true);
      }
      if (paso !== 2) return void pasos.animar(paso, tl);
      // El temporizador llega y se agota; después, el corchete caduca y lo cacheado vuelve a su ancho.
      pasos.animar(2, tl, { orden: 0 });
      tl.agotarTemporizador($('.temporizador'));
      pasos.animar(2, tl, { orden: 1 });
      tl.caducarCache(caducables());
      cachear(tl, false);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
