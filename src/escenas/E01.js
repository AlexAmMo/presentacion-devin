// E01 · Portada y mapa. No dibuja nada propio: la portada encuadra el logo de Devin y su nombre
// en la tapa del centro (ENCUADRES 'E01/1' en mapa.js) y el paso 2 es la vista general con las
// cinco tapas (src/tapas.js). La cámara la mueve el esqueleto, como en todas las escenas.
// Lo suyo son los títulos de las tapas de fuera: hasta el paso 2 solo se ven sus iconos y, cuando
// la cámara llega a la vista general, cada icono sube y aparece su título.
export default function ({ tapas }) {
  return {
    montar() {},
    irA(n, { animar = false, tl } = {}) {
      if (animar && tl && n === 2) return void tapas.mostrarTitulos(tl);
      tapas.titulos(n >= 2);
    },
    desmontar() {},
  };
}
