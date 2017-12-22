export class Vacante{
  constructor(
    public _id: any,
    public id_perfil: any,
    public responsable: any,
    public descripcion: string,
    public cantidad: number,
    public fecha_contratacion: Date,
    public estado_vacante: number,
    public publicacion:any
  ){}
}
