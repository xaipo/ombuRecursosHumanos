/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//BancoPreguntasAPT schema
const BancoPreguntasAPTSchema = mongoose.Schema({

    id_vacante: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'Vacantes'
    },
    id_etapa: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'Etapas'
    },
    pregunta: {
        type: String,
        required: true
    },
    respuestas: {
        type: Array,
        required: false
    }

});

module.exports = restful.model('BancoPreguntasAPT', BancoPreguntasAPTSchema);