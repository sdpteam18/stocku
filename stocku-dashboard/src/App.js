import logo from './logo.svg';
// import './App.css';
import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import './App.sass';
import Navbar from './components/Navbar/Navbar.js';
import Grid from './components/Grid/Grid.js';
import DragNDrop from './components/DragNDrop/DragNDrop.js'
import GridTwo from './components/GridTwo/GridTwo.js';
import GridThree from './components/Grid3/GridThree.js'
import StatsBar from './components/StatsBar/StatsBar.js'
import AlgoForm from './components/AlgoForm/AlgoForm.js'
import AlgoDash from './components/AlgoDash/AlgoDash'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const finnhub_token = "but9m5v48v6uea8aseag";
const socket = new WebSocket('wss://ws.finnhub.io?token=but9m5v48v6uea8aseag');


// Connection opened -> Subscribe
// socket.addEventListener('open', function (event) {
//     //socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}));
//     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}));
 
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
    
// });




// Unsubscribe
class App extends Component{
  
  
render() { 
  return(
    <Router>
    <div>
    <Navbar></Navbar>
    {/* <main> */}
    
    {/* <Grid></Grid> */}
    {/* </main> */}


     <Switch>
          <Route exact path="/">
            <StatsBar></StatsBar>
            <Grid />
          </Route>
          <Route path="/algorithms">
            <AlgoDash/>            
          </Route>
     </Switch>
    </div>
    </Router>
  );
}
}

export default App;
