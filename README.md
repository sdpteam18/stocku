Team 18’s Senior Design Project is a functional implementation of an educational algorithmic stock trading platform called StockU.  This platform brings the benefits of algorithmic trading to the average person, without a need for coding. StockU features a no-code algorithm builder, live stock data feeds, and an easy to navigate UI for a quality user experience. The brokerage service and API used for live stock data comes from Alpaca LLC, which is a FINRA licensed brokerage service and data provider.  Through OAuth verification, we are able to have users sign in using their Alpaca account and maintain secure user data retrieval. In the algorithm maker, users are able to drag and drop blocks which allow them to construct conditional statements.  An example of a conditional statement would be “buy stock in AAPL if the closing price is 5% higher than the opening price, and sell if the closing price is down 10%.”  Users can make up to five algorithms like this, save them to their profile and receive email notifications if an algorithm is triggered and makes purchases. As this is just a prototype, all purchases and sales are done through a “paper trading account”, meaning that they will be treated like a real account, with balances adjusting and transactions going through, but no real money will be spent.  However, Alpaca does give us the capability of accepting real transactions in the future if this prototype is taken into production. This application was developed using a MERN stack (MongoDB Atlas, Express, React.js, and Node.js).  The database itself is accessed using a Python API developed using Flask while the OAuth system is built on NodeJS. Using Netlify and Google Cloud, these APIs and the front-end are publicly hosted for a fully functional applications. 

If you have any questions feel free to email us: 
* Rohan Parikh - rohan.2.parikh@uconn.edu 
* Ben Levy -  ben.levy@uconn.edu 
* Michael Allen - michael.g.allen@uconn.edu 
* Henry Nguyen -  henry.d.nguyen@uconn.edu 
* Samantha Grubb - samantha.grubb@uconn.edu 



## To get this repo

```
git clone https://github.com/sdpteam18/stocku.git
```

## To push code
Make sure to switch your directory to the main "StockU" folder first.

Then run the following.
```
git pull
```

```
git add .
git commit -m "Your commit message"
git push origin main
```
