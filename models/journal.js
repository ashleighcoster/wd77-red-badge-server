// const {DataTypes} = require('sequelize');
// const database = require('../db');

// module.exports = function (sequelize, DataTypes) {
//     return sequelize.define('journal', {

module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('journal', {
        user_id: {
            type: DataTypes.INTEGER,
        }, 
        habitId: {
            type: DataTypes.INTEGER,
        },
        journalEntry:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Journal; 
};

// module.exports = Journal; 