/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//AplicacionVacante schema
const AplicacionVacanteSchema = mongoose.Schema({
   /* id: {
        type: mongoose.Schema.ObjectId
    },*/
    id_vacante: {
        type: mongoose.Schema.ObjectId,
        ref:'Vacante'
    },
    id_aspirante: {
        type: mongoose.Schema.ObjectId,
        ref:'Aspirante'

    },
    descripcion: {
        type: String,
        required: false
    },
    fecha_solicitud: {
        type: Date

    },
    cv_adjunto: {
        type: String,
        required: false
    },
    estado: {
        type: Object,//0:rechazado - 1:aceptado
        required: false
    },
    publicacion: {
        type: Array,
        required: false
    }

});

module.exports = restful.model('AplicacionVacante', AplicacionVacanteSchema);