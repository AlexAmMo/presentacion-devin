// Vista de ponente: la abre la presentación con la tecla P (index.html?ponente).
// Muestra lo que hay que decir en el paso actual (las «Notas» de escenas.md: la idea y sus
// detalles), que cambia con cada clic, y, en una línea, lo que viene después; el cronómetro
// arriba y, en la fila final y en pequeño, los mandos y el progreso. Nunca se desplaza: si no
// cabe, se compacta por grados y, en el último, solo queda la idea del paso.
// El cronómetro empieza con el primer avance y se guarda en sessionStorage: sobrevive
// si esta ventana se recarga.
import { icono } from '../design/iconos.js';
import { MARCA, LATIDO_MS, DESTINO, esNuestro } from './enlace.js';
import { enLinea, primeraFrase } from './texto.js';

const CRONOMETRO = 'devin-cronometro';
const minutos = n => `${String(Math.round(n * 10) / 10).replace('.', ',')}\u00a0min`;

// ── Cronómetro ──────────────────────────────────────────────────────────────

const leer = () => { try { return JSON.parse(sessionStorage.getItem(CRONOMETRO)); } catch { return null; } };
const guardar = c => { try { sessionStorage.setItem(CRONOMETRO, JSON.stringify(c)); } catch { /* sin almacenamiento: solo en memoria */ } };
let crono = leer() ?? { inicio: null, pausa: null };
const transcurrido = () => (crono.inicio == null ? 0 : (crono.pausa ?? Date.now()) - crono.inicio);
const reloj = ms => {
  const t = Math.floor(ms / 1000), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), seg = t % 60;
  return `${h ? `${h}:${String(m).padStart(2, '0')}` : m}:${String(seg).padStart(2, '0')}`;
};

export function iniciarPonente() {
  document.body.className = 'ponente';
  document.title = 'Ponente · Devin en el día a día';
  document.body.innerHTML = `
    <header class="ponente__barra">
      <p class="ponente__lugar" data-lugar></p>
      <div class="ponente__crono">
        <p class="ponente__conexion" data-conexion role="status"></p>
        <span class="ponente__tiempo" data-tiempo role="timer" aria-label="Tiempo transcurrido">0:00</span>
        <button class="ponente__boton" data-accion="pausar"></button>
        <button class="ponente__boton" data-accion="reiniciar">Reiniciar</button>
      </div>
    </header>
    <main class="ponente__cuerpo" data-cuerpo>
      <h1 class="ponente__titulo" data-titulo></h1>
      <p class="ponente__mensaje" data-mensaje></p>
      <h2 class="ponente__rotulo" data-rotulo-actual></h2>
      <p class="ponente__idea" data-idea></p>
      <ul class="ponente__notas" data-notas aria-label="Notas del paso"></ul>
    </main>
    <p class="ponente__siguiente" data-siguiente></p>
    <footer class="ponente__pie">
      <div class="ponente__fila">
        <div class="ponente__barra-progreso"><span data-barra style="width:0"></span></div>
        <p class="ponente__progreso" data-progreso></p>
      </div>
      <nav class="ponente__mandos" aria-label="Mandos">
        <button class="ponente__boton" data-accion="retroceder" aria-keyshortcuts="ArrowLeft">${icono('arrow-left', 'icono--s')}Anterior</button>
        <button class="ponente__boton ponente__boton--principal" data-accion="avanzar" aria-keyshortcuts="ArrowRight">Siguiente${icono('arrow-right', 'icono--s')}</button>
        <button class="ponente__boton" data-accion="general" aria-keyshortcuts="O"></button>
        <button class="ponente__boton" data-accion="avanzados" aria-keyshortcuts="A"></button>
        <button class="ponente__boton" data-accion="final" aria-keyshortcuts="End">Preguntas · Fin</button>
      </nav>
    </footer>`;
  const $ = q => document.querySelector(q);
  const principal = window.opener;
  let ultimo = 0, estado = null, pintado = '', conexion = '';
  // Solo se toca el DOM si el texto cambia: el latido llega cada segundo y no debe repintar
  // ni hacer hablar al lector de pantalla.
  const poner = (q, html) => { const el = $(q); if (el.innerHTML !== html) el.innerHTML = html; };

  const enviar = tipo => {
    if (principal && !principal.closed) principal.postMessage({ marca: MARCA, tipo }, DESTINO);
  };

  const pintarCrono = () => {
    poner('[data-tiempo]', reloj(transcurrido()));
    poner('[data-accion="pausar"]', crono.inicio == null ? 'Iniciar' : crono.pausa ? 'Reanudar' : 'Pausar');
  };
  const empezarSiNoHaEmpezado = () => {
    if (crono.inicio == null) { crono = { inicio: Date.now(), pausa: null }; guardar(crono); }
  };

  const pintarConexion = () => {
    const conectada = Date.now() - ultimo < LATIDO_MS * 2.5;
    const ahora = !principal ? 'sin' : conectada ? 'si' : 'no';
    if (ahora === conexion) return;
    conexion = ahora;
    $('[data-conexion]').innerHTML = !principal
      ? `${icono('info', 'icono--s')}Abre esta vista desde la presentación con la tecla P.`
      : conectada ? `${icono('check', 'icono--s')}Conectada`
        : `${icono('triangle-alert', 'icono--s')}Sin conexión: pulsa P en la presentación`;
    document.body.classList.toggle('ponente--desconectada', !conectada);
  };

  const pintar = () => {
    const { escena: e, paso, siguiente, progreso, general, haciaGeneral, conAvanzados, minutos: m } = estado;
    $('[data-lugar]').textContent = `${e.bloque} · ${e.id}${e.minutos != null ? ` · ~${minutos(e.minutos)}` : ''}`;
    $('[data-titulo]').innerHTML = enLinea(e.titulo);
    $('[data-mensaje]').innerHTML = enLinea(e.mensaje);
    $('[data-rotulo-actual]').textContent = `Paso ${paso.n} de ${paso.total}${paso.avanzado ? ' · avanzado' : ''}${general ? ' · en la vista general' : ''}`;
    poner('[data-idea]', enLinea(paso.idea || primeraFrase(paso.texto)));
    poner('[data-notas]', (paso.notas ?? []).map(t => `<li>${enLinea(t)}</li>`).join(''));
    // Lo siguiente, en una línea: en la misma escena, su idea; en otra, su título. Al final de un
    // bloque, la próxima pulsación lleva a la vista general; la de después, a lo que se anuncia.
    const deSiguiente = siguiente && (siguiente.escena === e.id
      ? `paso ${siguiente.n}: ${siguiente.idea || primeraFrase(siguiente.texto)}`
      : `${siguiente.escena} · ${siguiente.titulo}`);
    $('[data-siguiente]').innerHTML = `<b class="texto__fuerte">Siguiente</b> · ${siguiente
      ? `${haciaGeneral ? 'vista general y, después, ' : ''}${enLinea(deSiguiente)}${siguiente.avanzado ? ' · avanzado' : ''}`
      : 'fin de la presentación'}`;
    $('[data-progreso]').textContent = `Paso ${progreso.n} de ${progreso.total} · ~${minutos(m.hastaAqui)} de ~${minutos(m.total)}`;
    $('[data-barra]').style.width = `${(progreso.n / progreso.total) * 100}%`;
    poner('[data-accion="general"]', general ? 'Volver al paso · O' : 'Vista general · O');
    poner('[data-accion="avanzados"]', `Avanzados: ${conAvanzados ? 'sí' : 'no'} · A`);
    ajustar();
  };

  // Nunca hay scroll: si el cuerpo no cabe, se compacta por grados (letra menor, sin el mensaje,
  // sin el título) hasta dejar, como resumen, los primeros detalles o solo la idea (ponente.css).
  const GRADOS = 6;
  const ajustar = () => {
    const cuerpo = $('[data-cuerpo]');
    for (let g = 0; g <= GRADOS; g++) {
      document.body.dataset.ajuste = g;
      if (cuerpo.scrollHeight <= cuerpo.clientHeight) break;
    }
  };
  addEventListener('resize', () => estado && ajustar());

  addEventListener('message', ev => {
    if (!esNuestro(ev) || ev.source !== principal || ev.data.tipo !== 'estado') return;
    const anterior = estado?.paso.ref;
    estado = ev.data.estado;
    ultimo = Date.now();
    if (anterior && anterior !== estado.paso.ref) empezarSiNoHaEmpezado();
    const huella = JSON.stringify(estado);
    if (huella !== pintado) { pintado = huella; pintar(); }
    pintarConexion();
  });

  const acciones = {
    avanzar: () => { empezarSiNoHaEmpezado(); enviar('avanzar'); },
    retroceder: () => enviar('retroceder'),
    general: () => enviar('general'),
    avanzados: () => enviar('avanzados'),
    final: () => enviar('final'),
    pausar: () => {
      const ahora = Date.now();
      if (crono.inicio == null) crono = { inicio: ahora, pausa: null };
      else if (crono.pausa) crono = { inicio: crono.inicio + ahora - crono.pausa, pausa: null };
      else crono = { ...crono, pausa: ahora };
      guardar(crono);
      pintarCrono();
    },
    reiniciar: () => {
      crono = { inicio: null, pausa: null };
      guardar(crono);
      pintarCrono();
    },
  };
  document.addEventListener('click', ev => {
    const boton = ev.target.closest('[data-accion]');
    if (boton) acciones[boton.dataset.accion]();
  });
  // El mando de presentación envía sus teclas a la ventana que tenga el foco: esta también avanza.
  addEventListener('keydown', ev => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.repeat) return;
    if ((ev.key === ' ' || ev.key === 'Enter') && ev.target.closest('button')) return;
    const accion = {
      ArrowRight: 'avanzar', ' ': 'avanzar', PageDown: 'avanzar', ArrowLeft: 'retroceder', PageUp: 'retroceder',
      o: 'general', O: 'general', a: 'avanzados', A: 'avanzados', End: 'final',
    }[ev.key];
    if (!accion) return;
    ev.preventDefault();
    acciones[accion]();
  });

  enviar('hola');
  setInterval(() => { enviar('hola'); pintarConexion(); }, LATIDO_MS);
  setInterval(pintarCrono, 250);
  pintarCrono();
  pintarConexion();
}
