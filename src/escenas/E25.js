// E25 · Contexto progresivo. Segunda parada del circuito.
// A la izquierda, lo primero que se aporta (error exacto, pasos para reproducirlo y archivos
// relacionados) y, debajo, la hipótesis como sugerencia, no como orden. A la derecha, mil
// líneas de log que se filtran hasta el fragmento relevante; el resto queda accesible.
// Pasos: 1 lo primero · 2 la hipótesis · 3 el log filtrado.
import { icono } from '../../design/iconos.js';
import { en, cabecera, peticion, crearPasos, pausa } from './comun.js';

const PRIMERO = [['triangle-alert', 'El error exacto'], ['list-checks', 'Los pasos para reproducirlo'], ['file-text', 'Los archivos relacionados']];
// El log: líneas simuladas; las relevantes (índices) se quedan y su texto aparece en el fragmento.
const LINEAS = [260, 340, 300, 380, 240, 320, 360];
const RELEVANTES = [2, 3, 4];
const FRAGMENTO = ['GET /clientes?pagina=3&filtro=activos', 'TablaClientes: 0 filas (total 42)', 'pagina no se reinicia al cambiar el filtro'];

export default function ({ escena, raiz }) {
  let pasos = null;
  return {
    montar() {
      const primero = PRIMERO.map(([ic, t]) => `<p class="tipo-texto" style="margin:0;display:flex;align-items:center;gap:var(--esp-3)">${icono(ic)}${t}</p>`).join('');
      const lineas = LINEAS.map((a, i) => `<span class="documento__linea" style="width:${a}px"${RELEVANTES.includes(i) ? '' : ' data-atenua="3" data-orden="2"'}></span>`).join('');

      raiz.innerHTML =
        cabecera(escena, 1020) +
        en(120, 340, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Lo primero</p>', { paso: 1 }) +
        en(120, 388, `<div style="display:grid;gap:var(--esp-3)">${primero}</div>`, { paso: 1, estilo: 'width:760px' }) +
        en(120, 620, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-3)">Si no conocemos la causa, lo decimos: una hipótesis, no una orden</p>', { paso: 2, estilo: 'width:760px' }) +
        en(120, 668, peticion('La hipótesis', 'Sospecho de la gestión del estado, pero comprueba la causa antes de modificarla.', 760), { paso: 2, efecto: 'entrarConMuelle' }) +
        // El log, a la derecha: 1.000 líneas que se filtran.
        en(1000, 392, `<div class="documento" style="width:800px;height:auto;box-sizing:border-box"><div class="documento__cabecera">${icono('file-text', 'icono--s')}app.log · 1.000 líneas</div>
            <div class="documento__cuerpo" style="gap:var(--esp-1);padding:var(--esp-3)">${lineas}</div></div>`, { paso: 3 }) +
        en(1000, 680, peticion('El fragmento relevante', FRAGMENTO.join('<br>'), 800), { paso: 3, orden: 2, efecto: 'entrarConMuelle' }) +
        en(1000, 942, '<p class="tipo-etiqueta" style="margin:0;color:var(--color-texto-2)">El resto, accesible si hace falta</p>', { paso: 3, orden: 3 });
      pasos = crearPasos(raiz);
      pasos.poner(0);
    },

    irA(paso, { animar = false, tl } = {}) {
      if (!animar || !tl) return pasos.poner(paso);
      if (paso !== 3) return void pasos.animar(paso, tl);
      // El log entero; tras una pausa, todo se atenúa salvo el fragmento, que pasa a su tarjeta.
      pasos.animar(3, tl, { orden: 0 });
      pausa(tl);
      [2, 3].forEach(o => pasos.animar(3, tl, { orden: o }));
    },

    desmontar() { raiz.innerHTML = ''; },
  };
}
