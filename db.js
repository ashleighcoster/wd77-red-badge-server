const sequelize = require('sequelize');
//was const sequelize

//was const db = new sequelize
const db = new sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});



db.authenticate().then(
    function () {
        console.log('connected to server');
    }, 
    function (err) {
        console.log(err);
    }
)


//THIS CODE IS WORKING! (with const db = new sequelize - lowercase)
User = require('./models/user')(db, sequelize);
Habit = require('./models/habit')(db, sequelize); 
Journal = require('./models/journal')(db, sequelize);


User.hasMany(Habit);
Habit.belongsTo(User);

User.hasMany(Journal); 
Journal.belongsTo(User);


// const db = {}; 



// db.Sequelize = Sequelize; 
// db.sequelize = sequelize; 

// db.User = require('./models/user')(sequelize, Sequelize);
// db.Habit = require('./models/habit')(sequelize, Sequelize); 
// db.Journal = require('./models/journal')(sequelize, Sequelize);

// db.User.hasMany(db.Habit, {as: 'userHabits'}); 
// db.Habit.belongsTo(db.User);

// db.Habit.hasMany(db.Journal, {as: "journalEntries"}); 
// db.Journal.belongsTo(db.Habit, {
//     foreignKey: "userId", 
//     as: "user",
// });


// Habit.belongsTo(User);
// Journal.belongsTo(User);
// Journal.belongsTo(Habit); 
// User.hasMany(Habit, {as: 'habits'});
// User.hasMany(Journal, {as: "journalEntries"}); 
// Habit.hasMany(Journal); 


// module.exports = db;

module.exports = db; 



// module.exports = sequelize;


// const sequelize = new Sequelize(process.env.DB_NAME, 'postgres', process.env.DB_PASSWORD, {
//     host: 'localhost',
//     dialect:  'postgres', 
//   });

// const db = {}

// db.sequelize = sequelize; 
// const sequelize = db.Sequelize; 

// db.Habit = require('./models/habit')(sequelize, Sequelize); 
// db.Journal = require('./models/journal')(sequelize, Sequelize);
// db.User = require('./models/user')(sequelize, Sequelize);

// User = sequelize.import('./models/user');
// Habit = sequelize.import('./models/habit'); 
// Journal = sequelize.import('./models/journal');

// User.hasMany(Habit, {foreignKey: 'userId'});
// Habit.belongsTo(User, {foreignKey: 'userId'});