from beta_functions import *
from GapDown import main
import urllib.parse
import pymongo
from flask_cors import CORS, cross_origin
import os
from datetime import datetime

from flask import Flask, jsonify
from flask import render_template, request

username = urllib.parse.quote_plus('Ben')
password = urllib.parse.quote_plus('MongoPass12')

connection_url = 'mongodb+srv://{}:{}@cluster0.xliu9.mongodb.net/test_database?retryWrites=true&w=majority'.format(
    username, password)

app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
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


@app.route("/open/<ticker>/<days>")
def openDays(ticker, interval):
    return str(main.MarketDataFunctions.get_open(ticker, "1D", days))


@app.route("/gap")
def my_form_post():
    return main.gap_down_test()


@app.route("/cash")
def parallels():
    return main.AlpacaUserData.get_balance()


@app.route("/user/<userId>", methods=['GET'])
def getUser(userId):
    userData = userTable.find_one({"userID": userId})
    if(userData == None):
        return "User not found."

@app.route("/user/create", methods=['POST'])
def createUser():
    body = request.form
    if(userTable.find_one({"userID": body['userID']}) != None):
        return "ERROR: User already exists!"
    

    userTable.insert_one({
            "userID": body['userID'],
            "name": body['name'],
            "email": body['email'],
            "algorithms": []})
        
    return "user added!"
    #invoke with body { userID:, name:, email: }


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


@app.route('/user/<userID>/purchases', methods=['GET'])
def findUserPurchases(userID):
    query = purchaseTable.find({"userID": userID})
    output = {}
    i = 0
    for x in query:
        output[i] = x
        output[i].pop('_id')
        output[i]['profit'] = get_profit(x)
        i += 1
    print(output)
    return jsonify(output)

@app.route('/user/<userID>/algorithms', methods=['GET'])
@cross_origin()
def findUserAlgos(userID):
    query = userTable.find_one({"userID": userID})
    algoList = query['algorithms']
    print(algoList)
    output = {}
    i = 0
    for algoID in algoList:
        query = algoTable.find_one({"algoID": algoID})
        query.pop('_id')
        output[i] = query
        i+=1
    response = jsonify(output)
#     response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/algo/<algoID>/purchases', methods=['GET'])
def findAlgoPurchases(algoID):
    query = purchaseTable.find({"algoID": algoID})
    output = {}
    i = 0
    for x in query:
        output[i] = x
        output[i].pop('_id')
        output[i]['profit'] = get_profit(x)
        i += 1
    return jsonify(output)


@app.route('/algo/<algoID>/makePurchase', methods=['POST'])
def makePurchase(algoID):
    body = request.form
    # download postman if you havent already
    # make post requests with body in form
    # ticker:
    #qty: (shares)
    # bought:

    purchaseCount = purchaseTable.count_documents({})
    purchaseID = "purchase" + str(purchaseCount)

    userID = algoTable.find_one({"algoID": algoID})['userID']

    ticker = body['ticker']
    qty = body['qty']
    bought = body['bought']

    now = datetime.now()

    time = now.strftime("%d/%m/%Y %H:%M:%S")

    purchaseTable.insert_one({
        "purchaseID": purchaseID,
        "algoID": algoID,
        "userID": userID,
        "ticker": ticker,
        "qty": qty,
        "bought": bought,
        "sold": -1,
        "time": time,
    })
    # currently only updates our database
    # add code for brokerage trading below

    return "Purchase " + purchaseID + " was stored succesfully"

# @app.route('/algo/<purchaseID>/makeSale', methods=['POST'])


@app.route('/user/<userID>/createAlgo', methods=['POST'])
def createAlgo(userID):

    if(userTable.find_one({"userID": userID}) == None):
        return {"failure": "Must be signed in to create new algorithms"}

    now = datetime.now()

    body = request.form
    algoCount = algoTable.count_documents({})
    algoID = "algo" + str(algoCount)
    time = now.strftime("%d/%m/%Y %H:%M:%S")

    buySignals = [body["user[buySignal]"]]
    sellSignals = [body["user[sellSignal]"]]

    for i in range(1, 4):
        if ("user[buySignal]" + str(i) in body):
            buySignals.append(body["user[buySignal]" + str(i)])

        if ("user[sellSignal]" + str(i) in body):
            sellSignals.append(body["user[sellSignal]" + str(i)])

    algoTable.insert_one({
        "userID": userID,
        "algoID": algoID,
        "algoName": body["user[algoName]"],
        "algoDesc": body["user[algoDesc]"],
        "ticker": body["user[ticker]"],
        "sharesNum": body["user[sharesNum]"],
        "buySignals": buySignals,
        "sellSignals": sellSignals,
        "creationTime": time
    })

    userTable.update_one({"userID": userID},
                         {"$push": {"algorithms": algoID}})

    return {"confirmation": "Algorithm was stored successfully"}


@app.route('/algo/<algoID>/profits', methods=['GET'])
def checkProfits(algoID):
    query = purchaseTable.find({"algoID": algoID})
    profit = 0
    i = 0

    for x in query:
        profit += get_profit(x)

    return str(profit)


def get_profit(p_dict):
    profit = 0
    bought = float(p_dict['bought'])
    qty = int(p_dict['qty'])

    profit -= bought * qty
    if (p_dict['sold'] < 0):
        # hasn't been sold- use current bought
        profit += main.MarketDataFunctions.get_current(p_dict['ticker']) * qty

    else:
        # has been closed- sell bought stored right here
        profit += p_dict['sold'] * qty
    return round(profit, 2)


if __name__ == "__main__":
    app.run()
