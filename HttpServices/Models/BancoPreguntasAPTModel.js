/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//BancoPreguntasAPT schema
const BancoPreguntasAPTSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    id_vacante: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    id_etapa: {
        type: mongoose.Schema.ObjectId,
        required: true
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

module.exports = restful.model('BancoPreguntasAPTModel', BancoPreguntasAPTSchema);