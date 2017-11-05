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
        type: mongoose.object,
        required: true
    },
    escala_salarial: {
        type: String,
        required: true
    },
    limite_minimo: {
        type: number,
        required: true
    },
    limite_maximo: {
        type: number,
        required: true
    },
    funciones:{
        type: mongoose.object,
        required: true
    },
    escala_salarial:{
        type: mongoose.object,
        required: true
    }

});

module.exports = restful.model('PerfilTrabajoModel', PerfilTrabajoSchema);