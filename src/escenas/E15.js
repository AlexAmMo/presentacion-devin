// E15 · Herramientas del departamento. Pantalla propia, en dos fases que se relevan.
// Fase 1 (pasos 1–2): un ejemplo claro, create_pull_request. Primero, la herramienta y su ficha
// (lo que lee de ella el agente: nombre, descripción y parámetros), juntas, centradas y en grande.
// Después la pantalla se reordena en un esquema: Agente → Tool → sus tres elementos (nombre,
// descripción y parámetros) → la ficha, con una flecha de cada elemento a su campo.
// Fase 2 (paso 3): tool o skill, en una tabla de dos columnas, «manos» y «conocimiento», y debajo
// «No compiten», en una sola entrada.
// Pasos: 1 la herramienta y su ficha · 2 el esquema · 3 tool o skill.
import { gsap } from 'gsap';
import { icono } from '../../design/iconos.js';
import { abanico } from '../../design/dibujos.js';
import { s, v, px } from '../../design/motion.js';
import { en, cabecera, crearPasos, marcar } from './comun.js';

// El ejemplo de la fase 1 y lo que el agente lee de él.
const EJEMPLO = ['create_pull_request', 'Abre un pull request con los cambios de una rama. Úsala para proponer cambios a revisión.', 'branch: texto · title: texto · body: texto'];
const ELEMENTOS = ['Nombre', 'Descripción', 'Parámetros'];
// Guion 2.6, «¿Tool o skill?», con los textos del usuario (Cambios.md).
const COMPARACION = [
  ['Qué aporta', 'Actuar sobre un sistema o consultar sus datos', 'Conocimiento: cómo y cuándo hacer algo'],
  ['Cómo se ejecuta', 'Código propio determinista', 'El modelo sigue instrucciones en texto'],
  ['Entradas y salidas', 'Estructura definida', 'Texto libre'],
  ['Credenciales y permisos', 'No entran al contexto', 'Las que existan en el contexto'],
  ['Qué entra en el contexto', 'Solo la llamada y el resultado', 'Todo el procedimiento y lo que ejecute'],
  ['Reutilización', 'Cualquier agente o IDE compatible', 'Devin y otros agentes del mismo estándar'],
  ['Coste de crearla', 'Desarrollarla, alojarla y mantenerla', 'Un archivo Markdown en el repositorio'],
];
// Grupos (data-orden) de la fase 2: así no se mezclan con los de la fase anterior, que sale antes.
const F2 = 10;
const ARRIBA = 330;
// El esquema (paso 2), centrado en la banda de contenido; en el paso 1, la herramienta y la ficha,
// centradas como pareja y más grandes.
// Huecos entre las piezas del esquema: el último, el pasillo de las flechas hasta la ficha.
const ESQUEMA = { centro: 620, huecos: [96, 96, 160] };
const PAREJA = { hueco: 128, herramienta: 1.6, ficha: 1.1 };

export default function ({ escena, raiz }) {
  let pasos = null, enPareja = [];
  const piezas = () => [raiz.querySelector('[data-pieza="herramienta"]'), raiz.querySelector('[data-pieza="ficha"]')];
  // En los pasos 0 y 1, la herramienta y la ficha en su sitio de pareja; desde el 2, en el esquema.
  const ponerPiezas = n => piezas().forEach((pieza, i) => {
    gsap.killTweensOf(pieza);
    gsap.set(pieza, n <= 1 ? enPareja[i] : { clearProps: 'transform' });
  });

  return {
    montar() {
      const [nombre, descripcion, parametros] = EJEMPLO;
      // La ficha: lo que lee el agente de la herramienta, sin su código.
      const ficha = `<div class="definicion">
            <div class="definicion__cabecera" data-campo>${icono('wrench', 'icono--s')}${nombre}</div>
            <div class="definicion__campo" data-campo><span class="definicion__clave">Descripción</span><span class="definicion__valor">${descripcion}</span></div>
            <div class="definicion__campo" data-campo><span class="definicion__clave">Parámetros</span><span class="definicion__valor definicion__valor--mono">${parametros}</span></div>
          </div>`;
      // El esquema, en una fila: agente, herramienta, sus elementos y la ficha. La fila no tiene paso
      // (lo tienen sus piezas, y las que se mueven, en un envoltorio), así que su sitio no cambia.
      const fila = `<div data-fila style="position:absolute;left:120px;top:${ESQUEMA.centro}px;width:1680px;height:0;display:flex;justify-content:center;align-items:center">
          <div class="agente agente--circulo" data-agente data-paso="2" data-hasta="3" data-efecto="entrarConMuelle">${icono('bot', 'icono--l')}<span class="agente__nombre">Devin</span></div>
          <div data-paso="1" data-hasta="3" data-efecto="entrarConMuelle" style="margin-left:${ESQUEMA.huecos[0]}px"><div data-pieza="herramienta"><div class="herramienta"><div class="herramienta__circulo" data-circulo>${icono('git-pull-request', 'icono--l')}</div><span class="herramienta__nombre">${nombre}</span></div></div></div>
          <div style="display:grid;gap:var(--esp-2);margin-left:${ESQUEMA.huecos[1]}px">${ELEMENTOS.map(e => `<div class="tipo-texto-s" data-elemento data-paso="2" data-hasta="3" data-orden="2"><span>${e}</span></div>`).join('')}</div>
          <div data-paso="1" data-hasta="3" style="margin-left:${ESQUEMA.huecos[2]}px"><div data-pieza="ficha">${ficha}</div></div></div>`;
      // La tabla y su pie entran en una sola animación: todo en el mismo grupo, escalonado.
      const columna = (ic, nombre, papel) => `<span style="display:inline-flex;align-items:center;gap:var(--esp-1)">${icono(ic, 'icono--s')}${nombre}${icono('arrow-right', 'icono--s')}${papel}</span>`;
      const comparacion = `<table class="tabla" style="width:1680px"><thead data-paso="3" data-orden="${F2}"><tr>
          <th style="width:300px"></th><th style="width:640px">${columna('wrench', 'Tool propia', 'manos')}</th><th>${columna('puzzle', 'Skill', 'conocimiento')}</th></tr></thead><tbody>
        ${COMPARACION.map(([aspecto, tool, skill]) => `<tr data-paso="3" data-orden="${F2}">
          <td class="tipo-etiqueta" style="color:var(--color-texto-2)">${aspecto}</td><td>${tool}</td><td>${skill}</td></tr>`).join('')}</tbody></table>`;

      raiz.innerHTML =
        cabecera(escena, 1680) +
        // Fase 1.
        fila +
        '<svg data-flechas style="position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible"></svg>' +
        // Fase 2. Las tablas no tienen paso: lo tienen su cabecera y sus filas.
        en(120, ARRIBA, comparacion) +
        en(120, 924, `<p class="tipo-texto" style="margin:0;display:flex;align-items:center;gap:var(--esp-2)">${icono('wrench')}+${icono('puzzle')}<b style="font-weight:var(--peso-enfasis);margin-left:var(--esp-2)">No compiten:</b> lo habitual es una herramienta con una skill que explica cuándo y cómo usarla.</p>`,
          { paso: 3, orden: F2 });

      // Medidas en la pantalla (px de 1920 × 1080).
      const caja = raiz.getBoundingClientRect(), k = caja.width / 1920;
      const rect = el => { const r = el.getBoundingClientRect(); return { x: (r.left - caja.left) / k, y: (r.top - caja.top) / k, ancho: r.width / k, alto: r.height / k }; };
      const centroY = r => r.y + r.alto / 2;
      // La herramienta, con su círculo a la altura del centro de la fila (su nombre va debajo).
      const herramienta = raiz.querySelector('[data-pieza="herramienta"]');
      herramienta.style.marginTop = `${2 * (ESQUEMA.centro - centroY(rect(raiz.querySelector('[data-circulo]'))))}px`;
      // Flechas del esquema: del agente a la herramienta, de la herramienta a sus elementos (abanico)
      // y de cada elemento a su campo de la ficha.
      const [agente, circulo] = [rect(raiz.querySelector('[data-agente]')), rect(raiz.querySelector('[data-circulo]'))];
      const elementos = [...raiz.querySelectorAll('[data-elemento] span')].map(rect);
      const campos = [...raiz.querySelectorAll('[data-campo]')].map(rect);
      const hueco = px('--esp-3'), salida = Math.max(...elementos.map(e => e.x + e.ancho)) + hueco;
      raiz.querySelector('[data-flechas]').innerHTML =
        `<g data-tramo="1">${abanico({ desde: [agente.x + agente.ancho + hueco, centroY(agente)], hasta: [[circulo.x - hueco, centroY(circulo)]] })}</g>` +
        `<g data-tramo="2">${abanico({ desde: [circulo.x + circulo.ancho + hueco, centroY(circulo)], hasta: elementos.map(e => [e.x - hueco, centroY(e)]) })}</g>` +
        `<g data-tramo="3">${abanico({ desde: elementos.map(e => [salida, centroY(e)]), hasta: campos.map(c => [c.x - px('--esp-2'), centroY(c)]) })}</g>`;
      // Agente (grupo 0), su flecha (1), el abanico y los elementos (2) y las flechas a la ficha (3).
      [1, 2, 3].forEach(t => marcar(raiz.querySelectorAll(`[data-tramo="${t}"] .abanico__flecha`), 2, { hasta: 3, orden: t, efecto: 'trazar' }));

      // La pareja del paso 1: herramienta y ficha, más grandes y centradas juntas en la pantalla.
      const [h, f] = piezas().map(rect);
      const ancho = h.ancho * PAREJA.herramienta + PAREJA.hueco + f.ancho * PAREJA.ficha;
      const izquierda = (1920 - ancho) / 2;
      const destinos = [izquierda + (h.ancho * PAREJA.herramienta) / 2, izquierda + h.ancho * PAREJA.herramienta + PAREJA.hueco + (f.ancho * PAREJA.ficha) / 2];
      enPareja = [[h, PAREJA.herramienta], [f, PAREJA.ficha]].map(([r, escala], i) => ({
        x: destinos[i] - (r.x + r.ancho / 2), y: ESQUEMA.centro - centroY(r), scale: escala, transformOrigin: '50% 50%',
      }));

      pasos = crearPasos(raiz);
      pasos.poner(0);
      ponerPiezas(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        return void ponerPiezas(paso);
      }
      if (paso === 2) {
        // La pantalla se reordena: la herramienta y la ficha van a su sitio en el esquema y entran
        // el agente, las flechas y los elementos, de izquierda a derecha.
        tl.to(piezas(), { x: 0, y: 0, scale: 1, duration: s('--dur-desplazar'), ease: v('--ease-desplazar') });
        return void pasos.animar(2, tl);
      }
      // Cambio de fase: lo anterior se va de una vez y la comparación entra entera, escalonada.
      if (paso === 3) {
        pasos.salir(3, tl);
        return void pasos.ordenes(3).filter(o => o >= F2).forEach(o => pasos.animar(3, tl, { orden: o, sinSalidas: true }));
      }
      pasos.animar(paso, tl);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
