var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

var w = canvas.width;
var h = canvas.height;


function imgloaded (loaded, img, source) {
	this.loaded = loaded;
	this.img = img;
	this.img.src = source;
	this.img.onload = function () {
		loaded = true;
	}

};

var bg = new imgloaded(true, new Image(), "images/background.jpg" );
var p1 = new imgloaded(true, new Image(), "images/red.png" );
var p2 = new imgloaded(true, new Image(), "images/blue.png" );
var flg = new imgloaded(true, new Image(), "images/flag.png" );


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
console.log("player 1 started at"  + player1.x + " " + player1.y)

player2.x = 32 + Math.floor((Math.random() * (w - 64)));
player2.y = 32 + Math.floor((Math.random() * (w - 64)));
console.log("player 2 started at " + player2.x + " " + player2.y)

flag.x = w / 2;
flag.y = h / 2;
}

var reload = function (arg1) 
{
	if (38 in press) { // Player 1 holding up
		player1.y -= player1.speed * arg1;
	}
	if (40 in press) { // Player  1holding down
		player1.y += player1.speed * arg1;
	}
	if (37 in press) { // Player 1 holding left
		player1.x -= player1.speed * arg1;
	}
	if (39 in press) { // Player 1 holding right
		player1.x += player1.speed * arg1;
	}

if (87 in press) { // Player 2 holding up
		player2.y -= player2.speed * arg1;
	}
	if (83 in press) { // Player 2 holding down
		player2.y += player2.speed * arg1;
	}
	if (65 in press) { // Player 2 holding left
		player2.x -= player2.speed * arg1;
	}
	if (68 in press) { // Player 2 holding right
		player2.x += player2.speed * arg1;
	}
//need to implement flag carrying ability for player1, player2	
};

var begin = function () {
	if(bg.loaded === true)
	{
		ctx.drawImage(bg.img, 0, 0);
	}

	if(p1.loaded === true) {
		ctx.drawImage(p1.img, player1.x, player1.y);
	}
	if(p2.loaded === true) {
		ctx.drawImage(p2.img, player2.x, player2.y);
	}
	if(flg.loaded === true){
		ctx.drawImage(flg.img, flag.x, flag.y);
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