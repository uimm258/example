export const addGenresToStore = (state, newGenres) => {
    return state.map((genre) => {
        const newGenre = {...genre};
        newGenre.id = genre.id;
        newGenre.genres_name = newGenres.push(genre);
        return newGenre;
    });
}

export const addMoviesToStore = (state, genres_id, newMovies) => {
    return state.map((movie) => {
        if(movie.genres.id === genres_id){
            const newMovie = {...movie};
            newMovie.id = movie.id;
            newMovie.movies_name = newMovies.movies_name;
            newMovie.movies_price = newMovies.movies_price;
            newMovie.movie_type = newMovies.movie_type;
            newMovie.content = newMovies.content;
            return newMovie;
        } else {
            return {...movie};
        }
    });
};

export const updateMoviesToStore = (state, genres_id, newMovies) => {
    return state.map((movie) => {
        if(movie.genres.id === genres_id){
            const newMovie = {...movie};
            newMovie.id = movie.id;
            newMovie.movies_name = newMovies.movies_name;
            newMovie.movies_price = newMovies.movies_price;
            newMovie.movie_type = newMovies.movie_type;
            newMovie.content = newMovies.content;
            return newMovie;
        } else {
            return movie;
        }
    });
};
