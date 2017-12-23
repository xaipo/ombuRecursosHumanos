/**
 * Created by xaipo on 12/22/2017.
 */
export class AplicacionVacante{
  constructor(

    public id_vacante: any,
    public id_aspirante: any,
    public descripcion: any,
    public fecha_solicitud: Date,
    public cv_adjunto: string,
    public estado: number,
    public publicacion: any,
  ){}
}
