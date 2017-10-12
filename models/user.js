module.exports = function(sequelize, DataType){
    
        var User = sequelize.define('user',{
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataType.INTEGER
            },
    
            firstname: {
                type: DataType.STRING,
                notEmpty: true
            },
    
            lastname: {
                type: DataType.STRING,
                notEmpty: true
            },
    
            username: {
                type: DataType.TEXT
            },

            character: {
                type: DataType.STRING,
                defaultValue: 'parrot1'
            },
    
            about: {
                type: DataType.TEXT
            },
    
            email: {
                type: DataType.STRING,
                validate: {
                    isEmail: true
                }
            },
    
            password: {
                type: DataType.STRING,
                allowNull: false
            },
    
            last_login: {
                type: DataType.DATE
            },
    
            status: {
                type: DataType.ENUM('active', 'inactive'),
                defaultValue: 'active'
            }
        });

        User.associate = function(models){
            User.hasMany(models.score);
        }
        
        return User;
    
    }