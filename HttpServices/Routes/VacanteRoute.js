/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express= require('express');
var router= express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/VacanteModel'); //copiar el modelo de la tabla

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){
 res.send("ingresa api");
 });*/


routeExample.methods(['get','put','post','delete','search']);

routeExample.before('get', function(req, res, next) {
   // req.query.populate = 'responsable';   // you could delegate to restful
     req.query.populate = ['responsable','id_perfil'];   // you could delegate to restful
    next();

});
/*routeExample.before('get', function(req, res, next) {
    req.query.populate = 'responsable';   // you could delegate to restful
    // req.query.populate = 'id_perfil';   // you could delegate to restful
    next();

});*/
routeExample.register(router,'/vacante'); //nombre ruta para acceder por web



// </editor-fold>

//Return route
module.exports=router;