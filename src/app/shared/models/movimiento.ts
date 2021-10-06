export interface Movimiento {
  fecha: string;
  descripcion: string;
  importe: number;
  tipo_movimiento: TipoMovimiento;
}

export enum TipoMovimiento {
  debito = 'debito',
  credito = 'credito',
}
