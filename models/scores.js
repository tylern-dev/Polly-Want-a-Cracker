module.exports = function(sequelize, DataType){
    var Score = sequelize.define('score',{
        score: {
            type: DataType.INTEGER
        }
    });


    return Score;
}