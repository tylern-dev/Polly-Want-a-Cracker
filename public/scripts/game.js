var game = new Phaser.Game(1100, 750, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pirate_bay', 'assets/bg-full.gif');
    game.load.image('cracker', 'assets/cracker.png')

    game.load.spritesheet('parrot', 'assets/parrot.gif', 390, 525);
    game.load.spritesheet('gun_pirate', 'assets/spritesheets/pirate1_resized.png',355, 470);
    game.load.spritesheet('sky_pirate', 'assets/spritesheets/balloon2_sprite.png',260,440)

 


}

var platforms;
var cursors;
var player;
var crackers;
var groundPirate;
var skyPirates;
var background;


var score = 0;
var scoreText;

 var settings = {
     crackerTimer: 2000,
     crackersOnScreen: 100,
     skyPirateTimer: 3000,
     skyPiratesOnScreen: 100
 }

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    background = game.add.sprite(-200, 0, 'pirate_bay');
    // scales the background
    background.scale.setTo(1, 1)
    //  Here we add a new animation called 'run' for the background
    //  We haven't specified any frames because it's using every frame in the texture atlas
    background.animations.add('run');

    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
    background.animations.play('run', 0, true);

    //create parrot and set scaling (x,y, 'sprite name')
    player = game.add.sprite(0, 150, 'parrot');
    player.scale.setTo(0.25, 0.25);

    //parrot physics
    game.physics.arcade.enable(player);
    // player.body.gravity.y = 800;
    

    //parrot physics properties
    //can't go past borders
    player.body.collideWorldBounds = true;

    //animation
    player.animations.add('up',[0,1], 10, true);
    player.animations.add('down',[0,1], 10, true);
    player.animations.add('right',[0,1], 10, true);
    player.animations.add('left',[0,1], 10, true);

    //crackers and pirate group & enableBody for collision
    crackers = game.add.group();
    skyPirates = game.add.group();
    crackers.enableBody = true;
    skyPirates.enableBody = true;


    // for(var i = 0; i < 9; i++){
    //     var cracker = crackers.create(game.world.randomX, game.world.randomY, 'cracker');
    //     cracker.body.velocity.x = game.rnd.between(100,300);
        

    // }

    
    //random crackers on screen
    game.time.events.repeat(settings.crackerTimer, settings.crackersOnScreen, createCracker, this);

    //random sky pirates on screen
    game.time.events.repeat(settings.skyPirateTimer, settings.skyPiratesOnScreen, createSkyPirate, this);
   


    
    //create n amount of crackers at random
    // for(var i =0; i<15; i++){
    //     //create a cracker in the cracker group
    //     var cracker = crackers.create(500+game.world.randomX,game.world.randomY, 'cracker');
    //     // var netPirate = skyPirates.create(game.world.randomX, game.world.randomY,)
    //     cracker.scale.setTo(0.08,0.08);;
    //     cracker.body.gravity.x=-20;
    // }


    //GROUND PIRATE
    groundPirate = game.add.sprite(300,300,'gun_pirate');
    groundPirate.animations.add('run');
    groundPirate.animations.play('run')

    //score text
    scoreText = game.add.text(16,16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    //parrot controls
    cursors = game.input.keyboard.createCursorKeys();
    
}



function update() {
    //handles what happens when cracker touches parrot
    game.physics.arcade.collide(crackers);
    game.physics.arcade.overlap(player, crackers, collectCracker, null, this);

    //handles what happens when pirate touches parrot
    game.physics.arcade.collide(skyPirates);
    game.physics.arcade.overlap(player, skyPirates, parrotCaught, null, this);

    player.body.velocity.y = 0;
    player.body.velocity.x = 0;

    //keypresses for controllling parrot
    if(cursors.up.isDown){
        player.body.velocity.y = -300;
        player.animations.play('up')
    } else if(cursors.down.isDown){
        player.body.velocity.y = 300;
        player.animations.play('down')
    } else if(cursors.right.isDown){
        player.body.velocity.x = 300;
        player.animations.play('right')
        } else if(cursors.left.isDown){
        player.body.velocity.x = -300;
        player.animations.play('left')
    } else {
        player.animations.stop();
        player.frame = 4;
    }


    groundPirate.x-=2;
    if(groundPirate.x < -groundPirate.width){
        groundPirate.x = game.world.width;
    }

    //animate forward scrolling of background
    background.x -= 2;
    
    if (background.x < -background.width)
    {
        background.x = game.world.width;

    }
}

//creates cracker on screen
function createCracker(){
    var cracker = crackers.create(700+game.world.randomX,30+game.world.randomY, 'cracker');
    cracker.scale.setTo(0.1,0.1);
    // game.add.tween(cracker).to( {x: 0}, 3000, Phaser.Easing.Linear.None, true);
    cracker.body.gravity.x=game.rnd.integerInRange(-35, -10);
    
}

//creates skyPirate on screen
function createSkyPirate(){
    var skyPirate = skyPirates.create(800+game.world.randomX, game.world.randomY, 'sky_pirate');
    skyPirate.scale.setTo(0.4, 0.4);
    skyPirate.body.gravity.x= game.rnd.integerInRange(-35, -10)
}


//cracker disapears when player hits it
function collectCracker(player, cracker){
    cracker.kill();

    //update score when cracker is touched
    score++
    scoreText.text = `Score: ${score}`
}

//game ends when player get caught by pirate
function parrotCaught(player, skyPirate){
    player.kill();
    game.destroy();
    //display modal with player score
    console.log(score)

}


