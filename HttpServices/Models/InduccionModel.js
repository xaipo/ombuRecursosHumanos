/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Induccion schema
const InduccionSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    id_categoriatrabajo: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    parametro:{
        type: mongoose.object,
        required: true
    }

});

module.exports = restful.model('InduccionModel', InduccionSchema);