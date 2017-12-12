/**
 * Created by VICTOR OQUENDO on 12/7/2017.
 */
export class HorarioTrabajo{
  constructor(
    public _id: any,
    public nombre: string,
    public descripcion: string,
    public hora_entrada: Date,
    public hora_salida: Date,
    public hora_entrada_leyenda: string,
    public hora_salida_leyenda: string
  ){}
}
