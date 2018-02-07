/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Aspirante schema
const AspiranteSchema = mongoose.Schema({

    id:{
        type:mongoose.Schema.ObjectId
    },
    primer_nombre: {
        type: String
    },
    segundo_nombre: {
        type: String
    },
    primer_apellido: {
        type: String
    },
    segundo_apellido: {
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
    estado: {
        type: Object//0:aspirante - 1:elegible. 2:contratado, 3:finfunciones

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
    }

});

module.exports = restful.model('Aspirante', AspiranteSchema);