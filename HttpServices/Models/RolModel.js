/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Rol schema
const RolSchema = mongoose.Schema({
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
    }

});

module.exports = restful.model('RolModel', RolSchema);