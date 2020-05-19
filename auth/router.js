//register, login, logout, and 
//deciding req.session.loggedIn = true || false;  
//pass that into users-router.js middleware `restricted` function

const bcryptjs = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');

router.post('/register', (req, res) => {
    const credentials = req.body;
    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;  // how many rounds of encryptions
        const hash = bcryptjs.hashSync(credentials.password, rounds); //hashing the password
        credentials.password = hash;

        Users.add(credentials).then(user => {
            req.session.loggedIn = true;
            res.status(201).json({
                data: user
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message })
        })
    } else {
        res.status(400).json({
            message: 'Please provide username and password and the password should be string'
        })
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (isValid(req.body)) {
        Users.findBy({ username: username }).then(([user]) => {
            //compare the password to the hash stored in the database
            if (user && bcryptjs.compareSync(password, user.password)) {
                //we can save the information about the client inside the session (req.session)
                req.session.loggedIn = true;
                req.session.user = user;
                res.status(200).json({
                    message: 'Successfully logged in'
                })
            } else {
                res.status(401).json({
                    message: 'Invalid credentials'
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: err.message })
        })
    } else {
        res.status(400).json({
            message: 'Please provide username and password, and the password should be string'
        })
    }
});

router.get('/logout', (req, res) => {
    console.log('loggin out');
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({
                    message: "We could not log out you, try again later"
                })
            } else {
                res.status(204).end();
            }
        })
    } else {
        res.status(204).end();
    }
})

module.exports = router;
