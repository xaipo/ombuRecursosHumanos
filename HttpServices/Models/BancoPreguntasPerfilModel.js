/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

'use strict'
var restful = require('node-restful');
var mongoose = restful.mongoose;


//BancoPreguntasPerfil schema
const BancoPreguntasPerfilSchema = mongoose.Schema({
    /*id: {
        type: mongoose.Schema.ObjectId
    },*/
    perfil: {
        type: mongoose.Schema.ObjectId,
        ref:'PerfilTrabajo'
    },
    pregunta: {
        type: String
    },
    respuestas: {
        type: Array

    }
},{collection: 'bancopreguntasperfil'});

module.exports = restful.model('BancoPreguntasPerfil', BancoPreguntasPerfilSchema);