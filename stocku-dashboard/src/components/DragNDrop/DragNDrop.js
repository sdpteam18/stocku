import React, { Component } from "react";

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var node = document.getElementById(data);
    var clone = node.cloneNode(true);
    var isOrig = node.getAttribute("original");
    var symbol = node.getAttribute("name");
    var total = document.getElementsByName(symbol).length;
    clone.id = clone.id + total;
    if (String(isOrig).includes("true")) {
        ev.target.appendChild(clone);
        clone.setAttribute("original", "false");
    }
    else {
        ev.target.appendChild(node);
    }

}
function throw_out(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
function myFunction() {
    var bot = document.getElementById("bottom");
    var list = bot.getElementsByClassName("math");


    var txt = "";
    var i;
    for (i = 0; i < list.length; i++) {
        txt = txt + list[i].getAttribute("name");
    }

    document.getElementById("demo").innerHTML = txt;
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
function openFields(ev) {
    //var data = ev.dataTransfer.getData("id");
    //var node = ev.getAttribute("name");
    //var symbol = node.getAttribute("name");
    document.getElementById("form-body").innerHTML = '<h1>' + ev.target.id + '</h1><label for="ticker"><b>Ticker</b></label><input type="text" placeholder="' + ev.target.getAttribute("ticker") + '" name="ticker" required><label for= "Interval" > <b>Interval</b></label ><input type="text" placeholder="1MIN, 5MIN, daily, etc." name="interval" required><label for="daysAgo"><b>How Many Days Ago?</b></label><input type="number" placeholder="0 for today" name="daysAgo" required><button type="submit" class="btn">Save</button><button type="button" class="btn cancel" onclick="closeForm()">Close</button>';
}
function closeFields(ev) {
    document.getElementById("form-body").innerHTML = '<h1>CLOSE</h1><label for="ticker"><b>Ticker</b></label><input type="text" placeholder="Enter Ticker i.e. AAPL" name="ticker" required><label for= "Interval" > <b>Interval</b></label ><input type="text" placeholder="1MIN, 5MIN, daily, etc." name="interval" required><label for="daysAgo"><b>How Many Days Ago?</b></label><input type="number" placeholder="0 for today" name="daysAgo" required><button type="submit" class="btn">Save</button><button type="button" class="btn cancel" onclick="closeForm()">Close</button>';
}
function highFields(ev) {
    document.getElementById("form-body").innerHTML = '<h1>HIGH</h1><label for="ticker"><b>Ticker</b></label><input type="text" placeholder="Enter Ticker i.e. AAPL" name="ticker" required><label for= "Interval" > <b>Interval</b></label ><input type="text" placeholder="1MIN, 5MIN, daily, etc." name="interval" required><label for="daysAgo"><b>How Many Days Ago?</b></label><input type="number" placeholder="0 for today" name="daysAgo" required><button type="submit" class="btn">Save</button><button type="button" class="btn cancel" onclick="closeForm()">Close</button>';
}
function lowFields(ev) {
    document.getElementById("form-body").innerHTML = '<h1>LOW</h1><label for="ticker"><b>Ticker</b></label><input type="text" placeholder="Enter Ticker i.e. AAPL" name="ticker" required><label for= "Interval" > <b>Interval</b></label ><input type="text" placeholder="1MIN, 5MIN, daily, etc." name="interval" required><label for="daysAgo"><b>How Many Days Ago?</b></label><input type="number" placeholder="0 for today" name="daysAgo" required><button type="submit" class="btn">Save</button><button type="button" class="btn cancel" onclick="closeForm()">Close</button>';
}
function priceFields(ev) {
    document.getElementById("form-body").innerHTML = '<h1>CURRENT PRICE</h1><label for="ticker"><b>Ticker</b></label><input type="text" placeholder="Enter Ticker i.e. AAPL" name="ticker" required><button type="submit" class="btn">Save</button><button type="button" class="btn cancel" onclick="closeForm()">Close</button>';
}


class DragNDrop extends Component {
  render() {
    return (
        <div>
            <h2>Drag and Drop</h2>
    <p>Drag the image back and forth between the two div elements.</p>

    <div id="top">
        <div class="box" ondrop="drop(event)">
            <img src="plus.svg" draggable="true" ondragstart="drag(event)" class="math" id="plus" name="+" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="minus.jpg" draggable="true" ondragstart="drag(event)" class="math" id="minus" name="-" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="multiply.png" draggable="true" ondragstart="drag(event)" class="math" id="multiply" name="x"
                width="25" height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="divide.png" draggable="true" ondragstart="drag(event)" class="math" id="divide" name="/"
                width="25" height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="zero.png" draggable="true" ondragstart="drag(event)" class="math" id="zero" name="0" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="one.png" draggable="true" ondragstart="drag(event)" class="math" id="one" name="1" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="two.png" draggable="true" ondragstart="drag(event)" class="math" id="two" name="2" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="three.png" draggable="true" ondragstart="drag(event)" class="math" id="three" name="3" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="four.png" draggable="true" ondragstart="drag(event)" class="math" id="four" name="4" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="five.png" draggable="true" ondragstart="drag(event)" class="math" id="five" name="5" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="six.png" draggable="true" ondragstart="drag(event)" class="math" id="six" name="6" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="seven.png" draggable="true" ondragstart="drag(event)" class="math" id="seven" name="7" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="eight.png" draggable="true" ondragstart="drag(event)" class="math" id="eight" name="8" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="nine.png" draggable="true" ondragstart="drag(event)" class="math" id="nine" name="9" width="25"
                height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="greater_than.png" draggable="true" ondragstart="drag(event)" class="math" id="greater_than"
                name=">" width="25" height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="less_than.png" draggable="true" ondragstart="drag(event)" class="math" id="less_than" name="<"
                width="25" height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="open.jpg" draggable="true" onclick="openForm();openFields(event);" ondragstart="drag(event)"
                class="math" id="open" ticker="AAPL" name="open" interval="something" width="25" height="25"
                original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="close.jpg" draggable="true" onclick="openForm();closeFields(event);" ondragstart="drag(event)"
                class="math" id="close" name="close" width="25" height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="high.jpg" draggable="true" onclick="openForm();highFields(event);" ondragstart="drag(event)"
                class="math" id="high" name="high" width="25" height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="low.png" draggable="true" onclick="openForm();lowFields(event);" ondragstart="drag(event)"
                class="math" id="low" name="low" width="25" height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
            <img src="price.png" draggable="true" onclick="openForm();priceFields(event);" ondragstart="drag(event)"
                class="math" id="price" name="price" width="25" height="25" original="true"/>
        </div>
        <div class="box" ondrop="drop(event)">
        </div>
        <div class="box" ondrop="drop(event)">
        </div>
        <div class="box" ondrop="drop(event)">
        </div>
        <div class="box" ondrop="drop(event)">
        </div>
        <div class="box" ondrop="drop(event)">
        </div>
        <div class="box" ondrop="drop(event)">
        </div>
        <div class="box" ondrop="drop(event)">
        </div>
    </div>

    <div id="bottom">
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    </div>

    <div id="trash">
        <div class="dropbox" ondrop="drop(event)" ondragover="allowDrop(event)">
            <img src="trash.jpg" draggable="true" ondragstart="drag(event)" class="math" id="nine" name="9" width="25"
                height="25"/>
        </div>
    </div>
    <button onclick="myFunction()">Click me</button>
    <p id="demo"></p>
    {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}
    <div id="result">

    </div>

    <div class="form-popup" id="myForm">
        <form action="/action_page.php" class="form-container" id="form-body">
            <h1>SMA</h1>

            <label for="ticker"><b>Ticker</b></label>
            <input type="text" placeholder="Enter Ticker i.e. AAPL" name="type" required/>

            <label for="type"><b>Type</b></label>
            <input type="text" placeholder="Enter Type" name="type" required/>

            <label for="interval"><b>Interval</b></label>
            <input type="text" placeholder="Enter Interval" name="interval" required/>

            <button type="submit" class="btn">Save</button>
            <button type="button" class="btn cancel" onClick={closeForm()}>Close</button>
        </form>
    </div>
        </div>
    );
  }
}

export default DragNDrop;