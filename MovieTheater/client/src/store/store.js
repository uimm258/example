import {
    addGenresToStore,
    addMoviesToStore,
    updateMoviesToStore,
} from './reducerFunctions';

// INITIAL STATES
const INIT_STATE = {
    genres: [],
    movies: [],
}

// ACTIONS
const GET_GENRES = 'GET_GENRES';
const GET_MOVIES = 'GET_MOVIES';
const ADD_GENRES = 'ADD_GENRES';
const ADD_MOVIES = 'ADD_MOVIES';
const UPDATE_MOVIES = 'UPDATE_MOVIES';
const DELETE_GENRES = 'DELETE_GENRES';
const DELETE_MOVIES = 'DELETE_MOVIES';

// ACTION CREATORS
export const gotGenres = (genres) => {
    return {
        type: GET_GENRES,
        genres
    };
};

export const gotMovies = (movies) => {
    return {
        type: GET_MOVIES,
        movies
    };
};

export const addGenres = (newGenres) => {
    return {
        type: ADD_GENRES,
        payload: newGenres
    };
};

export const addMovies = (genres_id, newMovies) => {
    return {
        type: ADD_MOVIES,
        payload: { genres_id, newMovies }
    };
};

export const updateMovies = (genres_id, newMovies) => {
    return {
        type: UPDATE_MOVIES,
        payload: { genres_id, newMovies }
    };
};

export const deleteGenres = (id) => {
    return {
        type: DELETE_GENRES,
        payload: id
    };
};

export const deleteMovies = (id) => {
    return {
        type: DELETE_MOVIES,
        payload: id
    };
};


// REDUCER
const reducer = (state=INIT_STATE, action) => {
    switch (action.type) {
        case GET_GENRES:
            return action.genres;
        case GET_MOVIES:
            return action.movies;
        case ADD_GENRES:
            return addGenresToStore (state, action.payload.newGenres);
        case ADD_MOVIES:
            return addMoviesToStore (
                state, 
                action.payload.genres_id, 
                action.payload.newMovies
            );
        case UPDATE_MOVIES:
            return updateMoviesToStore(
                state, 
                action.payload.genres_id, 
                action.payload.newMovies
            );
        case DELETE_GENRES:
            return {
                ...state,
                genres: state.genres.filter((genre, id) => id !== action.payload)
            }
        case DELETE_MOVIES:
            return {
                ...state,
                movies: state.movies.filter((movie, id) => id !== action.payload)
            }
        default:
            return state
    }
};

export default reducer;