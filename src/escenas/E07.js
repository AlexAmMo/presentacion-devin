// E07 · Modelos: cómo elegir. Comparte pantalla con E05 y E06.
// Arriba, la tabla de tipo de tarea y estrategia inicial (guion 2.1). Debajo, dos maneras de
// resolver la misma tarea: un modelo barato que necesita tres intentos y uno bueno que acierta a
// la primera; el barato acaba costando más (cifras ficticias, sin rótulo).
// La tabla lleva una tercera columna con el modelo recomendado: GPT-6 Luna para lo sencillo y
// GPT-6.1 Sol para lo complejo (o SWE-2, mientras esté en promoción).
// Pasos: 1 la tabla, fila a fila · 2 los intentos y sus totales.
import { icono } from '../../design/iconos.js';
import { en, cabecera, decimal, escenaPorPasos } from './comun.js';

const SENCILLA = 'GPT-6 Luna';
const COMPLEJA = 'GPT-6.1 Sol<br><span style="color:var(--color-texto-2);font-weight:var(--peso-texto)">/ SWE-2 en promoción</span>';
const TAREAS = [
  ['Localizar código o explicar una función sencilla', 'Opción rápida, con esfuerzo contenido', SENCILLA],
  ['Cambio pequeño y bien definido', 'Modelo con buen equilibrio entre calidad y consumo', SENCILLA],
  ['Diagnóstico complejo o cambio con muchas dependencias', 'Modelo de mayor capacidad y esfuerzo proporcionado', COMPLEJA],
  ['Revisión de un cambio importante', 'Capacidad suficiente para analizar consecuencias y evidencia', COMPLEJA],
  ['Trabajo repetitivo', 'Comparar varias opciones sobre casos representativos', SENCILLA],
];
// Unidades ficticias por intento: el barato falla dos veces.
const OPCIONES = [
  { nombre: 'Modelo barato', intentos: [[0.4, false], [0.4, false], [0.4, true]] },
  { nombre: 'Modelo bueno', intentos: [[0.9, true]] },
];

export default function ({ escena, raiz }) {
  const intento = ([coste, bien]) =>
    `<span class="contador" data-paso="2" data-orden="1">${icono(bien ? 'check' : 'x', 'icono--s')}${decimal(coste, 2)}<span class="contador__unidad">u.</span></span>`;
  const fila = ({ nombre, intentos }, i) => {
    const total = intentos.reduce((a, [c]) => a + c, 0);
    return en(120, 816 + i * 96, `<div style="display:flex;align-items:center;gap:var(--esp-2)">
        <span class="tipo-texto" style="width:300px;font-weight:var(--peso-enfasis)">${nombre}</span>
        ${intentos.map(intento).join('')}
        <span class="tipo-texto-s" data-paso="2" data-orden="2" style="color:var(--color-texto-3)">=</span>
        <span class="contador contador--coste" data-paso="2" data-orden="2">${icono('coins')}${decimal(total, 2)}<span class="contador__unidad">u. · ${intentos.length} ${intentos.length > 1 ? 'intentos' : 'intento'}</span></span>
      </div>`, { paso: 2 });
  };
  return escenaPorPasos({
    raiz,
    montar: () =>
      cabecera(escena, 1680) +
      en(120, 268, `<table class="tabla" style="width:1680px"><colgroup><col style="width:638px"><col><col style="width:300px"></colgroup><thead data-paso="1"><tr><th>Tipo de tarea</th><th>Estrategia inicial</th><th>Modelo recomendado</th></tr></thead><tbody>
        ${TAREAS.map(([t, e, m]) => `<tr data-paso="1"><td>${t}</td><td style="color:var(--color-texto-2)">${e}</td><td style="font-weight:var(--peso-enfasis)">${m}</td></tr>`).join('')}</tbody></table>`) +
      OPCIONES.map(fila).join('') +
      en(1500, 824, '<p class="tipo-texto" style="margin:0;font-weight:var(--peso-enfasis)">El barato acaba costando más</p>',
        { paso: 2, orden: 3, estilo: 'width:300px' }),
  });
}
