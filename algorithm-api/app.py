import os

from flask import Flask
from flask import render_template, request
from Gap import *

app = Flask(__name__)


@app.route("/")
def form():
    return "Use /gap endpoint to launch gap down algorithm with mikes money and /cash to see his balance(checking)"


@app.route("/gap")
def my_form_post():
    return gap_down_test()

@app.route("/cash")
def parallels():
    return AlpacaUserData.get_balance()


if __name__ == "__main__":
    app.run()

