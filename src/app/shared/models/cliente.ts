export enum ClienteClubBeneficioId {
  sinClubBeneficio = 0,
  clubSupervielle = 35,
  _123Chances = 34,
}

export interface Cliente {
  nombre: string;
  apellido: string;
  clave_cliente: ClaveCliente;
  ultimo_login: Date;
  fecha_expiracion_clave: Date;
  preferencias: Preferencias;
  club_beneficio_id?: ClienteClubBeneficioId;
  mostrar_encuesta?: boolean | null;
  persona_id?: string;
  email: string;
  cuil: string;
  tiene_activa_clave_sms?: boolean;
  celular?: string;
  habilitado_obi?: boolean | null;
}

export interface Preferencias {
  vio_menu?: boolean;
  clave_por_vencer?: boolean;
  vio_notificacion_clave?: boolean;
}

export interface ClaveCliente {
  pais: string;
  tipo_documento: string;
  numero_documento: string;
}

