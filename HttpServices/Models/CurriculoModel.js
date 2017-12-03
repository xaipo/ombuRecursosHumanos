/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Curriculo schema
const CurriculoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    id_empleado: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    trabajo: {
        type: Array,
        required: false
    },
    salario: {
        type:Array,
        required: false
    },
    personal_cargo: {
        type: Array,
        required: false
    },
    experiencia_laboral: {
        type: Array,
        required: false
    },
    educacion: {
        type: Array,
        required: false
    }

});

module.exports = restful.model('CurriculoModel', CurriculoSchema);