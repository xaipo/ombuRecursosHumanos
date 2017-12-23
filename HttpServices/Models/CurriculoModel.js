/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var SubTrabajoCurriculoSchema =require('./SubTrabajoCurriculoModel');
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Curriculo schema
const CurriculoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    empleado: {
        type: mongoose.Schema.ObjectId,
        ref:'Empleado' //se referencia al modelo a popular
    },
    trabajo: {
        type:Array
        //type: [SubTrabajoCurriculoSchema]
        //ref:'SubTrabajoCurriculoModel'
    },
    personal_cargo: {
        type: Array
    },
    experiencia_laboral: {
        type: Array
    },
    educacion: {
        type: Array
    }

},{collection: 'curriculo'});

module.exports = restful.model('Curriculo', CurriculoSchema);