import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './NewMovieForm.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


function NewMovieForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [newMovieData, setNewMovieData] = useState({
    title: '',
    poster: '',
    description: '',
    genre: ''
  });

  const titleChange = (event) => {
    setNewMovieData({ ...newMovieData, title: event.target.value })
  }

  const posterChange = (event) => {
    setNewMovieData({ ...newMovieData, poster: event.target.value })
  }

  const descriptionChange = (event) => {
    setNewMovieData({ ...newMovieData, description: event.target.value })
  }

  const genreChange = (event) => {
    setNewMovieData({ ...newMovieData, genre: event.target.value })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_NEW_MOVIE',
      payload: newMovieData
    })
    history.push('/');
    setNewMovieData({
      title: '',
      poster: '',
      description: '',
      genre: ''
    });
  }

  const handleCancel = () => {
    history.push('/');
    setNewMovieData({
      title: '',
      poster: '',
      description: '',
      genre: ''
    });
  }

  return (
    <div>
      <h2>Add a New Movie</h2>
      <div id="form-container">
        <form onSubmit={handleFormSubmit}>

          <Box m={1} p={1}>
            <TextField
              style={{ width: 350 }}
              label="Movie Title"
              variant="outlined"
              type="text"
              value={newMovieData.title}
              onChange={titleChange} />
          </Box>

          <Box m={1} p={1}>
            <TextField
              style={{ width: 350 }}
              label="Movie Poster URL"
              variant="outlined"
              type="text"
              value={newMovieData.poster}
              onChange={posterChange} />
          </Box>

          <Box m={1} p={1}>
            <TextField
              style={{ width: 350 }}
              multiline
              rows={5}
              variant="outlined"
              label="Description"
              value={newMovieData.description}
              onChange={descriptionChange} />
          </Box >

          <FormControl style={{ minWidth: 200 }} variant="outlined">
            <InputLabel id="genreList">Genre:</InputLabel>
            <Select
              name="genres"
              value={newMovieData.genre}
              onChange={genreChange}
              label="Genre"
              labelId="genreList"
            >
              <MenuItem value=""><em>--Choose A Genre--</em></MenuItem>
              <MenuItem value="Adventure">Adventure</MenuItem>
              <MenuItem value="Animated">Animated</MenuItem>
              <MenuItem value="Biographical">Biographical</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Disaster">Disaster</MenuItem>
              <MenuItem value="Drama">Drama</MenuItem>
              <MenuItem value="Epic">Epic</MenuItem>
              <MenuItem value="Fantasy">Fantasy</MenuItem>
              <MenuItem value="Musical">Musical</MenuItem>
              <MenuItem value="Romantic">Romantic</MenuItem>
              <MenuItem value="Science Fiction">Science Fiction</MenuItem>
              <MenuItem value="Space-Opera">Space-Opera</MenuItem>
              <MenuItem value="Superhero">Superhero</MenuItem>
            </Select>

          </FormControl>
          <br />
          <div id="form-buttons">
            <Box m={1}>
              <Button type="submit" variant="contained" color="Primary">Submit</Button>
            </Box>
            <Box m={1}>
              <Button color="secondary" onClick={handleCancel}>Cancel</Button>
            </Box>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewMovieForm;
