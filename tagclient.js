var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
document.body.appendChild(canvas);

var w = canvas.width;
var h = canvas.height;


function imgloaded(loaded, img, source) {
    this.loaded = loaded;
    this.img = img;
    this.img.src = source;
    this.img.onload = function() {
        loaded = true;
    }

};

var bg = new imgloaded(true, new Image(), "images/background.jpg");
var p1 = new imgloaded(true, new Image(), "images/red.png");
var p2 = new imgloaded(true, new Image(), "images/blue.png");
var flg = new imgloaded(true, new Image(), "images/flag.png");
var bgoal = new imgloaded(true, new Image(), "images/goal1.png");
var rgoal = new imgloaded(true, new Image(), "images/goal2.png");

var bluegoal = {};
var redgoal = {};
var team = [];
var flag = {};
var possteams = ["red", "blue"];
var r = possteams[0];
var b = possteams[1];


function players(speed, isflag, team, points) {
    this.speed = speed;
    this.isflag = isflag;
    this.team = team;
    this.points = points;
}

var player1 = new players(200, false, r, 0);
team.push(player1);

var player2 = new players(200, false, b, 0);
team.push(player2);

console.log(team);

var press = {};

addEventListener("keydown", function(e) {
    press[e.keyCode] = true;
    console.log("key was pressed");
}, false);

addEventListener("keyup", function(e) {
    delete press[e.keyCode];
    console.log("key was released");
}, false);


var positions = function() {

    player1.x = (w / 2) - 35;
    player1.y = 640;

    player2.x = (w / 2) - 35;
    player2.y = 30;

    flag.x = (w / 2);
    flag.y = (h / 2);

    bluegoal.x = (w / 2) - 30;
    bluegoal.y = 0;

    redgoal.x = (w / 2) - 30;
    redgoal.y = 690;

}

var reload = function(arg1) { //need to implement some way to sort input from player1/player2 keyboards later


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

    if (player1.x + 48 > canvas.width) {
        player1.x = canvas.width - 48;
    }
    if (player1.x < 0) {
        player1.x = 0;
    }
    if (player1.x > 1280) {
        player1.x = 1280;
    };
    if (player1.y > 720) {
        player1.y = 720;
    };
    if (player1.y < 0 ) {
        player1.y = 0;
    };

    checkifRisflag();
    checkifBisflag();
    //checkifRscore();
    //checkifBscore();

};

function collisionCheck(player) {

}

function checkifRisflag() {
    if (
        player1.x <= (flag.x + 32) && flag.x <= (player1.x + 32) && player1.y <= (flag.y + 32) && flag.y <= (player1.y + 32)

    ) {
        player1.isflag = true;
        console.log("player1 is carrying flag ", player1.isflag);
        player1.x = player1.x; //keeps p1 moving after flag capture
        player1.y = player1.y;
        //need to implement way of removing flag until point is scored

    }
};

function checkifBisflag() {
    if (
        player2.x <= (flag.x + 32) && flag.x <= (player2.x + 32) && player2.y <= (flag.y + 32) && flag.y <= (player2.y + 32)

    ) {
        player2.isflag = true;
        console.log("player2 is carrying flag ", player2.isflag);
        player2.x = player2.x; //keeps p2 moving after flag capture
        player2.y = player2.y;

    }
};
var begin = function() {
    if (bg.loaded === true) {
        ctx.drawImage(bg.img, 0, 0);
    }

    if (p1.loaded === true) {
        ctx.drawImage(p1.img, player1.x, player1.y);
    }
    if (p2.loaded === true) {
        ctx.drawImage(p2.img, player2.x, player2.y);
    }
    if (flg.loaded === true) {
        ctx.drawImage(flg.img, flag.x, flag.y);
    }
    if (bgoal.loaded === true) {
        ctx.drawImage(bgoal.img, bluegoal.x, bluegoal.y);
    }
    if (rgoal.loaded === true) {
        ctx.drawImage(rgoal.img, redgoal.x, redgoal.y);
    }
};

var main = function() { //main function. 
    var now = Date.now();
    //console.log(now)
    var delta = now - then;

    reload(delta / 500);
    begin();

    then = now;

    requestAnimationFrame(main); //main callback for updating image properties onscreen
};



var then = Date.now(); //in between this and main(), the difference will be saved in var then for use the next time main is called
positions();
main();