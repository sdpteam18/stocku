import React, { Component } from "react";
import './StockTable.css';
import moment from 'moment'

function convertToTime(time){
    return moment(time).format("MM/DD/YYYY hh:mm a")
}

class StockTable extends Component {
  render() {
    return (
    // <div class="container is-fluid">
    <div class="table-container">
     <table class="table is-fullwidth">
  <thead>
  <tr>
      <th><abbr title="ID">ID</abbr></th>
      <th>Stock</th>
      <th><abbr title="Quantity">Quantity</abbr></th>
      <th><abbr title="Price">{"Price @" + convertToTime(moment().valueOf())}</abbr></th>
      <th><abbr title="Balance">Your Balance</abbr></th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th><abbr title="ID">ID</abbr></th>
      <th>Stock</th>
      <th><abbr title="Quantity">Quantity</abbr></th>
      <th><abbr title="Price">{"Price @" + convertToTime(moment().valueOf())}</abbr></th>
      <th><abbr title="Balance">Your Balance</abbr></th>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <th>1</th>
      <td>BTC</td>
      <td>1.5</td>
      <td>$17,000</td>
      <td>$25,500</td>
    </tr>
  </tbody>
</table>
</div>
    );
  }
}

export default StockTable;