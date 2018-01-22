/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
'use strict'
// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/empleado'});

// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/EmpleadoModel'); //copiar el modelo de la tabla




// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){
 res.send("ingresa api");
 });*/


routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/empleado'); //nombre ruta para acceder por web

router.post('/upload-image-empleado/:id', md_upload,

    function (req, res) {
      var userId = req.params.id;
      var file_name = 'No subido...';

      if (req.files) {
       var file_path = req.files.image.path;
       var file_split = file_path.split('\\');
       var file_name = file_split[2];


       var ext_split = file_name.split('\.');
       var file_ext = ext_split[1];

       if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

        routeExample.findByIdAndUpdate(userId, {fotografia: file_name}, {new: true}, (err, userUpdated)=> {
           if (err) {
           res.status(500).send({
            message: 'Error al actualizar empleado: '+userId
           });
          } else {
           if (!userUpdated) {
            res.status(404).send({
             message: 'No se ha podido actualizar el usuario'
            });
           } else {
            res.status(200).send({user: userUpdated, fotografia: file_name});
           }
          }
       });

      } else {

       fs.unlink(file_path, (err)=> {
        if (err) {
        res.status(200).send({
         message: 'Extension no valida y fichero no borrado'
        });
       } else {
        res.status(200).send({
         message: 'Extension no valida'
        });
       }
      })

     }

     } else {
      res.status(200).send({
       message: 'No se ha subido fichero'
      });
     }
    }

);

router.get('/get-image-file/:imageFile',
    function getImageFile(req, res) {
     var imageFile = req.params.imageFile;
     var path_file = './upload/empleado/' + imageFile;

     fs.exists(path_file, function (exists) {
      if (exists) {
       res.sendFile(path.resolve(path_file));
      } else {
       res.status(404).send({
        message: 'La imagen no existe'

       });
      }
     });
    }
);

// </editor-fold>

//Return route
module.exports = router;