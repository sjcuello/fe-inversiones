import { Saldo } from './saldo';
import { Cuenta } from './cuenta';

export interface CuentasPosicion {
  cuenta_predeterminada: string;
  cuentas: Cuenta[];
  saldos: Saldo[];
  es_cliente_empresa: boolean;
}
