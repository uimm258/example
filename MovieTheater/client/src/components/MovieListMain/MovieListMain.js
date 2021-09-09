import React, { Component } from 'react';
import Movie from '../Movie/Movie';
import Context from '../Context';
import { getMoviesForGenres } from '../../helpers';
import './MovieListMain.css';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import config from '../../config';

class MovieListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = Context;

    handleDeleteGenre = () => {
        const genreId = Object.values(this.props.match.params);
        fetch(`${config.API_ENDPOINT}/admin/genre/${genreId}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then((res) => {
                if (!res.ok) return res.json().then((e) => Promise.reject(e))
            })
            .then(() => {
                this.context.deleteGenre(genreId)
                window.location.href = '/'
            })
            .catch((e) => console.log(e))
    };

    render() {
        const { genre_id } = this.props.match.params;
        const { movies = [] } = this.context;
        const MoviesForGenre = getMoviesForGenres(movies, parseInt(genre_id));

        return (
            <section className='MovieListMain'>
                <ul>
                    {MoviesForGenre.map(movie =>
                        <li key={movie.id}>
                            <Movie
                                id={movie.id}
                                price={movie.movies_price}
                                type={movie.movies_type}
                            />
                        </li>
                    )}
                </ul>

                <div>
                    {TokenService.hasAuthToken() && <button
                        tag={Link}
                        to='/add-movie'
                        type='button'
                        className="add-movie-button">
                        Add Movie
                    </button>}
                </div>

                {TokenService.hasAuthToken() && <button onClick={this.handleDeleteGenre}>Delete the Current Genre</button>}
            </section>
        )
    };
};

export default MovieListMain;
