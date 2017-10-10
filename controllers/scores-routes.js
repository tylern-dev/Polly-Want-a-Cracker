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


    app.get('/scores', function(req, res){
        db.score.findAll({
            order:[['score', 'DESC']],
            limit: 20,
            include:[
                {
                    //this will only send back the first name with the include from the user db. W/O it, it would send everything
                    model: db.user,
                    attributes: ["firstname"] 
                }
            ]
        }).then(function(result){
            // res.json(req.user);
            res.render('scores', {data: result, user: req.user})
        });
    });


    //retrieves score for user that is logged in
    app.get('/api/scores/:player', function(req, res){
        db.score.findAll({
            order: [['score', 'DESC']],
            limit: 20,
            where: {
                userId: req.params.player,
            },
            include: [
                {
                    model: db.user,
                    attributes: ["firstname"]
                }
            ]
            
        }).then(function(result){
            res.json(result);
        });
    });

}