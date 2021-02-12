import React, { Component } from "react";
import StockChart from '../StockChart/StockChart.js' 
import StockTable from '../StockTable/StockTable.js'
import AlgoDropdown from '../AlgoDropdown/AlgoDropdown.js'
import HistoricalStockChart from '../HistoricalStockChart/HistoricalStockChart.js'


class GridThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartToggleState: false
    };

    this.toggleChart = this.toggleChart.bind(this);
  }

  toggleChart() { 

    this.setState((prev, props) => {
      const newState = !prev.chartToggleState;
     
      this.setState({
        chartToggleState: newState
      });

    });
    
  }

  getAccountInfo() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userToken = params.get('user');
    
    userToken === undefined ? alert('Login Please') :
    console.log(userToken)
    fetch("https://api.alpaca.markets/v2/account", {
    headers: {
      Authorization: "Bearer " + userToken
    }
    }).then(response => response.json())
    .then(data => console.log(data));

  }

  componentDidMount(){
    this.getAccountInfo();
  }

  // https://codepen.io/ilanf/pen/ybNVwg


  render() {
    return (
    <div class="section has-text-centered">
             <h2 class="subtitle">Welcome Back, RTRD</h2>
    <div class="columns has-text-centered is-centered is-multiline is-vcentered">
        <div class="column has-text-centered is-narrow ">

        <div class="box has-text-centered" style={{alignContent: "center"}}>
            <div class="heading is-centered">Top Seller Total</div>
            <div class="title is-centered">56,950</div>
         
          </div>
          </div>
        
        <div class="column">
          Second column
        </div>
        <div class="column">
          Third column
        </div>
        <div class="column">
          Fourth column
        </div>
        <div class="column">
          Fifth column
        </div>
    </div>
   
    </div>
    );
  }
}

export default GridThree;

// //   <div class="tile is-vertical is-parent">
//   <article class="tile is-child notification is-warning">
//   <p class="title is-5">Pick A Stock</p>
//   </article>
//   </div>