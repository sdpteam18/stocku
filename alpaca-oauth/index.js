const express = require('express');
const app = express();
const fs = require('fs');
// const cors = require('cors');
const crypto = require('crypto')
require('dotenv').config();
const port = process.env.PORT || 3000;
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectURI = 'https://stocku-alpaca-oauth.herokuapp.com/callback'
const axios = require('axios');
const queryString = require('query-string');
let token = null;
//     url: `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${random_string}&scope=account:write%20trading%20data`,

app.get('/', (req, res) => {
    const random_string = crypto.randomBytes(20).toString('hex')
    res.redirect(`https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${random_string}&scope=account:write%20trading%20data`);
  });


app.get('/callback', (req, res) => {
    console.log(req.query)
    const payload = {
        grant_type: 'authorization_code',
        code: req.query.code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: redirectURI
    };
    const opts = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    axios.post("https://api.alpaca.markets/oauth/token",  queryString.stringify(payload), opts).
      then(res => { console.log(res.data.access_token); token = res.data.access_token; console.log("Token successfully retrieved");}).
      then(_token => {
        console.log('My token:', token);
        // token = _token;
        // res.json({ TokenRetrieved: true });
        res.redirect(`https://stocku.netlify.app/?user=${token}`)
      }).
      catch(err => res.status(401).json({ message: err.message }));
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});