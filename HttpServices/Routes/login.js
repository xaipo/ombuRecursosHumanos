


const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../Models/user');
const bCrypt = require('bcryptjs');


var modelEmpleado = require('../Models/EmpleadoModel');
var modelRol = require('../Models/RolModel');
var modelEmpresa = require('../Models/EmpresaModel');

//Register
router.post('/register', function (req, res, next) {
    var newUser = new User({
        id_empleado: req.body.id_empleado,
        id_rol: req.body.id_rol,
        id_empresa: req.body.id_empresa,
        nombres_usuario: req.body.nombres_usuario,
        username: req.body.username,
        password: req.body.password,
        estado: req.body.estado
    });
    User.addUser(newUser, function (err, user) {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});
//Todos los usuario


router.put('/updateUser/:id', function (req, res) {


    User.findById(req.params.id, function (err, user) {

        user.nombres_usuario = req.body.nombres_usuario;
        user.email = req.body.email;
        user.tipoUsuario = req.body.tipoUsuario;
        user.username = req.body.username;


        user.password = createHash(req.body.password);

        user.save(function (err) {
            if (err) {
                res.send(err)
            }
            res.json(user);
        })
    })


});


var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};


//Authenticate
router.post('/authenticate', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePass(password, user.password, function (err, isMatch) {
            console.log(isMatch);
            console.log(user)
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1 semana
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: user

                });
            } else {
                return res.json({success: false, msg: 'Wrong Password!'});
            }
        })
    })
});

router.get('/getAllUsers', function (req, res) {
    User.find({})
        .populate({path:'id_empleado'})
        .populate({path:'id_rol'})
        .populate({path:'id_empresa'})
        .exec((err, users) => {
            if(err)
            {
                res.status(500).send({message: 'error en la peticion...'});
            }
            else
            {
                if (!users) {
                    res.status(404).send({message: 'No hay usuarios...'});
                } else {
                    res.status(200).send({users: users});
                }
            }
        });
});


//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    res.json({user: req.user});
});

module.exports = router;