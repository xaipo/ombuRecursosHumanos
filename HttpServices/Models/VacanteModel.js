/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Vacante schema
const VacanteSchema = mongoose.Schema({

    id_perfil: {
        type: mongoose.Schema.ObjectId,
        ref:'PerfilTrabajo',
        required: true
    },
    responsable: {
        type: mongoose.Schema.ObjectId,
        ref:'Empleado',
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    cantidad: {
        type: Number,
        required: true
    },
    fecha_contratacion: {
        type: Date,
        required: true
    },
    estado_vacante: { //0: cerrado - 1: vigente
        type: Number,
        required: true
    },
    publicacion:{
        type: Array,
        required: true
    }
});

module.exports = restful.model('Vacante', VacanteSchema);