const express = require('express');
const xss = require('xss');
const logger = require('../logger');
const GenresRouter = express.Router();
const jsonParser = express.json();
const genresService = require('./genres_service');

const initGenres = (genres) => ({
    id: genres.id,
    genres_name: xss(genres.genres_name),
    admin_id: genres.admin_id
});

GenresRouter
    .route('/')
    .get((req, res, next) => {
        const knex = req.app.get('db');
        genresService.getAllGenres(knex)
            .then((genres) => res.json(genres.map(initGenres)))
            .catch(next);
    })

GenresRouter
    .route('/:Genres_id')
    .all((req, res, next) => {
        const {genres_id} = req.params;
        GenresService.getById(req.app.get('db'), genres_id)
            .then((genres) => {
                if(!genres) {
                    logger.error(`The Genres with id the ${genres_id} was not found`);
                    return res.status(404).json({error: {message: 'Genres not found'}});
                }
                res.genres = genres;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        const genres = res.genres;
        res.json(initGenres(genres));
    })

module.exports = GenresRouter;