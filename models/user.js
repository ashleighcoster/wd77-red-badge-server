
// module.exports = function (db, sequelize) {
// const User = (db, sequelize) => {

    // return db.define('user', {

// module.exports = function (db, sequelize) {
//     const User = db.define('user', {
//         email: {
//             type: sequelize.STRING,
//             allowNull: false,
//             unique: true
//         },
//         password: {
//             type: sequelize.STRING,
//             allowNull: false
//         },
//         userName:{
//             type: sequelize.STRING,
//             allowNull: false,
//             unique: true
//         },
//         role: {
//             type: sequelize.STRING, 
//             allowNull: false,
//         }
//     });
//     return User; 
// }; 

// module.exports = User; 


module.exports = (db, DataTypes) => {
    const User = db.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING, 
            allowNull: false,
        }
    });
    return User; 
}; 

