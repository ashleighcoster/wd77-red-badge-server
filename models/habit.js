// const Sequelize = require('sequelize');
// const database = require('../db');

// module.exports = function (sequelize, DataTypes) {
//     return sequelize.define('habit', {

module.exports = (sequelize, DataTypes) => {
    const Habits = sequelize.define('habits', {
        user_id: {
            type: DataTypes.INTEGER,
        },
        newHabit:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        goal:{
            type: DataTypes.STRING,
            allowNull: false,
        },    
    });
    return Habits; 
};

