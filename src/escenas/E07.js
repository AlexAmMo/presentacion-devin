// E07 · Modelos: cómo elegir. Comparte pantalla con E05 y E06.
// Arriba, la tabla de tipo de tarea y estrategia inicial (guion 2.1). Debajo, dos maneras de
// resolver la misma tarea: un modelo barato que necesita tres intentos y uno bueno que acierta a
// la primera; el barato acaba costando más (cifras ficticias, sin rótulo).
// La tabla lleva una tercera columna con el modelo recomendado: GPT-6 Luna para lo sencillo y
// GPT-6.1 Sol para lo complejo o, apilado debajo tras una «o», SWE-2, mientras esté en promoción.
// Las tareas van agrupadas por modelo, primero las sencillas, y el modelo de cada grupo, una sola
// vez, centrado en su celda (en alto y en ancho, como el rótulo de su columna).
// Pasos: 1 la tabla, fila a fila · 2 los intentos y sus totales.
import { icono } from '../../design/iconos.js';
import { en, cabecera, decimal, escenaPorPasos } from './comun.js';

const SENCILLA = 'GPT-6 Luna';
// Las dos opciones para lo complejo, apiladas, con una «o» entre ellas; SWE-2, con su condición.
const suave = (texto, color = 'texto-2') => `<span style="color:var(--color-${color});font-weight:var(--peso-texto)">${texto}</span>`;
const COMPLEJA = `GPT-6.1 Sol<br>${suave('o', 'texto-3')}<br>SWE-2 ${suave('en promoción')}`;
const GRUPOS = [
  [SENCILLA, [
    ['Localizar código o explicar una función sencilla', 'Opción rápida, con esfuerzo contenido'],
    ['Cambio pequeño y bien definido', 'Modelo con buen equilibrio entre calidad y consumo'],
    ['Trabajo repetitivo', 'Comparar varias opciones sobre casos representativos'],
  ]],
  [COMPLEJA, [
    ['Diagnóstico complejo o cambio con muchas dependencias', 'Modelo de mayor capacidad y esfuerzo proporcionado'],
    ['Revisión de un cambio importante', 'Capacidad suficiente para analizar consecuencias y evidencia'],
  ]],
];
// Coste ficticio por intento, en ACUs (la unidad de consumo de Devin; se escribe solo en el total):
// el barato falla dos veces.
const OPCIONES = [
  { nombre: 'Modelo barato', intentos: [[0.4, false], [0.4, false], [0.4, true]] },
  { nombre: 'Modelo bueno', intentos: [[0.9, true]] },
];

export default function ({ escena, raiz }) {
  const intento = ([coste, bien]) =>
    `<span class="contador" data-paso="2" data-orden="1">${icono(bien ? 'check' : 'x', 'icono--s')}${decimal(coste, 2)}</span>`;
  // Las dos filas, en una rejilla: los totales (y sus «=») quedan en la misma columna, y el único
  // intento del modelo bueno, centrado bajo los tres del barato.
  const fila = ({ nombre, intentos }) => {
    const total = intentos.reduce((a, [c]) => a + c, 0);
    return `<span class="tipo-texto" style="font-weight:var(--peso-enfasis)">${nombre}</span>
        <div style="display:flex;justify-content:center;gap:var(--esp-2)">${intentos.map(intento).join('')}</div>
        <span class="tipo-texto-s" data-paso="2" data-orden="2" style="color:var(--color-texto-3)">=</span>
        <span class="contador contador--coste" data-paso="2" data-orden="2" style="justify-self:start">${icono('coins')}${decimal(total, 2)}<span class="contador__unidad">ACUs · ${intentos.length} ${intentos.length > 1 ? 'intentos' : 'intento'}</span></span>`;
  };
  return escenaPorPasos({
    raiz,
    montar: () =>
      cabecera(escena, 1680) +
      en(120, 268, `<table class="tabla" style="width:1680px"><colgroup><col style="width:638px"><col><col style="width:300px"></colgroup><thead data-paso="1"><tr><th>Tipo de tarea</th><th>Estrategia inicial</th><th style="text-align:center">Modelo recomendado</th></tr></thead><tbody>
        ${GRUPOS.flatMap(([modelo, tareas]) => tareas.map(([t, e], i) => `<tr data-paso="1"><td>${t}</td><td style="color:var(--color-texto-2)">${e}</td>${i ? '' :
          `<td rowspan="${tareas.length}" style="font-weight:var(--peso-enfasis);vertical-align:middle;text-align:center">${modelo}</td>`}</tr>`)).join('')}</tbody></table>`) +
      // La conclusión, a la derecha, en la misma rejilla: ocupa las dos filas y queda centrada en su alto.
      en(120, 816, `<div style="width:1680px;display:grid;grid-template-columns:300px auto auto auto 1fr;align-items:center;gap:var(--esp-4) var(--esp-2)">${OPCIONES.map(fila).join('')}
          <p class="tipo-texto" data-paso="2" data-orden="3" style="grid-column:5;grid-row:1 / span 2;justify-self:end;width:300px;margin:0;font-weight:var(--peso-enfasis)">El barato acaba costando más</p></div>`, { paso: 2 }),
  });
}
