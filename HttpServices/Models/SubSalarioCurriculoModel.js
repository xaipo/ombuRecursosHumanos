/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubSalarioCurriculo schema
const SubSalarioCurriculoSchema = mongoose.Schema({

    frecuencia_pago: {
        type: String,
        required: true
    },
    salario: {
        type: number,
        required: true
    },
    observaciones: {
        type: String,
        required: false
    },
    estado: { //0: activo - 1: inactivo
        type: Uint8Array,
        required: true
    }

});

module.exports = restful.model('SubSalarioCurriculoModel', SubSalarioCurriculoSchema);