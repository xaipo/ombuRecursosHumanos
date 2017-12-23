/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */


var restful = require('node-restful');
var mongoose = restful.mongoose;

//AplicacionDesempeno schema
const AplicacionDesempenoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    evaluacion: {
        type: mongoose.Schema.ObjectId,
        ref:'EvaluacionDesempeno'
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

module.exports = restful.model('AplicacionDesempenoModel', AplicacionDesempenoSchema);