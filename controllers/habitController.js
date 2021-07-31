const router = require('express').Router();
const sequelize = require('sequelize');
const db = require('../db');
const Habit = require('../models/habit')(db, sequelize);
// const Journal = require('../models/journal')(db, sequelize);
// const { User, Habits, Journals } = require('../models/associations')(db, sequelize);
const validate = require('../middleware/validateSession');


router.get('/test', (req, res) => {
    res.send('testing habit controller');
});

//CREATE NEW HABIT
router.post('/entry', validate, (req, res) => {
    Habit.create({
        user_id: req.user.id,
        newHabit: req.body.newHabit,
        description: req.body.description,
        goal: req.body.goal,
    })
        .then(entry => res.status(200).json({ entry }))
        .catch(err => res.status(500).json({ message: 'Could Not Enter habit', error: err }))
});

// FIND ONE HABIT - TO UPDATE GOAL 
router.get("/one/:id", (req, res) => {
    Habit.findOne({
      where: {id: req.params.id}, 
    })
    .then((Habits) => res.status(200).json(Habits))
    .catch((err) => res.status(500).json({ error: err }));
  });

// UPDATE A HABIT
router.put('/update/:id', validate, (req, res) => {
    const updateHabitEntry = {
        newHabit: req.body.newHabit,
        description: req.body.description,
        goal: req.body.goal,
    };

    const query = {
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    };

    Habit.update(updateHabitEntry, query)

        .then(update => res.status(200).json({ message: `Habit entry ${req.params.id} has been updated successfully`, update }))
        .catch(err => res.status(500).json({ message: 'could not update habit entry', error: err }))
});

// DELETE A HABIT
router.delete('/delete/:id', validate, (req, res) => {
    Habit.destroy({
        where: {
            id: req.params.id,
        }
    })
        .then(deleteHabit => res.status(200).json({ message: `Habit #${req.params.id} has been successfully deleted.`, deleteHabit }))
        .catch(err => res.status(500).json({ message: 'Habit cannot be deleted', error: err }))
})

// GET USER'S HABITS
router.get('/profile', validate, (req, res) => {
    let userid = req.user.id;
    Habit.findAll({
        where: { user_id: userid },
    })
        .then(profile => res.status(200).json({ message: `found ${profile.length} habits for this user`, habits: profile }))
        .catch(err => res.status(500).json({ message: 'no habits found for this user', error: err }))
});

// GET ALL HABITS
router.get("/all", (req, res) => {
    Habit.findAll({
    })
        .then((Habits) => res.status(200).json(Habits))
        .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;