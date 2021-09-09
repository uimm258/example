import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { countMoviesForGenres } from '../../helpers'
import './MovieListNav.css'
import Context from '../../Context'
import TokenService from '../services/token-service'

class MovieListNav extends Component {
    static contextType = Context;

    renderBackButton = () => {
        if (this.props.match.path !== "/") {
            return (
                <button
                    type='button'
                    onClick={() => this.props.history.goBack()}
                    className='MovieListNav_back-button' >
                    Back
                </button>
            )
        };
    };

    render() {
        const { genres = [], movies = [] } = this.context;
        return (
            <div className="MovieListNav">
                {this.renderBackButton()}
                <ul className={`MovieListNav_list ${this.props.match.path === "/" ? " " : "genres"}`}>
                    {genres.map(genre =>
                        <li key={genre.id}>
                            <NavLink
                                className='MovieListNav_genre-link'
                                to={`/genres/${genre.id}`}
                            >
                                <span className='MovieListNav_num-movies'>
                                    {countMoviesForGenres(movies, parseInt(genre.id))}
                                </span>
                                {genre.genres_name}
                            </NavLink>
                        </li>
                    )}
                </ul>

                <div>
                    {TokenService.hasAuthToken() && <button
                        tag={Link}
                        to='/add-genres'
                        type='button'
                        className="add-genre-button">
                        Add Genre
                    </button>}
                </div>
            </div>
        )
    };
};

export default MovieListNav;