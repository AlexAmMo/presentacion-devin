// E31 · Preguntas. Comparte pantalla con E30 y la sustituye.
// El rótulo «¿Preguntas?», el título de la charla y el logo de Openbank.
// Pasos: 1 el rótulo.
import { icono } from '../../design/iconos.js';
import logo from '../../design/assets/logos/openbank-logo-fondo-claro.svg';
import { ZONAS } from '../datos/mapa.js';
import { en, crearPasos } from './comun.js';

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      raiz.innerHTML =
        en(120, 96, `<span class="etiqueta">${icono(ZONAS[escena.zona].icono, 'icono--s')}${escena.titulo}</span>`) +
        en(120, 360, '<p class="tipo-titulo-xl" style="margin:0">¿Preguntas?</p>', { paso: 1, efecto: 'entrarConMuelle' }) +
        en(120, 540, '<p class="tipo-entradilla" style="margin:0;color:var(--color-texto-2)">Devin en el día a día</p>', { paso: 1, orden: 1 }) +
        en(1560, 900, `<img src="${logo}" alt="Openbank" style="display:block;height:48px">`, { paso: 1, orden: 1 });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      pasos.animar(paso, tl);
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
