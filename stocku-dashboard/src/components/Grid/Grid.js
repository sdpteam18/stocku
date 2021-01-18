import React, { Component } from "react";
import StockChart from '../StockChart/StockChart.js' 
import StockTable from '../StockTable/StockTable.js'
import AlgoDropdown from '../AlgoDropdown/AlgoDropdown.js'
import HistoricalStockChart from '../HistoricalStockChart/HistoricalStockChart.js'
class Grid extends Component {
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
        <div class="container is-fluid">
        <div class="tile is-ancestor">
      <div class="tile is-vertical is-12">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-warning">
              <p class="title">Pick A Stock</p>
              <input class="input is-primary" type="search" placeholder="Search..."></input>
            </article>
            {/* <article class="tile is-child notification is-warning">
              <p class="title">Algorithm Maker</p> */}
              {/* <p class="subtitle"></p> */}
              <AlgoDropdown></AlgoDropdown>
            {/* </article> */}
          </div>
          <div class="tile is-parent is-8">
            <article class="tile is-child notification is-success">
              {/* <p class="title">Middle tile</p>
              <p class="subtitle">With an image</p> */}
            {this.state.chartToggleState ? 
            <HistoricalStockChart></HistoricalStockChart>
             :
             <div>
             <StockChart></StockChart>
             <div style={{ width: '100%', height: 50 }}></div>
             </div>
            }
            <button className="button is-warning is-inverted" onClick={() => this.toggleChart()}>Toggle Historical Data</button>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <p class="title">Your Investments</p>
            {/* <p class="subtitle">Aligned with the right tile</p> */}
            
            <div class="content">
            <StockTable></StockTable>
            </div>
          </article>
        </div>
      </div>
      {/* <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <div class="content">
            <p class="title">Tall tile</p>
            <p class="subtitle">With even more content</p>
            <div class="content">
            
            </div>
          </div>
        </article>
      </div> */}
    </div>
    </div>
    );
  }
}

export default Grid;