import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import './Movie.css';

//import { connect } from 'react-redux';
//import { deleteMovies } from '../../store/store';

class Movie extends Component {
    static contextType = Context;

    static defaultProps = {
        onDeleteScript: () => { }
    }

    handleClickDelete = (e) => {
        e.preventDefault();
        const movieId = this.props.id;
        fetch(`${config.API_ENDPOINT}/admin/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then((res) => {
                if (!res.ok) return res.json().then((e) => Promise.reject(e));
            })
            .catch((error) => {
                console.log({ error })
            })
    };

    render() {
        return (
            <>
                <div className='Movies'>
                    <h2 className='Movies_title'>
                        <Link to={`/movies/${this.props.id}`}>{this.props.name}</Link>

                        {TokenService.hasAuthToken() && <button className="delete-button" type="button" onClick={this.handleClickDelete}>Delete</button>}
                    </h2>

                    <div className="Movies_info">
                        <div>
                            Price: {' '}
                            <span>
                                {this.props.price}
                            </span>
                        </div>
                        <div>
                            Genre: {' '}
                            <span>
                                {this.props.type}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    };
};

export default Movie;

/*const mapDispatchToProps = (dispatch) => {
    return {
        deleteMovies: (id) => {
            dispatch(deleteMovies(id));
        }
    };
};

export default connect(null, mapDispatchToProps)(Movie)*/