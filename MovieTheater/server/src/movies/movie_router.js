const express = require('express');
const MoviesService = require('./Movies_service');
const xss = require('xss');
const MoviesRouter = express.Router();
const jsonParser = express.json();
const logger = require('../logger');

const initMovies = (movie) => ({
    id: movie.id,
    movies_name: xss(movie.Movies_name),
    movies_price: xss(movie.Movies_price),
    movies_type: xss(movie.Movies_type),
    content: xss(movie.content),
    genres_id: movie.genres_id,
    admin: movie.admin_id
});

MoviesRouter
    .route('/')
    .get((req, res, next) => {
        const knex = req.app.get('db');
        MoviesService
            .getAllMovies(knex)
            .then((movie) => res.json(movie.map(initMovies)))
            .catch(next);
    })
    

MoviesRouter
    .route('/:movie_id')
    .all((req, res, next) => {
        const { movie_id } = req.params
        MoviesService
            .getById(req.app.get('db'), movie_id)
            .then((movie)=> {
                if(!movie) {
                    logger.error(`movie with id ${movie_id} not found`);
                    return res.status(400).json({ error: {message:'movie not found'} });
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

module.exports = MoviesRouter;