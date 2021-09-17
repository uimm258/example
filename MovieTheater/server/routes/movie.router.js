const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

router.get('/:id', (req, res) => {
  console.log('req.params', req.params);
  const query = `SELECT "movies".title, 
                        "movies".poster,
                        "movies".description, 
                        "movies".id,
                        ARRAY_AGG ("genres".name) as "all_genres"
                FROM "movies"
                JOIN "movies_genres" ON "movies".id = "movies_genres".movie_id
                JOIN "genres" ON "genres".id = "movies_genres".genre_id
                WHERE "movies".id = $1
                GROUP BY "movies".title, "movies".poster, "movies".description, "movies".id`;
  pool.query(query, [req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id);
    
    const createdMovieId = result.rows[0].id

    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      SELECT(SELECT "movies".id FROM "movies"
        WHERE "movies".id = $1),
        (SELECT "genres".id FROM "genres"
        WHERE "genres".name = $2);
      `

      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre]).then(result => {
        res.sendStatus(201);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500)
      })

  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.delete('/:id', (req, res) => {
  console.log('req.params', req.params);
  const query = `DELETE FROM "movies"
                WHERE "movies".id = $1;`
  pool.query(query, [req.params.id])
    .then( result => {
      res.sendStatus(201)
    })
    .catch(err => {
      console.log('ERROR: Delete movie', err);
      res.sendStatus(500)
    })
})

module.exports = router;
