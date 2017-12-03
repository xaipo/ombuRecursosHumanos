/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//PerfilTrabajo schema
const PerfilTrabajoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    destrezas:{
        type: Array,
        required: true
    },
    escala_salarial: {
        type: String,
        required: true
    },
    limite_minimo: {
        type: Number,
        required: true
    },
    limite_maximo: {
        type: Number,
        required: true
    },
    funciones:{
        type: Array,
        required: true
    },
    escala_salarial:{
        type: Array,
        required: true
    }

});

module.exports = restful.model('PerfilTrabajoModel', PerfilTrabajoSchema);