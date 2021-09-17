const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const logout = require('express-passport-logout');

router.get('/', (req, res) => {
  res.send(req.user);
});

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const queryText = `INSERT INTO "users" (username, password)  VALUES ($1,  $2) RETURNING id`;
  pool
      .query(queryText, [username, password])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
});

router.post('/login', (req, res) => {
  res.sendStatus(200);
});

router.get('/logout', (req, res) => {
  logout();
  res.sendStatus(200);
});

module.exports = router;
