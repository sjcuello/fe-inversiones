export interface CuentasCliente {
  cuenta_predeterminada: string;
  cuentas: Cuenta[];
  es_cliente_empresa: boolean;
}

export interface Cuenta {
  identificador: string;
  tipo_cuenta: string;
  saldo: number;
  numero: string;
  moneda: Moneda;
  estado: string;
  es_cliente_empresa?: boolean;
}

export interface Moneda {
  codigo: number;
  simbolo: string;
  descripcion: string;
}
