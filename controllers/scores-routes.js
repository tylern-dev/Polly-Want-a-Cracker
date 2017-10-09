var path = require('path');

var db = require(path.join(__dirname,'../models'));

module.exports = function(app){
    //post the score to the database
    app.post("/game-score", function(req, res){
        
        db.score.create({
            score: req.body.score
        }).then(function(result){
            
            res.json(result);
        })
    })

}