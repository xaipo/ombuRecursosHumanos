/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubDependientesEmpleadoModel schema
const SubDependientesEmpleadoModelSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    identificacion: {
        type: String,
        required: false
    },
    relacion: {
        type: String,
        required: false
    },
    fecha_nacimiento: {
        type: date,
        required: false
    }

});

module.exports = restful.model('SubDependientesEmpleadoModelModel', SubDependientesEmpleadoModelSchema);