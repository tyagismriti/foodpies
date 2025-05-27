import React from 'react'
import ReactGA from 'react-ga4'

import './App.css';
import AppRouter from './routes/AppRouter';

ReactGA.initialize(process.env.REACT_APP_GA_ID)

function App() {
  return (
    <div className="App">    
      <AppRouter />
    </div>
  );
}

export default App;
