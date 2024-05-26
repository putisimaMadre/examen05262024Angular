export interface Usuario {
    "login": string;
    "password": string;
    "nombre": string;
    "cliente": number;
    "email": string;
    "fechaalta": Date;
    "fechabaja": Date;
    "status": string;
    "intentos": number;
    "fecharevocado": Date;
    "fecha_vigencia": Date;
    "no_acceso": number;
    "apellido_paterno": string;
    "apellido_materno": string;
    "area": number;
    "fechamodificacion": Date;
}