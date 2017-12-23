/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//AplicacionInduccion schema
const AplicacionInduccionSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    induccion: {
        type: mongoose.Schema.ObjectId,
        ref:'Induccion'
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

module.exports = restful.model('AplicacionInduccionModel', AplicacionInduccionSchema);