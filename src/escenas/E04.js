// E04 · El agente, vacío. No dibuja nada propio: la escena es el hub solo (src/hub.js), centrado
// en la pantalla (ENCUADRES 'E04/1': 'diagrama'), sin panel a la derecha. En su paso aparecen,
// en una animación rápida y seguida, Devin, sus herramientas y los huecos de las piezas
// (HUB.aparece en mapa.js): la navegación lo anima, como las piezas que llegan.
export default function () {
  return {
    montar() {},
    irA() {},
    desmontar() {},
  };
}
