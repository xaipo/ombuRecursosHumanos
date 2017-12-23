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
    capacitacion: {
        type: mongoose.Schema.ObjectId,
        ref:'PlanCapacitacion'
    },
    empleado: {
        type: mongoose.Schema.ObjectId,
        ref:'Empleado'
    },
    fecha: {
        type: Date
    },
    parametros:{
        type: Array
    }

});

module.exports = restful.model('AplicacionCapacitacionModel', AplicacionCapacitacionSchema);