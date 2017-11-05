/**
 * Created by VICTOR OQUENDO on 10/31/2017.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Etapa schema
const EtapaSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId
    },
    descripcion: {
        type: String,
        required: true
    }

});

module.exports = restful.model('EtapaModel', EtapaSchema);