
var db = require('../models')
module.exports = function(app){
    
    //index.handlebars
    app.get('/', function(req, res){
        res.render('index');
    })

    
}