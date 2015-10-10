var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

w = canvas.width;
h = canvas.height;

// render background image
var bgImage = new Image();
bgImage.src = "images/background.jpg"
bgImage.onload = function () {
	ctx.drawImage(bgImage, 0, 0)
	};


//player1 image (to be loaded later)
var p1loaded = false;
var p1img = new Image();
p1img.src = "images/red.png";
p1img.onload = function () {
	p1loaded = true;
	};


//player2 image (to be loaded later)
var p2loaded = false;
var p2img = new Image();
p2img.src = "images/blue.png";
p2img.onload = function () {
	p2loaded = true;
};

var points = []; //an empty array to store points
var team = [];
var flag = {};
var possteams =["red", "blue"];

function players (speed, isflag, team, points) 
{
	this.speed = speed;
	this.isflag = isflag;
	this.team = team;
	this.points = points;
}

var r = possteams[0];
var b = possteams[1];

var player1 = new players(300, false, r, 0);
team.push(player1);

var player2 = new players(300, false, b, 0);
team.push(player2);

console.log(team);

var press = {};

addEventListener("pressed", function (arg)
{
	press[arg.keyCode];
	console.log("key was pressed");
}, false);

addEventListener("unpressed", function (arg)
{
	delete press[arg.keyCode];
	console.log("key was released");
}, false);






