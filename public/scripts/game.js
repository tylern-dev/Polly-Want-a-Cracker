var game = new Phaser.Game(1100, 750, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pirate_bay', 'assets/bg-full.gif');
    game.load.image('cracker', 'assets/cracker.png')
    game.load.spritesheet('parrot', 'assets/parrot.gif', 390, 530);
    game.load.spritesheet('gun_pirate', 'assets/spritesheets/pirate1_resized.png', 390,390);


}

var platforms;
var cursors;
var player;
var crackers;
var groundPirate;
var background;

var score = 0;
var scoreText;

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
    background.animations.play('run', 15, true);

    //create parrot and set scaling (x,y, 'sprite name')
    player = game.add.sprite(0, 150, 'parrot');
    player.scale.setTo(0.3, 0.3);

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

    //crackers group
    crackers = game.add.group();
    crackers.enableBody = true;


    // //create n amount of crackers
    // for(var i = 0; i<1; i++){
    //     //create a cracker in the cracker group
    //     var cracker = crackers.create(1200, i*70, 'cracker');
    //     cracker.scale.setTo(0.08,0.08);

    //     cracker.body.gravity.x=-20;
    // }

    //GROUND PIRATE
    groundPirates=game.add.group();
    groundPirates.enableBody=true;

    var groundPirate = groundPirates.create(1000, 300, 'gun_pirate')
    groundPirate.scale.setTo(0.5,0.5);
    groundPirate.animations.add('',[0,1,2,3], 10, true)
    groundPirate.body.gravity.x = -30;


    //score text
    scoreText = game.add.text(16,16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    //parrot controls
    cursors = game.input.keyboard.createCursorKeys();
    
}





function update() {
    //handles what happens when cracker touches parrot
    game.physics.arcade.collide(crackers);
    game.physics.arcade.overlap(player, crackers, collectCracker, null, this);

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
    background.x -= 2;

    if (background.x < -background.width)
    {
        background.x = game.world.width;
    }
}

//cracker disapears
function collectCracker(player, cracker){
    cracker.kill();

    //update score when cracker is touched
    score++
    scoreText.text = `Score: ${score}`
}

