
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var restful = require("node-restful");



// copiar all*********************************************************************
//var restful = require('node-restful');
//var mongoose = restful.mongoose;



//User schema
const UserSchema = mongoose.Schema({

    id_empleado: {
        type: mongoose.Schema.ObjectId,
        ref:'Empleado'
    },
    id_rol: {
        type: mongoose.Schema.ObjectId,
        ref:'Rol'
    },
    id_empresa: {
        type: mongoose.Schema.ObjectId,
        ref:'Empresa'
    },
    nombres_usuario: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    estado: {
        type: String
    }

});

//module.exports = restful.model('User', UserSchema);

// fin copiar  all ************************************************************



module.exports = mongoose.model('User', UserSchema);

//const User = module.exports = restful.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10,function (err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.comparePass = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash,function (err, isMatch)  {
        if (err) throw err;
        callback(null, isMatch);
    });
}