/**
 * Created by VICTOR OQUENDO on 12/12/2017.
 */

export class Empleado{
  constructor(
    public _id: any,
    public nombre: string,
    public apellido: string,
    public cedula: string,
    public genero: string,
    public estado_civil: string,
    public nacionalidad: string,
    public fecha_nacimiento: Date,
    public lugar_nacimiento: string,
    public fotografia: string,
    public direccion: string,
    public ciudad: string,
    public provincia: string,
    public telefono_domicilio: string,
    public telefono_celular: string,
    public email: string,
    public contacto_emergencia: any,
    public dependientes: any
  ){}
}
