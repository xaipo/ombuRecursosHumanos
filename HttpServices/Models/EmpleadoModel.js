/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Empleado schema
const EmpleadoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    primer_nombre: {
        type: String,
        required: true
    },
    segundo_nombre: {
        type: String,
        required: false
    },
    primer_apellido: {
        type: String,
        required: true
    },
    segundo_apellido: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    estado_civil: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: date,
        required: true
    },
    lugar_nacimiento: {
        type: String,
        required: true
    },
    fotografia: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    telefono_domicilio: {
        type: String,
        required: false
    },
    telefono_celular: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contacto_emergencia:{
        type: mongoose.object,
        required: true
    },
    dependientes:{
        type: mongoose.object,
        required: true
    }

});

module.exports = restful.model('EmpleadoModel', EmpleadoSchema);