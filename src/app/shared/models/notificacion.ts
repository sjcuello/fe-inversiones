export interface Notificacion {
  id?: number;
  nombre: string;
  descripcion: string;
  leido: boolean;
  link_call_to_action: {
    href: string,
    descripcion: string,
  };
}

export interface NotificacionesResponse {
  no_leidas: number;
  lista_notificaciones: Notificacion[];
}
