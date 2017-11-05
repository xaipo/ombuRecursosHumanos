/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Vacante schema
const VacanteSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    id_perfil: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    responsable: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    cantidad: {
        type: Uint8Array,
        required: true
    },
    fecha_contratacion: {
        type: date,
        required: true
    },
    estado: { //0: cerrado - 1: vigente
        type: Uint8Array,
        required: true
    },
    publicacion:{
        type: mongoose.object,
        required: true
    }
});

module.exports = restful.model('VacanteModel', VacanteSchema);