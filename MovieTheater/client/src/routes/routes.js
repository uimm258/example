import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Context from '../Context';
import config from '../config';
import MovieListNav from '../components/MovieListNav/MovieListNav';
import MovieListMain from '../components/MovieListMain/MovieListMain';
import MoviePageNav from '../components/MoviePageNav/MoviePageNav';
import MoviePageMain from '../components/MoviePageMain/MoviePageMain';
import LoginRoute from '../components/Login/LoginRoute';
import AddGenre from '../components/AddGenre/AddGenre';
import AddMovie from '../components/AddMovie/AddMovie';
import './routes.css';

class Routes extends Component {
  state = {
    genres: [],
    movies: [],
  }

  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/movies`),
        fetch(`${config.API_ENDPOINT}/genres`)
    ])
        .then(([MoviesRes, GenreRes]) => {
            if (!MoviesRes.ok)
                return MoviesRes.json().then(e => Promise.reject(e));
            if (!GenreRes.ok)
                return GenreRes.json().then(e => Promise.reject(e));

            return Promise.all([MoviesRes.json(), GenreRes.json()]);
        })
        .then(([Movies, Genre]) => {
            this.setState({Movies, Genre});
        })
        .catch(error => {
            console.error({error});
        });
}

  handleAddGenre = genre => {
    this.setState({
      genres: [...this.state.genres, genre]
    }
  )}

  handleAddMovie = movie => {
    this.setState({
      movies: [...this.state.movies, movie]
    })
  }

  handleDeleteMovie = movieId => {
    this.setState({
      movies: this.state.movies.filter(movie => movie.id !== movieId)
    })
  }

  handleDeleteGenre = genreId => {
    this.setState({
      genres: this.state.genres.filter(genre => genre.id !== genreId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        {["/", "/genre/:genre_id"].map(path =>(
          <Route
            exact
            key={path}
            path={path}
            component={MovieListNav}
          />
        ))}
        <Route path='/movies/:movieId' component={MoviePageNav}
        />
        <Route path='/add-genre' component={MoviePageNav} />
        <Route path='/add-movie' component={MoviePageNav} />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path="/" />
        <Route path={'/login'} component={LoginRoute} />
        
        <Route
            exact
            path="/genre/:genre_id"
            component={MovieListMain}
          />
        
        <Route path="/movies/:movieId" component={MoviePageMain} />
        <Route path='/add-genre' component={AddGenre} />
        <Route path='/add-movie' component={AddMovie} />

      </>
    );
  }

  render() {
    const value = {
      Genre: this.state.Genre,
      Movies: this.state.Movies,
      addGenre: this.handleAddGenre,
      addMovie: this.handleAddMovie,
      deleteMovie: this.handleDeleteMovie,
      deleteGenre: this.handleDeleteGenre
    };

    return (
      <Context.Provider value={value}>
        <div className="Route">
          <nav className="Route_nav">
            {this.renderNavRoutes()}
          </nav>

          <header className="Route_header">
            <h1>
              <Link to="/"> Maymay's Movie Page</Link>
            </h1>
          </header>

          <main className="Route_main">
            {this.renderMainRoutes()}
          </main>
        </div>
      </Context.Provider>
    )
  }

}

export default Routes;