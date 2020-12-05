import logo from './logo.svg';
// import './App.css';
import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import './App.sass';
import Navbar from './components/Navbar/Navbar.js';
import Grid from './components/Grid/Grid.js';
import DragNDrop from './components/DragNDrop/DragNDrop.js'


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
    <div>
    <Navbar></Navbar>
    <main>
    <Grid></Grid>
    {/* <DragNDrop></DragNDrop> */}
    </main>
    </div>
  );
}
}

export default App;
