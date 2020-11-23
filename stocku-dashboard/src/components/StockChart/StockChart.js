import React, { Component } from "react";
const finnhub_token = "but9m5v48v6uea8aseag";
const socket = new WebSocket('wss://ws.finnhub.io?token=but9m5v48v6uea8aseag');


// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    //socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}));
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}));
 
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

class StockChart extends Component {
  render() {
    return (
        <div class="container is-fluid">
      
        </div>
    );
  }
}

export default StockChart;