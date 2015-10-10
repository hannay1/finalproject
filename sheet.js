var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgImage = new Image();
bgImage.onload = function () {
	bgImage.src = "images/background.jpg";
console.log("background loaded");
};

// player1 image
var player1Ready = false;
var player1Image = new Image();
player1Image.onload = function () {
	player1Ready = true;
};
player1Image.src = "images/red.png";

// flag image
var flagReady = false;
var flagImage = new Image();
flagImage.onload = function () {
	flagReady = true;
};
flagImage.src = "images/flag.png";

// Game objects
var player1 = {
	speed: 300 // movement in pixels per second
};

var player2 = {
	speed: 300
};

var flag = {};
var carry = 0;


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	console.log('key was pressed');
}, false);


addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	console.log("key was released");
}, false);

// Reset the game when the player catches a flag
var reset = function () {
	player1.x = 32 + (Math.random() * (canvas.width - 64));
	player1.y = 32 + (Math.random() * (canvas.height - 64));


	// Throw the flag somewhere on the screen randomly
	flag.x = canvas.width / 2;
	flag.y = canvas.height / 2;
};



// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		player1.y -= player1.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		player1.y += player1.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		player1.x -= player1.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		player1.x += player1.speed * modifier;
	}

	// Are they touching?
	if (
		player1.x <= (flag.x + 32)
		&& flag.x <= (player1.x + 32)
		&& player1.y <= (flag.y + 32)
		&& flag.y <= (player1.y + 32)
	) {
		++carry;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (player1Ready) {
		ctx.drawImage(player1Image, player1.x, player1.y);
	}

	if (flagReady) {
		ctx.drawImage(flagImage, flag.x, flag.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "12px Helvetica";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + carry, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();