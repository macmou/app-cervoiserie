const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route');
var cors = require('cors');

// initialize our express app
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://Macmou:Boiteacom17!@ds123029.mlab.com:23029/cervoiserie';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use (bodyParser.json ()); 
app.use (bodyParser.urlencoded ({extended: false }));
app.use(cors());
app.use('/products', product);

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});