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
    "fechaVigencia": Date;
    "noAcceso": number;
    "apellidoPaterno": string;
    "apellidoMaterno": string;
    "area": number;
    "fechamodificacion": Date;
}