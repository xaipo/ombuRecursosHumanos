/**
 * Created by xaipo on 12/21/2017.
 */
export class Aspirante{
  constructor(

    public primer_nombre: string,
    public segundo_nombre: string,
    public primer_apellido: string,
    public segundo_apellido: string,
    public cedula: string,
    public genero: string,
    public estado_civil: string,
    public nacionalidad: string,
    public fecha_nacimiento: Date,
    public lugar_nacimiento: string,
    public fotografia: string,
    public estado: any,
    public direccion: string,
    public ciudad: string,
    public provincia: string,
    public telefono_domicilio: string,
    public telefono_celular: string,
    public correo_electronico: string,
  ){}
}
