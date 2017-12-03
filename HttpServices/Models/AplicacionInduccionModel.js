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
    id_induccion: {
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
        type: Array,
        required: true
    }

});

module.exports = restful.model('AplicacionInduccionModel', AplicacionInduccionSchema);