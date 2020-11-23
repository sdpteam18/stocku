import logo from './logo.svg';
// import './App.css';
import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import './App.sass';
import Navbar from './components/Navbar/Navbar.js';
import Grid from './components/Grid/Grid.js';

c


// Unsubscribe
class App extends Component{
  
  
render() { 
  return(
    <div>
    <Navbar></Navbar>
    <main>
    <Grid></Grid>
    </main>
    </div>
  );
}
}

export default App;
