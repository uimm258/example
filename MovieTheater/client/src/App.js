import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';

//import store from './store';
import Routes from './routes/routes';

function App() {
  return (
   
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    
  );
}

export default App;
