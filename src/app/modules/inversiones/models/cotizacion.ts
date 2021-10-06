export interface Cotizacion {
  volumen_nominal: number;
  codigo_moneda: number;
  puntas: Punta[];
}

export interface Punta {
  precio_compra: number;
  precio_venta: number;
}
