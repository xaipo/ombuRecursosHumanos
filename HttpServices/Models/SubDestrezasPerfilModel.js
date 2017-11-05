/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubDestrezasPerfil schema
const SubDestrezasPerfilSchema = mongoose.Schema({

    descripcion: {
        type: String,
        required: true
    }

});

module.exports = restful.model('SubDestrezasPerfilModel', SubDestrezasPerfilSchema);