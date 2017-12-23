/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubSalarioCurriculo schema
const SubSalarioCurriculoSchema = mongoose.Schema({

    frecuencia_pago: {
        type: String
    },
    salario: {
        type: number
    },
    observaciones: {
        type: String
    },
    estado: { //0: activo - 1: inactivo
        type: boolean
    }

});

module.exports = restful.model('SubSalarioCurriculoModel', SubSalarioCurriculoSchema);