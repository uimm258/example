const express = require('express');
const xss = require('xss');
const logger = require('../logger');
const AdminGenresRouter = express.Router();
const jsonParser = express.json();
const genresService = require('./genres_service');
const { requireAuth } = require('../middleware/jwt-auth');

const initGenres = (genres) => ({
    id: genres.id,
    genres_name: xss(genres.genres_name),
    admin_id: genres.admin_id
});

//admin-post    
AdminGenresRouter
    .route('/genres')
    .all(requireAuth)
    .get((req, res, next) => {
        const knex = req.app.get('db');
        genresService.getAllGenres(knex)
            .then((genres) => res.json(genres.map(initGenres)))
            .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
        for (const field of ['genres_name']) {
            if (!req.body[field]) {
                logger.error(`The ${field} is missing for the genres to post`);
                return res.status(400).json({ error: { message: `${field} is missing` } });
            }
        }
        const newGenres = {
            genres_name: xss(req.body.genres_name),
        };
        newGenres.admin_id = req.user.id

        genresService
            .insertGenres(req.app.get('db'), newGenres)
            .then((genres) => {
                logger.info(`Genres with id${genres.id} created`);
                res.status(201).location(`/genres/${genres.id}`).json(genres);
            })
            .catch(next);
    });

AdminGenresRouter
    .route('/genres/:genres_id')
    .all(requireAuth)
    .all((req, res, next) => {
        const { genres_id } = req.params;
        genresService.getById(req.app.get('db'), genres_id)
            .then((genres) => {
                if (!genres) {
                    logger.error(`The Genres with id the ${genres_id} was not found`);
                    return res.status(404).json({ error: { message: 'Genres not found' } });
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
    .delete((req, res, next) => {
        const { genres_id } = req.params;
        genresService.deleteGenres(req.app.get('db'), genres_id)
            .then(() => {
                logger.info(`Genres with id ${genres_id} has been deleted`);
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(jsonParser, (req, res, next) => {
        const genresUpdates = req.body;
        if (Object.keys(genresUpdates).length == 0) {
            logger.info('Genres can not be empty');
            return res.status(400).json({
                error: { message: 'patch request must supply values to update' },
            });
        }
        genresService
            .updateGenres(
                req.app.get('db'),
                res.genres.id,
                genresUpdates
            ).then(() => {
                logger.info(`The Genres with id ${res.genres.id} has been updated`);
                res.status(204).end();
            });
    });

module.exports = AdminGenresRouter