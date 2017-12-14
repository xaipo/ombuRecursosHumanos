
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
        required : false
    },
    id_rol: {
        type: mongoose.Schema.ObjectId,
        required : true
    },
    id_empresa: {
        type: mongoose.Schema.ObjectId,
        required : true
    },
    nombres_usuario: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }

});

//module.exports = restful.model('User', categoriaSchema);

// fin copiar  all ************************************************************

const User = module.exports = mongoose.model('User', UserSchema);

module.exports = restful.model('user', UserSchema);



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