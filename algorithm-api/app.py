import os

from flask import Flask
from flask import render_template, request
from Gap import *
from beta_functions import *
app = Flask(__name__)


@app.route("/")
def form():
    return "Use /gap endpoint to launch gap down algorithm with mikes money and /cash to see his balance(checking)"

@app.route("/open/<ticker>")
def open(ticker):
    #print(request.args) url parameters in the format [('interval', '1D'), ('num_bars', '1')]
    #print(request.form) request body [('body', 'by a singing hitta')]
    #print(request.headers) HTTP headers as string? it seems
    return str(MarketDataFunctions.get_open(ticker, "1D", 1))


@app.route("/gap")
def my_form_post():
    return gap_down_test()


@app.route("/cash")
def parallels():
    return AlpacaUserData.get_balance()


@app.route("/open")
def aapl_open():
    return get_open('AAPL', '1D', 1)


if __name__ == "__main__":
    app.run()
