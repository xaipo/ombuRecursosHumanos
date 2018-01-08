/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//EvaluacionDesempeno schema
const EvaluacionDesempenoSchema = mongoose.Schema({

    categoriatrabajo: {
        type: mongoose.Schema.ObjectId,
        ref:'CategoriaTrabajo'
    },
    descripcion: {
        type: String
    },
    parametros:{
        type: Array
    }

},{collection: 'evaluaciondesempeno'});

module.exports = restful.model('EvaluacionDesempeno', EvaluacionDesempenoSchema);