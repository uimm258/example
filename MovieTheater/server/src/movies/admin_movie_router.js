const express = require('express');
const MoviesService = require('./movies_services');
const xss = require('xss');
const AdminMoviesRouter = express.Router();
const jsonParser = express.json();
const logger = require('../logger');
const { requireAuth } = require('../middleware/jwt-auth');

const initMovies = (movie) => ({
  id: movie.id,
  movies_name: xss(movie.movies_name),
  movies_price: xss(movie.movies_price),
  movies_type: xss(movie.movies_type),
  content: xss(movie.content),
  genres_id: movie.genres_id,
  admin_id: movie.admin_id
});

AdminMoviesRouter
  .route('/movies')
  .all(requireAuth)
  .get((req, res, next) => {
    const knex = req.app.get('db');
    MoviesService
      .getAllMovies(knex)
      .then((movie) => res.json(movie.map(initMovies)))
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    for (const field of ['movies_name', 'movies_price', 'movies_type', 'content', 'genres_id']) {
      if (!req.body[field]) {
        logger.error(`The ${field} value is missing from Movies post`);
        return res.status(400).json({ error: { message: `${field} is missing` } });
      }
    }
    const newMovies = {
      movies_name: xss(req.body.movies_name),
      movies_price: xss(req.body.movies_price),
      movies_type: xss(req.body.movies_type),
      content: xss(req.body.content),
      genres_id: req.body.genres_id,
    };
    newMovies.admin_id = req.user.id;
    MoviesService
      .insertMovies(req.app.get('db'), newMovies)
      .then((movie) => {
        logger.info(`Movies with id ${movie.id} has been created`);
        res.status(201).location(`/Movies/${movie.id}`).json(movie);
      })
      .catch(next);
  });

AdminMoviesRouter
  .route('/Movies/:movie_id')
  .all(requireAuth)
  .all((req, res, next) => {
    const { movie_id } = req.params;
    MoviesService
      .getById(req.app.get('db'), movie_id)
      .then((movie) => {
        if (!movie) {
          logger.error(`movie with id ${movie_id} not found`);
          return res.status(400).json({ error: { message: 'movie not found' } });
        }
        res.movie = movie;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    const movie = res.movie;
    res.json(initMovies(movie));
  })
  .delete((req, res, next) => {
    const { movie_id } = req.params;
    MoviesService
      .deleteMovie(req.app.get('db'), movie_id)
      .then(() => {
        logger.info(`movie with id ${movie_id} deleted`);
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const movieUpdate = req.body;
    if (Object.keys(movieUpdate).length === 0) {
      logger.info('movie must have value to update');
      return res.status(400).json({
        error: { message: 'patch request must supply values' },
      });
    }
    MoviesService
      .updateMovie(req.app.get('db'), res.movie.id, movieUpdate)
      .then(() => {
        logger.info(`movie with id ${res.movie.id} updated`);
        res.status(204).end();
      });
  });

module.exports = AdminMoviesRouter;
