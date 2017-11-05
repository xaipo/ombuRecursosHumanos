/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//HorarioTrabajo schema
const HorarioTrabajoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    hora_entrada: {
        type: time,
        required: true
    },
    hora_salida: {
        type: time,
        required: true
    }

});

module.exports = restful.model('HorarioTrabajoModel', HorarioTrabajoSchema);