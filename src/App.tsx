import React, { useEffect } from 'react';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './Store/hooks';
import {useCookies} from "react-cookie"
import { log, logout } from './Store/configSlice';
import { getUserInfoFromSession } from './Store/userSlice';
//components
import LandingPage from './Components/LandingPage/LadingPage';
import MovieDetails from './Components/movieDetails/movieDetails';
import Login from './Components/LoginPage/Login';
import PasswordReset from './Components/PasswordReset/PasswordReset';

function App() {
  const [cookies] = useCookies()
  const dispacher = useAppDispatch()

  useEffect(() => {
    
    if(cookies.session_id){
      dispacher(log())
      const session_id = cookies.session_id
      dispacher(getUserInfoFromSession(session_id))
      console.log("User is log")
    }
    else{
      dispacher(logout())
      console.log("User isn't logged")
    }
  },[])

  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/movie/:movieid' element={<MovieDetails/>}/>
      <Route path='/reset/:token' element={<PasswordReset/>}/>
    </Routes>

  );
}

export default App;
