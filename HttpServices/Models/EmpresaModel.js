/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Empresa schema
const EmpresaSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    nombre: {
        type: String,
        required: true
    },
    objeto_negocio: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: false
    },
    gerente: {
        type: mongoose.Schema.ObjectId,
        ref:'Empleado' //se referencia al modelo a popular
    },
    ciudad: {
        type: String,
        required: false
    },
    provincia: {
        type: String,
        required: false
    },
    telefono: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }

},{collection: 'empresa'});

module.exports = restful.model('Empresa', EmpresaSchema);