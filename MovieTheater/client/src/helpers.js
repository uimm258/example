export const findGenre = (genres=[], genres_id) => {
    genres.find(genre => genre.id === genres_id)
};

export const findMovie = (movies=[], movieId) => 
    movies.find(movie => {
        return movie.id === parseInt(movieId)
});

export const getMoviesForGenres = (movies=[], genres_id) => (
    (!genres_id)
        ? movies
        : movies.filter(movie => movie.genres_id === genres_id)
);

export const countMoviesForGenres = (movies=[], genres_id) => (
    movies.filter(movie => movie.genres_id === genres_id).length
);