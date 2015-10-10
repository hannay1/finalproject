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


//render player1 image
var bgImage = new Image();
bgImage.src = "images/red.png"
bgImage.onload = function () {
	ctx.drawImage(bgImage, w/2, h/2);
	};



var points = []; //an empty array to store points
var team = [];
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

var player1 = new players(256, false, r, 0);
team.push(player1);

var player2 = new players(256, false, b, 0);
team.push(player2);

console.log(team);


//render player 1
