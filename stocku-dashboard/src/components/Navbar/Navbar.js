import React, { Component } from "react";
import Logo from '../../stocku_logo.png';
import Grid from '../Grid/Grid.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class Navbar extends Component {
  render() {
    return (

    <div>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
      <img src={Logo} width="112" height="28"/>
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        <Link to="/">Dashboard</Link>
      </a>
      
      <a class="navbar-item">
        <Link to="/algorithms">Algorithms</Link>
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            <Link to="/about">About</Link>
          </a>
          <a class="navbar-item">
            Tutorials
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider"/>
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary" href="https://stocku-alpaca-oauth.herokuapp.com" target="_blank">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" href="https://stocku-alpaca-oauth.herokuapp.com" target="_blank">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

       



      </div>

    );
  }
}

export default Navbar;