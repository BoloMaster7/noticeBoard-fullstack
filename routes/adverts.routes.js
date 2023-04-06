const express = require('express');
const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/user/no-permission');
  } else {
    next();
  }
};

router.get('/logged', isLoggedIn, (req, res) => {
  res.render('logged', {
    user: req.user.displayName,
    avatar: req.user.photos[0].value,
  });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});


router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', isLoggedIn, (req, res) => {
  res.render('profileSettings');
});

router.get('/logout', (req, res) => {
  res.render('logout');
});


module.exports = router;