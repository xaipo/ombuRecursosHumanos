/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */

// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express= require('express');
var router= express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/CategoriaTrabajoModel'); //copiar el modelo de la tabla

// </editor-fold>

routeExample.methods(['get','put','post','delete','search']);
routeExample.register(router,'/categoriaTrabajo'); //nombre ruta para acceder por web

// </editor-fold>

//Return route
module.exports=router;