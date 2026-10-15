// E31 · Preguntas. Comparte pantalla con E30 y la sustituye.
// Solo una moneda en 3D con el signo de interrogación en relieve, en el centro, que gira despacio
// y sin parar sobre su eje vertical desde que llega, y el logo de Openbank abajo a la derecha.
// Abajo a la izquierda, discreta y a la altura del logo, la franja con lo que queda para después:
// la guía de instalación (repositorio Master-Control-Program, como en E16) y el plugin del
// departamento (ods-ds-mcp, como en E18).
// Pasos: 1 la moneda.
import { gsap } from 'gsap';
import { icono } from '../../design/iconos.js';
import { px } from '../../design/motion.js';
import { moneda } from '../../design/dibujos.js';
import logo from '../../design/assets/logos/openbank-logo-fondo-claro.svg';
import { ZONAS } from '../datos/mapa.js';
import { en, crearPasos } from './comun.js';

// Para después de la charla: dónde está cada cosa.
const RECURSOS = [
  ['git-branch', 'Guía de instalación: repositorio <b style="font-weight:var(--peso-fuerte);color:var(--color-texto-1)">Master-Control-Program</b>'],
  ['package', 'Plugin del departamento: <span class="tipo-mono-s" style="color:var(--color-texto-1)">ods-ds-mcp</span>'],
];

export default function ({ escena, raiz }) {
  let pasos = null, giro = null;
  // La moneda gira desde que aparece; al volver atrás o al salir, se para y queda de frente.
  const girar = encendido => {
    if (encendido && !giro) giro = gsap.effects.girarMoneda(raiz.querySelector('.moneda'));
    if (!encendido && giro) {
      giro.kill();
      giro = null;
      gsap.set(raiz.querySelector('.moneda__cuerpo'), { clearProps: 'transform' });
    }
  };

  return {
    montar() {
      const radio = px('--moneda-diametro') / 2;
      raiz.innerHTML =
        en(120, 96, `<span class="etiqueta">${icono(ZONAS[escena.zona].icono, 'icono--s')}${escena.titulo}</span>`) +
        en(960 - radio, 540 - radio, moneda(), { paso: 1, efecto: 'entrarConMuelle' }) +
        en(1560, 900, `<img src="${logo}" alt="Openbank" style="display:block;height:48px">`, { paso: 1, orden: 1 }) +
        en(120, 888, `<div style="display:grid;gap:var(--esp-1)">${RECURSOS.map(([ic, texto]) =>
          `<p class="tipo-etiqueta" style="margin:0;display:flex;align-items:center;gap:var(--esp-1);font-weight:var(--peso-texto);color:var(--color-texto-2)">${icono(ic, 'icono--s')}<span>${texto}</span></p>`).join('')}</div>`,
          { paso: 1, orden: 1 });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        return girar(paso >= 1);
      }
      pasos.animar(paso, tl);
      if (paso === 1) tl.add(() => girar(true));
    },

    desmontar() {
      girar(false);
      raiz.innerHTML = '';
    },
  };
}
