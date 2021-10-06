# Decisiones

## Racional de la selección de Angular

### Aspectos considerados

  * Soporte a accesibilidad
  * Conocimiento del equipo.
  * Capacidad del banco para conseguir proveedores que manejen la tecnología (full-stack).
  * Madurez.
  * Soporte de una gran comunidad. 
  * Existe una gran cantidad de material de estudio.
  * Impulsado por Google.
  * Releases semestrales. 
  * Retrocompatibilidad entre versiones.
  * Soporte para PWA nativo.
  * Está incluído el controler y el mapping con los servicios dentro del mismo framework.
  * La construcción está basada en templates, teniendo separada la clase (typescript), los estilos (css) y la estructura de una componente (xhtml).
  * No requiere de múltiples plugins para hacer tareas básicas. Simplifica la gestión de versiones y la convivencia.
  * Orientado a la construcción de pruebas unitarias desde la creación de los componentes.

## Racional de la selección de Angular Material

El equipo seleccionó una biblioteca de componentes que le permita resolver problemas recurrentes en el diseño de la interfaz de una manera eficiente.

### Componentes

Algunos de los componentes que se proyectan utilizar son, por ejemplo:

 * Paneles y Tarjetas 
 * Combos, Sliders, Selectores múltiples
 * Botones
 * Notificaciones
 * Tablas
  - Paginación
  - Carga tardía
  - Ordenamiento
 * Iconos
 * Temas
 * Distribución de elementos en la pantalla
  - tamaño
	- alineación
	- responsividad

### Aspectos a tener en cuenta

 * Evolución de las tecnologías web
 * Evolución de Angular
 * Soporte en múltiples browser
 * Convivencia de componentes

### Costo 

Algunos de los costos evaluados son:

 * Aprender a utilizarla
  - Conocer la paleta de componentes
  - Entender cuál es la visión de quien la construyó  
 * Mantenerla actualizada
  - Aprovechar las mejoras, actualizaciones y correcciones
 * Respetar las restricciones
  - Moverse dentro de las libertades que la biblioteca ofrece

### Alternativas

Se evaluaron 3 de las bibliotecas más usadas en la industria:

 * Angular Material
 * PrimeNG
 * ngx-bootstrap

### Selección

Fue seleccionada la biblioteca de componentes Angular Material porque:

 * Está desarrollada y mantenida por Google, el mismo proveedor que Angular
 * Algunos miembros del equipo tienen experiencia previa en utilizarla
 * Tiene documentación extensiva
 * Tiene una gran comunidad que la utiliza y brinda soporte

## Implementación swipper / carrousel

1. SnapScroll: 
(+) es css nativo, no estamos dependiendo de ninguna librería adicional, posiblemente tengamos más control de las cuestiones de accesibilidad(-) es relativamente novedoso, podría no funcionar en todos los dispositivos, entonces habría que armar un fall-back (js para detectarlo y luego el estilo a aplicar)

2. Utilizar una librería 

(+) Brinda más posibilidades, en general son javascript puro. Ejemplos: swiperjs, angular universwiper 
(-) Introducimos una dependencia externa adicional, hay que aprender a usarlo. Posiblemente tengamos que prestar atención especial al tema de accesibilidad

Se decidió ir por la opción (1).

## Librería para manejo de sesión

Consideramos 3 opciones:
* https://www.npmjs.com/package/bn-ng-idle
* https://www.npmjs.com/package/angular-user-idle
* https://www.npmjs.com/package/@ng-idle/core

Analizamos:
* Cantidad de descargas
* Frecuencia de actualización
* Documentación

Adicionalmente consideramos que si hacemos una integración modular, debería ser relativamente simple reemplazar la libreria inicialmente elegida por alguna otra.

Finalmente nos inclinamos por utilizar ng-idle por ser la más utilizada, tiene varias versiones y contar con buena documentación.


## Warnings en el frontend

Decidimos por el momento ignorar los siguientes warnings arrojados por npm install --no-optional:

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: nan@2.14.0 (node_modules\nan):
npm WARN network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/nan/-/nan-2.14.0.tgz failed, reason: read ECONNRESET
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: bindings@1.5.0 (node_modules\bindings):
npm WARN network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz failed, reason: read ECONNRESET
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: file-uri-to-path@1.0.0 (node_modules\file-uri-to-path):
npm WARN network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz failed, reason: read ECONNRESET
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules\webpack-dev-server\node_modules\fsevents):
npm WARN network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/fsevents/-/fsevents-1.2.11.tgz failed, reason: read ECONNRESET
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.2 (node_modules\fsevents):
npm WARN network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/fsevents/-/fsevents-2.1.2.tgz failed, reason: read ECONNRESET
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules\watchpack\node_modules\fsevents):
npm WARN network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/fsevents/-/fsevents-1.2.11.tgz failed, reason: read ECONNRESET

Decidimos por el momento no atacar los siguientes warnings arrojados por npm test:

WARN: ''mat-card' is not a known element:
1. If 'mat-card' is an Angular component, then verify that it is part of this module.
2. If 'mat-card' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suWARN: ''mat-card-header' is not a known element:
1. If 'mat-card-header' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-header' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 7 of 24 SUCCESS (0 secs / 0.045 secs)
WARN: ''mat-card-header' is not a known element:
1. If 'mat-card-header' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-header' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this componenWARN: ''mat-card-title' is not a known element:
1. If 'mat-card-title' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-title' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 7 of 24 SUCCESS (0 secs / 0.045 secs)
WARN: ''mat-card-title' is not a known element:
1. If 'mat-card-title' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-title' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this componentWARN: ''mat-icon' is not a known element:
1. If 'mat-icon' is an Angular component, then verify that it is part of this module.
2. If 'mat-icon' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 7 of 24 SUCCESS (0 secs / 0.045 secs)
WARN: ''mat-icon' is not a known element:
1. If 'mat-icon' is an Angular component, then verify that it is part of this module.
2. If 'mat-icon' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suWARN: ''mat-card-content' is not a known element:
1. If 'mat-card-content' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-content' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 7 of 24 SUCCESS (0 secs / 0.045 secs)
WARN: ''mat-card-content' is not a known element:
1. If 'mat-card-content' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-content' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this componeWARN: ''mat-card-actions' is not a known element:
1. If 'mat-card-actions' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-actions' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 7 of 24 SUCCESS (0 secs / 0.045 secs)
WARN: ''mat-card-actions' is not a known element:
1. If 'mat-card-actions' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-actions' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this componeWARN: ''app-cliente' is not a known element:
1. If 'app-cliente' is an Angular component, then verify that it is part of this module.
2. If 'app-cliente' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 8 of 24 SUCCESS (0 secs / 0.105 secs)
WARN: ''app-cliente' is not a known element:
1. If 'app-cliente' is an Angular component, then verify that it is part of this module.
2. If 'app-cliente' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component toWARN: ''app-cuenta' is not a known element:
1. If 'app-cuenta' is an Angular component, then verify that it is part of this module.
2. If 'app-cuenta' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 8 of 24 SUCCESS (0 secs / 0.105 secs)
WARN: ''app-cuenta' is not a known element:
1. If 'app-cuenta' is an Angular component, then verify that it is part of this module.
2. If 'app-cuenta' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to WARN: 'Can't bind to 'TipoCuenta' since it isn't a known property of 'app-cuenta'.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 8 of 24 SUCCESS (0 secs / 0.105 secs)
WARN: 'Can't bind to 'Moneda' since it isn't a known property of 'app-cuenta'.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 8 of 24 SUCCESS (0 secs / 0.105 secs)
WARN: 'Can't bind to 'Numero' since it isn't a known property of 'app-cuenta'.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 8 of 24 SUCCESS (0 secs / 0.105 secs)
WARN: 'Can't bind to 'Saldo' since it isn't a known property of 'app-cuenta'.'
Chrome 80.0.3987 (Windows 10.0.0): Executed 8 of 24 SUCCESS (0 secs / 0.105 secs)
WARN: ''router-outlet' is not a known element:
1. If 'router-outlet' is an Angular component, then verify that it is part of this module.
2. If 'router-outlet' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'

Luego de la inclusión de la biblioteca angular-google-tag-manager decidimos ignorar los dos nuevos WARN que aparecieron al hacer npm install por tratarse de advertencias que deberán ser corregidas en próximas versiones de la biblioteca dado que fue construía para angular 8.2 y nosotros usamos angular 9.

npm WARN angular-google-tag-manager@1.1.1 requires a peer of @angular/common@^8.2 but none is installed. You must install peer dependencies yourself.
npm WARN angular-google-tag-manager@1.1.1 requires a peer of @angular/core@^8.2 but none is installed. You must install peer dependencies yourself.
