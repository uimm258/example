import React, { Component } from 'react';
import './MoviePageNav.css';
import { Link } from 'react-router-dom'
import Context from '../../Context';
import { findGenre, findMovie } from '../../helpers';

class MoviePageNav extends Component{
    static defaultProps = { 
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    };

    static contextType = Context;

    render() {
        const { movies, genres } = this.context;
        const { movieId } = this.props.match.params;
        const movie = findMovie(movies, movieId) || {};
        const genre = findGenre(genres, movie.genres_id);
        return (
            <div className='MoviePageNav'>
                <button
                    type='button'
                    tag={Link}
                    onClick = {() => this.props.history.goBack()}
                    className='MoviePageNav_back-button' >
                    Back
                </button> 
    
                {genre && (
                    <h3 className='MoviePageNav_genre-name'>{genre.genres_name}</h3>
                )}   
                
            </div>
        )
    };
};

export default MoviePageNav;