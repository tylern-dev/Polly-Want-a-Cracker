// Requires
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var path = require('path');

var PORT = process.env.PORT || 3000;

// initiate app
var app = express();

// models brought in from sequelize setup file
var models = require(path.join(__dirname,'./models/index.js'));

//use public folder with css and scripts
app.use(express.static(path.join(__dirname, './public')));

// Middleware for body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// for Passport
app.use(session({secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

/**** ROUTES ****/

// static html routes
require(path.join(__dirname, "./controllers/html-routes.js"))(app);

//posting scores with routes and passport
require(path.join(__dirname,"./controllers/scores-routes.js"))(app);

require(path.join(__dirname,'./controllers/auth.js'))(app,passport);

/* *************** */


// load passport strategies
require(path.join(__dirname,'./config/passport/passport.js'))(passport, models.user)

// express-handlebars engine

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



//sync the DB and start the app
models.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log(`Listening on port ${PORT}`)
    });
});