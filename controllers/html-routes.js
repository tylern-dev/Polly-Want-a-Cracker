var path = require('path')
var db = require('../models')
module.exports = function(app){
    app.get('/api/high-score', function(req, res){
        
    })

    app.get('/', function(req, res){
        res.render('index');
    })

    
}