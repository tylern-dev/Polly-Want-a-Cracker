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

    app.get('/score', function(req, res){
        db.score.findAll({
            order:[['score', 'DESC']],
            include:[
                {
                    //this will only send back the first name with the include from the user db. W/O it, it would send everything
                    model: db.user,
                    attributes: ["firstname"] 
                }
            ]
        }).then(function(result){
            // res.json(result);
            res.render('scores', {data: result})
        });
    });

}