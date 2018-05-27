var svg = document.getElementById("svg");
var clear = document.getElementById("clear");
var start = document.getElementById("start");
var NS = "http://www.w3.org/2000/svg"
var elements = [];
var requestId;
var move = false;

//svg.setAttribute("width", window.innerWidth);
//svg.setAttribute("height", window.innerHeight);


var newCircle = function(e) {
    console.log("new circle");
    var circle = {
	x : e.offsetX,
	y : e.offsetY,
	vx : 0,
	vy : 0,
	ax : 0,
	ay : 0,
	q : 1,
    };
    drawCircle(circle);
    elements.push(circle);
}

var updateCircles = function() {
    for (var i = 0; i < elements.length; i++) {
	circle = elements[i];
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
    c.setAttribute("r", 20);
    c.setAttribute("fill", "lightsteelblue");
    c.setAttribute("stroke","black");
    svg.appendChild(c);
}

var animate = function(){
    console.log(elements);
    console.log("animating");
    svg.innerHTML = "";
    updateCircles();
    for (var i = 0; i < elements.length; i++) {
	circle = elements[i];
	drawCircle(circle);
    }
}


var end = function(e) {
    svg.innerHTML = "";
    clearInterval(requestId);
    elements = [];
    move = false;
    start.innerHTML = "start";
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
	
    
svg.addEventListener("click", newCircle);
clear.addEventListener("click", end);
start.addEventListener("click", action);
