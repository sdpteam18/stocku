import React, { useRef, useState } from 'react'

const AlgoForm = props => {

const form = useRef(null)
const [user, setUser] = useState(props.user)

let search = window.location.search;
let params = new URLSearchParams(search);
let userToken = params.get('user');
localStorage.setItem('userID', userToken);

const sendForm = e =>{
  let userID = localStorage.getItem("userID")
  e.preventDefault()
    const data = new FormData(form.current)
    for(const [k,v] of data) {console.log(k,v)}
    fetch('https://equitia-git-po5vn34pmq-ue.a.run.app/algo/' + userID + '/create', { method: 'POST', body: data })
      .then(res => console.log(res.text()))
      .then(json => console.log(json))
}

return (
<form ref={form} onSubmit={sendForm}>
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
<label class="label">Stock Signal To <strong>Buy</strong> At</label>
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

<div class="field">
<label class="label">Stock Signal To <strong>Sell</strong> At</label>
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
);


}

export default AlgoForm;






















