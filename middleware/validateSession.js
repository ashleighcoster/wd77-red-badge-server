const jwt = require('jsonwebtoken');
const sequelize = require('sequelize'); 
const db = require('../db'); 
const User = require('../models/user')(db, sequelize);
// const User = require('../db').import('../models/user');


const validateSession = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(403).json({
            auth: false,
            message: 'no token provided'
        })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(!err && decodedToken){
                //find user by id          id coded into token in usercontroller
                User.findOne({
                    where: {id: decodedToken.id}})
                    .then(user => {
                        if(!user) throw err;

                        req.user = user;
                        return next();
                    })
                    .catch(err => next(err))
            }else{
                req.errors = err;
                return res.status(500).send('not authorized');
            }
        })
    };
};

module.exports = validateSession;