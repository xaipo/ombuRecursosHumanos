/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//HorarioTrabajo schema
const HorarioTrabajoSchema = mongoose.Schema({
    /*id: {
        type: mongoose.Schema.ObjectId
    },*/
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    hora_entrada: {
        type:Date
    },
    hora_salida: {
        type:  Date

    }

},{collection: 'horariotrabajo'});

module.exports = restful.model('HorarioTrabajo', HorarioTrabajoSchema);