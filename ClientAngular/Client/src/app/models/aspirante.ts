/**
 * Created by xaipo on 12/21/2017.
 */
export class Aspirante{
  constructor(
    public _id: any,
    public primernombre: string,
    public segundonombre: string,
    public primerapellido: string,
    public segundoapellido: string,
    public cedula: string,
    public genero: string,
    public estadocivil: string,
    public nacionalidad: string,
    public fechanacimiento: Date,
    public lugarnacimiento: string,
    public fotografia: string,
    public estado: number,
    public direccion: string,
    public ciudad: string,
    public provincia: string,
    public telefonodomicilio: string,
    public telefonocelular: string,
    public correoelectronico: string,
  ){}
}
