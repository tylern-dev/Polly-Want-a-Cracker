var path = require('path');

var db = require(path.join(__dirname,'../models'));

module.exports = function(app){
    //post the score to the database
    app.post("/api/score", function(req, res){
        
        db.score.create({
            score: req.body.score,
            userId: req.body.userId
        }).then(function(result){
            console.log(result)
        });
    });

    app.get('/api/score', function(req, res){
        
    })

}