/**
 * Created by VICTOR OQUENDO on 11/5/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//SubParametro schema
const SubParametroSchema = mongoose.Schema({

    parametro: {
        type: String,
        required: true
    }

});

module.exports = restful.model('SubParametroModel', SubParametroSchema);