import { Monto } from './tenencias';
export interface DetalleCompras {
    inversion: Monto;
    porcentaje_comision_compra: number;
    porcentaje_derechos_mercado: number;
    comision_compra: Monto;
    derechos_mercado: Monto;
    cotizacion_dolar_mep: Monto;
    compra_estimada: Monto;
    dinero_operacion: Monto;
}
