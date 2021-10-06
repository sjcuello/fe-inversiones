export const CONSTANTES = {
  PAGINA: {
    HOME_DOLAR_MEP: {
      DISCLAIMER: {
        TEXTO_PRINCIPAL: '¿Qué es el Dólar Mep?',
        // tslint:disable-next-line: max-line-length
        TEXTO_SECUNDARIO: 'Es la operación que permite obtener dólares a partir de la compra de un bono con pesos y su liquidación por dólares'
      },
      TABS: {
        PRIMERA: 'Órdenes activas',
        SEGUNDA: 'Historial de Órdenes'
      },
      COTIZACION: {
        TEXTO_PRINCIPAL: 'Cotización de referencia',
        // tslint:disable-next-line: max-line-length
        TOOLTIP: 'DÓLAR MEP Son las operaciones que permiten recibir dólares a partir de la compra de un bono con pesos y su posterior venta en dólares.',
        ERROR: 'Cotización de referencia no disponible'
      },
      PASOS: {
        PRIMERO: {
          PASO: 1,
          TITULO: '1. Iniciar',
          INFO: 'En este primer paso, podés crear una nueva solicitud de compra del bono AL30',
          TOOLTIP: 'Es un bono que se puede comprar con pesos, y al siguiente día hábil lo podés vender por dólares.',
          BOTON: '+ Nueva orden de compra'
        },
        SEGUNDO: {
          PASO: 2,
          TITULO: '2. Esperar',
          INFO: 'Cuando tengas nominales del bono AL30 en período de parking, las vas a ver aquí',
          // tslint:disable-next-line: max-line-length
          TOOLTIP: 'El parking es un plazo mínimo de tiempo en el que los bonos adquiridos deben permanecer en la cartera del comprador antes de ser vendidos.',
          // tslint:disable-next-line: max-line-length
          TOOLTIP_PARKING: 'La espera corresponde al parking, que es un plazo mínimo de tenencia de los títulos, establecido por la Comisión Nacional de Valores.',
          TOOLTIP_SIN_TENENCIA: 'El parking es un plazo mínimo de tenencia, establecido por el Banco Central.',
          // tslint:disable-next-line: max-line-length
          TOOLTIP_ESTIMADOS: 'Hablamos de estimación porque hay un tiempo de espera obligatorio para la venta de bonos por dólares en el que la cotización puede variar',
          PARKING: 'En parking hasta el próximo día hábil',
          TENENCIA: 'Mi tenencia',
          NOMINALES: 'NOMINALES',
          NO_PARKING: 'No tenés bonos en parking',
          SIN_TENENCIA: 'No podemos traer tu tenencia. Por favor intenta más tarde.',
          ESTIMADOS: 'estimados'
        },
        TERCERO: {
          PASO: 3,
          TITULO: '3. Acreditar',
          INFO: 'Una vez finalizado el parking, aquí verás tu tenencia de bonos disponbles para la venta.',
          INFO_ACREDITADO: 'Tenés nominales del bono AL30 disponibles para vender a cambio de dólares',
          // tslint:disable-next-line: max-line-length
          TOOLTIP: 'Hablamos de estimación porque hay un tiempo de espera obligatorio para la venta de bonos en dólares en el que su cotización puede variar.',
          NO_ACREDITADO: 'No tenés bonos disponibles para vender',
          BOTON: 'Vender títulos por dólares',
          CONTADO_INMEDIATO: 'Contado inmediato',
          PRECIO_MERCADO: 'Precio mercado',
          ACREDITADO: 'Acreditado en tu cuenta',
          NOMINALES: 'NOMINALES AL30',
          DOLARES: 'DÓLARES ESTIMADOS',
          SOLICITUD_VENTA_TITULO: 'La venta de bonos se realizó con éxito.',
          SOLICITUD_VENTA_SUBTITULO: 'Los dólares se verán acreditados en ',
          TU_CUENTA: 'tu cuenta.'
        }
      },
      // tslint:disable-next-line: max-line-length
      ACLARACION: 'En caso de querer vender tus bonos a pesos o cualquier consulta comunicate con nuestro centro intergral de inversiones al 0810-122-8686 de lunes a viernes de 10 a 17hs.',
      // tslint:disable-next-line: max-line-length
      OPERACIONES: 'La totalidad de las operaciones son efectuadas a través de InvertirOnline S.A.U. Agente de Liquidación y Compensación N 273/CNV. ',
      TTCC: 'Descargar términos y condiciones'
    },
    COMPRA_DOLAR_MEP: {
      TITULO: 'Compra dólar MEP',
      PASOS: {
        SOLICITA: 'Iniciar',
        ESPERA: 'Esperar',
        ACREDITA: 'Acreditar'
      },
      COTIZACION: 'Cotización actual u$s 1,00 = $',
      PRIMER_PASO: 'Elegí de que cuenta querés que se realice la compra de <span>Dólar MEP IOL</span>',
      SEGUNDO_PASO: 'Elegí cuanto querés invertir',
      TERCER_PASO: 'Revisá bien los datos antes de confirmar la solicitud de compra:',
      ERROR: {
        CUENTA: 'Para realizar esta operación necesitas un saldo mínimo de'
      },
      LABEL_DROPDOWN: 'Cuenta de Origen',
      CANTIDAD_DOLARES: 'Dólares aproximados',
      RECORDATORIO: 'Recordá que estos valores pueden variar después del parking.',
      DETALLE_SOLICITUD: {
        TITULO: 'Revisá bien los datos antes de confirmar la compra del bono AL30.',
        CUENTA: 'Cuenta a debitar',
        IMPORTE: 'Importe a debitar',
        DOLARES: 'Dólares aproximados a comprar',
        DEBITO: 'Pesos totales a debitar de N°',
        DERECHOS_MERCADO: 'Derechos de mercado',
        COMISION: 'Comisión compra AL30',
        PESOS: 'Pesos destinados a la compra del bono AL30',
        DOLARES_SOLICITADOS: 'Dólares solicitados estimados',
        // tslint:disable-next-line: max-line-length
        TOOLTIP: 'Es estimado porque debés esperar hasta las 11 A.M. del siguiente día hábil para realizar la acreditación de estos dólares.',
        MODALIDAD: 'Modalidad',
        INFO_MODALIDAD: 'Contado inmediato a precio mercado',
        // tslint:disable-next-line: max-line-length
        ACLARACION_INICIO: 'Al momento de realizar la venta de los bonos (paso 3, “Acreditar”), vamos a pedirte que firmes una declaración jurada que indique que cumplís con los ',
        REQUISITOS_LINK: 'requisitos',
        ACLARACION_FINAL: ' para realizar la operatoria.',
        INICIO_CHECKBOX_INICIO: 'Declaro y juro que cumplo con los ',
        TEXTO_LINK_CHECKBOX: 'requisitos necesarios ',
        INFO_CHECKBOX_FIN: 'para realizar esta operatoria.',
        ARIA_CHECKBOX: 'Checkbox de aceptacion de la declaracion jurada de los requisitos necesarios',
        PLAZO: {
          LABEL: 'Plazo de compra',
          DESCRIPCION: 'Contado inmediato'
        }
      },
      EXITO: {
        TITULO: 'Creaste la solicitud, ahora hay que esperar',
        // tslint:disable-next-line: max-line-length
        SUBTITULO: 'Estamos comprando los nominales que solicitaste. Una vez concretada esta operación, vas a verlos reflejados en el paso 2 de la pantalla de órdenes activas.',
        PIE: 'Podrás realizar la acreditación el próximo día hábil'
      }
    },
    VENTA_DOLAR_MEP: {
      TITULO: 'Compra dólar MEP',
      PASOS: {
        SOLICITA: 'Iniciar',
        ESPERA: 'Esperar',
        ACREDITA: 'Acreditar',
        NUMERO: 'PASO 3'
      },
      CUENTA_DOLARES: 'Seleccioná en que cuenta querés acreditar tus dólares',
      CUENTA_PESOS: 'Elegí desde qué cuenta querés pagar los derechos de mercado',
      ACLARACION_DERECHOS: 'Es un monto mínimo que se cobra por operar en la bolsa y representa el 0,01% del valor total de la operación.',
      LABEL_DROPDOWN: {
        DOLARES: 'Cuenta en Dólares',
        PESOS: 'Cuenta en Pesos'
      },
      DETALLE_CONFIRMACION: {
        TITULO: 'Revisá bien los datos antes de confirmar las solicitud de venta:',
        RECORDATORIO: 'RECORDÁ QUE EL MONTO DE DÓLARES A ACREDITAR ES ESTIMADO',
        DOLARES_ACREDITAR: 'Dólares a acreditar en N°',
        ESTIMADO: 'Monto estimado venta AL30D',
        COMISION: 'Comisión venta',
        PESOS_DEBITAR: 'Pesos a debitar de N°',
        INFO_PESOS: 'Derechos de mercado',
        TOOLTIP: 'Las comisiones y los derechos de mercado son montos pequeños que se cobran por operar en la bolsa.',
        MODALIDAD: 'Modalidad',
        INFO_MODALIDAD: 'Contado inmediato a precio mercado',
        INFO_CHECKBOX_INICIO: 'Declaro y juro que cumplo con los ',
        TEXTO_LINK_CHECKBOX: 'requisitos necesarios ',
        INFO_CHECKBOX_FIN: 'para realizar esta operatoria.'
      },
      EXITO: {
        TITULO: 'Creaste la solicitud de venta',
        SUBTITULO: 'Esta operación puede tardar unos minutos, te vamos a avisar cuando los dólares hayan sido acreditados en tu cuenta.'
      }
    },
    HOME_INVERSIONES: {
      TITULO: 'Inversiones',
      PLAZO_FIJO: {
        TITULO: 'Plazos fijos',
        DESCRIPCION: 'Obtené ganancias fijas separando una suma de dinero durante un período de tiempo definido.'
      },
      CAMBIO_MONEDA: {
        TITULO: 'Cambio de moneda',
        DESCRIPCION: 'Convertí tus pesos a otras monedas u obtené pesos a partir de otras divisas.'
      },
      FONDOS_COMUNES: {
        TITULO: 'Fondos Comunes de Inversión',
        DESCRIPCION: 'Con una inversion mínima, accedé a una cartera diversificada y administrada por profesionales.'
      },
      TITULO_ACCIONES: {
        TITULO: 'Titulos y acciones',
        DESCRIPCION: 'Generá rentabilidad comprando acciones de una organización o deuda de una compañía.'
      },
      CAJA_SEGURIDAD: {
        TITULO: 'Caja de seguridad',
        DESCRIPCION: 'Guardá tus objetos de valor con la máxima seguridad.'
      },
      BANCA_PATRIMONIAL: {
        TITULO: 'Banca Patrimonial',
        DESCRIPCION: 'Accedé a un servicio exclusivo de asesoramiento financiero profesional' +
          'pensado para ayudarte a optimizar el rendimiento de tus inversiones y planificar tu futuro.'
      },
      DOLAR_MEP: {
        TITULO: 'Compra de dólar MEP',
        DESCRIPCION: '¡ Próximamente !'
      },
      PRODUCTO: {
        ID: 'INVERSIONES'
      },
      PIE_CARD: 'JUNTO CON '
    },
    DECLARACION_JURADA: {
      TITULO: 'Declaración Jurada',
      // tslint:disable
      CONTENIDO: `A los fines de la venta de títulos valores con liquidación en moneda extranjera (Comunicaciones “A” 6993, 7001, 7006, 7030, 7082, 7106 y
              7142 del B.C.R.A. y Resoluciones Generales N°856, 871 y 878 de la C.N.V), declaro bajo juramento que: (a) no soy tomador de un
              "Crédito a Tasa Cero" o de un “Crédito a Tasa Cero Cultura” (Decreto N° 332/2020 y modificatorias), ni de una financiación de la
              Comunicación "A" 6937 y complementarias del B.C.R.A. y ni de una financiación conforme a los puntos 2 y 3 de la Comunicación “A” 7006 y
              complementarias del B.C.R.A (es decir, a los denominados préstamos “tasa 24%” para sujetos no informados en la Central de Deudores del
              “Sistema Financiero” que administra el B.C.R.A.), ni de un “Crédito a Tasa Subsidiada para Empresas” conforme al Punto 1. de la
              Comunicación “A” 7082 del B.C.R.A.; (b) no soy beneficiario de lo dispuesto en el punto 4 de la Comunicación "A" 6949 y complementarias
              del B.C.R.A. y/o en el artículo 2º del Decreto Nº 319/20, conforme al Punto 2 de la Comunicación “A” 7106 del B.C.R.A.; (c) no he
              realizado operaciones que correspondan a egresos (incluyendo canjes o arbitrajes) en el mercado libre de cambios, dentro de los 90 días
              corridos previos al día de la fecha; (d) no me encuentro alcanzado por ninguna restricción legal o reglamentaria para efectuar la presente
              operación; (e) conozco y acepto que la acreditación de los fondos derivados de la venta de los títulos valores objeto de la presente en una
              cuenta bancaria en moneda extranjera puede resultar denegada y/o demorada en virtud de las disposiciones establecidas por la Comunicación “A”
              7105 del B.C.R.A.; (f) los valores negociables que son objeto de la presente instrucción de venta con liquidación en moneda extranjera (i)
              en jurisdicción local, los he mantenido en mi cartera por un plazo igual o superior a 1 (un) día hábil o (ii) en el caso de liquidación en
              jurisdicción extranjera, los he mantenido en mi cartera por un plazo igual o superior a los 3 (tres) días hábilesen ambos casos contados desde
              su acreditación en el agente depositario, no siendo de aplicación lo declarado en este punto f. cuando se trate de compras de valores
              negociables con liquidación en moneda extranjera o de venta de valores negociables con liquidación en moneda local; g) en caso de tratarse la
              presente de una operación de venta de valores negociables de renta fija nominados y pagaderos en dólares estadounidenses emitidos por la
              República Argentina bajo Ley local y de tratarse de cuentas no alcanzadas por lo dispuesto en artículo 5° del Capítulo V del Título XVIII
              "DISPOSICIONES TRANSITORIAS" de las NORMAS (N.T. 2013 y mod.), considerando la operación a realizar, la cantidad de valores negociables a
              vender con liquidación en moneda extranjera y en jurisdicción extranjera no es superior, al cierre de cada semana del calendario, a CIEN MIL
              (100.000) nominales respecto de la cantidad de valores negociables comprados con liquidación en dicha moneda y jurisdicción (operando dicho
              límite para cualquier cuenta comitente de la cual sea titular como en las que sea cotitular); y h) no soy beneficiario de programas dispuestos
              por organismos públicos vinculados a empleadores en virtud de los cuales se hubiere establecido mi prohibición para la celebración de la
              operación a la que refiere la presente declaración.`,
      ANCHO: '610px',
      ALTO: '470px'
    },
    // tslint:enable
    REQUISITOS_OPERACION: {
      TITULO: 'Requisitos para operar Dólar MEP',
      // tslint:disable
      CONTENIDO: `Aclaración: Tener en cuenta que para realizar ventas de títulos valores con liquidación en moneda extranjera (Comunicaciones “A” 6993, 
                  7001, 7006, 7030, 7082, 7106, 7142, 7327 y complementarias del B.C.R.A. y Resoluciones Generales N°856, 871, 878, 895 y complementarias 
                  de la C.N.V.), deberás declarar bajo juramento que: (a) no sos tomador de un “Crédito a Tasa Cero” o de un “Crédito a Tasa Cero Cultura” 
                  (Decreto N° 332/2020 y modificatorias), ni de una financiación de la Comunicación “A” 6937 y complementarias del B.C.R.A., ni de una 
                  financiación conforme a los puntos 2 y 3 de la Comunicación “A” 7006 y complementarias del B.C.R.A (es decir, a los denominados préstamos 
                  “tasa 24%” para sujetos no informados en la Central de Deudores del “Sistema Financiero” que administra el B.C.R.A.), 
                  ni de un “Crédito a Tasa Subsidiada para Empresas” conforme al Punto 1. de la Comunicación “A” 7082 del B.C.R.A.; (b) no sos beneficiario 
                  de lo dispuesto en el punto 4 de la Comunicación "A" 6949 y complementarias del B.C.R.A. y/o en el artículo 2º del Decreto Nº 319/20, 
                  conforme al Punto 2 de la Comunicación “A” 7106 del B.C.R.A.; (c) no has realizado operaciones que correspondan a egresos (incluyendo 
                  canjes o arbitrajes) en el mercado libre de cambios, dentro de los 90 días corridos previos al día de la fecha; (d) no te encontrás 
                  alcanzado por ninguna restricción legal o reglamentaria para efectuar las operaciones y/o transferencias requeridas; (e) conoces y 
                  aceptas que la acreditación de los fondos derivados de la venta de los títulos valores objeto de la presente en una cuenta bancaria 
                  en moneda extranjera puede resultar denegada y/o demorada en virtud de las disposiciones establecidas por la Comunicación “A” 7105 
                  del B.C.R.A.; (f) los valores negociables que serán objeto de la instrucción de venta con liquidación en moneda extranjera (i) en 
                  jurisdicción local, los has mantenido en tu cartera por un plazo igual o superior a 1 (un) día hábil (no siendo de aplicación esta 
                  declaración cuando se trate de compras de valores negociables con liquidación en moneda extranjera) o (ii) en el caso de liquidación 
                  en jurisdicción extranjera, los has mantenido por un plazo igual o superior a los 2 (dos) días hábiles (no siendo de aplicación esta 
                  declaración cuando se trate de compras de valores negociables con liquidación en moneda extranjera y en jurisdicción extranjera), 
                  en ambos casos contados desde su acreditación en el agente depositario. Tampoco será de aplicación esta declaración en el caso de 
                  venta de valores negociables con liquidación en moneda local; g) en caso de operaciones en el segmento de concurrencia de ofertas 
                  con prioridad precio tiempo de compraventa de valores negociables de renta fija nominados y pagaderos en dólares estadounidenses 
                  emitidos por la República Argentina y de tratarse de cuentas no alcanzadas por lo dispuesto en el artículo 5° del Capítulo V del 
                  Título XVIII "DISPOSICIONES TRANSITORIAS" de las NORMAS (N.T. 2013 y mod.), para el conjunto de esos valores negociables, al cierre 
                  de cada semana del calendario, la cantidad de valores negociables vendidos con liquidación en moneda extranjera y en jurisdicción 
                  extranjera no podrá ser superior -considerando la operación a realizar- a: i) CINCUENTA MIL (50.000) nominales respecto de la cantidad 
                  de valores negociables, emitidos bajo ley local, comprados con liquidación en dicha moneda y jurisdicción, y ii) CINCUENTA MIL (50.000) 
                  nominales respecto de la cantidad de valores negociables, emitidos bajo ley extranjera, comprados con liquidación en dicha moneda y 
                  jurisdicción, operando dichos límites para cualquier cuenta comitente que seas titular como en las que fueras cotitular; y h) no sos 
                  beneficiario de programas dispuestos por organismos públicos vinculados a empleadores en virtud de los cuales se hubiere establecido 
                  una prohibición para la celebración de la operación a la que refiere la presente declaración.`,
      ANCHO: '610px',
      ALTO: '470px'
    }
    // tslint:enable
  },
  ONBOARDING: {

    ACTIVIDAD_LABORAL: {
      TITULO: 'Actividad laboral',
      SELECCION_ACTIVIDAD: 'Seleccioná una actividad',
      // tslint:disable-next-line: max-line-length
      TOOLTIP_PERSONA_EXPUESTA: 'Son las Personas Físicas o Jurídicas obligadas a informar a la UIF su situación financiera, con el fin de prevenir el lavado de dinero y la financiación del terrorismo, tal como lo establece el artículo 20 de la Ley N° 25.246 y modificatorias.',
      TOOLTIP_SUJETO_OBLIGADO: 'Son las Personas Físicas y Jurídicas señaladas en el artículo 20 de la Ley N° 25.246 y modificatorias.',
      INDICAR_MOTIVO: 'Indicar motivo',
      INCLUIR_DESCRIPCION: 'Incluí una descripción de hasta 60 caracteres',
      ERROR_CANT_CARACTERES: 'Pasaste el máximo de 60 caracteres.',
      FORMATO_PDF: 'El formato debe ser PDF.',
      RESIDENTE_ARGENTINO: '¿Sos residente tributario fuera de Argentina?',
      LEY_AFIP: 'Conocé mas sobre la ley FATCA y la resolución N. 4.056 (AFIP)',
      PAIS_RESIDENCIA: 'País de Residencia Fiscal',
      SELECCION_PAIS: 'Selecciona un país',
      DIRECCION: 'Dirección completa',
      CIUDAD: 'Ciudad',
      ESTADO: 'Estado',
      COD_POSTAL: 'Código Postal',
      ID_TRIBUTARIO: 'Nro. de Identificación Tributaria',
      CIUDADANIA: 'País de Ciudadanía',
    },
    GENERICOS: {
      ACEPTAR_SEGUIR: 'Aceptar y seguir',
      ACEPTAR: 'Aceptar',
      VOLVER_ATRAS: 'Volver atrás',
      CAMPO_OBLIGATORIO: 'Este campo es obligatorio',
      CONTINUAR: 'Continuar',
      VOLVER_HOME_INVERSIONES: 'Volver a inversiones'
    },
    MODALES: {
      TITULO_TTCC_SPV: 'Términos y Condiciones',
      TTCC_SPV: 'spv',
      TITULO_TTCC_IOL: 'Términos y Condiciones',
      TTCC_IOL: 'iol',
      TITULO_FACTA: 'Conocé más sobre la ley FATCA',
      TTCC_FACTA: `1. FATCA: Ley de Cumplimiento Fiscal de Cuentas Extranjeras
      La Foreign Account Tax Compliance (&quot;FATCA&quot;), es una ley aprobada por el Congreso de los
      Estados Unidos en marzo de 2010 y efectiva desde el 1 de julio de 2014, que apunta a
      combatir la evasión impositiva por contribuyentes estadounidenses con cuentas financieras en
      el exterior.
      La misma, requiere que entidades extranjeras identifiquen contribuyentes estadounidenses
      que, directa o indirectamente, posean cuentas financieras en el exterior y por lo tanto reporten
      determinada información al Internal Revenue Service (en adelante, &quot;IRS&quot;). El no cumplimiento
      impone una retención impositiva del 30% sobre ciertos pagos que se originen en o se cursen
      por corrresponsales de los Estados Unidos.
      Quienes son considerados &quot;US Persons&quot;?
      · Ciudadanos estadounidenses, aun si no residen en los Estados Unidos.
      · Personas físicas que cuentan con doble nacionalidad (estadounidense y otra).
      · Personas físicas residentes en forma permanente en los Estados Unidos (o sea
      poseedores de &quot;Green Card&quot;).
      · Personas físicas que hayan permanecido en los Estados Unidos por una cantidad de
      días en los últimos años, en cuyo caso aplican las reglas de la &quot;Prueba de Presencia
      Sustancial&quot; (*).
      · Personas jurídicas organizadas bajo las leyes de Estados Unidos.
      · Sociedades extranjeras, cuando uno o más U.S. Persons posean una participación sobre
      el capital que represente el 10 % o más del total.
      (*) Prueba de Presencia Sustancial:
      · 31 días durante el presente año, y
      · En los 3 últimos años (incluido el presente año) un número total, igual o superior a 183
      días, computados de la siguiente manera:
      · a. Todos los días que ha permanecido en los Estados Unidos en el año en curso.
      · b. 1/3 de los días que ha permanecido en los Estados Unidos en el año precedente y
      · c. 1/6 de los días que ha permanecido en los Estados Unidos en el segundo año precedente.
      InvertirOnline se encuentra registrado ante el Internal Revenue Service (IRS) de los Estados
      Unidos bajo el número de GIIN: 907LZP.99999.SL.032
      Por cualquier otra consulta, contacte a su asesor tributario o visite el sitio web del IRS:
      www.irs.gov
      2. Resolución General N° 3826 - AFIP
      Establece un Régimen de Información y de Debida Diligencia dirigido a las Instituciones
      Financieras obligadas a reportar acerca de las cuentas de Sujetos y Entidades No Residentes
      en la Argentina, con el fin de realizar el intercambio de dicha información con las autoridades
      fiscales de otros países, debiendo observar las normas establecidas en el &quot;Common Reporting
      Standard&quot; (CRS).
      Las Instituciones Financieras Obligadas deberán brindar por cada año calendario la información
      referida a las cuentas cuya titularidad corresponda a una o más personas declarables o a una
      Entidad No Financiera Pasiva en la que una o más de las personas que ejerzan el control sean
      personas declarables.
      El término &quot;persona de una jurisdicción declarable&quot; se refiere a una persona física o entidad
      que reside en una jurisdicción declarable de conformidad con la legislación tributaria de dicha
      jurisdicción, o el patrimonio de una sucesión de un causante residente de una jurisdicción
      declarable. En este sentido, una entidad, ya sea una asociación, una sociedad de
      responsabilidad limitada o acuerdo similar que carezca de residencia a los fines tributarios se
      considerará como residente en la jurisdicción en la cual se encuentra su lugar de
      administración efectiva.
      El término &quot;jurisdicción declarable&quot; se refiere a una jurisdicción: (i) con la cual existe un acuerdo
      en vigencia en virtud del cual hay una obligación vigente de brindar información, y (ii) que esté
      identificada en una lista publicada.`,
      TITULO_PEP: 'Persona Expuesta Políticamente',
      TTCC_PEP: `Son consideradas Personas Expuestas Políticamente Nacionales, los funcionarios públicos del
      país que se desempeñen o se hayan desempeñado en alguno de los siguientes cargos:
      a. Presidente o Vicepresidente de la Nación.
      b. Senador o Diputado de la Nación.
      c. Magistrado del Poder Judicial de la Nación.
      d. Magistrado del Ministerio Público de la Nación.
      e. Defensor del Pueblo de la Nación o Defensor del Pueblo Adjunto.
      f. Jefe de Gabinete de Ministros, Ministro, Secretario o Subsecretario del Poder Ejecutivo
      Nacional.
      g. Interventor federal, o colaboradores del interventor federal con categoría no inferior a
      Director o su equivalente.
      h. Síndico General de la Nación o Síndico General Adjunto de la Sindicatura General de la
      Nación; Presidente o Auditor General de la Auditoría General de la Nación; autoridad superior
      de un ente regulador o de los demás órganos que integran los sistemas de control del sector
      público nacional; miembros de organismos jurisdiccionales administrativos, o personal de dicho
      organismo, con categoría no inferior a la de director o su equivalente.
      i. Miembro del Consejo de la Magistratura de la Nación o del Jurado de Enjuiciamiento.
      j. Embajador o Cónsul.
      k. Personal de las Fuerzas Armadas, de la Policía Federal Argentina, de Gendarmería
      Nacional, de la Prefectura Naval Argentina, del Servicio Penitenciario Federal o de la Policía de
      Seguridad Aeroportuaria con jerarquía no menor de coronel o grado equivalente según la
      fuerza.
      l. Rector, Decano o Secretario de las Universidades Nacionales.
      m. Funcionario o empleado con categoría o función no inferior a la de Director General o
      Nacional, de la Administración Pública Nacional, centralizada o descentralizada, de entidades
      autárquicas, bancos y entidades financieras del sistema oficial, de las obras sociales
      administradas por el Estado, de empresas del Estado, las sociedades del Estado y el personal
      con similar categoría o función, designado a propuesta del Estado en sociedades de economía
      mixta, sociedades anónimas con participación estatal o en otros entes del sector público.
      n. Funcionario o empleado público nacional encargado de otorgar habilitaciones
      administrativas, permisos o concesiones, para el ejercicio de cualquier actividad; como así
      también todo funcionario o empleado público encargado de controlar el funcionamiento de
      dichas actividades o de ejercer cualquier otro control en virtud de un poder de policía.
      o. Funcionario público de algún organismo de control de servicios públicos, con categoría no
      inferior a la de Director General o Nacional.
      p. Personal del Poder Legislativo de la Nación, con categoría no inferior a la de Director.
      q. Personal del Poder Judicial de la Nación o del Ministerio Público de la Nación, con categoría
      no inferior a Secretario.
      r. Funcionario o empleado público que integre comisiones de adjudicación de licitaciones, de
      compra o de recepción de bienes, o participe en la toma de decisiones de licitaciones o
      compras.
      s. Funcionario público responsable de administrar un patrimonio público o privado, o controlar o
      fiscalizar los ingresos públicos cualquiera fuera su naturaleza.
      t. Director o Administrador de alguna entidad sometida al control externo del Honorable
      Congreso de la Nación, de conformidad con lo dispuesto en el artículo 120 de la Ley Nº 24.156.
      ARTÍCULO 3º.- PERSONAS EXPUESTAS POLITICAMENTE PROVINCIALES, MUNICIPALES
      Y DE LA CIUDAD AUTONOMA DE BUENOS AIRES.
      Son consideradas Personas Expuestas Políticamente, los funcionarios públicos que se
      desempeñen o se hayan desempeñado en alguno de los siguientes cargos, a nivel Provincial,
      Municipal o de la Ciudad Autónoma de Buenos Aires:
      a. Gobernador o Vicegobernador, Intendente o Vice-intendente, Jefe de Gobierno o Vicejefe de
      Gobierno.

      b. Ministro de Gobierno, Secretario, Subsecretario, Ministro de los Tribunales Superiores de
      Justicia de las provincias o de la Ciudad Autónoma de Buenos Aires.
      c. Juez o Secretario de los Poderes Judiciales Provinciales o de la Ciudad Autónoma de
      Buenos Aires.
      d. Magistrado perteneciente al Ministerio Público, o su equivalente, en las provincias o en la
      Ciudad Autónoma de Buenos Aires.
      e. Miembro del Consejo de la Magistratura o del Jurado de Enjuiciamiento, o su equivalente, de
      las Provincias o de la Ciudad Autónoma de Buenos Aires.
      f. Defensor del Pueblo o Defensor del Pueblo Adjunto, en las Provincias o en la Ciudad
      Autónoma de Buenos Aires.
      g. Jefe de Gabinete de Ministros, Ministro, Secretario o Subsecretario del Poder Ejecutivo de
      las Provincias o de la Ciudad Autónoma de Buenos Aires.
      h. Legislador provincial, municipal o de la Ciudad Autónoma de Buenos Aires.
      i. Máxima autoridad de los organismos de control o de los entes autárquicos provinciales,
      municipales o de la Ciudad Autónoma de Buenos Aires.
      j. Máxima autoridad de las sociedades de propiedad de los estados provinciales, municipales o
      de la Ciudad Autónoma de Buenos Aires.
      k. Rector, Decano o Secretario de universidades provinciales.
      l. Funcionario o empleado público encargado de otorgar habilitaciones administrativas,
      permisos o concesiones, para el ejercicio de cualquier actividad; como así también todo
      funcionario o empleado público encargado de controlar el funcionamiento de dichas actividades
      o de ejercer cualquier otro control en virtud de un poder de policía.
      m. Funcionario de organismos de control de los servicios públicos provinciales o de la Ciudad
      de Buenos Aires, con categoría no inferior a la de Director General o Provincial.
      n. Funcionario o empleado público que integre comisiones de adjudicación de licitaciones, de
      compra o de recepción de bienes, o participe en la toma de decisiones de licitaciones o
      compras.
      o. Funcionario público que tenga por función administrar un patrimonio público o privado, o
      controlar o fiscalizar los ingresos públicos cualquiera fuera su naturaleza.
      OTRAS PERSONAS EXPUESTAS POLITICAMENTE.
      Sin perjuicio de lo detallado anteriormente, son consideradas Personas Expuestas
      Políticamente aquellas personas que se desempeñen o se hayan desempeñado en alguno de
      los siguientes cargos:
      a. Autoridad, apoderado, candidato o miembro relevante de partidos políticos o alianzas
      electorales, ya sea a nivel nacional o distrital, de conformidad con lo establecido en las Leyes
      N° 23.298 y N° 26.215.
      b. Autoridad de los órganos de dirección y administración de organizaciones sindicales y
      empresariales (cámaras, asociaciones y otras formas de agrupación corporativa).
      Con respecto a las organizaciones sindicales, el alcance comprende a las personas humanas
      con capacidad de decisión, administración, control o disposición del patrimonio de la
      organización sindical.
      Con respecto a las organizaciones empresariales, el alcance comprende a las personas
      humanas de las mencionadas organizaciones que, en función de su cargo:

      1. tengan capacidad de decisión, administración, control o disposición sobre fondos
      provenientes del sector público nacional, provincial, municipal o de la Ciudad Autónoma de
      Buenos Aires, o
      2. realicen actividades con fines de lucro, para la organización o sus representados, que
      involucren la gestión, intermediación o contratación habitual con el Estado nacional, provincial,
      municipal o de la Ciudad Autónoma de Buenos Aires.
      (Inciso b) sustituido por art. 1° de la Resolución N° 15/2019 de la Unidad de Información
      Financiera B.O. 25/02/2019)
      c. Autoridad, representante legal o integrante de la Comisión Directiva de las obras sociales
      contempladas en la Ley Nº 23.660. El alcance comprende a las personas humanas de las
      mencionadas organizaciones con capacidad de decisión, administración, control o disposición
      del patrimonio de las obras sociales.
      d. Las personas humanas con capacidad de decisión, administración, control o disposición del
      patrimonio de personas jurídicas privadas en los términos del 148 del Código Civil y Comercial
      de la Nación, que reciban fondos públicos destinados a terceros y cuenten con poder de control
      y disposición respecto del destino de dichos fondos.
      (Inciso d) sustituido por art. 2° de la Resolución N° 15/2019 de la Unidad de Información
      Financiera B.O. 25/02/2019)`,
      TITULO_SUJETO_OBLIGADO: 'Son Sujeto Obligado',
      TTCC_SUJETO_OBLIGADO: `Profesionales matriculados en consejos profesionales de ciencias económicas y que
      realicen tareas de auditoría externa y sindica-tura de sociedades.
      • Aquellas autorizadas por el Banco Central de la República Argentina para operar en la
      compraventa de divisas.
      • Personas Físicas que exploten juegos de azar como actividad habitual.
      • Personas Físicas dedicadas a la compraventa de obras de arte, antigüedades u otros
      bienes suntuarios, inversión filatélica o numis¬mática, a la exportación, importación,
      elaboración o industrialización de joyas o bienes con metales o piedras preciosas.
      • Los escribanos públicos.
      • Despachantes de aduana definidos en el artículo 36 y concordantes del Código
      Aduanero (Ley N° 22.415 y modificatorias).
      • Productores, asesores de seguros, agentes, intermediarios, peritos y liquidadores de
      seguros cuyas actividades estén regidas por las leyes 20.091 y 22.400, sus modificatorias,
      concordantes y complementarias.
      • Agentes o corredores inmobiliarios matriculados.
      • Personas fisicas cuya actividad habitual sea la compra venta de automóviles,
      camiones, motos, ómnibus y microómnibus, tracto-res, maquinaria agrícola y vial, naves, yates
      y similares, aeronaves y aerodinos.
      • Personas físicas que actúen como fiduciarios, en cualquier tipo de fideicomiso y
      titulares de o vinculadas, directa o indirectamente, con cuentas de fideicomisos, fiduciantes y
      fiduciarios en virtud de contratos de fideicomiso.`,
      ANCHO: '610px',
      ALTO: '470px'
    }
  },
  GENERICO: {
    CONTINUAR: 'Continuar',
    ENTENDIDO: '¡Entendido!',
    LISTO: '¡Listo!',
    ACEPTAR: 'Aceptar',
    CONFIRMAR: 'Confirmar',
    CANCELAR: 'Cancelar',
    COMPRAR: 'Comprar',
    VENDER: 'Vender',
    CERRAR: 'Cerrar',
    VOLVER: 'Volver',
    SEPARADOR: 'Divisor de sección',
    INPUT_MONTO: {
      LABEL: 'Ingresá el monto',
      ERROR: 'El monto ingresado es incorrecto.',
      ERROR_MINIMO: 'Saldo insuficiente. El monto mínimo para operar es de $',
      ERROR_MAXIMO: 'El monto máximo para operar es de $',
    },
    VER_COMPROBANTE: 'Ver Comprobante',
    DESCARGAR_COMPROBANTE: 'Descargar Comprobante'
  },
  ERROR: {
    TITULO_GENERICO: 'Ocurrió un error en nuestros servicios',
    SUBTITULO: {
      COTIZACIONES: 'Se produjo un error al consultar la cotización. Por favor, volvé a intentar mas tarde.',
      COMPRA: 'Se produjo un error al realizar la compra de tus bonos. Por favor, volvé a intentar mas tarde.'
    },
    BANNER: {
      SALDOS: 'No pudimos consultar tus saldos. Inténtalo de nuevo más tarde.',
      CUENTAS: 'No pudimos consultar tus cuentas. Inténtalo de nuevo más tarde.'
    }
  }
};
