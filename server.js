// all the end point goes here
// cookie setting up
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/users-router.js');
const authRouter = require('./auth/router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

const sessionConfig = {
    cookie: {
        maxAge: 1000 * 60 * 60, //one hour in milliseconds
        secure: process.env.SECURE_COOKIE || false,  //send the cookie only over https
        httpOnly: true, //true means client JS cannot access the cookie
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOW_COOKIES || true,
    name: "cookie monster",
    secret: process.env.COOKIE_SECRET || 'keepitsecret,keepitsafe!',
};
//create a session and send the cookie back (the cookie will store the session id)
server.use(session(sessionConfig));//turn on session for the API

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/',(req,res)=>{
    res.json({API: 'UP'});
})

module.exports =server;