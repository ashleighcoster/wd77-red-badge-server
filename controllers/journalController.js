const router = require('express').Router();
const sequelize = require('sequelize');
const db = require('../db');
const Journal = require('../models/journal')(db, sequelize);
const validate = require('../middleware/validateSession');


router.get('/test', (req, res) => {
    res.send('testing journal controller');
});

// CREATE A NEW JOURNAL ENTRY
router.post("/add/:entryId", validate, (req, res) => {
    const journalEntry = {
        user_id: req.user.id,
        habitId: req.params.entryId,
        journalEntry: req.body.journalEntry,
    };

    const query = { where: { entryId: req.params.entryId } };
    Journal.create(journalEntry, query)

        .then((journal) => res.status(200).json(journal))
        .catch((err) => res.status(500).json({ error: err }));
});

// UPDATE A JOURNAL ENTRY
router.put('/update/:id', validate, (req, res) => {
    const updateJournalEntry = {
        journalEntry: req.body.journalEntry,
    };

    const query = {
        where: {
            id: req.params.id,
            owner: req.user.id
        }
    };

    Journal.update(updateJournalEntry, query)

        .then(update => res.status(200).json({ message: `Journal entry ${req.params.id} has been updated successfully`, update }))
        .catch(err => res.status(500).json({ message: 'Could not update journal entry', error: err }))
});

// GET JOURNAL ENTRIES FOR EACH HABIT
router.get("/all/:habitId", validate, (req, res) => {
    // let userid = req.user.id;
    Journal.findAll({
        where: { habitId: req.params.habitId },
    })
        .then((journal) => res.status(200).json(journal))
        .catch((err) => res.status(500).json({ error: err }));
});

// DELETE A JOURNAL ENTRY
router.delete('/delete/:id', validate, (req, res) => {
    Journal.destroy({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    })
        .then(deleteJournal => res.status(200).json({ message: `Journal #${req.params.id} has been successfully deleted.`, deleteJournal }))
        .catch(err => res.status(500).json({ message: 'Journal Entry cannot be deleted', error: err }))
})

// GET USER'S JOURNAL ENTRIES
router.get('/profile', validate, (req, res) => {
    Journal.findAll({
        where: {
            owner: req.user.id
        },
    })
        .then(profile => res.status(200).json({ message: `found ${profile.length} journal entries for this user`, habits: profile }))
        .catch(err => res.status(500).json({ message: 'no journal entries found for this user', error: err }))
});


module.exports = router;