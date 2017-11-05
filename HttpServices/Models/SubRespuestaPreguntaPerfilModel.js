/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubRespuestaPreguntaPerfil schema
const SubRespuestaPreguntaPerfilSchema = mongoose.Schema({

    respuesta: {
        type: String,
        required: true
    },
    correcta: { //0: error - 1: correcta
        type: Uint8Array,
        required: false
    }

});

module.exports = restful.model('SubRespuestaPreguntaPerfilModel', SubRespuestaPreguntaPerfilSchema);