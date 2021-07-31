const router = require('express').Router();

// const User = require('../db').import('../models/user');

const sequelize = require('sequelize');
const db = require('../db');
const User = require('../models/user')(db, sequelize);


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validateSession');


router.get('/test', (req, res) => {
  res.send('testing user controller now');
});


// REGISTER A NEW USER
router.post('/register', (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    role: req.body.role
  })
    .then(user => {
      // console.log(user);
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
      // console.log(token);
      // res.send({user, token})
      res.json({
        user: user,
        message: "User successfully created!",
        sessionToken: sessionToken,
      });
    })
    .catch(error => res.status(500).send({
      message: 'User not created',
      error: error
    }))
});


// LOGIN AN ESTABLISHED USER
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    },
    // include: ['habits', 'journalEntries']
  })
    .then(user => {
      if (user) {
        //compare passwords
        bcrypt.compare(req.body.password, user.password, function (err, matches) {
          matches ? generateToken(user) : res.send('password is incorrect')
        })

        function generateToken(user) {
          //create the token
          let sessionToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
          //send response
          res.send({ message: `Login successful`, user, sessionToken })
        }

      } else {
        res.status(500).json({
          err: "User does not exist",
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        err: err,
      })
    );
});

// ADMIN ROLE 
router.put("/admin/:id", validateSession, (req, res) => {
  const updateUser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    role: req.body.role,
  };

  const query = { where: { id: req.params.id } };
  User.update(updateUser, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

// USER UPDATE
router.put("/update", validateSession, (req, res) => {
  const updateUser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  const query = { where: { user_id: req.user.id } };
  User.update(updateUser, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;