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

//start server
app.listen(port, function()  {
    console.log('Server started on port ' + port);
})