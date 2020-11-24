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