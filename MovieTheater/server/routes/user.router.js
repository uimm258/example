const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const logout = require('express-passport-logout');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')


router.get('/', (req, res) => {
  res.send(req.user);
});

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const queryText = `INSERT INTO "users" (username, password) VALUES ($1,  $2) RETURNING id`;
  pool
      .query(queryText, [username, password])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
});

// Handles login form authenticate/login POST
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', function(req, res) {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;
  
    const queryText = `SELECT * FROM "users"`;
    pool
      .query(queryText)
      .then((result) => {
        if(inputUsername === result.rows[1].username && inputPassword === result.rows[0].password) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404)
        }
      })
  
});

router.get('/logout', (req, res) => {
  logout();
  res.sendStatus(200);
});

module.exports = router;
