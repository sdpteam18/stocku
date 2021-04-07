Terminal should always be CD to algorithm-api

python app.py
to run api locally


from beta_functions import *
from GapDown import main
import urllib.parse
import pymongo
from flask_cors import CORS
import os
from datetime import datetime

from flask import Flask, jsonify
from flask import render_template, request

username = urllib.parse.quote_plus('Ben')
password = urllib.parse.quote_plus('MongoPass12')

connection_url = 'mongodb+srv://{}:{}@cluster0.xliu9.mongodb.net/test_database?retryWrites=true&w=majority'.format(
    username, password)

app = Flask(__name__)
CORS(app)
client = pymongo.MongoClient(connection_url)

Database = client.get_database('test_database')

userTable = Database.Users
algoTable = Database.Algorithms
purchaseTable = Database.Purchases

@app.route("/")
def form():
    return "Use /gap /cash /open/(ticker) "


@app.route("/open/<ticker>", methods=['GET'])
def open(ticker):

    return str(main.MarketDataFunctions.get_open(ticker, "1D", 1))

    # consider base_url /open /AAPL ?interval=1D&num_bars=1
    # this URL will get us apples open bought for "1D"->of a day and it will be today since #bars is 1
    # AAPL is an HTTP path parameter
    # ?interval=1D&num_bars=1 are 2 HTTP query parameters
    # additionally there are HTTP headers which we choose from a predetermined list https://flaviocopes.com/http-request-headers/, used for security and technicalities
    # and HTTP body which is where convention would keep big pieces of data that need to be saved or read

    # we could easily put the ticker as well as the other query parameters all in the body
    # but Alpaca keeps it this way and i think its because the body should have like unique data

    # request.args-> query parameters in the format [('interval', '1D'), ('num_bars', '1')]
    # request.form-> request body format [('body', 'by a singing hitta')]
    # request.headers-> HTTP headers as string? it seems


@app.route("/user/<userId>", methods=['GET'])
def getUser(userId):
    userData = userTable.find_one( {"userID": userId } )
    if(userData == None):
        userTable.insert_one({ 
            "userID": userId,
            "algorithms": []})
        userData = userTable.find_one( {"userID": userId } )

    userData.pop('_id') #this fixed the mongo cursor object error
    return userData

@app.route('/user/findAll/', methods=['GET'])
def findAllUsers():
    query = userTable.find()
    output = {}
    i = 0
    for x in query:
        output[i] = x
        output[i].pop('_id')
        i += 1
    return jsonify(output)

@app.route('/algo/findAll/', methods=['GET'])
def findAllAlgos():
    query = algoTable.find()
    output = {}
    i = 0
    for x in query:
        output[i] = x
        output[i].pop('_id')
        i += 1
    return jsonify(output)

@app.route('/algo/<algoID>', methods=['GET'])
def findAlgo(algoID):
    query = algoTable.find_one({"algoID": algoID})
    print(query)
    query = query['algoString']
    print(query)
    return jsonify(query)

/user/<userID>/purchases
GET: All purchases made by a specific user

/algo/<algoID>/purchases
GET: All purchases made by a specfic algorithm

/algo/<algoID>/makePurchase
POST: Create a new purchase object in the DB, made by an algorithm


/user/<userID>/createAlgo
POST: Create new algorithm object in the DB, not running by default

Body: 
{user[algoName]:not-local,
user[algoDesc]:Testing Algorithm,
user[ticker]:AAPL,
user[sharesNum]:100,
user[buySignal]:OPEN,1D,1_>_CLOSE,1D,1_*_2
user[sellSignal]:CLOSE,1D,20_<_SMA,1D,1,10,close
user[buySignal]1:OPEN,2D,1_>_CLOSE,1D,1_*_2
user[sellSignal]1:CLOSE,2D,20_<_SMA,1D,1,10,close
user[buySignal]2:OPEN,3D,1_>_CLOSE,1D,1_*_2}
    
/algo/<algoID>/profits
GET: Returns lifetime profits for a particular algorithm





----------------Venv setup---------------
INITIAL CREATE
python -m venv *name of venv* 
use venv for name of venv since gitignored

OPEN V ENVIRONMENT
venv/Scripts/activate

UPDATE DEPENDENCIES
pip install -r requirements.txt

SAVE NEW DEPENDENCIES
-m pip freeze > requirements.txt



