// Requires
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');

var db = require(path.join(__dirname, "./models"));
var PORT = process.env.PORT || 3000;

// initiate app
var app = express();

//use public folder with css and scripts
app.use(express.static(path.join(__dirname, './public')));

// Middleware for body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// routes
require('./controllers/api-routes.js');

// express-handlebars engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



//sync the DB and start the app
db.sequelize.sync({force:true}).then(function(){
    app.listen(PORT, function(){
        console.log(`Listening on port ${PORT}`)
    });
});