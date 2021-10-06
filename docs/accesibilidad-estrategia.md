## Estrategia de Accesibilidad

La estrategia para cumplir con las normativas de accesibilidad del BCRA, que refieren a la categoria AA definidas por la normas de la w3c 2008 (http://www.codexexempla.org/traducciones/pautas-accesibilidad-contenido-web-2.0.htm) en OBI incluyen varios aspectos, a saber:

1. Incluir dentro del pipeline la ejecución de una herramienta de análisis estático (linter) sobre el código del Frontend construido en Angular. En este linter (Codelyzer: http://codelyzer.com/rules/) ejecuta las siguientes reglas:

* template-accessibility-alt-text (http://codelyzer.com/rules/template-accessibility-alt-text)
* template-accessibility-elements-content (http://codelyzer.com/rules/template-accessibility-elements-content)
* template-accessibility-label-for (http://codelyzer.com/rules/template-accessibility-label-for)
* template-accessibility-tabindex-no-positive (http://codelyzer.com/rules/template-accessibility-tabindex-no-positive)
* template-accessibility-table-scope (http://codelyzer.com/rules/template-accessibility-table-scope)
* template-accessibility-valid-aria (http://codelyzer.com/rules/template-accessibility-valid-aria)
* template-click-events-have-key-events (http://codelyzer.com/rules/template-click-events-have-key-events)
* template-mouse-events-have-key-events (http://codelyzer.com/rules/template-mouse-events-have-key-events)
* template-no-autofocus (http://codelyzer.com/rules/template-no-autofocus)
* template-no-distracting-elements (http://codelyzer.com/rules/template-no-distracting-elements)

  Estos chequeos comprueban que los componentes de la interfaz están configurados con la metainformación de accesibilidad correspondiente.

2. Incluir dentro del pipeline la ejecución de pruebas de accesibilidad sobre todas las pantallas utilizando la herramienta axe-core (Accessibility testing engine for websites user interfaces).
	
	Axe-core provee 47 validaciones de accesibilidad: WCAG 2.0 Level A & AA Rules (https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules)


  Estas pruebas automatizadas validan la accesibilidad a partir de la aplicación de las reglas sobre la página renderizada (desplegada en un navegador).

3. Instalar en todos los navegadores utilizados por developers plugins que permitan evaluar aspectos de accesibilidad.

* axe - Web Accessibility Testing. Chrome plugin: https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd

* WAVE Evaluation Tool. Chrome plugin: https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh

  Esta herramientas proveen feedback inmediato y continuo durante el proceso de desarrollo.

4. Ejecutar pruebas manuales de accesibilidad, utilizando la herramienta "Accessibility Insights" para guiar y registrar la ejecución de las pruebas manuales de accesibilidad (https://accessibilityinsights.io/docs/en/web/overview).

  El plugin de Chrome de Accessibility Insights proporciona instrucciones paso a paso y ejemplos para más de 20 pruebas. Muchas son asistidas, lo que significa que la herramienta identifica las instancias de prueba o proporciona una ayuda visual.

* Accessibility Insights. Chrome plugin: https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni




