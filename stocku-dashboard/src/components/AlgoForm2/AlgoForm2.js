import React, { Component, useRef, useState } from 'react'

class AlgoForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {buyValues: [], sellValues: []};
        this.form = React.createRef(null);
        // this.handleSubmit = this.handleSubmit.bind(this);
      }
      

      componentDidMount(){
   
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let userToken = params.get('user');
        fetch("https://api.alpaca.markets/v2/account", {
            headers: {
              Authorization: "Bearer " + userToken
            }
            }).then(response => {
                let res = response.json()
                console.log("Equitia Res: " + res)
                return res;
              }) 
              .then(data => {
                console.log(data.id)
                localStorage.setItem('userID', userToken);
              })
              .catch(error => {
                console.log("Error " + error);
              })



       
        console.log("User ID " + localStorage.getItem("userID"))
      }

      createBuyUI(){
         return this.state.buyValues.map((el, i) => 
         <div key={i} class="field has-addons">
         <p class="control">
             <a class="button is-static">
               Buy Signal
             </a>
           </p>
           <p class="control">
             <input class="input" type="text" placeholder="Signal String" name={"user[buySignal]" + (i+2)} defaultValue="" onChange={this.handleBuyChange.bind(this, i)}/>
           </p>
           <p class="control">
             <a class="button" onClick={this.removeBuyClick.bind(this,i)}>
               Remove
             </a>
           </p>
         </div>  
         )
      }
      
      handleBuyChange(i, event) {
         let values = [...this.state.buyValues];
         values[i] = event.target.value;
         this.setState({ buyValues: values });
      }
      
      addBuyClick(){
        if(this.state.buyValues.length >= 3){
            alert("Cannot add more than 3 Buy Signals")
        }
        else{
        this.setState(prevState => ({ buyValues: [...prevState.buyValues, '']}))
        }
      }
      
      removeBuyClick(i){
         let values = [...this.state.buyValues];
         values.splice(i,1);
         this.setState({ buyValues: values });
      }
      
      createSellUI(){
         return this.state.sellValues.map((el, i) => 
         <div key={i} class="field has-addons">
         <p class="control">
             <a class="button is-static">
               Sell Signal
             </a>
           </p>
           <p class="control">
             <input class="input" type="text" placeholder="Signal String" name={"user[sellSignal]" + (i+2)} defaultValue="" onChange={this.handleSellChange.bind(this, i)}/>
           </p>
           <p class="control">
             <a class="button" onClick={this.removeSellClick.bind(this,i)}>
               Remove
             </a>
           </p>
         </div>  
         )
      }
      
      handleSellChange(i, event) {
         let values = [...this.state.sellValues];
         values[i] = event.target.value;
         this.setState({ sellValues: values });
      }
      
      addSellClick(){
        if(this.state.sellValues.length >= 3){
            alert("Cannot add more than 3 Sell Signals")
        }
        else{
        this.setState(prevState => ({ sellValues: [...prevState.sellValues, '']}))
        }
      }
      
      removeSellClick(i){
         let values = [...this.state.sellValues];
         values.splice(i,1);
         this.setState({ sellValues: values });
      }


    //   handleSubmit(event) {
    //     alert('A name was submitted: ' + this.state.values.join(', '));
    //     event.preventDefault();
    //   }


sendForm = e =>{

  let userID = localStorage.getItem("userID")
  console.log("User ID " + userID)
  e.preventDefault()
    const data = new FormData(this.form.current)
    for(const [k,v] of data) {console.log(k,v)}
    fetch('https://equitia-git-po5vn34pmq-ue.a.run.app/user/' + userID + '/createAlgo', { method: 'POST', body: data })
      .then(res => console.log(res.text()))
      .then(json => console.log(json))
}

render(){
return(
    <form ref={this.form} onSubmit={this.sendForm}>
    <div class="field">
      <label class="label">Name Your Algorithm</label>
      <div class="control">
        <input class="input is-success" type="text" placeholder="Your Algo Name" name="user[algoName]" defaultValue="" />
      </div>
    </div>
    
    <div class="field">
      <label class="label">Description</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-success" type="text" placeholder="Describe Your Algo" name="user[algoDesc]" defaultValue=""/>
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
      {/* <p class="help is-success">Description Saved</p> */}
    </div>
    
    <div class="field">
    <label class="label">Choose A Stock</label>
    </div>
    <div class="field has-addons">
      <div class="control">
        <input class="input is-success" type="text" placeholder="Stock Name/Symbol" name="user[ticker]" defaultValue=""/>
      </div>
      <div class="control">
        <a class="button is-success">
          Search
        </a>
      </div>
    </div>
    
    <div class="field">
      <label class="label">Pick An Algo Type</label>
      <div class="control">
        <div class="select" name="user[algoType]" defaultValue="">
          <select>
            <option>Mean Reversion</option>
            <option>Momentum Investing</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="field">
    <label class="label">Enter An Investment Amount</label>
    </div>
    <div class="field has-addons">
    <p class="control">
        <a class="button is-static">
          Shares
        </a>
      </p>
      <p class="control">
        <input class="input" type="text" placeholder="# Of Shares" name="user[sharesNum]" defaultValue=""/>
      </p>
    </div>
    
    <div class="field">
    <label class="label">Stock Signals To <strong>Buy</strong> At</label>
    </div>
    <div class="field has-addons">
    <p class="control">
        <a class="button is-static">
          Buy Signal
        </a>
      </p>
      <p class="control">
        <input class="input" type="text" placeholder="Signal String" name="user[buySignal]" defaultValue=""/>
      </p>
    </div>

    {this.createBuyUI()}

    <div class="field">
    <label class="label">Stock Signals To <strong>Sell</strong> At</label>
    </div>
    <div class="field has-addons">
    <p class="control">
        <a class="button is-static">
          Sell Signal
        </a>
      </p>
      <p class="control">
        <input class="input" type="text" placeholder="Signal String" name="user[sellSignal]" defaultValue=""/>
      </p>
    </div>

    {this.createSellUI()}
    
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success" onClick={this.addBuyClick.bind(this)}>Add Buy Signal</button>
      </div>
      <div class="control">
        <button class="button is-success" onClick={this.addSellClick.bind(this)}>Add Sell Signal</button>
      </div>
    </div>
    
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox"/>
          <a href="#"> I agree to the terms and conditions</a>
        </label>
      </div>
    </div>
    
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" type="submit">Submit</button>
      </div>
    </div>
    </form>

)
};


}

export default AlgoForm2;






















