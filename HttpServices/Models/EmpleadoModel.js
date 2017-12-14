/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Empleado schema
const EmpleadoSchema = mongoose.Schema({
    /*id: {
        type: mongoose.Schema.ObjectId
    },*/
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    cedula: {
        type: String
    },
    genero: {
        type: String
    },
    estado_civil: {
        type: String
    },
    nacionalidad: {
        type: String
    },
    fecha_nacimiento: {
        type: Date
    },
    lugar_nacimiento: {
        type: String
    },
    fotografia: {
        type: String
    },
    direccion: {
        type: String
    },
    ciudad: {
        type: String
    },
    provincia: {
        type: String
    },
    telefono_domicilio: {
        type: String
    },
    telefono_celular: {
        type: String
    },
    email: {
        type: String
    },
    contacto_emergencia:{
        type: Array
    },
    dependientes:{
        type: Array
    }

},{collection: 'empleado'});

module.exports = restful.model('Empleado', EmpleadoSchema);