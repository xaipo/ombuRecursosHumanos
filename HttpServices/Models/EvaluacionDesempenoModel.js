/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//EvaluacionDesempeno schema
const EvaluacionDesempenoSchema = mongoose.Schema({
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
        type: Array,
        required: true
    }

});

module.exports = restful.model('EvaluacionDesempenoModel', EvaluacionDesempenoSchema);