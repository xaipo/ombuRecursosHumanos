/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express= require('express');
var router= express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/AplicacionVacanteModel'); //copiar el modelo de la tabla
var modelVacante = require('../Models/VacanteModel')
var modelAspirante = require('../Models/AspiranteModel');
var modelEtapa=require('../Models/EtapaModel')
var modelPerfil=require('../Models/PerfilTrabajoModel')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'RecursosHumanos';

//On connection


// Or `createConnection`
//var promise = mongoose.connect(db2, {


// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){
 res.send("ingresa api");
 });*/


routeExample.methods(['get','put','post','delete','search']);
routeExample.register(router,'/aplicacionVacante'); //nombre ruta para acceder por web

routeExample.before('get', function(req, res, next) {
    req.query.populate = 'id_vacante';   // you could delegate to restful
    //req.query.populate = ['id_vacante','id_aspirante'];   // you could delegate to restful
    next();

});

router.get('/aplicacionVacantePopulated', function (req, res) {

    routeExample.find({ })
        .populate({ path: 'id_vacante',
            model: modelVacante})
        .populate({ path: 'id_aspirante',
            model: modelAspirante})
        .exec(function (err, person) {
            if (err) return handleError(err);
            routeExample.populate(person,{
                    path: 'publicacion.id_etapa',
                    model: modelEtapa
                },
                function(err, cars) {
                    if (err) return callback(err);
                    routeExample.populate(cars,{
                            path: 'id_vacante.id_perfil',
                            model: modelPerfil
                        },
                        function(err, cars2) {
                            if (err) return callback(err);
                            console.log(cars2);
                             res.send(cars2)

                     });

                });
            //console.log('The author is %s', story.author.name);

            // prints "The author is Ian Fleming"
        });


       // Space Ghost is a talk show host.


});

// </editor-fold>

//Return route
module.exports=router;