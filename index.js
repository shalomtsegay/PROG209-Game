// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Monster1 image
var monster1Ready = false;
var monster1Image = new Image();
monster1Image.onload = function () {
    monster1Ready = true;
};
monster1Image.src = "images/monster.png";

// Monster2 image
var monster2Ready = false;
var monster2Image = new Image();
monster2Image.onload = function () {
    monster2Ready = true;
};
monster2Image.src = "images/monster.png";

// Monster3 image
var monster3Ready = false;
var monster3Image = new Image();
monster3Image.onload = function () {
    monster3Ready = true;
};
monster3Image.src = "images/monster.png";

// Monster4 image
var monster4Ready = false;
var monster4Image = new Image();
monster4Image.onload = function () {
    monster4Ready = true;
};
monster4Image.src = "images/monster.png";




// Game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var monster = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
var monster1 = {
    x:0,
    y:0
}
var monster2 = {
    x:0,
    y:0
}
var monster3 = {
    x:0,
    y:0
}
var monster4 = {
    x:0,
    y:0
}
var monstersCaught = 0;


// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down
addEventListener("keydown", function (e) {
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

// end of definitions

//looped part of app


var update = function (modifier) {
   
    if (38 in keysDown && hero.y > 32+4) { //  holding up key
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < canvas.height - (64 + 6)) { //  holding down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > (32+4)) { // holding left key
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown && hero.x < canvas.width - (64 + 6)) { // holding right key
        hero.x += hero.speed * modifier;
    }
    //after moving hero x and y
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }
    if (
        hero.x <= (monster1.x + 32)
        && monster1.x <= (hero.x + 32)
        && hero.y <= (monster1.y + 32)
        && monster1.y <= (hero.y + 32)
    ) {
        ++monstersCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }
    if (
        hero.x <= (monster2.x + 32)
        && monster2.x <= (hero.x + 32)
        && hero.y <= (monster2.y + 32)
        && monster2.y <= (hero.y + 32)
    ) {
        ++monstersCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }
    if (
        hero.x <= (monster3.x + 32)
        && monster3.x <= (hero.x + 32)
        && hero.y <= (monster3.y + 32)
        && monster3.y <= (hero.y + 32)
    ) {
        ++monstersCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }
    if (
        hero.x <= (monster4.x + 32)
        && monster4.x <= (hero.x + 32)
        && hero.y <= (monster4.y + 32)
        && monster4.y <= (hero.y + 32)
    ) {
        ++monstersCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }
};



// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    if (monster1Ready) {
        ctx.drawImage(monster1Image, monster1.x, monster1.y);
    }
    if (monster2Ready) {
        ctx.drawImage(monster1Image, monster2.x, monster2.y);
    }
    if (monster3Ready) {
        ctx.drawImage(monster1Image, monster3.x, monster3.y);
    }
    if (monster4Ready) {
        ctx.drawImage(monster4Image, monster4.x, monster4.y);
    }
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);

}


// The main game loop
// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
};

// Reset the game when the player catches a monster
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge 32 + hedge 32 + char 32 = 96
    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32 + (Math.random() * (canvas.height - 96));

    monster1.x = 32 + (Math.random() * (canvas.width - 96));
    monster1.y = 32 + (Math.random() * (canvas.height - 96));

    monster2.x = 32 + (Math.random() * (canvas.width - 96));
    monster2.y = 32 + (Math.random() * (canvas.height - 96));

    monster3.x = 32 + (Math.random() * (canvas.width - 96));
    monster3.y = 32 + (Math.random() * (canvas.height - 96));

    monster4.x = 32 + (Math.random() * (canvas.width - 96));
    monster4.y = 32 + (Math.random() * (canvas.height - 96));
};

// Let's play this game!
var then = Date.now();
reset();
main();  // call the main game loop.