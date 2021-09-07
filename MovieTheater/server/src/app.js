require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const GenresRouter = require('./genres/genres_router')
const MoviesRouter = require('./movies/movies_router')
const authRouter = require('./auth/auth-router')
const AdminGenresRouter = require('./genres/admin_genres_router')
const AdminMoviesRouter = require('./movies/admin_movies_route')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

// routes for genres and movies
app.use('/genres', GenresRouter)
app.use('/movies', MoviesRouter)
app.use('/auth', authRouter)
app.use('/admin', AdminGenresRouter)
app.use('/admin', AdminMoviesRouter)


app.get('/', (req, res) => {
   res.send('Hello, world!')
})

// error handlers
app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app