/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//AplicacionVacante schema
const AplicacionVacanteSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    id_vacante: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'vacantes'
    },
    id_aspirante: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'aspirante'
    },
    descripcion: {
        type: String,
        required: false
    },
    fecha_solicitud: {
        type: String,
        required: false
    },
    cv_adjunto: {
        type: String,
        required: false
    },
    estado: {
        type: Number,//0:rechazado - 1:aceptado
        required: false
    },
    publicacion: {
        type: Array,
        required: false
    }

});

module.exports = restful.model('AplicacionVacanteModel', AplicacionVacanteSchema);