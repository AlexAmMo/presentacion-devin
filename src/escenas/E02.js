// E02 · Devin Desktop, CLI y Cloud. Comparte pantalla con E03.
// Arriba, las dos preguntas, centradas juntas, y debajo, en la misma animación, dos islas: Local
// (a la izquierda sus ventajas y a la derecha sus dos interfaces, Desktop y CLI, separadas por una
// línea fina) y Cloud (una tarea que se entrega y se ejecuta sola, la misma tarea cada semana y su
// ventaja, en cascada). Primero se explica Local entero y después Cloud. Al final, un cable une las
// tres opciones: pueden combinarse.
// Las viñetas de cada columna se centran juntas en la altura de su isla; las de Cloud, también
// en su ancho.
// Pasos: 1 preguntas e islas · 2 ventajas de Local · 3 Desktop y CLI · 4 Cloud · 5 combinarse.
import { gsap } from 'gsap';
import { px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { repeticion } from '../../design/dibujos.js';
import { en, paso, cabecera, crearPasos, encadenar } from './comun.js';

const VENTAJAS = ['Control de modelo y effort', 'Acceso a lo local', 'Revisión visual de cambios'];
const INTERFACES = [['monitor', 'Desktop', 'Desde el IDE, con el código y los cambios a la vista'], ['terminal', 'CLI', 'Desde la terminal, en comandos y scripts']];
const LOCAL = { x: 120, y: 380, ancho: 960, alto: 520 }, CLOUD = { x: 1120, y: 380, ancho: 680, alto: 520 };

const vineta = (ic, titulo, detalle = '', atrs = '') =>
  `<div class="vineta"${atrs}>${ic}<span class="vineta__titulo">${titulo}</span>${detalle ? `<span class="vineta__detalle">${detalle}</span>` : ''}</div>`;
// Una columna de viñetas, centradas juntas en su alto.
const columna = (contenido, clase = '') => `<div class="vinetas${clase}">${contenido}</div>`;

export default function ({ escena, raiz }) {
  let pasos = null, giro = null, activa = false;
  // La flecha del calendario gira sin parar desde que aparece (paso 4), mientras la escena es la
  // actual: fuera de ella, el giro se pausa.
  const girar = encendido => {
    if (encendido && !giro) {
      giro = gsap.effects.girar(raiz.querySelector('.repeticion__anillo'));
      if (!activa) giro.pause();
    }
    if (!encendido && giro) {
      giro.kill();
      gsap.set(raiz.querySelector('.repeticion__anillo'), { clearProps: 'transform' });
      giro = null;
    }
  };

  return {
    montar() {
      // La isla, con su cabecera arriba y su cuerpo en el resto del alto.
      const isla = ({ x, y, ancho, alto }, ic, nombre, cuerpo) => en(x, y,
        `<div class="isla" style="width:${ancho}px;height:${alto}px;box-sizing:border-box;justify-content:flex-start">
          <div class="isla__cabecera" style="justify-content:flex-start;align-items:center">${icono(ic)}<span class="isla__nombre">${nombre}</span></div>${cuerpo}</div>`,
        { paso: 1, orden: 2, efecto: 'entrarConMuelle' });

      // Entre las ventajas y las interfaces, una línea fina (su alto, al montar).
      const local = `<div data-local style="flex:1;display:grid;grid-template-columns:auto auto 1fr;column-gap:var(--esp-4)">` +
        columna(VENTAJAS.map((v, i) => vineta(icono('check'), v, '', paso(2, { orden: i }))).join('')) +
        `<div data-separador style="width:var(--trazo-fino);align-self:center;background:var(--color-separador)"${paso(3)}></div>` +
        columna(INTERFACES.map(([ic, nombre, detalle], i) => vineta(icono(ic), nombre, detalle, ` data-opcion${paso(3, { orden: i })}`)).join('') +
          `<div style="position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center"><span class="etiqueta"${paso(5, { orden: 1 })}>Pueden combinarse</span></div>`) +
        '</div>';
      const cloud = `<div style="flex:1;display:flex;justify-content:center">` +
        columna(
          vineta(icono('message-square'), 'Una tarea con objetivo claro', 'Se entrega y se ejecuta sola', ` data-opcion${paso(4, { efecto: 'entrarEnVentana' })}`) +
          vineta(repeticion('calendar-clock'), 'Cada semana', 'La misma tarea, sin intervención', paso(4, { orden: 1 })) +
          vineta(icono('check'), 'Trabajar con múltiples repositorios', '', paso(4, { orden: 2 })), ' vinetas--anillo') +
        '</div>';

      raiz.innerHTML =
        cabecera(escena, 1680) +
        en(120, 292, `<div style="display:flex;justify-content:center;gap:var(--esp-7)">
            <p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis)"${paso(1)}>¿Dónde voy a ejecutar Devin?</p>
            <p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis);color:var(--color-texto-2)"${paso(1, { orden: 1 })}>¿Cómo interactúo con él?</p></div>`, 'width:1680px') +
        isla(LOCAL, 'laptop', 'Local · en nuestra máquina', local) +
        isla(CLOUD, 'cloud', 'Cloud · en remoto', cloud) +
        // Las tres opciones, unidas por un cable (se traza al montar, cuando se conocen sus filas).
        `<svg style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible"><path class="conector__cable" data-cable data-paso="5" data-efecto="trazar"/></svg>`;

      const caja = raiz.getBoundingClientRect(), k = caja.width / 1920;
      // La línea entre las columnas de Local, tan alta como la más alta de las dos.
      const alto = Math.max(...[...raiz.querySelectorAll('[data-local] > .vinetas')].map(col => {
        const filas = [...col.querySelectorAll(':scope > .vineta')].map(f => f.getBoundingClientRect());
        return (filas.at(-1).bottom - filas[0].top) / k;
      }));
      raiz.querySelector('[data-separador]').style.height = `${alto}px`;

      // El cable sale del final de las filas de Desktop y CLI, se une entre las dos islas y llega
      // al icono de la tarea de Cloud.
      const [desktop, cli, tarea] = [...raiz.querySelectorAll('[data-opcion]')].map(fila => {
        const r = fila.getBoundingClientRect(), a = fila.firstElementChild.getBoundingClientRect();
        return { derecha: (r.right - caja.left) / k, izquierda: (a.left - caja.left) / k - px('--esp-2'), y: (a.top + a.height / 2 - caja.top) / k };
      });
      const j = { x: (LOCAL.x + LOCAL.ancho + CLOUD.x) / 2, y: (desktop.y + cli.y) / 2 };
      const rama = o => `M${o.derecha} ${o.y}H${j.x - 40}Q${j.x} ${o.y} ${j.x} ${j.y}`;
      raiz.querySelector('[data-cable]').setAttribute('d',
        `${rama(desktop)}${rama(cli)}M${j.x} ${j.y}C${j.x + 30} ${j.y} ${tarea.izquierda - 30} ${tarea.y} ${tarea.izquierda} ${tarea.y}`);
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(n, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(n);
        return girar(n >= 4);
      }
      if (n !== 4) return void pasos.animar(n, tl);
      // La tarea cae en Cloud; sin esperar a que acabe del todo, la misma tarea cada semana (su flecha
      // empieza a girar) y la ventaja, encadenadas.
      const [tarea, semana, ventaja] = [0, 1, 2].map(orden => pasos.animar(4, gsap.timeline(), { orden }));
      encadenar(tl, [tarea, semana, ventaja]).add(() => girar(true), semana.startTime());
    },

    activa(si) {
      activa = si;
      if (giro) giro.paused(!si);
    },

    desmontar() {
      girar(false);
      raiz.innerHTML = '';
    },
  };
}
