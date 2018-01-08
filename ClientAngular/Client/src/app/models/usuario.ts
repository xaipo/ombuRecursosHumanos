/**
 * Created by VICTOR OQUENDO on 1/3/2018.
 */

export class Usuario{
	constructor(
		public _id: any,
		public id_empleado: any,
		public id_rol: any,
		public id_empresa: any,
		public nombres_usuario: string,
		public username: string,
		public password: string,
		public estado: string
	){}
}