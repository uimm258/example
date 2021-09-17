import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { countMoviesForGenres } from '../../helpers';
import './MovieListNav.css';
import Context from '../../Context';
import CircleButton from '../CircleButton/CircleButton';
import TokenService from '../../services/token-service';

class MovieListNav extends Component {
    static contextType = Context;

    renderBackButton = () => {
        if (this.props.match.path !== "/") {
            return (
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='MovieListNav_back-button' >
                    <br />
                    Back
                </CircleButton>
            )
        }
    };

    render() {
        const { genres = [], movies = [] } = this.context;
        return (
            <div className="MovieListNav">
                {this.renderBackButton()}
                <ul className={`MovieListNav_list ${this.props.match.path === "/" ? " " : "genre"}`}>
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
                    {TokenService.hasAuthToken() && <CircleButton
                        tag={Link}
                        to='/add-genres'
                        type='button'
                        className="add-genre-button">
                        Add Genre
                    </CircleButton>}
                </div>
            </div>
        )
    };
};

export default MovieListNav;
