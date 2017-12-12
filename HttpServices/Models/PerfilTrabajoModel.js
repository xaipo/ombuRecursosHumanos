/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
'use strict'
var restful = require('node-restful');
var mongoose = restful.mongoose;

//PerfilTrabajo schema
var PerfilTrabajoSchema = mongoose.Schema({

   /* _id:{
        type: mongoose.Schema.ObjectId
    },*/
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    escala_salarial: {
        type: String
    },
    limite_minimo: {
        type: Number
    },
    limite_maximo: {
        type: Number
    },
    destrezas:{
        type: Array
    },
    funciones:{
        type: Array
    }


},{collection: 'perfiltrabajo'});

module.exports = restful.model('PerfilTrabajo', PerfilTrabajoSchema);