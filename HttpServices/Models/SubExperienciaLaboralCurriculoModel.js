/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubExperienciaLaboralCurriculo schema
const SubExperienciaLaboralCurriculoSchema = mongoose.Schema({

    empresa: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: false
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

module.exports = restful.model('SubExperienciaLaboralCurriculoModel', SubExperienciaLaboralCurriculoSchema);