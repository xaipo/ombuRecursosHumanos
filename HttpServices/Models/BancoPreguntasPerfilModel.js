/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//BancoPreguntasPerfil schema
const BancoPreguntasPerfilSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    id_perfil: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    pregunta: {
        type: String,
        required: true
    },
    respuesta: {
        type: mongoose.object,
        required: true
    }

});

module.exports = restful.model('BancoPreguntasPerfilModel', BancoPreguntasPerfilSchema);