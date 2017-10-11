module.exports = function(sequelize, DataType){
    var Score = sequelize.define('score',{
        score: {
            type: DataType.INTEGER
        }
    });

    Score.associate = function(models){
        Score.belongsTo(models.user);
    }

    return Score;
}