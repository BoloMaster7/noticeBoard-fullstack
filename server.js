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
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
})
);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/ads', require('./routes/ads.routes')); 

app.set('veiw engine', 'ejs')

app.use((req, res) => {
  res.status(404).render('notFound');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});