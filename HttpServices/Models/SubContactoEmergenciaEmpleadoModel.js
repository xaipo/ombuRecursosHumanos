/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubContactoEmergenciaEmpleado schema
const SubContactoEmergenciaEmpleadoSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    relacion: {
        type: String,
        required: true
    },
    telefono_domicilio: {
        type: String,
        required: false
    },
    telefono_celular: {
        type: String,
        required: false
    },
    telefono_trabajo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }

});

module.exports = restful.model('SubContactoEmergenciaEmpleadoModel', SubContactoEmergenciaEmpleadoSchema);