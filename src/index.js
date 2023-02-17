import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider} from './context/ThemeContext'



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<React.StrictMode>
  <ThemeProvider>
      <App />
  </ThemeProvider>
  </React.StrictMode>

);


/*
ReactDOM.render(
  <React.StrictMode>
  <ThemeProvider>
      <App />
  </ThemeProvider>
  </React.StrictMode>
  document.getElementById('root')
);
*/
