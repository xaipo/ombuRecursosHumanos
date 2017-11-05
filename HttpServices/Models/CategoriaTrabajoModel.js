/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//CategoriaTrabajo schema
const CategoriaTrabajoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    nombre: {
        type: String,
        required: true
    }

});

module.exports = restful.model('CategoriaTrabajoModel', CategoriaTrabajoSchema);