/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//Departamento schema
const DepartamentoSchema = mongoose.Schema({
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
    },
    responsable: {
        type: mongoose.Schema.ObjectId,
        required: true
    }

});

module.exports = restful.model('DepartamentoModel', DepartamentoSchema);