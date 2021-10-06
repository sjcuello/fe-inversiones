export enum SimboloMoneda {
  Pesos = '$',
}

export enum DescripcionMoneda {
  Pesos = 'Pesos',
  Dolares = 'Dólares'
}

export interface Moneda {
  codigo?: number;
  simbolo: string;
  descripcion: string;
}
