var svg = document.getElementById("svg");
var clear = document.getElementById("clear");
var start = document.getElementById("start");
var textbox = document.getElementById("textbox");
var submit = document.getElementById("submit");
var NS = "http://www.w3.org/2000/svg"
var elements = [];
var requestId;
var move = false;
var lastCircleData;
var lastCircleDrawn;
var newCircleAllowed = true;

//svg.setAttribute("width", window.innerWidth);
//svg.setAttribute("height", window.innerHeight);

textbox.style.visibility = "hidden";
submit.style.visibility = "hidden";


var newCircle = function(e) {
    if (!(newCircleAllowed)) {
	return;
    }
       lastCircleData = {
	x : e.offsetX,
	y : e.offsetY,
	vx : 0,
	vy : 0,
	ax : 0,
	ay : 0,
	q : 5,
    };
    lastCircleDrawn = drawCircle(lastCircleData);
    elements.push(lastCircleData);
    textbox.style.visibility = "visible";
    submit.style.visibility = "visible";
    submit.disabled = true;
    console.log("new circle");
    newCircleAllowed = false;
}

var updateCircles = function() {
    for (var i = 0; i < elements.length; i++) {
	var circle = elements[i];
	if (circle == lastCircleData) {
	    return;
	}
	//console.log("before updating...");
	//console.log(circle.x);
	//console.log(circle.y);
	circle.x += circle.vx;
	circle.y += circle.vy;
	circle.vx += circle.ax;
	circle.vy += circle.ay;
	//ax = calcAx(circle);
	//ay = calcAy(circle);
	circle.ax = .01;
	circle.ay = -.01;
	//console.log("after updating...")
	//console.log(circle.cx);
	//console.log(circle.cy);
    };
}

var drawCircle = function(circle) {
    console.log("drawing circle");
    var c = document.createElementNS(NS, "circle");
    console.log(circle.x);
    console.log(circle.y);
    c.setAttribute("cx", circle.x);
    c.setAttribute("cy", circle.y);
    c.setAttribute("r", Math.sqrt(Math.abs(circle.q)) * 13);
    if (circle.q > 0) {
	console.log("positive");
	c.setAttribute("fill", "green");
    }
    else {
	c.setAttribute("fill", "red");
    }
    c.setAttribute("stroke","black");
    svg.appendChild(c);
    return c;
}

var animate = function(){
    console.log(elements);
    console.log("animating");
    /*var i = 0;
    console.log(svg.children);
    var max = svg.childElementCount - 1;
    while (i < max) {
	svg.removeChild(svg.children[0]);
	i++;
    }
    */
    svg.innerHTML = "";
    if (lastCircleData != null) {
	lastCircleDrawn = drawCircle(lastCircleData);
    } 
    updateCircles();
    for (var i = 0; i < elements.length; i++) {
	var circle = elements[i];
	if (circle != lastCircleData) {
	    drawCircle(circle);
	}
    }
}


var end = function(e) {
    svg.innerHTML = "";
    clearInterval(requestId);
    elements = [];
    move = false;
    start.innerHTML = "start";
    newCircleAllowed = true;
}

var action = function(e) {
    if (!(move)) {
	start.innerHTML = "pause";
	requestId = setInterval(animate, 10);
	move = true;
    }
    else {
	start.innerHTML = "start";
	clearInterval(requestId);
	move = false;
    }
}

var updateCharge = function(e) {
    submit.disabled = true;
    input = textbox.value;
    console.log("updating");
    console.log(input);
    if (input >= -100 && input <= 100 && input != "") {
	submit.disabled = false;
	svg.removeChild(lastCircleDrawn);
	lastCircleData.q = input / 10
	lastCircleDrawn = drawCircle(lastCircleData);
    }
}
	

var assignCharge = function(e) {
    newCircleAllowed = true;
    lastCircleData = null;
    lastCircleDrawn = null;
    textbox.style.visibility = "hidden";
    submit.style.visibility = "hidden";
    
    
    
}
    
svg.addEventListener("click", newCircle);
clear.addEventListener("click", end);
start.addEventListener("click", action);
submit.addEventListener("click", assignCharge);
textbox.addEventListener("input", updateCharge);
