const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const product = require('./routes/product.route');
var cors = require('cors');


// initialize our express app
const app = express();

// Set up mongoose connection
let dev_db_url = 'mongodb://Macmou:Boiteacom17!@ds123029.mlab.com:23029/cervoiserie';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use (bodyParser.json ()); 
app.use (bodyParser.urlencoded({extended: false }));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cors());
app.use('/products', product);

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

var AuthenticationController = require('./app/controllers/authentication');
var passportService = require('./config/passport');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});

app.post('/api/register', AuthenticationController.register);
app.post('/api/login', requireLogin, AuthenticationController.login);
app.get('/api/protected', requireAuth, function(req, res){
    res.send({ content: 'Success'});
});

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});