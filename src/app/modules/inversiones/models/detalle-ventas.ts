import { Monto } from './tenencias';
export interface DetalleVentas {
    cantidad_nominales_disponibles: number;
    porcentaje_comision_venta: number;
    porcentaje_derechos_mercado: number;
    estimados: Estimados;
}

export interface Estimados {
    venta: Monto;
    comision_venta: Monto;
    credito: Monto;
    derechos_mercado: Monto;
}
