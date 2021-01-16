from beta_functions import *
from GapDown import main
import urllib.parse
import pymongo
from flask_cors import CORS
import os

from flask import Flask, jsonify
from flask import render_template, request

username = urllib.parse.quote_plus('Ben')
password = urllib.parse.quote_plus('MongoPass12')

connection_url = 'mongodb+srv://{}:{}@cluster0.xliu9.mongodb.net/test_database?retryWrites=true&w=majority'.format(
    username, password)

app = Flask(__name__)
client = pymongo.MongoClient(connection_url)

Database = client.get_database('test_database')

SampleTable = Database.test_collection


@app.route("/")
def form():
    return "Use /gap endpoint to launch gap down algorithm with mikes money and /cash to see his balance(checking)"


@app.route("/open/<ticker>", methods=['GET'])
def open(ticker):

    return str(main.MarketDataFunctions.get_open(ticker, "1D", 1))

    # consider base_url /open /AAPL ?interval=1D&num_bars=1
    # this URL will get us apples open price for "1D"->of a day and it will be today since #bars is 1
    # AAPL is an HTTP path parameter
    # ?interval=1D&num_bars=1 are 2 HTTP query parameters
    # additionally there are HTTP headers which we choose from a predetermined list https://flaviocopes.com/http-request-headers/, used for security and technicalities
    # and HTTP body which is where convention would keep big pieces of data that need to be saved or read

    # we could easily put the ticker as well as the other query parameters all in the body
    # but Alpaca keeps it this way and i think its because the body should have like unique data

    # request.args-> query parameters in the format [('interval', '1D'), ('num_bars', '1')]
    # request.form-> request body format [('body', 'by a singing hitta')]
    # request.headers-> HTTP headers as string? it seems


@app.route("/gap")
def my_form_post():
    return main.gap_down_test()


@app.route("/cash")
def parallels():
    return main.AlpacaUserData.get_balance()


@app.route('/find/', methods=['GET'])
def findAll():
    query = SampleTable.find()
    output = {}
    i = 0
    for x in query:
        output[i] = x
        output[i].pop('_id')
        i += 1
    return jsonify(output)


if __name__ == "__main__":
    app.run()
