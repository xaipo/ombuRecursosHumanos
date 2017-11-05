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
        type: mongoose.object,
        required: false
    },
    salario: {
        type: mongoose.object,
        required: false
    },
    personal_cargo: {
        type: mongoose.object,
        required: false
    },
    experiencia_laboral: {
        type: mongoose.object,
        required: false
    },
    educacion: {
        type: mongoose.object,
        required: false
    }

});

module.exports = restful.model('CurriculoModel', CurriculoSchema);