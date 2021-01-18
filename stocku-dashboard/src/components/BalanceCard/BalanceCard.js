import React, { Component } from "react";

class BalanceCard extends Component {
  constructor(props) {
    super(props);

  }


  componentDidMount(){

  }

  render() {
    return (
     <div>
        <div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Balance
    </p>
  </header>
  <div class="card-content">
    <p class="title is-5">Total: $50</p>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Add Funds</a>
    <a href="#" class="card-footer-item">Transfer</a>
  </footer>
</div>

    </div>
    );
  }
}

export default BalanceCard;

