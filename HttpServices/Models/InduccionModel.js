/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Induccion schema
const InduccionSchema = mongoose.Schema({
    /*id: {
        type: mongoose.Schema.ObjectId
    },*/
    categoriatrabajo: {
        type: mongoose.Schema.ObjectId,
        ref:'CategoriaTrabajo'
    },
    descripcion: {
        type: String,
        required: true
    },
    parametro:{
        type: Array,
        required: true
    }

},{collection: 'induccion'});

module.exports = restful.model('Induccion', InduccionSchema);