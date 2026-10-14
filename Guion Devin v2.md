# Devin en el día a día: cómo aprovecharlo mejor y controlar el consumo

> Versión 2 revisada · 14 de octubre de 2026.
> Las indicaciones entre corchetes son notas de preparación.
> Pendiente de personalizar: modelos y tarifas de la cuenta, controles de la versión instalada y herramientas internas del departamento.

## Apertura

Buenos días. Para los que no me conozcáis, soy Alex, de MLOps, en el departamento de Data Science. Por petición popular, he decidido hacer este Show and Tell a modo de guía de introducción a Devin.

Sé que muchos de vosotros ya utilizáis Devin habitualmente para consultar código, corregir errores o implementar cambios, pero quizá aún no tenéis tan claro cuándo usar cada modelo, qué herramientas tenemos disponibles y qué trucos existen para optimizar el uso de ACUs. El objetivo de esta sesión es entender cómo tomar esas decisiones y convertirlas en hábitos útiles.

Primero repasaremos las distintas formas de utilizar Devin. Después veremos modelos, contexto, tokens y herramientas. Terminaremos con recomendaciones de trabajo y un caso práctico.

## 1. Devin Cloud, Devin Desktop y Devin CLI

Podemos trabajar con Devin desde distintas superficies. Para elegir entre ellas, conviene separar dos preguntas: desde dónde interactuamos y dónde se ejecuta el trabajo.

Desktop y CLI son interfaces distintas, mientras que Cloud nos permite ejecutar tareas en un entorno remoto. Además, pueden conectarse dentro de un mismo flujo de trabajo.

| Opción | Uso principal en esta guía | Ejemplo | Ventaja práctica |
|---|---|---|---|
| **Devin Cloud** | Delegar trabajo en un entorno remoto preparado para la tarea. | Automatizar tareas repetitivas. | Abordar trabajo multirrepositorio con los accesos y el entorno necesarios. |
| **Devin Desktop** | Trabajar desde el IDE, con el código y los cambios a la vista. | Investigar un error y revisar la solución mientras se desarrolla. | Facilitar la revisión manual de los cambios. |
| **Devin CLI** | Utilizar el agente desde la terminal e integrarlo en flujos de comandos. | Analizar un proyecto desde consola o ejecutar una tarea mediante un script. | Personalizar el flujo de trabajo mediante comandos y scripts. |

Desktop resulta cómodo cuando queremos combinar edición, navegación y revisión visual.

CLI encaja cuando nuestro trabajo ya transcurre en la terminal. También permite integrar tareas en scripts.

Cloud resulta útil cuando queremos delegar una tarea con un objetivo definido y un entorno remoto adecuado, o ejecutar periódicamente el mismo flujo de trabajo de forma autónoma.

**Transición:** Nos centraremos ahora en Desktop, que es donde trabajamos normalmente.

## 2. Devin Desktop: los controles y conceptos fundamentales

### 2.1. Agente, modelo, modo y esfuerzo

Antes de empezar, conviene distinguir cuatro elementos:

- El **agente** organiza el trabajo y dota al modelo de distintas herramientas.
- El **modo de trabajo** determina si queremos consultar, planificar o ejecutar.
- El **modelo** interpreta la información y genera decisiones y respuestas.
- El **effort**, o esfuerzo de razonamiento, regula cuánto procesamiento dedica a razonar un modelo compatible.

Son controles relacionados, pero cada uno responde a una pregunta diferente.

También debemos identificar si nuestra sesión utiliza Devin Local o Devin Cloud, porque sus funciones y configuración no son idénticas.

[Mostrar el agente activo y los modos disponibles en vuestra instalación.]

### 2.2. Dónde elegir el modelo

El selector de modelos se encuentra debajo del cuadro donde escribimos los mensajes. Antes de iniciar una tarea, debemos comprobar el modelo y el nivel de razonamiento seleccionados. En el selector también podemos consultar la información de precios disponible para nuestra cuenta.
No hace falta cambiarlo constantemente. Sí conviene hacerlo de forma consciente cuando la dificultad o las necesidades de la tarea cambian.

### 2.3. Qué es el effort

Un esfuerzo mayor permite que el agente dedique más cómputo al razonamiento. Puede ayudar ante un problema difícil, pero también aumentar la latencia y el consumo.

Para localizar una función o hacer una modificación mecánica, un esfuerzo elevado puede aportar poco. Para diagnosticar fallos en un flujo de Cefeo con multiples etapas un razonamiento alto puede ser muy útil.

Sin embargo, no debería sustituir a la preparación de un buen contexto: si falta información clave, un esfuerzo elevado no garantiza resolver esa carencia.

[Mostrar grafica de modelos y niveles de effort comparando % de exito y coste]

Los niveles configurables dependen del modelo y de las opciones habilitadas para nuestra organización.

### 2.4. Qué es el contexto

El contexto es la información que el modelo tiene disponible en una llamada. Puede incluir nuestras instrucciones, partes de la conversación, reglas del proyecto, código recuperado y resultados de herramientas.

Hay tres conceptos distintos:

- **Capacidad de contexto:** cuánto puede admitir el modelo.
- **Contexto utilizado:** cuánto se está ocupando.
- **Información relevante:** qué parte ayuda realmente a resolver la tarea.

Tener una ventana grande no significa que debamos llenarla. Conviene priorizar la información necesaria para la tarea y evitar acumular contenido irrelevante. Uno de los mayores problemas de los modelos actuales es que sufren degradacion de rendimiento cuando el contexto es muy largo, por eso merece la pena gestionarlo con cuidado.

[Localizar el indicador de contexto de vuestra versión y explicar qué mide. Pendiente de verificar su ubicación exacta.]

## 3. Modelos: diferencias, elección y coste

### 3.1. Cómo interpretar los nombres

En el selector aparecen familias de distintos proveedores: GPT de OpenAI, Claude de Anthropic y SWE de Cognition, entre otras.

Dentro de cada familia encontramos generaciones, variantes y niveles de razonamiento. Por eso conviene identificar el nombre completo.

Los nombres Luna, Terra, Sol, Sonnet, Opus o Fable no deben interpretarse como una escala universal compartida. Tenemos que comprobar qué modelo concreto representa cada opción de nuestro selector.

[Completar esta tabla con los modelos realmente habilitados.]

| Modelo exacto | Cuándo lo probaríamos | Input | Cache read | Cache write, si aplica | Output |
|---|---|---|---|---|---|
| GPT: variantes disponibles | Según dificultad y resultados del equipo | Pendiente | Pendiente | Pendiente | Pendiente |
| Claude: variantes disponibles | Según dificultad y resultados del equipo | Pendiente | Pendiente | Pendiente | Pendiente |
| SWE: variantes disponibles | Tareas de ingeniería de software | Pendiente | Pendiente | Pendiente | Pendiente |

[Expresar las tarifas en coste por millón de tokens, indicando moneda o unidad de consumo, plan y fecha de consulta.]

### 3.2. Cómo elegir

Yo utilizaría estas categorías prácticas como punto de partida, que después debemos contrastar con nuestras tareas.

| Tipo de tarea | Estrategia inicial |
|---|---|
| Localizar código o explicar una función sencilla | Opción rápida, con esfuerzo contenido. |
| Cambio pequeño y bien definido | Modelo con buen equilibrio entre calidad y consumo. |
| Diagnóstico complejo o cambio con muchas dependencias | Modelo de mayor capacidad y esfuerzo proporcionado. |
| Revisión de un cambio importante | Capacidad suficiente para analizar consecuencias y evidencia. |
| Trabajo repetitivo | Comparar varias opciones sobre casos representativos. |

El modelo con menor tarifa puede terminar costando más si necesita varios intentos. También puede ocurrir lo contrario: pagar por máxima capacidad para una tarea mecánica puede aportar poco.

La comparación útil es cuánto cuesta completar correctamente una tarea, incluyendo repeticiones y revisión.

## 4. Tokens, caché y gestión de las sesiones

### 4.1. Qué es un token

Los modelos procesan el contenido en unidades llamadas tokens. Un token puede representar una parte de una palabra, signos o fragmentos de código.

El consumo incluye más que lo que escribimos y la respuesta final. Una tarea puede implicar múltiples llamadas al modelo, lecturas de archivos, resultados de comandos y razonamiento.

Por eso un mensaje corto puede desencadenar una ejecución costosa.

### 4.2. Las cuatro categorías

Para entender las tarifas, utilizaremos cuatro categorías. No todos los proveedores ni planes las presentan del mismo modo.

| Categoría | Qué representa |
|---|---|
| **Input sin caché** | Entrada que se procesa sin reutilizar una entrada cacheada. |
| **Cache write** | Creación de una entrada reutilizable, cuando existe esa categoría de facturación. |
| **Cache read** | Entrada procesada aprovechando una caché válida. |
| **Output** | Tokens generados; el tratamiento del razonamiento depende del proveedor y modelo. |

### 4.3. Qué pagamos realmente en Devin

En Devin la unidades de gasto, las ACUs, se relacionan directamente con el consumo de tokens y el coste de cada modelo siendo el coste total en ACUs aproximadamente el coste en token + 20%. Por eso vamos a centrarnos en cómo se como ahorramos en tokens que es la medida que podemos controlar.


### 4.4. Duración y coste de la caché

Uno de los principales costes durante el desarrollo con IA es la lectura continua del contexto de una sesion. Aqui es donde entran en juego los tokens cacheados que tienen un coste de lectura normalmente de un 10% del coste de input. La duración de la caché depende del proveedor y de la configuración del agente.

Como ejemplo de API, Anthropic documenta una duración estándar de cinco minutos que se renueva al reutilizar el contenido y una opción de una hora. La escritura de cinco minutos cuesta 1,25 veces la entrada base; la de una hora, dos veces. La lectura tiene un descuento que varía por modelo.

[Referencia de caché de Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).

### 4.5. Ejemplo numérico

Veámoslo con tarifas ficticias para separar el cálculo de los precios comerciales.

Supongamos estas tarifas ficticias, expresadas en unidades de coste por millón de tokens:

| Categoría | Tarifa ficticia |
|---|---:|
| Input sin caché | 2 unidades |
| Cache write | 2,5 unidades |
| Cache read | 0,2 unidades |
| Output | 10 unidades |

Realizamos dos llamadas al modelo. En ambas necesitamos un bloque estable de 100.000 tokens, añadimos 5.000 tokens de entrada nueva y generamos 2.000 tokens de salida.

En la primera llamada escribimos el bloque estable en caché. En la segunda lo reutilizamos, suponiendo que la entrada sigue siendo válida y que se produce un acierto de caché.

| Categoría | Primera llamada | Segunda llamada | Coste total |
|---|---:|---:|---:|
| Input sin caché | 5.000 tokens → 0,010 | 5.000 tokens → 0,010 | 0,020 |
| Cache write | 100.000 tokens → 0,250 | 0 tokens → 0 | 0,250 |
| Cache read | 0 tokens → 0 | 100.000 tokens → 0,020 | 0,020 |
| Output | 2.000 tokens → 0,020 | 2.000 tokens → 0,020 | 0,040 |
| **Total** | **0,280 unidades** | **0,050 unidades** | **0,330 unidades** |

La fórmula de cada fila es: **tokens ÷ 1.000.000 × tarifa**. En este ejemplo, los tokens de escritura y lectura de caché se contabilizan aparte del input sin caché.

Sin caché, las dos llamadas procesarían 210.000 tokens de entrada ordinaria y generarían los mismos 4.000 tokens de salida:

- Input: 210.000 ÷ 1.000.000 × 2 = **0,420 unidades**.
- Output: 4.000 ÷ 1.000.000 × 10 = **0,040 unidades**.
- Total sin caché: **0,460 unidades**.

En este caso ficticio, la caché reduce el coste de 0,460 a 0,330 unidades: un ahorro de 0,130 unidades, aproximadamente un 28 %.

La primera llamada con escritura de caché cuesta más que una llamada sin caché; la reutilización posterior compensa esa diferencia. El ahorro real dependerá de las tarifas, del número de reutilizaciones y de los aciertos de caché. Este ejemplo no representa la facturación real de Devin ni incluye otros cargos.

### 4.6. Cuándo continuar, compactar o empezar de nuevo

| Situación | Decisión orientativa |
|---|---|
| Misma tarea y contexto relevante | Continuar. |
| Misma tarea con mucha exploración acumulada | Considerar compactar. |
| Nuevo objetivo independiente | Abrir una sesión nueva. |
| Conversación llena de hipótesis descartadas | Preparar un traspaso y valorar una sesión nueva. |
| Falta un dato concreto | Aportarlo; reiniciar no lo resuelve. |

Compactar reduce el historial mediante una representación más breve. Puede perder matices, por lo que interesa preservar el estado de trabajo importante.

Antes de compactar o cambiar de sesión, guardaríamos:

- Objetivo y criterios de aceptación.
- Decisiones y restricciones.
- Archivos relevantes y cambios realizados.
- Pruebas ejecutadas y resultados.
- Hipótesis descartadas y siguiente paso.

No propondría compactar siempre al alcanzar un porcentaje fijo. La decisión depende de la relevancia del contexto y del trabajo pendiente.

La CLI documenta `/compact`; su acceso desde vuestra versión de Desktop debe comprobarse. [Comandos esenciales](https://docs.devin.ai/cli/essential-commands).

**Transición:** Podemos evitar reconstruir parte de ese contexto mediante instrucciones y procedimientos reutilizables.

## 5. Rules, AGENTS.md, skills, tools y subagentes

### 5.1. Qué resuelve cada elemento

| Elemento | Para qué sirve | Ejemplo |
|---|---|---|
| **Rules** | Establecer instrucciones de comportamiento. | Seguir las convenciones del repositorio. |
| **AGENTS.md** | Guardar instrucciones del proyecto en un archivo reconocido por el agente. | Estructura, comandos y restricciones. |
| **Skill** | Definir un procedimiento reutilizable con instrucciones y recursos. | Revisar una migración siguiendo los pasos del equipo. |
| **Tool** | Permitir una acción concreta. | Leer un archivo, ejecutar un comando o consultar un servicio. |
| **MCP** | Conectar herramientas y recursos externos con el agente. | Consultar incidencias o documentación interna. |
| **Subagente** | Encargar una subtarea a otra ejecución del agente. | Investigar un módulo y devolver conclusiones. |

### 5.2. Qué guardar en AGENTS.md y en las rules

Incluiría información breve, estable y útil: estructura del proyecto, comandos de validación, convenciones y restricciones importantes.

Evitaría duplicidades, instrucciones contradictorias y grandes documentos que solo hacen falta en situaciones concretas.

En Devin Local y CLI, las instrucciones de la raíz se cargan al inicio, mientras que las de subdirectorios pueden descubrirse cuando se trabaja en ellos. Eso permite acercar las instrucciones al código al que afectan.

[Rules y AGENTS.md](https://docs.devin.ai/cli/extensibility/rules).

### 5.3. Cuándo crear una skill

Una skill tiene sentido cuando repetimos un procedimiento con pasos y criterios propios.

Por ejemplo: preparar una revisión, validar una migración o generar documentación con el formato del departamento.

Para que sea útil, debemos explicar cuándo se aplica, qué necesita, qué pasos sigue y qué resultado debe entregar. Su contenido se carga cuando corresponde, lo que permite mantener más pequeñas las instrucciones permanentes.

[Skills](https://docs.devin.ai/cli/extensibility/skills/overview).

### 5.4. Herramientas del departamento

En nuestro equipo tenemos herramientas que evitan resolver desde cero problemas ya estandarizados.

[Completar con herramientas reales; los siguientes son ejemplos de categorías.]

| Herramienta interna | Problema que resuelve | Qué mostrar |
|---|---|---|
| Consulta de documentación | Encontrar información del proyecto | Una consulta y su fuente. |
| Consulta de incidencias | Obtener contexto del trabajo | Una incidencia con criterios de aceptación. |
| Validación del proyecto | Ejecutar las comprobaciones acordadas | Un resultado y cómo interpretarlo. |
| Procedimiento de revisión | Aplicar criterios comunes | Un informe breve y accionable. |

De cada herramienta debemos saber dónde encontrarla, qué permisos necesita y quién la mantiene.

### 5.5. Subagentes: contexto separado y coste propio

Los subagentes permiten dividir una tarea. En Devin Local, cada uno trabaja en su propia conversación: comparte herramientas y contexto del repositorio, pero no hereda el historial de conversación del principal.

Eso permite que una investigación extensa se desarrolle aparte y que el principal reciba su resultado. A cambio, cada subagente realiza sus propias llamadas y consume recursos.

Por tanto, necesita contexto suficiente para su encargo, pero no tiene que recibir toda nuestra conversación.

El modelo depende del perfil: el subagente general hereda el del principal; el de exploración puede utilizar otro seleccionado por el sistema. No debemos asumir que todos cuestan igual.

[Funcionamiento y coste de los subagentes](https://docs.devin.ai/cli/subagents).

### 5.6. Cuándo compensan

Los utilizaría cuando hay partes independientes con entregables claros: investigar varios módulos, analizar compatibilidad o revisar un aspecto concreto.

Los evitaría para cambios triviales o cuando varias ejecuciones necesitarían modificar simultáneamente los mismos archivos.

Las ventajas son el trabajo enfocado, el contexto separado y, cuando corresponde, el paralelismo. Los costes son la preparación, las lecturas repetidas, la ejecución y la integración de los resultados.

También podemos perder detalles en el resumen. Por eso pediría evidencias y referencias a archivos, además de conclusiones.

Ejemplo de encargo:

> Investiga cómo se valida la sesión en el backend. No modifiques archivos. Devuelve los puntos de entrada, las comprobaciones actuales y los riesgos encontrados, con referencias al código.

Contexto separado no significa archivos aislados. Si varias tareas editan código, debemos organizar su propiedad o utilizar entornos separados cuando corresponda.

La regla práctica es utilizar subagentes cuando separar el trabajo aporte más valor que el coste de coordinarlo.

**Transición:** Ya conocemos las piezas. Ahora vamos a utilizarlas dentro de un método de trabajo.

## 6. Cómo trabajar: prompts, ejecución y revisión

### 6.1. Definir una tarea resoluble

Una petición útil responde a cinco preguntas:

1. ¿Qué resultado necesito?
2. ¿Qué contexto permite entenderlo?
3. ¿Cuál es el alcance?
4. ¿Qué restricciones hay?
5. ¿Cómo comprobaremos que funciona?

Petición inicial:

> Arregla la paginación.

Petición mejorada:

> En la tabla de clientes, al cambiar el filtro desde la página 3, la tabla queda vacía aunque existen resultados. Corrige el comportamiento para volver a la primera página cuando cambien los filtros. Empieza por el componente de tabla y la gestión de filtros. Mantén la API actual y evita cambios visuales. Verifica este caso y comprueba que la paginación normal sigue funcionando.

La segunda petición es más larga, pero reduce ambigüedad. Hemos definido el comportamiento esperado y cómo evaluarlo.

### 6.2. Aportar contexto de forma progresiva

Empezaremos por el error exacto, los pasos de reproducción y los archivos que sabemos que están relacionados.

Si no conocemos la causa, lo diremos. Podemos aportar una hipótesis sin convertirla en una orden de implementación.

Por ejemplo: «Sospecho de la gestión del estado, pero comprueba la causa antes de modificarla».

Evitaría pegar miles de líneas de logs sin filtrar. Aportaría el fragmento relevante con su contexto y dejaría accesible el resto si hace falta.

### 6.3. Planificar cuando aporte valor

Para un cambio pequeño y claro, podemos pedir ejecución directa.

Para una tarea amplia, con alternativas o dependencias importantes, conviene investigar y acordar un plan. El plan debería identificar qué cambiar, por qué, qué riesgos existen y cómo validarlo.

Su extensión debe ser proporcional a la tarea.

### 6.4. Intervenir cuando se desvía

Si vemos un supuesto equivocado, conviene corregirlo pronto con información concreta.

En lugar de «eso está mal», diríamos:

> El endpoint responde correctamente; el fallo ocurre después, al actualizar el estado del cliente. Reproduce ese paso antes de seguir cambiando el backend.

Si encadena intentos fallidos, pediremos una pausa de diagnóstico:

> Resume qué has probado, qué evidencia apoya cada hipótesis y qué información falta. No hagas más cambios hasta identificar el siguiente experimento útil.

### 6.5. Verificar y revisar

Una respuesta convincente no demuestra que el cambio funcione.

Revisaremos qué archivos cambió, si el alcance es el esperado y qué comprobaciones realizó. Para este bug, necesitamos evidencia del caso corregido y de que la paginación habitual sigue funcionando.

Las pruebas deben ser proporcionales al cambio. También debe quedar claro qué no se ha podido comprobar.

Petición de cierre:

> Resume los cambios, las comprobaciones realizadas y sus resultados. Indica cualquier limitación o punto pendiente.

### 6.6. Hábitos que generan gasto innecesario

| Hábito | Alternativa |
|---|---|
| Mezclar tareas independientes | Separarlas por objetivo. |
| Pedir que revise todo el repositorio | Delimitar la pregunta y ampliar la búsqueda cuando haga falta. |
| Repetir «prueba otra cosa» | Introducir evidencia o revisar las hipótesis. |
| Usar siempre máximo esfuerzo | Ajustarlo a la dificultad. |
| Crear muchos subagentes por defecto | Delegar partes concretas con resultados definidos. |
| Pedir informes extensos en cada turno | Solicitar decisiones, resultados y evidencia relevantes. |
| Reiniciar continuamente | Conservar el contexto útil o preparar un traspaso. |
| Eliminar validaciones para ahorrar | Elegir comprobaciones proporcionadas al riesgo. |

## 7. Caso práctico integrado

Vamos a aplicar todo al error de paginación.

### 7.1. Elegir el entorno

Trabajaremos en Desktop porque queremos reproducir el fallo localmente y revisar los cambios.

### 7.2. Elegir modelo y esfuerzo

Empezaremos con la opción habitual del equipo para cambios acotados. Escalaremos si aparecen dificultades que lo justifiquen.

### 7.3. Preparar el contexto

Aportaremos los pasos de reproducción, el comportamiento esperado y las referencias al código relevante.

### 7.4. Comprobar las instrucciones

Revisaremos las convenciones del proyecto y los comandos de validación ya disponibles.

### 7.5. Decidir si delegar

Para este bug pequeño, probablemente no necesitamos subagentes. Si descubrimos dos investigaciones independientes, podemos separar una de ellas.

### 7.6. Ejecutar y conducir

Dejaremos que investigue la causa y aplique un cambio acotado. Intervendremos si modifica componentes ajenos al problema o parte de un supuesto incorrecto.

### 7.7. Verificar

Reproduciremos el caso corregido y comprobaremos el funcionamiento habitual. Revisaremos el diff.

### 7.8. Evaluar consumo y resultado

Miraremos el consumo disponible, los intentos y el tiempo de revisión. Para comparar modelos o estrategias, repetiremos el análisis sobre tareas similares: una sola ejecución no permite concluir cuál es mejor.

[Si hay datos reales, presentar aquí una comparación. Si no los hay, mantener el caso como ejemplo del proceso.]

## Cierre

Para aprovechar mejor Devin, tenemos que tomar unas pocas decisiones de forma consciente: dónde ejecutar, qué modelo y esfuerzo utilizar, qué contexto aportar y cómo comprobar el resultado.

La caché, las skills y los subagentes pueden ayudarnos, pero su utilidad depende de la tarea y de cómo los empleemos.

Antes de empezar, podemos hacernos cinco preguntas:

- ¿Está claro el resultado que necesito?
- ¿He elegido una configuración proporcionada?
- ¿He aportado contexto relevante?
- ¿Existe una herramienta o procedimiento del equipo que deba utilizar?
- ¿Cómo sabré que el trabajo está terminado?

El objetivo es completar tareas correctas, verificables y fáciles de revisar, con menos trabajo innecesario.

## Pendientes para la siguiente revisión

- [ ] Completar los modelos y tarifas de vuestra cuenta.
- [ ] Localizar los controles en vuestra versión de Desktop.
- [ ] Incorporar herramientas reales del departamento.
- [ ] Ajustar la extensión al tiempo disponible.
