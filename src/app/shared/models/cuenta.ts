import { Moneda } from './moneda';

export interface Cuenta {
  identificador: string;
  tipo_cuenta: string;
  saldo: number;
  numero: string;
  moneda: Moneda;
  codigo_paquete: number;
  estado: CuentaEstado;
  titularidad?: string;
  numero_tarjeta_debito?: string;
  cbu?: string;
}

export enum CuentaEstado {
  bloqueado = 'bloqueado',
  normal = 'normal',
}
