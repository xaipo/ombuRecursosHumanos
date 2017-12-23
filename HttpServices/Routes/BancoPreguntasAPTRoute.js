/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express= require('express');
var router= express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/BancoPreguntasAPTModel'); //copiar el modelo de la tabla
var modelVacante = require('../Models/VacanteModel')
var modelAspirante = require('../Models/AspiranteModel');
var modelEtapa=require('../Models/EtapaModel')
// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){
 res.send("ingresa api");
 });*/


routeExample.methods(['get','put','post','delete','search']);
routeExample.register(router,'/bancoPreguntasAPT'); //nombre ruta para acceder por web

routeExample.before('get', function(req, res, next) {
    // req.query.populate = 'responsable';   // you could delegate to restful
    req.query.populate = ['id_etapa','id_vacante'];   // you could delegate to restful
    next();

});

// </editor-fold>
router.get('/bancoPreguntasAPTPopulated', function (req, res) {

    routeExample.find({ })
        .populate({ path: 'id_vacante',
            model: modelVacante})
        .populate({ path: 'id_etapa',
            model: modelEtapa})
        .exec(function (err, person) {
            if (err) return handleError(err);

                    res.send(person)


            //console.log('The author is %s', story.author.name);

            // prints "The author is Ian Fleming"
        });


    // Space Ghost is a talk show host.


});

//Return route
module.exports=router;