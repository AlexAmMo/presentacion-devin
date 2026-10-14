---
target: design/design-system.html (v2)
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/ton/Desktop/Presentacion/design/design-system.html"
target_fingerprint: "sha256:d08b35d393103bae9bcfba0df1c3ed7f354a987986518a0c59ff22ae080a26b4"
target_path: /Users/ton/Desktop/Presentacion/design/design-system.html
timestamp: 2026-10-14T19-17-02Z
slug: design-design-system-html
---
Method: dual-agent (A: revisión de diseño sin navegador · B: detector CLI + detector en el navegador)

# Critique · design/design-system.html (v2)

## Veredicto de especificidad
Hecho para este producto: el contraste se calcula con las variables reales (también sobre navy) y las láminas de 1920×1080 se componen con el vocabulario de la charla. Lo genérico es el chasis de documentación (kicker, tarjetas, tablas, índice), resuelto con las variables del propio sistema.

## Heurísticas de Nielsen (27/40, aceptable)
| # | Heurística | Nota |
|---|---|---|
| 1 | Visibilidad del estado | 2 |
| 2 | Lenguaje del usuario | 3 |
| 3 | Control y libertad | 3 |
| 4 | Consistencia | 2 |
| 5 | Prevención de errores | 3 |
| 6 | Reconocer en vez de recordar | 3 |
| 7 | Flexibilidad y eficiencia | 3 |
| 8 | Estético y minimalista | 2 |
| 9 | Recuperación de errores | 3 |
| 10 | Ayuda y documentación | 3 |

## Problemas prioritarios
- [P1] La lámina «Vocabulario 6» tenía tres acentos rojos a la vez (isla actual, resaltado, parada actual del circuito).
- [P1] «Comprobaciones» daba todo en verde con defectos visibles: la descripción de `aparecer` mostraba código de motion.js y `caducarCache` listaba una variable fantasma (`--fallo`).
- [P2] Arquitectura: comprobaciones y tablas de contraste desplegadas aunque todo pase; el índice no marca la sección actual; las filas de la ficha no tienen ancla.
- [P2] La lámina E23 usaba una tabla donde escenas.md pide cuatro contadores y un total; las láminas de «Aplicado» usaban rótulos que solo existen en la página (.vh, .vet, .vregla); la columna «Escenas» solo daba identificadores.
- [P2] Semántica: la línea de puntos significa recorrido, guía y serie 4 de gráfica; huecos circulares y nodo del plugin sin nombre.

## Alertas por personaje
- Quien construye: tabla frente a contador en E23; copia la lámina con tres rojos; no puede enlazar a una fila de la ficha.
- Ponente: E09 no se abre en el visor; Espacio sobre «Cerrar» pasaba de lámina.
- Recién llegado: sin glosario; reglas duplicadas sin saber cuál manda; DESIGN.md desfasado.

## Observaciones menores
Pie de la columna Skill desalineado; servidores de anchos distintos; mapa sin número de la parte 2 y ruta que no llega al circuito; etiquetas de la demo `trazar` y marcadores de la lámina 5 que se pisan; descripción de cada barra de espaciado ambigua; modificadores BEM partidos en la ficha; curvas que no casan con su duración en atenuar, avivar, pulsar y caducarCache; ✕ y ≥ en Outfit; visor sin encierro de foco ni retorno; --doc-mini a 13 px; −69 % frente a 1,36/0,43 visibles (68 %).

## Detector (B)
CLI: 0 hallazgos principales; avisos de radio (valores de la página) y rayas repetidas (patrón funcional del razonamiento). Navegador: text-overflow real en la demo `aparecer`; line-length en textos largos de la página; el resto, falsos positivos (gray-on-color sobre navy a 9,8:1, tight-leading de titular, cramped-padding de capa, text-occlusion de la cifra, em-dash contando `--` de variables).

## Preguntas
1. ¿Subir las láminas por encima de comprobaciones y color (hoja de contactos arriba)?
2. ¿La guía merece su propio trazo (línea fina continua) antes de construir E03?
3. ¿La columna «Escenas» debe salir de escenas.md? (aplicado: títulos y comprobación)
