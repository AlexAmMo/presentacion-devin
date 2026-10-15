// E10 · Contexto: degradación. Comparte pantalla con E09 y E11.
// A la izquierda, la gráfica de Context Arena con dos franjas: el inicio de la degradación
// (64K–256K) y donde la degradación es alta (256K–512K). A la derecha, los mismos datos
// en una tabla, con su título centrado sobre ella: la efectividad de cada modelo con la ventana
// casi vacía, al 25 % y al 50 %.
// Las tres ventanas son de 1M (max_context_length de Context Arena: 1.000.000 para los
// dos Claude y 1.050.000 para GPT-5.6 Sol), así que 256K ≈ 25 % y 512K ≈ 50 %.
// Datos: research_notes/Graficas y tools para el guion/degradacion_contexto.md (4-A).
// Pasos: 1 ejes y fuente y, enseguida, las tres líneas a la vez y, al acabar, las franjas, una tras
// otra · 2 la tabla.
import { grafica } from '../../design/dibujos.js';
import { en, cabecera, fuente, crearPasos, marcar, marcarSeries, trazarSeries } from './comun.js';

const TRAMOS = [8e3, 16e3, 32e3, 64e3, 128e3, 256e3, 512e3];
// GDM-MRCR v2, 8 agujas, % medio por tramo (Context Arena, 14-10-2026).
const SERIES = [
  { nombre: 'GPT-5.6 Sol', estilo: 1, valores: [100, 100, 98, 98.8, 92.4, 83.5, 61.9] },
  { nombre: 'Claude Opus 5', estilo: 2, valores: [98.7, 99.9, 99.3, 99.9, 91.3, 65.6, 42.5] },
  { nombre: 'Claude Sonnet 5', estilo: 3, valores: [96.4, 94.9, 87.9, 68, 52.9, 52.2, 32] },
];
// Columnas de la tabla: tramo, parte de la ventana que ocupa y franja con la que enlaza.
const COLUMNAS = [[8e3, '~0 %', ''], [256e3, '25 %', ' tabla__franja'], [512e3, '50 %', ' tabla__franja tabla__franja--critica']];
const k = v => (v >= 1e6 ? '1M' : `${v / 1000}K`);
const porcentaje = v => `${Math.round(v)} %`;

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const svg = grafica({
        ancho: 1040, alto: 600, margenDerecho: 88,
        x: { min: 8e3, max: 1e6, log: true, marcas: [...TRAMOS, 1e6], formato: k, titulo: 'Tokens de contexto' },
        y: { min: 0, max: 100, marcas: [0, 25, 50, 75, 100], formato: v => `${v} %`, titulo: 'Efectividad' },
        series: SERIES.map(s => ({ nombre: s.nombre, estilo: s.estilo, puntos: TRAMOS.map((t, i) => [t, s.valores[i]]) })),
        franja: [
          { desde: 64e3, hasta: 256e3, texto: 'Inicio de\ndegradación' },
          { desde: 256e3, hasta: 512e3, texto: 'Degradación\nalta', critica: true },
        ],
      });
      const cabeza = COLUMNAS.map(([tramo, parte, clase]) =>
        `<th class="tabla__cifra${clase}">${parte}<br><span class="tabla__mono">${k(tramo)}</span></th>`).join('');
      const filas = SERIES.map(s => `<tr>
          <td class="tipo-etiqueta" style="color:var(--color-serie-${s.estilo})">${s.nombre}</td>
          ${COLUMNAS.map(([tramo, , clase]) => `<td class="tabla__cifra tipo-texto${clase}">${porcentaje(s.valores[TRAMOS.indexOf(tramo)])}</td>`).join('')}
        </tr>`).join('');

      raiz.innerHTML =
        cabecera(escena, 1680) +
        en(120, 260, svg, { paso: 1 }) +
        en(248, 884, fuente('Context Arena · GDM-MRCR v2 · 14-10-2026'), { paso: 1 }) +
        // El título, centrado sobre la tabla; la tabla entra entera: con los bordes colapsados, una
        // fila oculta seguiría dibujando su línea.
        en(1252, 268, `<div style="display:flex;flex-direction:column;align-items:center;width:max-content">
          <div data-paso="2" style="text-align:center"><p class="tipo-texto-s" style="margin:0;font-weight:var(--peso-enfasis)">Efectividad según la ventana usada</p>
            <p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Misma prueba · ventanas de 1M</p></div>
          <table class="tabla" data-paso="2" data-orden="1" style="margin-top:var(--esp-5)"><thead><tr><th>Modelo</th>${cabeza}</tr></thead><tbody>${filas}</tbody></table></div>`);

      // Dentro de la gráfica, todo en el paso 1, tras los ejes: las series, con su coreografía (línea,
      // y después puntos y nombre), y al acabar, cada franja (fondo, bordes y nombre), sin desplazarse.
      const g = raiz.querySelector('.grafica');
      const [fondos, bordes, notas] = ['.grafica__franja', '.grafica__franja-borde', '.grafica__nota'].map(q => [...g.querySelectorAll(q)]);
      fondos.forEach((f, i) => marcar([f, bordes[i], notas[i]], 1, { propio: true }));
      marcarSeries(g, 1);
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      pasos.animar(paso, tl);
      if (paso !== 1) return;
      // Tras los ejes, las tres líneas a la vez y, cuando acaban, las franjas, una tras otra, sin otro clic.
      const g = raiz.querySelector('.grafica');
      trazarSeries(tl, g, { escalonado: 0 });
      const [fondos, bordes, notas] = ['.grafica__franja', '.grafica__franja-borde', '.grafica__nota'].map(q => [...g.querySelectorAll(q)]);
      fondos.forEach((f, i) => tl.aparecer([f, bordes[i], notas[i]], { distancia: 0, stagger: 0 }));
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
