import React, { Component } from "react";
import StockChart from '../StockChart/StockChart.js' 
import StockTable from '../StockTable/StockTable.js'
import AlgoDropdown from '../AlgoDropdown/AlgoDropdown.js'
import HistoricalStockChart from '../HistoricalStockChart/HistoricalStockChart.js'


class StatsBar extends Component {
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
        <h1 class="title">Welcome back, Hong</h1>
        <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">One</p>
            <p class="subtitle">Subtitle</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">Two</p>
            <p class="subtitle">Subtitle</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">Three</p>
            <p class="subtitle">Subtitle</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">Four</p>
            <p class="subtitle">Subtitle</p>
          </article>
        </div>
      </div>
      </div>
    );
  }
}

export default StatsBar;

// //   <div class="tile is-vertical is-parent">
//   <article class="tile is-child notification is-warning">
//   <p class="title is-5">Pick A Stock</p>
//   </article>
//   </div>