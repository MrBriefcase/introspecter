var theGame = function(game){};


// Variables for letter by letter text.
var content = "Hello, my name is Daren\nAnd I like turtles.\nAnd also sleeping!";

var letter = [];
var wordIndex = 0;
var letterIndex = 0;
var wordDelay = 120;
var letterDelay = 20;

var theGround, ground;

theGame.prototype = {
    create: function(){
        console.log('youre in the main game state');
        // Create the beginning sequence of the game.
        
        // Setup world, which will setup the camera.
        game.world.setBounds(0, 0, 2400, 600);
        
        // Enable physics.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Create ground and make it collideable.
        theGround = game.add.group();
        theGround.enableBody = true;
        ground = theGround.create(0, 485, 'ground');
        ground.body.immovable = true;
        
        // Create background
        game.add.sprite(0, 0, 'intro_bg');
        
        // Create border.
        border = game.add.sprite(200, 200, 'border');
        
        // Create text, letter by letter.
        text = game.add.text(border.x+50, border.y+50, '', { font: "15px Old School Adventures", fill: "#000000" });

        nextLine();
        
        // functions get hoisted!!!
        function nextLine(){
            if (letterIndex === content.length){
                //  We're finished
                return;
            }
            //  get the letter in the message
            letter = content[letterIndex];
            //  flag variable
            wordIndex = 0;
            //  Call the 'nextWord' function to concat the message into the game.
            game.time.events.repeat(letterDelay, letter.length, nextWord, this);
            //  Advance to the next letter
            letterIndex++;
        }

        function nextWord(){
            //  Add the next letter onto the text string
            text.text = text.text.concat(letter[wordIndex]);
            //  Advance the word index to the next word in the line
            wordIndex++;
            //  Last word?
            if (wordIndex === letter.length){
                //  Get the next line after the lineDelay amount of ms has elapsed
                game.time.events.add(letterDelay, nextLine, this);
            }
        }
        
        
        
        // Create player and its attributes.
        player = game.add.sprite(32, 300, 'char');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        // Add player animations
        player.animations.add('left', [0, 1, 2], 10, true);
        player.animations.add('right', [4, 5, 6], 10, true);
        
        
        // Create buddy.
        buddy = game.add.sprite(1200, 300, 'buddy');
        game.physics.arcade.enable(buddy);
        buddy.body.gravity.y = 400;
        buddy.body.collideWorldBounds = true;
        buddy.followed = false;
        
        // Setup controls.
        cursors = game.input.keyboard.createCursorKeys();
        
        // Setup camera movement.
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        // Add music.
//        music = game.add.audio('introTest');
//        music.play();
    },
    
    update: function(){
        // Collide player and buddy with ground.
        game.physics.arcade.collide(player, theGround);
        game.physics.arcade.collide(buddy, theGround);
        
        // Reset player velocity.
        player.body.velocity.x = 0;
        buddy.body.velocity.x = 0;
        
        // Player controls (L, R, D, U)
        if (cursors.left.isDown){
            player.body.velocity.x = -200;
            player.animations.play('left');
            if (buddy.followed && ((buddy.x - player.x) > 100)){
                buddy.body.velocity.x = -200;
            } else{
                buddy.body.velocity.x = 0;
            }
        } else if (cursors.right.isDown){
            player.body.velocity.x = 200;
            player.animations.play('right');
            if (buddy.followed && ((player.x - buddy.x) > 100)){
                buddy.body.velocity.x = 200;
            } else{
                buddy.body.velocity.x = 0;
            }
        } else {
            // Stop and stand still
            player.animations.stop();
            player.frame = 3;
        }
        
        // Once player reaches a point in the map, pass to the next game point.        
        if (player.x > 1600){
            this.nextPart();
        }
        
        // Once player passes buddy, buddy follows
        if (player.x > 1300){
            buddy.followed = true;
        }
    },
    
    render: function(){
        game.debug.spriteInfo(player, 50, 50);
    },
    
    nextPart: function(){
        game.state.start('Part2');
    }
}