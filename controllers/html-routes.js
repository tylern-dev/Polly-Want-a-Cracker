var path = require('path');
var db = require(path.join(__dirname,'../models'));
module.exports = function(app){
    
    //index.handlebars
    app.get('/', function(req, res){
        res.render('index');
    })

    
}