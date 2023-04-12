const express = require('express');
const cors = require('cors');
const path = require('path');
// const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const connectToDB = require('./db');
const passportSetup = require('./config/passport');

const app = express();
require('dotenv').config()

// init session mechanism
app.use(session({ secret: 'anything' }));

// init passport
// app.use(passport.initialize());
// app.use(passport.session());

// standard middleware
app.use(cors());
app.use(express.json());
app.use( session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    }, })
    );
    

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));
// app.use('/adverts', require('./routes/adverts.routes'));

app.set('veiw engine', 'ejs')

app.use((req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});