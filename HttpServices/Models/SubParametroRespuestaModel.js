/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubParametroRespuesta schema
const SubParametroRespuestaSchema = mongoose.Schema({

    parametro: {
        type: String,
        required: true
    },
    respuesta: {
        type: String,
        required: true
    }

});

module.exports = restful.model('SubParametroRespuestaModel', SubParametroRespuestaSchema);