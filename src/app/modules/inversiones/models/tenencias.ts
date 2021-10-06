import { Moneda } from './cuenta';

export interface TenenciasDolarMep {
    parking: Tenencia;
    disponible: Tenencia;
}

export interface Tenencia {
    simbolo: string;
    cantidad_nominales: number;
    monto: Monto;
}

export interface Monto {
    moneda: Moneda;
    monto: number;
}
