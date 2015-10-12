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



function players(speed, isflag, team, points, canscore) {
    this.speed = speed;
    this.isflag = isflag;
    this.team = team;
    this.points = points;
    this.canscore = canscore
}

var player1 = new players(125, false, r, 0, false);
team.push(player1);

var player2 = new players(125, false, b, 0, false);
team.push(player2);

console.log(team);

// we need a team sorter once server functionality is implemented 

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

    if (87 in press) { // Player 2 holding up, these will all eventually be mapped to other server inptu
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

    collisionwallred();
    collisionwallblue();
    //checkforcarry();
    checkifRisflag();
    checkifBisflag();
    checkifRscore();
    checkifBscore();
};

function collisionwallred() 
{
    if (player1.x  + 48 > w) {
        player1.x = w - 48;
    }
    if (player1.x < 0) {
        player1.x = 0;
    }
    if (player1.y + 48 > h) {
        player1.y = h - 48;
    }
    if (player1.y < 0) {
        player1.y = 0;
    }
}

function collisionwallblue()
{
    if (player2.x  + 48 > w) {
        player2.x = w - 48;
    }
    if (player2.x < 0) {
        player2.x = 0;
    }
    if (player2.y + 48 > h) {
        player2.y = h - 48;
    }
    if (player2.y < 0) {
        player2.y = 0;
    }
}
/*

function checkforcarry() 
{
    if (player1.isflag === true || player2.isflag === true)
    {

    }
}
*/

function checkifRisflag() {

    if (
        player1.x <= (flag.x + 32) 
        && flag.x <= (player1.x + 32) 
        && player1.y <= (flag.y + 32) 
        && flag.y <= (player1.y + 32)

    ) {
    
        player1.isflag = true;
        console.log("player1 is carrying flag ", player1.isflag);
        delete flag;
        player1.x = player1.x; //keeps p1 moving after flag capture
        player1.y = player1.y;
        
        //reload();

        //need to implement way of removing flag until point is scored
    
    }
};

function checkifBisflag() {
    if (
        player2.x <= (flag.x + 32) 
        && flag.x <= (player2.x + 32) 
        && player2.y <= (flag.y + 32) 
        && flag.y <= (player2.y + 32)

    ) {
        
  
        player2.isflag = true;
        console.log("player2 is carrying flag ", player2.isflag);
        player2.x = player2.x; //keeps p2 moving after flag capture
        player2.y = player2.y;
        
        //reload();
       
    

    }
};

function checkifRscore () 
{   
    if (player1.isflag === true)
    {
        if (
        player1.x <= (bluegoal.x + 32) 
        && bluegoal.x <= (player1.x + 32) 
        && player1.y <= (bluegoal.y + 32) 
        && bluegoal.y <= (player1.y + 32)

    ) {
           
        player1.points++
        console.log("red scored");
        console.log(player1.points);
        player1.isflag = false;
       



        //need to implement way of removing flag until point is scored
    }
    }

}

function checkifBscore () 
{   
    if (player2.isflag === true)
    {
        if (
        player2.x <= (redgoal.x + 32) 
        && redgoal.x <= (player2.x + 32) 
        && player2.y <= (redgoal.y + 32) 
        && redgoal.y <= (player2.y + 32)

    ) {
        player2.points++;
        console.log("blue scored");
        console.log(player2.points);
        player2.isflag = false;

        //need to implement way of removing flag until point is scored
    }
    }

}




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
    if(player1.isflag === false && player2.isflag === false)
    {
            if (flg.loaded === true)
            {
            ctx.drawImage(flg.img, flag.x, flag.y);
            }
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