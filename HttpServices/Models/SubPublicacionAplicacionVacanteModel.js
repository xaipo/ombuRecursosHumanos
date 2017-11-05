/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubPublicacionAplicacionVacante schema
const SubPublicacionAplicacionVacanteSchema = mongoose.Schema({
    id_etapa: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    nota: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    descripcion: {
        type: Uint8Array,//0:rechazado - 1:aprobado
        required: false
    }

});

module.exports = restful.model('SubPublicacionAplicacionVacanteModel', SubPublicacionAplicacionVacanteSchema);