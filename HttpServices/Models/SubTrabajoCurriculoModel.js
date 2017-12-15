/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubTrabajoCurriculo schema
const SubTrabajoCurriculoSchema = mongoose.Schema({
    perfil: {
        type: mongoose.Schema.ObjectId,
        ref:'Perfil' //se referencia al modelo a popular
    },
    modalidad: {
        type: mongoose.Schema.ObjectId,
        ref:'ModalidadTrabajo' //se referencia al modelo a popular
    },
    categoriatrabajo: {
        type: mongoose.Schema.ObjectId,
        ref:'CategoriaTrabajo' //se referencia al modelo a popular
    },
    departamento: {
        type: mongoose.Schema.ObjectId,
        ref:'Departamento' //se referencia al modelo a popular
    },
    fecha_registro: {
        type: Date
    },
    fecha_iniciocontrato: {
        type: Date
    },
    fecha_fincontrato: {
        type: Date
    },
    carga_contratofirmado: {
        type: String
    }

});

module.exports = restful.model('SubTrabajoCurriculo', SubTrabajoCurriculoSchema);