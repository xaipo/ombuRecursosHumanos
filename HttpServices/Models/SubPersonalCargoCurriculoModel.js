/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubPersonalCargoCurriculo schema
const SubPersonalCargoCurriculoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    tipo_subordinacion: {
        type: String,
        required: true
    }

});

module.exports = restful.model('SubPersonalCargoCurriculoModel', SubPersonalCargoCurriculoSchema);