import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('ADD_NEW_MOVIE', addNewMovie)
    yield takeEvery('FETCH_SINGLE_MOVIE', fetchSingleMovie)
    yield takeEvery('DELETE_MOVIE', deleteMovie)
    yield takeEvery('LOGOUT_USER', logoutUser)
    yield takeEvery('LOGIN_USER', loginUser)
    yield takeEvery('REGISTER_USER', registerUser)
}

function* logoutUser() {
    try {
        yield axios.get('/logout');
        yield put({ type: 'LOGOUT' });
    } catch {
        console.log('logout error');
    }
}

function* loginUser(action) {
    try {
        yield axios.post('/login', action.payload);
        yield put({ type: 'LOGIN' });
    } catch {
        console.log('login error');
    }
}

function* registerUser(action) {
    try {
        yield axios.post('/register', action.payload);
        yield put({ type: 'LOGIN' });
    } catch {
        console.log('login error');
    }
}

function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchSingleMovie(action) {
  try {
      const singleMovie = yield axios.get(`/api/movie/${action.payload}`);
      console.log('get single movie:', singleMovie.data);
      yield put({ type: 'SET_MOVIE_DETAILS', payload: singleMovie.data[0] });

  } catch {
      console.log('get all error');
  }
      
}

function* addNewMovie(action) {
  console.log('action.payload', action.payload);
  try {
    yield axios.post('/api/movie', action.payload);
    yield put({ 
      type: 'FETCH_MOVIES'
    })
  }
  catch (err) {
    console.log('Error in Saga POST', err);
  }
}

function* deleteMovie(action) {
  try {
    yield axios.delete(`api/movie/${action.payload}`)
    yield put({ 
      type: 'FETCH_MOVIES'
    })
  }
  catch (err) {
    console.log('Error in Saga Delete', err);
  }
}

const sagaMiddleware = createSagaMiddleware();

const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload;
    case 'CLEAR_DETAILS':
      return {};
    default:
      return state;
  }
}

const user = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN':
            return true;
        case 'LOGOUT':
            return false;
        default:
            return state;
    }
}

const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const storeInstance = createStore(
    combineReducers({
        user,
        movies,
        genres,
        movieDetails
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
