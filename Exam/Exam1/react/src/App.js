import React, { useEffect, useState } from 'react';
import './App.css';
import Artist from './components/Artist';

function App() {
  const [artist, setArtist] = useState([])
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
  const searchURL = `https://itunes.apple.com/search?term=${searchInput}&media=music&entity=album&attribute=artistTerm&limit=200`;

  useEffect(() => {
    fetch(searchURL)
      .then(res => res.json())
      .then(responseJson => {
        setArtist(responseJson.results)
      })
      .catch(e => console.log(e))
  }, [searchURL])

  const handleChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
  };

  const handleSubmit = () => {
    if(searchInput.length === 0) {
      setSearchResult([]);
    } else {
      console.log(artist)
      artist.filter((res) => {
        console.log(typeof res)
        return setSearchResult(res);
      });
    };
  };

  return (
    <div>
      <h1 id="title">Search Artists By Name</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Type name here' id='artist-name' value={searchInput} onChange={handleChange}/>
        <button type='submit'>Go</button>
      </form>
      {searchResult.map(val => <Artist artist={val} key={val.id} />)}
    </div>
  );
};

export default App;
