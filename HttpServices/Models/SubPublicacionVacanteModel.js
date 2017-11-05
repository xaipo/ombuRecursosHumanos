/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubPublicacionVacante schema
const SubPublicacionVacanteSchema = mongoose.Schema({

    tipo: { //periodico, tv, radio, redes sociales
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha_publicacion: {
        type: date,
        required: true
    },
    texto: {
        type: String,
        required: true
    }

});

module.exports = restful.model('SubPublicacionVacanteModel', SubPublicacionVacanteSchema);