import os

from flask import Flask, jsonify
from flask import render_template, request
from flask_cors import CORS
import pymongo
import urllib.parse

from Gap import *
from beta_functions import *

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


@app.route("/gap")
def my_form_post():
    return gap_down_test()


@app.route("/cash")
def parallels():
    return AlpacaUserData.get_balance()


@app.route("/open")
def aapl_open():
    return get_open('AAPL', '1D', 1)


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
