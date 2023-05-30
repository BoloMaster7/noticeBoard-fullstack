const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const connectToDB = require('./db');
require('dotenv').config();

const app = express();
connectToDB()

// // init session mechanism
app.use(session({ secret: 'anything' }));

// standard middleware
if (process.env.NODE_ENV !== 'production') {
  console.log('asdsadsadsadas')
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
} else {
  app.use(cors());
}

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
})
);

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/ads.routes')); 

console.log(path.join(__dirname, '/uploads'))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).render('notFound');
});


app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});