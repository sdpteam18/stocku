import React, { Component } from "react";
import StockChart from '../StockChart/StockChart.js' 
import StockTable from '../StockTable/StockTable.js'
import AlgoDropdown from '../AlgoDropdown/AlgoDropdown.js'
import HistoricalStockChart from '../HistoricalStockChart/HistoricalStockChart.js'
import BalanceCard from '../BalanceCard/BalanceCard.js'


class GridTwo extends Component {
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

  render() {
    return (
     <div>
  <div class="columns is-centered is-variable is-0">
  
  <div class="column is-2 is-narrow has-text-centered">
  <div class="box is-centered">
  <p class="title is-5 is-centered">Balance Management</p>
  </div>

  </div>

  <div class="column is-2">

  <div class="box is-centered">
  <p class="title is-5 is-centered">Orders</p>
  </div>

  </div>

  <div class="column is-6">
  
  <div class="box is-centered">
  <p class="title is-5 is-centered">Stock Charts</p>
  </div>
  
  </div>

  <div class="column">
  
  <div class="box is-centered">
  <p class="title is-5 is-centered">Trade History</p>
  </div>
  
  </div>
</div>

<div class="columns is-variable is-1">

<div class="column is-2 has-text-centered">
 <BalanceCard></BalanceCard>

  </div>


</div>


    </div>
    );
  }
}

export default GridTwo;

// //   <div class="tile is-vertical is-parent">
//   <article class="tile is-child notification is-warning">
//   <p class="title is-5">Pick A Stock</p>
//   </article>
//   </div>