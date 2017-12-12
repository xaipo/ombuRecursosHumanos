/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//ModalidadTrabajo schema
const ModalidadTrabajoSchema = mongoose.Schema({
    /*id: {
        type: mongoose.Schema.ObjectId
    },*/
    nombre: {
        type: String,
        required: true
    }

},{collection: 'modalidadtrabajo'});

module.exports = restful.model('ModalidadTrabajo', ModalidadTrabajoSchema);