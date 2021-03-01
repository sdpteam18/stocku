import React, { Component } from "react";
import StockChart from '../StockChart/StockChart.js' 
import StockTable from '../StockTable/StockTable.js'
import AlgoDropdown from '../AlgoDropdown/AlgoDropdown.js'
import HistoricalStockChart from '../HistoricalStockChart/HistoricalStockChart.js'
import AlgoForm from '../AlgoForm/AlgoForm.js'

class AlgoDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartToggleState: false
    };


  }

  // https://codepen.io/ilanf/pen/ybNVwg

  render() {
    return (
    <div class="section">
    <div class="columns is-centered">
  
  <div class="column is-one-third">is-one-third</div>
    {/* Add in is-narrow later */}
  <div class="column "><AlgoForm></AlgoForm></div> 

  <div class="column">
  
  
  </div>

    </div>
    </div>
    );
  }
}

export default AlgoDash;

// //   <div class="tile is-vertical is-parent">
//   <article class="tile is-child notification is-warning">
//   <p class="title is-5">Pick A Stock</p>
//   </article>
//   </div>