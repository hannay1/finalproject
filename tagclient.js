var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

w = canvas.width;
h = canvas.height;

// render background image
var bgImage = new Image();
bgImage.src = "images/background.jpg";
bgImage.onload = function() {
    ctx.drawImage(bgImage, 0, 0);
};


//player1 image (to be loaded later)
var p1loaded = false;
var p1img = new Image();
p1img.src = "images/red.png";
p1img.onload = function() {
    p1loaded = true;
};

//player2 image (to be loaded later)
var p2loaded = false;
var p2img = new Image();
p2img.src = "images/blue.png";
p2img.onload = function() {
    p2loaded = true;
};

var points = [];
var team = [];
var flag = {};
var possteams = ["red", "blue"];

function players(speed, isflag, team, points, xpos, ypos) {
    this.speed = speed;
    this.isflag = isflag;
    this.team = team;
    this.points = points;
    this.xpos = xpos;
    this.ypos = ypos;
}
var r = possteams[0];
var b = possteams[1];

var player1 = new players(300, false, r, 0, 0, 0);
team.push(player1);

var player2 = new players(300, false, b, 0, 100, 100);
team.push(player2);

console.log(team);

function init() {
	//ToDO -spawn players on opposite sides
    if (p1loaded) {
        ctx.drawImage(p1img, player1.xpos, player1.ypos);
    }
    if (p2loaded) {
        ctx.drawImage(p1img, player2.xpos, player2.ypos);
    }
}

//player1 movement
canvas.addEventListener("pressed", movePlayer1, false) {

}
//player 2 movement keycodes: w =87,a=65, s=83, d=65

//arrow keys -needs border check
function movePlayer1(evt) {
    switch (evt.keyCode) {
        //lefts
        case 37:
            {
                player1.posx -= player1.speed;
                break;
            }
            //right
        case 39:
            {
                player1.posx += player1.speed;
                break;
            }
            //up
        case 38:
            {
                player1.posy -= player1.speed;
                break;
            }

            //down
        case 40:
            {
                player1.posy += player1.speed; {
                break;
                }

            }
           redraw();
    }

    function redraw() {
    	ctx.clear();
    	ctx.drawImage(p1img, player1.xpos, player1.ypos);
    	ctx.drawImage(p1img, player2.xpos, player2.ypos);

    }

    function checkCollide() {

    }

    function GameLoop(argument) {
        init();


        //toDO
        //flag carry
        //capture flag check
        //collide check



    }
}