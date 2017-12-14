/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Rol schema
const RolSchema = mongoose.Schema({
    /*id: {
        type: mongoose.Schema.ObjectId
    },*/
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    }

},{collection: 'rol'});

module.exports = restful.model('Rol', RolSchema);