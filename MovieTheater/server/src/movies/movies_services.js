const MoviesService = {
    getAllMovies(knex){
        return knex
            .select('*')
            .from('movies');
    },
    insertMovies(knex, newMovie){
        return knex
            .insert(newMovie)
            .into('movies')
            .returning('*')
            .then((rows) => {
                return rows[0];
            });
    },
    getById(knex, id){
        return knex
            .from('movies')
            .select('*')
            .where('id', id)
            .first();
    },
    deleteMovie(knex, id){
        return knex('movies')
            .where({id})
            .delete();
    },
    updateMovie(knex ,id,newMovieFields){
        return knex('movies')
            .where({id})
            .update(newMovieFields);
    },
};

module.exports = MoviesService;