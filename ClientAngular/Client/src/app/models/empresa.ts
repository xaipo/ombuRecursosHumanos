/**
 * Created by VICTOR OQUENDO on 12/13/2017.
 */
export class Empresa{
  constructor(
    public _id: any,
    public nombre: string,
    public objeto_negocio: string,
    public direccion: string,
    public gerente: any,
    public ciudad: string,
    public provincia: string,
    public telefono: string,
    public email: string
  ){}
}
