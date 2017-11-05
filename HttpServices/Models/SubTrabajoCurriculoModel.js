/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubTrabajoCurriculo schema
const SubTrabajoCurriculoSchema = mongoose.Schema({
    id_perfil: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    id_modalidad: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    id_categoriatrabajo: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    id_departamento: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    fecha_registro: {
        type: date,
        required: true
    },
    fecha_iniciocontrato: {
        type: date,
        required: true
    },
    fecha_fincontrato: {
        type: date,
        required: false
    },
    carga_contratofirmado: {
        type: String,
        required: false
    }

});

module.exports = restful.model('SubTrabajoCurriculoModel', SubTrabajoCurriculoSchema);