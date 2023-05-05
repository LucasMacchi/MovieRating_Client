import React from 'react';
import "./App.css";
import { Route, Routes } from 'react-router-dom';



//components
import LandingPage from './Components/LandingPage/LadingPage';
import MovieDetails from './Components/movieDetails/movieDetails';

function App() {



  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/movie/:movieid' element={<MovieDetails/>}/>
    </Routes>

  );
}

export default App;
