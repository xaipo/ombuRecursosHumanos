/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */
// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express= require('express');
var router= express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/AplicacionInduccionModel'); //copiar el modelo de la tabla

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){
 res.send("ingresa api");
 });*/


routeExample.methods(['get','put','post','delete','search']);
routeExample.before('get', function(req, res, next) {
 req.query.populate = ['induccion','empleado'];   // you could delegate to restful
 //req.query.populate = 'trabajo';
 next();
});
routeExample.register(router,'/aplicacionInduccion'); //nombre ruta para acceder por web



// </editor-fold>

//Return route
module.exports=router;