/**
 * Created by VICTOR OQUENDO on 12/3/2017.
 */

export class PerfilTrabajo{
  constructor(
    public _id: any,
    public nombre: string,
    public descripcion: string,
    public escala_salarial: string,
    public limite_minimo: string,
    public limite_maximo: string,
    public destrezas: any ,
    public funciones: any
  ){}
}
