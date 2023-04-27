import React from 'react';
import {store} from './Store/store';
import { Provider } from 'react-redux';
import "./App.css";

import { ThemeProvider } from '@mui/material';
import theme from './configs/themeConfig';


//components
import LandingPage from './Components/LandingPage/LadingPage';

function App() {



  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <div id='appDiv'>
              <LandingPage/>
            </div>
        </ThemeProvider>
    </Provider>
  );
}

export default App;
