import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {
    const dispatch = useDispatch();
    const history = useHistory();

    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

  const handleImageClick = (movieId) => {
    console.log('handleImageClick');
    dispatch({ 
      type: 'FETCH_SINGLE_MOVIE',
      payload: movieId 
    });

    toDetailsPage(movieId);
  }


  const toDetailsPage = (movieId) => {
    history.push(`/details/${movieId}`)
  }

  
    return (
        <main>
            <section className="movies">
              {/* map through the movies date from redux store */}
                {movies.map(movie => {
                    return (
                        <div 
                          key={movie.id} 
                          className="movie-image-div"
                          onClick={() => handleImageClick(movie.id)}>
                            <img className="list-image" src={movie.poster} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;
