/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/curriculo'});


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/AplicacionVacanteModel'); //copiar el modelo de la tabla
var modelVacante = require('../Models/VacanteModel')
var modelAspirante = require('../Models/AspiranteModel');
var modelEtapa = require('../Models/EtapaModel')
var modelPerfil = require('../Models/PerfilTrabajoModel')
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


routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/aplicacionVacante'); //nombre ruta para acceder por web

routeExample.before('get', function (req, res, next) {
    req.query.populate = 'id_vacante';   // you could delegate to restful
    //req.query.populate = ['id_vacante','id_aspirante'];   // you could delegate to restful
    next();

});

router.get('/aplicacionVacantePopulated', function (req, res) {

    routeExample.find({})
        .populate({
            path: 'id_vacante',
            model: modelVacante
        })
        .populate({
            path: 'id_aspirante',
            model: modelAspirante
        })
        .exec(function (err, person) {
            if (err) return handleError(err);
            routeExample.populate(person, {
                    path: 'publicacion.id_etapa',
                    model: modelEtapa
                },
                function (err, cars) {
                    if (err) return callback(err);
                    routeExample.populate(cars, {
                            path: 'id_vacante.id_perfil',
                            model: modelPerfil
                        },
                        function (err, cars2) {
                            if (err) return callback(err);
                            console.log(cars2);
                            res.send(cars2)
                        });
                });
        });


    // Space Ghost is a talk show host.


});


router.post('/upload-curriculo/:id', md_upload,

    function (req, res) {
        var id = req.params.id;
        var file_name = 'No subido...';

        if (req.files) {
            var file_path = req.files.image.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];


            var ext_split = file_name.split('\.');
            var file_ext = ext_split[1];

            if (file_ext == 'pdf' || file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

                routeExample.findByIdAndUpdate(id, {cv_adjunto: file_name}, {new: true}, (err, objUpdated)=> {
                    if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar empleado: '+userId
                    });
                } else {
                    if (!objUpdated) {
                        res.status(404).send({
                            message: 'No se ha podido actualizar el usuario'
                        });
                    } else {
                        res.status(200).send({aplicacion: objUpdated, cv_adjunto: file_name});
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

router.get('/get-curriculo/:objFile',
    function getImageFile(req, res) {
        var objFile = req.params.objFile;
        var path_file = './upload/curriculo/' + objFile;

        fs.exists(path_file, function (exists) {
            if (exists) {
                res.sendFile(path.resolve(path_file));
            } else {
                res.status(404).send({
                    message: 'La imagen no existe: '+ objFile

                });
            }
        });
    }
);


// </editor-fold>

//Return route
module.exports = router;