// E11 · Contexto: gestionar la sesión. Comparte pantalla con E09 y E10.
// Arriba, los tres caminos con sus situaciones (la tabla del guion), uno a uno; el anterior se
// atenúa. Debajo, centrada en el espacio libre, la ventana de la sesión, que muestra cada camino:
// continuar (lo ocupado crece un poco más), compactar (se recoge hasta el resumen) y sesión nueva
// (desde lo compactado, se recoge hasta dejar solo el system prompt). La línea de nivel va pegada al borde de lo ocupado
// y su cifra cambia a la vez (ajustarVentana). Al final, a la derecha, lo que hay que guardar.
// Pasos: 1 continuar · 2 compactar · 3 sesión nueva · 4 antes de compactar o cambiar de sesión.
// Fuera de pantalla (pendiente): el comando /compact y limpiar el contexto en Desktop.
import { gsap } from 'gsap';
import { px } from '../../design/motion.js';
import { icono } from '../../design/iconos.js';
import { en, cabecera, crearPasos, pausa } from './comun.js';

// Guion 2.3, «Continuar, compactar o empezar de nuevo»: cada situación con su decisión.
const CAMINOS = [
  ['arrow-right', 'Continuar', ['Misma tarea y contexto relevante', 'Falta un dato concreto: aportarlo; reiniciar no lo resuelve']],
  ['fold-vertical', 'Compactar', ['Misma tarea con mucha exploración acumulada']],
  ['square-plus', 'Sesión nueva', ['Nuevo objetivo independiente', 'Conversación llena de hipótesis descartadas: preparar un traspaso']],
];
// Cuándo se atenúa (y se vuelve a avivar) cada camino: en el paso 4, lo que hay que guardar vale para compactar y para la sesión nueva.
const ATENUA = [{ atenua: 2 }, { atenua: 3, aviva: 4 }, {}];
const GUARDAR = ['Objetivo y criterios de aceptación', 'Decisiones y restricciones', 'Archivos relevantes y cambios realizados', 'Pruebas ejecutadas y resultados', 'Hipótesis descartadas y siguiente paso'];

// La ventana, en miles de tokens (cifras ficticias). El system prompt se queda siempre.
const CAPACIDAD = 200;
const SISTEMA = ['System prompt', 10];
const HISTORIA = [['Conversación', 46], ['Código leído y resultados', 80]];
const SIGUE = 14, RESUMEN = 14;
const suma = capas => capas.reduce((a, [, n]) => a + n, 0);
// Lo ocupado al acabar cada paso (el 0, al aparecer): llena, continuar, compactar, sesión nueva.
const LLENA = SISTEMA[1] + suma(HISTORIA);
const OCUPADO = [LLENA, LLENA + SIGUE, SISTEMA[1] + RESUMEN, SISTEMA[1], SISTEMA[1]];
const [VX, VY, VANCHO] = [120, 674, 1060];

export default function ({ escena, raiz }) {
  let pasos = null;
  const borde = () => px('--trazo-contorno') + px('--esp-1');
  const porMil = () => (VANCHO - 2 * borde()) / CAPACIDAD;
  const pct = n => Math.round((n / CAPACIDAD) * 100);
  const el = q => raiz.querySelector(q);
  // La ventana al acabar el paso n: el relleno de la sesión recortado en lo ocupado (oculto tras
  // compactar, cuando queda el resumen, que está debajo) y el nivel en el borde, con su cifra.
  // Devuelve [elemento, propiedades] para ponerlo con gsap.set o con tl.set.
  const estado = n => [
    [el('[data-encima]'), { clipPath: `inset(0px ${VANCHO - 2 * borde() - OCUPADO[n] * porMil()}px 0px 0px)`, autoAlpha: n === 2 ? 0 : 1 }],
    [el('[data-resumen]'), { autoAlpha: n === 2 ? 1 : 0 }],
    [el('[data-nivel]'), { x: OCUPADO[n] * porMil() }],
  ];
  const cifra = n => () => { el('[data-cifra]').textContent = `${pct(OCUPADO[n])} %`; };
  const ponerVentana = n => {
    for (const [objetivo, props] of estado(n)) {
      gsap.killTweensOf(objetivo);
      gsap.set(objetivo, props);
    }
    cifra(n)();
  };
  // De lo ocupado al acabar el paso a al del paso b: el relleno, el nivel y su cifra, a la vez.
  const ajustar = (tl, a, b) => tl.ajustarVentana(el('[data-encima]'), {
    de: OCUPADO[a] * porMil(), a: OCUPADO[b] * porMil(), nivel: el('[data-nivel]'), cifra: el('[data-cifra]'), desde: pct(OCUPADO[a]), hasta: pct(OCUPADO[b]),
  });

  return {
    montar() {
      const hueco = px('--trazo-contorno');
      const ancho = n => Math.round(n * porMil()) - hueco;
      const capa = ([texto, n], atrs = '') =>
        `<div class="capa capa--entrada" style="width:${ancho(n)}px"${atrs}>${ancho(n) > 200 ? texto : ''}</div>`;
      // Dos rellenos superpuestos: debajo, el system prompt y el resumen; encima, la sesión entera
      // (system prompt, historia y lo que añade continuar), recortada en lo ocupado.
      const rellenos = `<div class="ventana__relleno">${capa(SISTEMA)}${capa(['', RESUMEN], ' data-resumen')}</div>
        <div class="ventana__relleno" data-encima>${[SISTEMA, ...HISTORIA, ['', SIGUE]].map(c => capa(c)).join('')}</div>`;
      const debajo = VY + px('--ventana-alto') + px('--esp-2');
      const inicio = VX + borde();

      const caminos = CAMINOS.map(([ic, nombre, situaciones], i) => en(120 + i * 580, 292, `
          <div class="tipo-texto" style="display:flex;align-items:center;gap:var(--esp-2);font-weight:var(--peso-enfasis)">${icono(ic)}${nombre}</div>
          ${situaciones.map(t => `<div class="tipo-etiqueta" style="margin-top:var(--esp-1);font-weight:var(--peso-texto);color:var(--color-texto-2)">${t}</div>`).join('')}`,
        { paso: i + 1, estilo: 'width:520px', ...ATENUA[i] })).join('');
      // Cada check, centrado en la altura de la primera línea de su texto (alguno ocupa dos).
      const guardar = GUARDAR.map(t =>
        `<div class="tipo-texto-s" style="display:flex;align-items:flex-start;gap:var(--esp-2)"><span style="display:flex;align-items:center;height:1lh">${icono('check', 'icono--s')}</span><span>${t}</span></div>`).join('');

      raiz.innerHTML =
        cabecera(escena, 1680) +
        caminos +
        en(VX, VY, `<div class="ventana" style="width:${VANCHO}px">${rellenos}<span class="ventana__capacidad">${CAPACIDAD}K</span></div>`, { paso: 1, propio: true }) +
        // El nivel, dibujado al principio del relleno: se desplaza en x hasta lo ocupado.
        en(inicio - hueco / 2 - px('--trazo-fuerte') / 2, VY - px('--esp-3') / 2,
          '<div class="nivel" data-nivel style="position:static"><span class="nivel__cifra" data-cifra></span></div>', { paso: 1, propio: true, estilo: 'width:0' }) +
        en(inicio + SISTEMA[1] * porMil(), debajo, '<span class="tipo-etiqueta" data-rotulo style="white-space:nowrap">Resumen de la sesión</span>', { paso: 2, hasta: 3, propio: true }) +
        en(inicio, debajo, '<span class="tipo-etiqueta" data-rotulo style="white-space:nowrap">System prompt</span>', { paso: 3, propio: true }) +
        en(1280, 530, `<div class="tipo-texto-s" style="font-weight:var(--peso-enfasis)">Antes de compactar o cambiar de sesión, guarda</div>
          <div style="display:grid;gap:var(--esp-1);margin-top:var(--esp-3);color:var(--color-texto-2)">${guardar}</div>`, { paso: 4, estilo: 'width:520px' });
      pasos = crearPasos(raiz);
      pasos.poner(0);
      ponerVentana(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) {
        pasos.poner(paso);
        return void ponerVentana(paso);
      }
      // La ventana y el nivel (sus envoltorios, que llevan el paso) y los rótulos de debajo.
      const [ventana, nivel] = [el('.ventana').parentElement, el('[data-nivel]').parentElement];
      const [resumen, sistema] = [...raiz.querySelectorAll('[data-rotulo]')].map(r => r.parentElement);
      const inicio = tl.duration();
      pasos.animar(paso, tl);
      if (paso === 1) {
        // La ventana ya llega cargada; tras una pausa, la sesión sigue y lo ocupado crece un poco más.
        tl.aparecer([ventana, nivel], {}, inicio);
        pausa(tl);
        ajustar(tl, 0, 1);
      } else if (paso === 2) {
        // Se recoge hasta el resumen, que espera debajo; al acabar, queda solo él, con su nombre.
        tl.set(el('[data-resumen]'), { autoAlpha: 1 });
        ajustar(tl, 1, 2);
        tl.set(el('[data-encima]'), { autoAlpha: 0 }).aparecer(resumen);
      } else if (paso === 3) {
        // Sin que la ventana se vaya: lo compactado (el system prompt y el resumen, abajo) se recoge
        // hasta dejar solo el system prompt, con el nivel pegado y su cifra a la vez. Al acabar,
        // queda como al saltar al paso.
        const abajo = el('[data-resumen]').parentElement;
        tl.desaparecer(resumen, {}, inicio)
          .ajustarVentana(abajo, {
            de: OCUPADO[2] * porMil(), a: OCUPADO[3] * porMil(), nivel: el('[data-nivel]'), cifra: el('[data-cifra]'), desde: pct(OCUPADO[2]), hasta: pct(OCUPADO[3]),
          }, inicio);
        for (const [objetivo, props] of estado(3)) tl.set(objetivo, props);
        tl.set(abajo, { clearProps: 'clipPath' })
          .aparecer(sistema);
      }
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
