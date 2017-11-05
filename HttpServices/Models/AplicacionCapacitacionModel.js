/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//AplicacionCapacitacion schema
const AplicacionCapacitacionSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    id_capacitacion: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    id_empleado: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    parametro_respuesta:{
        type: mongoose.object,
        required: true
    }

});

module.exports = restful.model('AplicacionCapacitacionModel', AplicacionCapacitacionSchema);