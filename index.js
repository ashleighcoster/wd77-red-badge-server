require('dotenv').config();

let Express = require('express');
const cors = require("cors")
// const database = require('./db');
let sequelize = require('./db');

let userController = require('./controllers/userController');
let habitController = require('./controllers/habitController');
let journalController = require('./controllers/journalController');



sequelize.sync();

const app = Express();
app.use(cors())

app.use(require('./middleware/headers'));
app.use(Express.json());

app.use('/user', userController);
app.use('/habit', habitController);
app.use('/journal', journalController);

// database.sync();


app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
})

