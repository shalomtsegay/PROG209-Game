// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1456;
canvas.height = 656;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// Gems image
var gemsReady = false;
var gemsImage = new Image();
gemsImage.onload = function () {
    gemsReady = true;
};
gemsImage.src = "images/gems.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/MinerHero.png";

// Gem 1 image
var gem1Ready = false;
var gem1Image = new Image();
gem1Image.onload = function () {
    gem1Ready = true;
};
gem1Image.src = "images/gem1.png";

// Gem 2 image
var gem2Ready = false;
var gem2Image = new Image();
gem2Image.onload = function () {
    gem2Ready = true;
};
gem2Image.src = "images/gem2.png";

// Gem 3 image
var gem3Ready = false;
var gem3Image = new Image();
gem3Image.onload = function () {
    gem3Ready = true;
};
gem3Image.src = "images/gem3.png";

// Gem 4 image
var gem4Ready = false;
var gem4Image = new Image();
gem4Image.onload = function () {
    gem4Ready = true;
};
gem4Image.src = "images/gem4.png";

// Gem 5 image
var gem5Ready = false;
var gem5Image = new Image();
gem5Image.onload = function () {
    gem5Ready = true;
};
gem5Image.src = "images/gem5.png";

// Bomb enemy image
var bombReady = false;
var bombImage = new Image();
bombImage.onload = function () {
    bombReady = true;
};
bombImage.src = "images/bomb.png";

// Next Level image
var nextLReady = false;
var nextLImage = new Image();
nextLImage.onload = function () {
    nextLReady = true;
};
nextLImage.src = "images/nextLevel.png";


// lots of variables to keep track of sprite geometry
//  I have 8 rows and 3 cols in my space ship sprite sheet
var rows = 4;
var cols = 9;

//second row for the right movement (counting the index from 0)
var trackRight = 0;
//third row for the left movement (counting the index from 0)
var trackLeft = 3;
var trackUp = 1;   // not using up and down in this version, see next version
var trackDown = 2;

var spriteSheetWidth = 720; // also  spriteWidth/cols; 
var spriteSheetHeight = 339;  // also spriteHeight/rows; 
var oneSpriteWidth = spriteSheetWidth / cols; 
var oneSpriteHeight = spriteSheetHeight / rows; 

var curXFrame = 0; // start on left side
var framesPerRowCount = 9;  // 3 frames per row
//x and y coordinates of the overall sprite image to get the single frame  we want
var UpperLeftXpointOnSpriteSHeet = 0;  // our image has no borders or other stuff
var UpperLeftYpointOnSpriteSHeet = 0;

//Assuming that at start the character will move right side 
var left = false;
var right = true;
var up = false;
var down = true;

let counter = 0;



// SOUNDS
var gameOver = "sounds/game_over.wav";  //  Game Over audio
var gameWin = "sounds/game_win.wav"; // Game Win audio
var gemAudio = "sounds/gems.wav"; // Gem Collection audio
var walking = "sounds/walking.wav"; // Gem Collection audio
var soundEfx = document.getElementById("soundEfx");


//============================================================================

// Game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var gem1 = {
    // for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
var gem2 = {
    x: 0,
    y: 0
};
var gem3 = {
    x: 0,
    y: 0
};
var gem4 = {
    x: 0,
    y: 0
};
var gem5 = {
    x: 0,
    y: 0
};

var bomb1 = {
    x: 0,
    y: 0,
    direction:  1
};

var bomb2 = {
    x: 0,
    y: 0,
    direction:  1
};

var bomb3 = {
    x: 0,
    y: 0,
    direction:  1
};

var bomb4 = {
    x: 0,
    y: 0,
    direction:  1
};

var nextL = {
    x: 0,
    y: 0
};

var gemCost = 50;


//////      HANDLE KEYBOARD CONTROLS      ////////

var keysDown = {}; //object were we properties when keys go down
// and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// end of definitions



//looped part of app

//  MOVING HERO
var update = function (modifier) {

    // clear last hero image posistion  and assume he is not moving left or rigth
    ctx.clearRect(hero.x, hero.y, oneSpriteWidth, oneSpriteHeight);
    left = false;
    right = false;
    up = false;
    down = false;


    if (38 in keysDown && hero.y > 16) { //  holding UP key
        hero.y -= hero.speed * modifier;
        up = true;   // for animation
        down = false; // for animation
        left = false;
        right = false;
    }
    if (40 in keysDown && hero.y < canvas.height - 100) { //  holding DOWN key
        hero.y += hero.speed * modifier;
        up = false;   // for animation
        down = true; // for animation
        left = false;
        right = false;
    }
    if (37 in keysDown && hero.x > 16) { // holding LEFT key
        hero.x -= hero.speed * modifier;
        left = true;   // for animation
        right = false; // for animation
        up = false;
        down = false;
    }
    if (39 in keysDown && hero.x < canvas.width - 100) { // holding RIGHT key
        hero.x += hero.speed * modifier;
        left = false;   // for animation
        right = true; // for animation
        up = false;
        down = false;
    }


    bomb1.x = bomb1.x + (4 * bomb1.direction);
	if(bomb1.x > 1300){
		bomb1.direction = -1;
	}
	if(bomb1.x < 50){
		bomb1.direction = 1;
	}

    bomb2.x = bomb2.x + (4 * bomb2.direction);
	if(bomb2.x > 1400){
		bomb2.direction = -1;
	}
	if(bomb2.x < 50){
		bomb2.direction = 1;
	}

    bomb3.y = bomb3.y + (4 * bomb3.direction);
	if(bomb3.y > 500){
		bomb3.direction = -1;
	}
	if(bomb3.y < 50){
		bomb3.direction = 1;
	}

    bomb4.y = bomb4.y + (4 * bomb4.direction);
	if(bomb4.y > 500){
		bomb4.direction = -1;
	}
	if(bomb4.y < 50){
		bomb4.direction = 1;
	}


    //CHECKING IF HERO TOUCHS GEMS
    if (
        hero.x <= (gem1.x + 33)
        && gem1.x <= (hero.x + 50)
        && hero.y <= (gem1.y + 25)
        && gem1.y <= (hero.y + 80)
    ) {
        gemCost = gemCost - 1;       // keep track of our “score”
        soundEfx.src = gemAudio;
        soundEfx.play();

        gem1.x = 3000;
        //reset();       // start a new cycle
    }
    if (
        hero.x <= (gem2.x + 20)
        && gem2.x <= (hero.x + 50)
        && hero.y <= (gem2.y + 30)
        && gem2.y <= (hero.y + 80)
    ) {
        gemCost = gemCost - 2;       // keep track of our “score”
        soundEfx.src = gemAudio;
        soundEfx.play();

        gem2.x = 3000;
        //reset();       // start a new cycle
    }
    if (
        hero.x <= (gem3.x + 20)
        && gem3.x <= (hero.x + 50)
        && hero.y <= (gem3.y + 30)
        && gem3.y <= (hero.y + 80)
    ) {
        gemCost = gemCost - 3;       // keep track of our “score”
        soundEfx.src = gemAudio;
        soundEfx.play();

        gem3.x = 3000;
        //reset();       // start a new cycle
    }
    if (
        hero.x <= (gem4.x + 20)
        && gem4.x <= (hero.x + 50)
        && hero.y <= (gem4.y + 30)
        && gem4.y <= (hero.y + 80)
    ) {
        gemCost = gemCost - 4;       // keep track of our “score”
        soundEfx.src = gemAudio;
        soundEfx.play();

        gem4.x = 3000;
        //reset();       // start a new cycle
    }
    if (
        hero.x <= (gem5.x + 22)
        && gem5.x <= (hero.x + 50)
        && hero.y <= (gem5.y + 30)
        && gem5.y <= (hero.y + 80)
    ) {
        gemCost = gemCost - 5;       // keep track of our “score”
        soundEfx.src = gemAudio;
        soundEfx.play();

        gem5.x = 3000;
        //reset();                                   // start a new cycle
    }

        //CHECKING IF HERO TOUCHS BOMBS
    if (
        (hero.x <= (bomb1.x + 40)  // touching from RIGHT
            && bomb1.x <= (hero.x + 45)  //touching from LEFT
            && hero.y <= (bomb1.y + 50)
            && bomb1.y <= (hero.y + 70)))
            {
                gemCost = gemCost - 1;       // keep track of our “score”
                GameOver();
            }
       if(
        (hero.x <= (bomb2.x + 40)  // touching from RIGHT
            && bomb2.x <= (hero.x + 45)  //touching from LEFT
            && hero.y <= (bomb2.y + 50)
            && bomb2.y <= (hero.y + 70)))
            {
                GameOver();   
            }

        if (
            (hero.x <= (bomb3.x + 40)  // touching from RIGHT
            && bomb3.x <= (hero.x + 45)  //touching from LEFT
            && hero.y <= (bomb3.y + 50)
            && bomb3.y <= (hero.y + 70)))
            {
                GameOver();
            }
       if (
        (hero.x <= (bomb4.x + 40)  // touching from RIGHT
            && bomb4.x <= (hero.x + 45)  //touching from LEFT
            && hero.y <= (bomb4.y + 50)
            && bomb4.y <= (hero.y + 70)))
            {
                GameOver();    
            }

        //      CHECKING IF HERO TOUCHS NEXT-LEVEL SIGN
         if (
        (hero.x <= (nextL.x + 46)  // touching from RIGHT
            && nextL.x <= (hero.x + 45)  //touching from LEFT
            && hero.y <= (nextL.y + 50)    //touching from DOWN
            && nextL.y <= (hero.y + 70)))  //touching from UP
            {
                soundEfx.src = walking;
                soundEfx.play();
                reset();
            }

        //      WIN CONDITION
        if (gemCost <= 0) {
            keysDown = {};
            soundEfx.src = gameWin;
            soundEfx.play();
            alert("You WON!!!!");
            gemCost = 50;
            reset();
        }


 

    if (counter == 5) {  // adjust this to change "walking speed" of animation
        curXFrame = ++curXFrame % framesPerRowCount; 	//Updating the sprite frame index 

        counter = 0;
    } else {
        counter++;
    }


    srcX = curXFrame * oneSpriteWidth;   	//Calculating the x coordinate for spritesheet 
    //if left is true,  pick Y dim of the correct row
    if (left) {
        //calculate srcY 
        srcY = trackLeft * oneSpriteHeight;
    }

    //if the right is true,   pick Y dim of the correct row
    if (right) {
        //calculating y coordinate for spritesheet
        srcY = trackRight * oneSpriteHeight;
    }

    if (up) {
        //calculating y coordinate for spritesheet
        srcY = trackUp * oneSpriteHeight;
    }

    if (down) {
        //calculating y coordinate for spritesheet
        srcY = trackDown * oneSpriteHeight;
    }

    if (left == false && right == false && up == false & down == false) {
        srcX = 1 * oneSpriteWidth;
        srcY = 2 * oneSpriteHeight;
    }

};



// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (gemsReady) {
        ctx.drawImage(gemsImage, 1200, 5);
    }

    // if (heroReady) {
    //     ctx.drawImage(heroImage, hero.x, hero.y);
    // }

    if (heroReady) {
        //ctx.drawImage(heroImage, hero.x, hero.y);
         ctx.drawImage(heroImage, srcX, srcY, oneSpriteWidth, oneSpriteHeight, hero.x, hero.y, oneSpriteWidth, oneSpriteHeight);
    }


    if (gem1Ready) {
        ctx.drawImage(gem1Image, gem1.x, gem1.y);
    }
    if (gem2Ready) {
        ctx.drawImage(gem2Image, gem2.x, gem2.y);
    }
    if (gem3Ready) {
        ctx.drawImage(gem3Image, gem3.x, gem3.y);
    }
    if (gem4Ready) {
        ctx.drawImage(gem4Image, gem4.x, gem4.y);
    }
    if (gem5Ready) {
        ctx.drawImage(gem5Image, gem5.x, gem5.y);
    }
    if (bombReady) {
        ctx.drawImage(bombImage, bomb1.x, bomb1.y);
        ctx.drawImage(bombImage, bomb2.x, bomb2.y);
        ctx.drawImage(bombImage, bomb3.x, bomb3.y);
        ctx.drawImage(bombImage, bomb4.x, bomb4.y);
    }
    if (nextLReady) {
        ctx.drawImage(nextLImage, nextL.x, nextL.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Collected gems cost:  $" + gemCost, 8, 8);
};




////////  The MAIN GAME LOOP  ///////////

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
    // hedge 32 + hedge 32 + char 32 = 96

    gem1.x = 32 + (Math.random() * (canvas.width - 96));
    gem1.y = 32 + (Math.random() * (canvas.height - 96));

    gem2.x = 32 + (Math.random() * (canvas.width - 96));
    gem2.y = 32 + (Math.random() * (canvas.height - 96));

    gem3.x = 32 + (Math.random() * (canvas.width - 96));
    gem3.y = 32 + (Math.random() * (canvas.height - 96));

    gem4.x = 32 + (Math.random() * (canvas.width - 96));
    gem4.y = 32 + (Math.random() * (canvas.height - 96));

    gem5.x = 32 + (Math.random() * (canvas.width - 96));
    gem5.y = 32 + (Math.random() * (canvas.height - 96));

    bomb1.x = canvas.width - 120;
    bomb1.y = 32 + (Math.random() * (canvas.height - 120));

    bomb2.x = 50;
    bomb2.y = 32 + (Math.random() * (canvas.height - 120));

    bomb3.x = 32 + (Math.random() * (canvas.width - 120));
    bomb3.y = canvas.height - 120;

    bomb4.x = canvas.width - 120;
    bomb4.y = canvas.height - 120;

    nextL.x = canvas.width - 90;
    nextL.y = canvas.height - 400;

};

function GameOver(){

    keysDown = {};                      // Release the pushed key
    soundEfx.src = gameOver;
    soundEfx.play();                    // Play GameOver Sound

    gemCost = 50;                       // Reset the “Score”
    alert("YOU LOST! TRY AGAIN.");
    reset();                            // Starts a new game
}

// Let's play this game!
var then = Date.now();
reset();
main();  // call the main game loop.
