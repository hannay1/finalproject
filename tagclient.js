var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

var w = canvas.width;
var h = canvas.height;

// render background image
var bgloaded = false;
var bgimg = new Image();
bgimg.src = "images/background.jpg"
bgimg.onload = function () {
	bgloaded = true;
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

//flag image (to be loaded later)
var flagReady = false;
var flagImage = new Image();
flagImage.onload = function () {
	flagReady = true;
};
flagImage.src = "images/flag.png";

var points =""; //an empty variable to store points
var team = [];
var flag = {};
var possteams =["red", "blue"];
var r = possteams[0];
var b = possteams[1];


function players (speed, isflag, team, points) 
{
	this.speed = speed;
	this.isflag = isflag;
	this.team = team;
	this.points = points;
}



var player1 = new players(300, false, r, 0);
team.push(player1);

var player2 = new players(300, false, b, 0);
team.push(player2);

console.log(team);

/*
function teamSort (players)
{
	for (i=0; i<team.length; i++)
	{
	if(players[i].team = r)
	{
		//append 
	}else 
	{

	}
	}
}
*/

var press = {};

addEventListener("keydown", function (e)
{
	press[e.keyCode] = true;
	console.log("key was pressed");
}, false);

addEventListener("keyup", function (e)
{
	delete press[e.keyCode];
	console.log("key was released");
}, false);


var positions = function () {	
player1.x = 32 + Math.floor((Math.random() * (w - 64)));
player1.y = 32 + Math.floor((Math.random() * (h - 64)));
console.log("player 1 is at"  + player1.x + " " + player1.y)

player2.x = 32 + Math.floor((Math.random() * (w - 64)));
player2.y = 32 + Math.floor((Math.random() * (w - 64)));
console.log("player 2 is at " + player2.x + " " + player2.y)

flag.x = w / 2;
flag.y = h / 2;
}


var reload = function (arg1) 
{
	if (38 in press) { // Player holding up
		player1.y -= player1.speed * arg1;
	}
	if (40 in press) { // Player holding down
		player1.y += player1.speed * arg1;
	}
	if (37 in press) { // Player holding left
		player1.x -= player1.speed * arg1;
	}
	if (39 in press) { // Player holding right
		player1.x += player1.speed * arg1;
	}



if (87 in press) { // Player holding up
		player2.y -= player2.speed * arg1;
	}
	if (83 in press) { // Player holding down
		player2.y += player2.speed * arg1;
	}
	if (65 in press) { // Player holding left
		player2.x -= player2.speed * arg1;
	}
	if (68 in press) { // Player holding right
		player2.x += player2.speed * arg1;
	}
//need to implement flag carrying ability for player1, player2	
};

var begin = function () {
	if(bgloaded === true)
	{
		ctx.drawImage(bgimg, 0, 0);
	}

	if(p1loaded === true) {
		ctx.drawImage(p1img, player1.x, player1.y);
	}
	if(p2loaded === true) {
		ctx.drawImage(p2img, player2.x, player2.y);
	}
	if(flagReady === true){
		ctx.drawImage(flagImage, flag.x, flag.y);
	}
};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	reload(delta / 1000);
	begin();

	then = now;

	requestAnimationFrame(main); //main callback for updating image properties onscreen
};



var then = Date.now();
positions();
main();





