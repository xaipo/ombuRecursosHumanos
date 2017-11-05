/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubRespuestasBancoPregunta schema
const SubRespuestasBancoPreguntaSchema = mongoose.Schema({

    respuesta: {
        type: String,
        required: true
    },
    correcta: {
        type: Uint8Array, //0:error - 1:correcta
        required: true
    }

});

module.exports = restful.model('SubRespuestasBancoPreguntaModel', SubRespuestasBancoPreguntaSchema);