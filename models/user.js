module.exports = function(sequelize, DataType){
    var User = sequelize.define('user', {
        user_name: {
            type: DataType.STRING,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        }
    });

    return User;
}