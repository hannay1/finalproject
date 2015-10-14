var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
document.body.appendChild(canvas);

var w = canvas.width;
var h = canvas.height;




function imgloaded(loaded, img, src) {
    this.loaded = loaded;
    this.img = img;
    this.img.src = src;
    this.img.onload = function() {
        loaded = true;
    }

};

var bg = new imgloaded(true, new Image(), "images/background.jpg");
var p1 = new imgloaded(true, new Image(), "images/red.png");
var p2 = new imgloaded(true, new Image(), "images/blue.png");
var flgr = new imgloaded(true, new Image(), "images/redflag.gif");
var flgb = new imgloaded(true, new Image(), "images/blueflag.gif")
var bgoal = new imgloaded(true, new Image(), "images/goal1.png");
var rgoal = new imgloaded(true, new Image(), "images/goal2.png");




var bluegoal = {};
var redgoal = {};
var team = [];
var rflag = {};
var bflag = {};
var possteams = ["red", "blue"];
var r = possteams[0];
var b = possteams[1];



function players(speed, isflag, team, points, timeStamp) 
{
    this.speed = speed;
    this.isflag = isflag;
    this.team = team;
    this.points = points;
    this.timeStamp = timeStamp; 
   
}

var redplayer = new players(215, false, r, 0, Date);
team.push(redplayer);

var blueplayer = new players(215, false, b, 0, Date);
team.push(blueplayer);

console.log(team);

// we need a team sorter once server functionality is implemented 


var rpress = {};

addEventListener("keydown", function(evt) {
    
    rpress[evt.keyCode] = true;
    if(38 in rpress || 40 in rpress || 37 in rpress || 39 in rpress)
    {
        fromRtoServ();
    }
    //console.log("key was pressed");
}, false);


addEventListener("keyup", function(evt) {
    delete rpress[evt.keyCode];
    //console.log("key was released"); 
}, false);


var bpress = {};

addEventListener("keydown", function(evt) {
    bpress[evt.keyCode] = true;
    if(87 in rpress || 83 in rpress || 65 in rpress || 68 in rpress)
    {
        fromBtoServ();
    }
    //console.log("key was pressed"); 
}, false);

addEventListener("keyup", function(evt) {
    delete bpress[evt.keyCode];
    //console.log("key was released");
}, false);



function reload() {
    redplayer.isflag = false;
    blueplayer.isflag = false;

    redplayer.x = (w / 2) - 35;
    redplayer.y = 640;

    blueplayer.x = (w / 2) - 35;
    blueplayer.y = 30;

    //implement way to have flag reapear in random locations after colliding with a player carrying flag 
    rflag.x = 32 + (Math.random(490-690) * (w - 64));
    rflag.y = 32 + (Math.random(490-690) * (h - 64));

    bflag.x = 32 + (Math.random(0-200) * (w - 64));
    bflag.y = 32 + (Math.random(0-200) * (h - 64));

    bluegoal.x = (w / 2) - 30;
    bluegoal.y = 0;

    redgoal.x = (w / 2) - 30;
    redgoal.y = 690;

}

function positions(speed) 
{ 
    var redup = 38 in rpress;
    var reddown = 40 in rpress;
    var redleft = 37 in rpress;
    var redright = 39 in rpress;
    var bluup = 87 in bpress; //w
    var bludown = 83 in bpress;
    var bluleft = 65 in bpress;
    var bluright = 68 in bpress



    if (redup) { // Player 1 holding up
        redplayer.y -= redplayer.speed * speed;
        //console.log("red moved up");
    }
    if (reddown) { // Player  1holding down
        redplayer.y += redplayer.speed * speed;
    }
    if (redleft) { // Player 1 holding left
        redplayer.x -= redplayer.speed * speed;
    }
    if (redright) { // Player 1 holding right
        redplayer.x += redplayer.speed * speed;
    }

    if (bluup) { // Player 2 holding up, these will all eventually be mapped to other server inptu
        blueplayer.y -= blueplayer.speed * speed;   
    }
    if (bludown) { // Player 2 holding down
        blueplayer.y += blueplayer.speed * speed;
    }
    if (bluleft) { // Player 2 holding left
        blueplayer.x -= blueplayer.speed * speed;
    }
    if (bluright) { // Player 2 holding right
        blueplayer.x += blueplayer.speed * speed;
    }

    collisionwallred();
    collisionwallblue();
    checkifRisflag();
    checkifBisflag();
    checkifRscore();
    checkifBscore();
    
};

function collisionwallred() 
{
    if (redplayer.x  + 48 > w) {
        redplayer.x = w - 48;
    }
    if (redplayer.x < 0) {
        redplayer.x = 0;
    }
    if (redplayer.y + 48 > h) {
        redplayer.y = h - 48;
    }
    if (redplayer.y < 0) {
        redplayer.y = 0;
    }
}

function collisionwallblue()
{
    if (blueplayer.x  + 48 > w) {
        blueplayer.x = w - 48;
    }
    if (blueplayer.x < 0) {
        blueplayer.x = 0;
    }
    if (blueplayer.y + 48 > h) {
        blueplayer.y = h - 48;
    }
    if (blueplayer.y < 0) {
        blueplayer.y = 0;
    }
}


function checkifRisflag() {

    if (
        redplayer.x <= (bflag.x + 32) 
        && bflag.x <= (redplayer.x + 32) 
        && redplayer.y <= (bflag.y + 32) 
        && bflag.y <= (redplayer.y + 32)

    ) {
    
        redplayer.isflag = true;
        console.log("redplayer is carrying flag ", redplayer.isflag); 
    }
};

function checkifBisflag() {
    if (
        blueplayer.x <= (rflag.x + 32) 
        && rflag.x <= (blueplayer.x + 32) 
        && blueplayer.y <= (rflag.y + 32) 
        && rflag.y <= (blueplayer.y + 32)

    ) {
        
  
        blueplayer.isflag = true;
        console.log("blueplayer is carrying flag ", blueplayer.isflag);

    }
};

function checkifRscore () 
{   
    if (redplayer.isflag === true)
    {
        if (
        redplayer.x <= (redgoal.x + 32) 
        && redgoal.x <= (redplayer.x + 32) 
        && redplayer.y <= (redgoal.y + 32) 
        && redgoal.y <= (redplayer.y + 32)

    ) {
           
        redplayer.points++
        console.log("red scored");
        console.log(redplayer.points);
        redplayer.isflag = false;
        reload();
    }
    }

}

function checkifBscore () 
{   
    if (blueplayer.isflag === true)
    {
        if (
        blueplayer.x <= (bluegoal.x + 32) 
        && bluegoal.x <= (blueplayer.x + 32) 
        && blueplayer.y <= (bluegoal.y + 32) 
        && bluegoal.y <= (blueplayer.y + 32)

    ) {
        blueplayer.points++;
        console.log("blue scored");
        console.log(blueplayer.points);
        blueplayer.isflag = false;
        reload();

    }
    }

}

function begin() {
    if (bg.loaded === true) {
        ctx.drawImage(bg.img, 0, 0);
    }

    if (p1.loaded === true) {

        ctx.drawImage(p1.img, redplayer.x, redplayer.y);
    }
    if (p2.loaded === true) {
        ctx.drawImage(p2.img, blueplayer.x, blueplayer.y);
    }
    if(redplayer.isflag === false)
    {
            if (flgb.loaded === true)
            {
            ctx.drawImage(flgb.img, bflag.x, bflag.y);
            }
    }
    if(blueplayer.isflag === false)
    {
            if (flgr.loaded === true)
            {
            ctx.drawImage(flgr.img, rflag.x, rflag.y);
            }
    }

    if (bgoal.loaded === true) {
        ctx.drawImage(bgoal.img, bluegoal.x, bluegoal.y);
    }
    if (rgoal.loaded === true) {
        ctx.drawImage(rgoal.img, redgoal.x, redgoal.y);
    }
     if (checkifRscore) {
            ctx.fillStyle = "rgb(250, 250, 250)";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "bottom";
            ctx.fillText("Red: " + redplayer.points, 32, 32);
    }
    if (checkifBscore) {
            ctx.fillStyle = "rgb(250, 250, 250)";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Blue: " + blueplayer.points, 32, 32);
    }
};



function fromRtoServ()
{ 
        var xhr = new XMLHttpRequest();
        var url = "send_posR?x=" + redplayer.x + "&y=" + redplayer.y + "&team=" +redplayer.team;
        console.log(url);
        xhr.open( "get", url, true );
        xhr.send(); 
        
}

function fromBtoServ()
{
        var xhr = new XMLHttpRequest();
        var url = "send_posB?x=" + blueplayer.x + "&y=" + blueplayer.y + "&team=" +blueplayer.team ;
        console.log(url);
        xhr.open( "get", url, true );
        xhr.send();
}


function reset () 
{
    var now = Date.now();
    var diff = now - then;
    positions(diff / 1000);
    begin();
    then = now;
    requestAnimationFrame(reset);
}
//window.setTimeout(fromRtoServ, 100);
//window.setTimeout(fromBtoServ, 100);
var then = Date.now(); //in between this and main(), the new time will be saved in var then for use the next time main is called
reload();
reset();