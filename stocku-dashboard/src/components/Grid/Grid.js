import React, { Component } from "react";
import StockChart from '../StockChart/StockChart.js' 
import StockTable from '../StockTable/StockTable.js'
import AlgoDropdown from '../AlgoDropdown/AlgoDropdown.js'
import HistoricalStockChart from '../HistoricalStockChart/HistoricalStockChart.js'

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartToggleState: false,
      userData: {},
      isLoaded: false,
      error: false,
      stockSymbol: 'AAPL',
      stockData: ''
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
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    userToken === undefined ? alert('Login Please') :
    console.log(userToken)
    fetch("https://api.alpaca.markets/v2/account", {
    headers: {
      Authorization: "Bearer " + userToken
    }
    }).then(response =>{ 
      let res = response.json()
      console.log("Alpaca Res: " + res)
      return res;
    })
    .then(data => {
      console.log(data.id)
      let userURL = "https://equitia-git-po5vn34pmq-ue.a.run.app/user/" + data.id
      return fetch(userURL, {headers: { }});
    })
    .then(response => {
      let res = response.json()
      console.log("Equitia Res: " + res)
      return res;
    }) 
    .then(data => {
      this.setState({userData: JSON.stringify(data), isLoaded: true})
      console.log("User Data: " + this.state.userData);
    })
    .catch(error => {
      this.setState({error: true})
      console.log(error);
    })

  }

  // setStock(e){
  //   this.setState({stockSymbol: e.target.value});
  // }


  getStockInfo() {
    let tickerURL = "https://equitia-git-po5vn34pmq-ue.a.run.app/open/" + this.state.stockSymbol
    fetch(tickerURL)
    .then(response => {
      console.log(this.state.stockSymbol)
    })
  }


  componentDidMount(){
    this.getAccountInfo();
  }

  render() {
    if(!this.state.isLoaded){
      return (<div>
              <h1 class="title is-1">Title 1</h1>
              <progress class="progress is-danger" max="100">30%</progress>
              </div>
            );
      } 
    else if(this.state.error){
      return (<div>
        <div class="notification is-danger is-light">
          <button class="delete"></button>
          <strong>Oops, looks like the devs broke something! Sign in again!</strong>
        </div>
        </div>
      );
    }
    else {
    return (
        <div class="container is-fluid">
        <div class="tile is-ancestor">
      <div class="tile is-vertical is-12">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-warning">
              <p class="title">Search A Stock</p>
              
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input id="ticker_symbol" class="input" type="text" placeholder="Search a Stock Symbol"/>
                </div>
                <div class="control">
                  <button class="button is-primary">
                    Search
                  </button>
                </div>
              </div>

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
}

export default Grid;