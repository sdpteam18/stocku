


const AlgoForm = () => {

return (
<form>
<div class="field">
  <label class="label">Name Your Algorithm</label>
  <div class="control">
    <input class="input is-success" type="text" placeholder="Text input"/>
  </div>
</div>

<div class="field">
  <label class="label">Description</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="Text input"/>
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
  <p class="help is-success">Description Saved</p>
</div>

<div class="field">
<label class="label">Choose A Stock</label>
</div>
<div class="field has-addons">
  <div class="control">
    <input class="input is-success" type="text" placeholder="Stock Name/Symbol"/>
  </div>
  <div class="control">
    <a class="button is-info">
      Search
    </a>
  </div>
</div>

<div class="field">
  <label class="label">Pick An Algo Type</label>
  <div class="control">
    <div class="select">
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
      Investment Amount ($)
    </a>
  </p>
  <p class="control">
    <input class="input" type="text" placeholder="Amount ($)"/>
  </p>
</div>

<div class="field">
<label class="label">Stock Price To <strong>Sell</strong> At</label>
</div>
<div class="field has-addons">
<p class="control">
    <a class="button is-static">
      Stock Sell Price ($)
    </a>
  </p>
  <p class="control">
    <input class="input" type="text" placeholder="Amount ($)"/>
  </p>
</div>

<div class="field">
<label class="label">Stock Price To <strong>Re-Buy</strong> At</label>
</div>
<div class="field has-addons">
<p class="control">
    <a class="button is-static">
      Stock Sell Price ($)
    </a>
  </p>
  <p class="control">
    <input class="input" type="text" placeholder="Amount ($)"/>
  </p>
</div>

<div class="field">
  <div class="control">
    <label class="checkbox">
      <input type="checkbox"/>
      I agree to the <a href="#">terms and conditions</a>
    </label>
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div>
</div>
</form>
);


}

export default AlgoForm;






















