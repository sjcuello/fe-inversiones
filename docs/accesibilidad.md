# Accesibilidad

  La Normativa del BCRA indica que se debe cumplir con la categoria AA definidas por la normas de accesibilidad de w3c 2008: [Pautas de Accesibilidad de Contenido Web 2.0](http://www.codexexempla.org/traducciones/pautas-accesibilidad-contenido-web-2.0.htm#ensure-compat-rsv)

## Conceptos

Las normas están organizadas es una estructura jerárquica dada por:

Principios > Pautas > Criterios > Técnicas

### Principios

Son los fundamentos de la accesibilidad web:

* Perceptibilidad
* Operabilidad
* Comprensibilidad
* Robustez

### Pautas

Son los objetivos básicos que los autores deben lograr con el objetivo de crear un contenido más accesible para los usuarios con discapacidades.

### Criterios de éxito

Permiten verificar las pautas.

### Técnicas suficientes y aconsejables

Alternativas de soluciones técnicas o aproximaciones que buscan satisfacer el criterio de éxito. 

### Conformidad

Se definen tres niveles de conformidad: A (el más bajo), AA y AAA (el más alto).


# Estrategias adoptadas

Para cada una de las pautas categorizadas como AA definimos las estrategias adoptadas.

## Principio 1: Perceptibilidad

La información y los componentes de la interfaz de usuario deben presentarse a los usuarios de la manera en que puedan percibirlos

### Pauta 1.1: Alternativas textuales

1.1.1 Contenido no textual  `DESAROLLO`

Incluir alternativas textuales a todas las imágenes.

### Pauta 1.2 Contenido multimedia dependiente del tiempo `NO APLICA`

Aún no existen requerimientos de contenido multimedia.

### Pauta 1.3 Adaptabilidad

1.3.1 Información y relaciones `DESARROLLO`

Incluir atributos en los tags HTML que describan la información y sus relaciones.

1.3.2 Secuencia significativa `DISEÑO` `DESARROLLO` 

Diseño responsive linealizable.

1.3.3 Características sensoriales `DISEÑO`

### Pauta 1.4 Distinguible

1.4.1 Empleo del color `DESARROLLO`

Incluir atributos en los tags HTML que brinden la misma información que los diferentes colores usados.

1.4.2 Control de audio `NO APLICA`

1.4.3 Contraste (mínimo) `DISEÑO`

Herramienta de cálculo de relación de contraste de colores: http://www.msfw.com/Services/ContrastRatioCalculator

1.4.4 Variar el tamaño de texto `DESARROLLO`

Comprobar que la funcionalidad de zoom del browser funcionen apropiadamente.

1.4.5 Imágenes de texto `DESARROLLO`
 
No utilizar imágenes de texto.

## Principio 2: Operabilidad

Los componentes de la interfaz de usuario y la navegación deben ser operables.

### Pauta 2.1 Accesible a través del teclado

2.1.1 Teclado `DESARROLLO`

Comprobar que cualquier operatoria se pueda hacer únicamente con el teclado.

2.1.2 Sin trampa de teclado `DESARROLLO`

Comprobar que nunca se "captura" el foco.

### Pauta 2.2 Tiempo suficiente

2.2.1 Límite de tiempo ajustable `FUNCIONALIDAD`

Avisar al usuario cuando se está a punto de vencer la sesión y permitir extenderla.

2.2.2 Pausar, detener, ocultar `DESARROLLO` `DISEÑO`

### Pauta 2.3 Ataques

2.3.1 Tres destellos o por debajo del umbral `DISEÑO`

No utilizar destellos.

### Pauta 2.4 Navegable

2.4.1 Saltar bloques `FUNCIONALIDAD`

*IDEA*: Ver el sitio https://webaim.org/, presionar *TAB* y ver cómo aparece el link para saltar al contenido.

2.4.2 Página titulada `DESARROLLO`

Todas la páginas tienen título descriptivo.

2.4.3 Orden de foco `DESARROLLO`

Garantizar el orden del foco, alineado a la funcionadad.

2.4.4 Propósito de un vínculo (en su contexto) `DESARROLLO` `DISEÑO`

Los links tienen un texto descriptivo.

2.4.5 Múltiples medios `DISEÑO`

Uno de los mecanismos es el side-menu (*Navigation Bar*).
Es necesario implementar un segundo mecanismo. 
Alternativas:
* Mapa del sitio (*Site Map*)
* Funcionalidad de búsqueda (*Search Function*)
* Tabla de contenido (*Table of Content*) 

2.4.6 Encabezados y etiquetas `DISEÑO`

2.4.7 Foco visible `DISEÑO`

## Principio 3: Comprensibilidad

La información y el manejo de la interfaz de usuario deben ser comprensibles.

### Pauta 3.1 Legible

3.1.1 Idioma de la página `DESARROLLO`

La página siempre tiene el atributo lang en el tag html.

3.1.2 Idioma de partes `NO APLICA`

El único idioma en las páginas es el español.

### Pauta 3.2 Predecible

3.2.1 Con foco `DESARROLLO`

El evento de cambio de foco (adquisión o pérdida) no se utiliza para asociarle comportamiento de cambio de contexto.

3.2.2 Con entrada de datos `DISEÑO`

3.2.3 Navegación consistente  `DISEÑO`

3.2.4 Identificación consistente `DESARROLLO`

### Pauta 3.3 Ayuda a la entrada de datos

3.3.1 Identificación de errores `DESARROLLO`

3.3.2 Instrucciones o etiquetas `DESARROLLO`

3.3.3 Sugerencia tras error `DESARROLLO` `NEGOCIO`

3.3.4 Prevención de errores (legales, financieros, de datos) `DESARROLLO` `NEGOCIO`

## Principio 4: Robustez

El contenido debe ser lo suficientemente robusto como para confiarse en su interpretación por parte de una amplia variedad de agentes de usuario, incluidas las tecnologías asistivas. 

### Pauta 4.1 Compatible

4.1.1 Interpretación `NO APLICA`

La tecnología usada garantiza la correción del HTML.


4.1.2 Nombre, rol, valor `DESARROLLO`

Definir y utilizar los atributos ARIA para todos los componentes usados.

# Lint

CLI: https://angular.io/cli/lint

## Codelyzer

Reglas del linter: http://codelyzer.com/rules/

Las reglas consideradas para accesibilidad son:

* template-accessibility-alt-text
* template-accessibility-elements-content
* template-accessibility-label-for
* template-accessibility-tabindex-no-positive
* template-accessibility-table-scope
* template-accessibility-valid-aria
* template-click-events-have-key-events
* template-mouse-events-have-key-events
* template-no-autofocus
* template-no-distracting-elements

Algunas reglas pueden personalizarse o configurarse: http://codelyzer.com/rules/
También se puede encontrar más información en: https://medium.com/ngconf/new-accessibility-rules-in-codelyzer-v5-0-0-85eec1d3e9bb

# Pruebas automáticas

Algunas alternativas disponibles:

## Ejecución en el pipeline del front-end

 Angular sugiere *protractor* como herramienta de ejecución de pruebas e2e, que levantan todo el front y ejecuta pruebas implementadas son *jasmine*. 
  * Agregamos el plugin de accesibilidad, que ejecuta las reglas de validación definidas por  **axe-core** durante las pruebas e2e. 
  * Para esas pruebas e2e usar un mock del back-for-front.
  * Escribir pruebas e2e que exploren la funcionalidad, como una suerte de smoke test del front.

* Protractor: https://www.protractortest.org/#/
* Protractor Accessibility Plugin Extendido. https://www.npmjs.com/package/protractor-axe-html-report-plugin-extended
* axe-core: https://github.com/dequelabs/axe-core

## Ejecución en el pipeline de las pruebas de aceptación

Incluir dentro del pipeline de las pruebas de aceptación (tests-obi) la ejecución de pruebas de accesibilidad sobre todas las pantallas utilizando la herramienta axe-core (Accessibility testing engine for websites user interfaces).
	
Axe-core provee 47 validaciones de accesibilidad: WCAG 2.0 Level A & AA Rules (https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules)

Estas pruebas automatizadas validan la accesibilidad a partir de la aplicación de las reglas sobre la página renderizada (desplegada en un navegador).

## Herramientas para developers

* axe - Web Accessibility Testing. Chrome plugin: https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd

* WAVE Evaluation Tool. Chrome plugin: https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh

# Pruebas manuales

Vamos a utilizar **Accessibility Insights** para guiar y registrar la ejecución de las pruebas manuales de accesibilidad. 

**PENDIENTE**: Definir cómo lo incorporamos al proceso del equipo.
* ¿Cuándo lo ejecutamos? ¿Periódicamente, al intentar liberar, al cerrar una funcionalidad? -> *Experimento*: Hacemos una corrida ahora
* ¿Quién lo ejecuta? -> *Experimento*: Noe
* ¿Qué herramienta usamos? -> *Experimento*: Accessibility Insights
* ¿Dónde registramos/publicamos los resultados? -> *Experimento*: Subimos el reporte  gitlab

## Herammientas para testing

* Accessibility Insights. Chrome plugin: https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni


# Lecturas recomendadas

* Angular and Accessibility. Making the Web Accessible by Thinking Outside the Comfort of Our Eyes. https://medium.com/dailyjs/angular-and-accessibility-8ae1f601803a

* Angular a11y: 11 tips on how to make your apps more accessible. https://indepth.dev/angular-a11y-11-tips-on-how-to-make-your-apps-more-accessible/

* How To Do an Accessibility Review https://developers.google.com/web/fundamentals/accessibility/how-to-review

# Recomendaciones para pruebas manuales

* How I do an accessibility check -- A11ycasts #11 https://youtu.be/cOmehxAU_4s


# Material adicional

* Introducing A11ycasts! -- A11ycasts. Google Chrome Developers. Lista de videos: https://www.youtube.com/watch?v=HtTyRajRuyY&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g

## Recursos sobre herramientas para verificación de accesibilidad

* https://web.dev/accessible-angular-with-codelyzer/
* https://medium.com/ngconf/new-accessibility-rules-in-codelyzer-v5-0-0-85eec1d3e9bb
* https://abstracta.us/blog/agile-testing/accessibility-testing-in-continuous-integration/
* https://webaim.org/



