const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//On connection


// Or `createConnection`
//var promise = mongoose.connect(db2, {
var promise = mongoose.connect(config.database, {
    useMongoClient: true,
});


const app = express();

const users = require('./routes/login');

//Port number
const port = 3000;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.json());


//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);





//app.use('/api',passport.authenticate('jwt', { session: false }) ,require('./routes/clienteApi'));
//correo


app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/api', require('./Routes/login'));
app.use('/api', require('./Routes/RolRoute'));
app.use('/api', require('./Routes/EmpresaRoute'));
app.use('/api', require('./Routes/DepartamentoRoute'));
app.use('/api', require('./Routes/HorarioTrabajoRoute'));
app.use('/api', require('./Routes/CategoriaTrabajoRoute'));
app.use('/api', require('./Routes/ModalidadTrabajoRoute'));
app.use('/api', require('./Routes/BancoPreguntasPerfilRoute'));
app.use('/api', require('./Routes/PerfilTrabajoRoute'));
app.use('/api', require('./Routes/EmpleadoRoute'));
app.use('/api', require('./Routes/CurriculoRoute'));
app.use('/api', require('./Routes/VacanteRoute'));
app.use('/api', require('./Routes/AspiranteRoute'));
app.use('/api', require('./Routes/AplicacionVacanteRoute'));
app.use('/api', require('./Routes/EtapaRoute'));
app.use('/api', require('./Routes/BancoPreguntasAPTRoute'));
app.use('/api', require('./Routes/BancoPreguntasTECRoute'));
app.use('/api', require('./Routes/InduccionRoute'));
app.use('/api', require('./Routes/EvaluacionDesempenoRoute'));
app.use('/api', require('./Routes/PlanCapacitacionRoute'));
app.use('/api', require('./Routes/AplicacionInduccionRoute'));
app.use('/api', require('./Routes/AplicacionDesempenoRoute'));
app.use('/api', require('./Routes/AplicacionCapacitacionRoute'));


//start server
app.listen(port, function()  {
    console.log('Server started on port ' + port);
})