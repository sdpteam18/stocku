import React, { Component, useState, useEffect, useRef } from "react";
// import {Line} from 'react-chartjs-2';
import moment from 'moment'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush
  } from 'recharts';




// const data = {
//     labels: [],
//     datasets: [
//       {
//         label: 'My First dataset',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: []
//       }
//     ]
//   };


//   const options = {     
//     scales: {
//                 xAxes: [{
//                      display: true,
//                      scaleLabel: {
//                          display: true,
//                          labelString: 'X axe name',
//                          fontColor:'#000000',
//                          fontSize:10
//                      },
//                      ticks: {
//                         fontColor: "black",
//                         fontSize: 14
//                        }
//                  }],
//                  yAxes: [{
//                      display: true,
//                      scaleLabel: {
//                          display: true,
//                          labelString: 'Y axe name',
//                          fontColor: '#000000',
//                          fontSize:10
//                      },
//                      ticks: {
//                            fontColor: "black",
//                            fontSize: 14
//                      }
//                  }]
//           }
//   }



// Connection opened -> Subscribe


// Listen for messages
function convertToTime(time){
    return moment(time).format("hh:mm a")
}

function createDataPoint(time,price){
    var datapoint = {
        "time": convertToTime(time),
        "price": price
    }
    return datapoint;
}



const StockChart = () => {

const webSocket = useRef(null);

const [data, setData] = useState([]);
// const [dataToggle, setDataToggle] = useState(true);

// socket.addEventListener('open', function (event) {
//     //socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}));
//     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}));
//     //test edit
//     });
// // setLiveData(chartData)
//     socket.addEventListener('message', (event) => {
//     // console.log('Message from server ', event.data);
//     // setInterval(function(){
//         var res = JSON.parse(event.data)
//         //console.log(res.data[0])
//         setData(currentData => [...currentData, createDataPoint(res.data[0].t,res.data[0].p)])
//         console.log(data)
//         //console.log(event.data)
//     // },5000); 
//     // chartData.datasets.data.push(event.data.p)
   
//   });

useEffect(() => { 
// https://stackoverflow.com/questions/58432076/websockets-with-functional-components
//https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/onopen
    const finnhub_token = "but9m5v48v6uea8aseag"; 
    webSocket.current = new WebSocket('wss://ws.finnhub.io?token=but9m5v48v6uea8aseag');
    webSocket.current.onopen = (event) => {
        webSocket.current.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}));
    }
    webSocket.current.onmessage = (event) => {
            var res = JSON.parse(event.data)
            //console.log(res.data[0])
            setData(currentData => [...currentData, createDataPoint(res.data[0].t,res.data[0].p)])
            console.log(data)

    }
    return () => webSocket.current.close();
}, [])

    
// const reopenSocket = () => {
//     webSocket.current = new WebSocket('wss://ws.finnhub.io?token=but9m5v48v6uea8aseag');
//     webSocket.current.onopen = (event) => {
//         webSocket.current.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}));
//     }
// }

    return (
        <div style={{ width: '100%', height: 300 }}>
            {/* <Line data={liveData} options={options}/> */}
        <ResponsiveContainer>
            <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" stroke="white" axisLine={{ stroke: '#FFFFFF' }}/>
        <YAxis type="number" stroke="white" domain={['dataMin', 'dataMax * 0.2']} axisLine={{ stroke: '#FFFFFF' }} />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="price" stroke="#FFFFFF" activeDot={{ r: 8 }} strokeWidth={2} />
        <Brush/>
      </LineChart>
      </ResponsiveContainer>
      <button className="button is-warning is-inverted" onClick={() => webSocket.current.close()}>Toggle Live Feed</button>
        </div>
    );
  
}

export default StockChart;