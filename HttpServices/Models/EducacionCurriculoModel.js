/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//EducacionCurriculo schema
const EducacionCurriculoSchema = mongoose.Schema({

    nivel_estudio: {
        type: String,
        required: true
    },
    instituto: {
        type: String,
        required: true
    },
    fecha_inicio: {
        type: date,
        required: false
    },
    fecha_fin: {
        type: date,
        required: false
    }

});

module.exports = restful.model('EducacionCurriculoModel', EducacionCurriculoSchema);