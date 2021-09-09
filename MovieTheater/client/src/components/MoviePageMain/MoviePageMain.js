import React, { Component } from 'react';
import { findMovie } from '../movies-helpers'
import Movie from '../Movie/Movie';
import Context from '../../Context';
import './MoviePageMain.css';

//import TokenService from '../../services/token-service';

//import { connect } from 'react-redux';
//import { updateMovies } from '../../store/store';

class MoviePageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = Context;

    handleDeleteMovie = () => {
        this.props.history.push(`/`);
    };

    render() {
        const { movies = [] } = this.context;
        const { movieId } = this.props.match.params;
        const movie = findMovie(movies, parseInt(movieId)) || { content: '' }

        return (
            <>
                <section className="MoviePageMain">
                    <Movie
                        id={movie.id}
                        name={movie.Movies_name}
                        type={movie.Movies_type}
                        price={movie.Movies_price}
                        onDeleteMovie={this.handleDeleteMovie}
                    />
                    
                    <div className="MoviePageMain_content">
                        <p><Movie content={movie.content} /></p>
                    </div>
                </section>
            </>
        )
    };
};

export default MoviePageMain
