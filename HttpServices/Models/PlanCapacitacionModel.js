/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//PlanCapacitacion schema
const PlanCapacitacionSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
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

},{collection: 'plancapacitacion'});

module.exports = restful.model('PlanCapacitacion', PlanCapacitacionSchema);