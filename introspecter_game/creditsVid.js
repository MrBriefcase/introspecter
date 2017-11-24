var creditsVid = function(game){};
// NEW ENDING SCENE
var ending_intro_speech = [
    "Well?",
    "Did you find\nsomething in\nyourself?"
];

var ending_speech = [
    "I miss you,\nyou know?",
    ". . .",
    
    "move forward,\nokay?",
    "you're not\nstronger\nthan fate."
];

var ending_ending_speech = "I CAN BE";


creditsVid.prototype = {
    create: function(){
        console.log("You've reached the end.");

        // tween the world to full visibility.
        game.add.tween(game.world).to({alpha:1}, 2000, Phaser.Easing.Default, true, 0, 0, false);

        // Create ground and make it collideable.
        theGround = game.add.group();
        theGround.enableBody = true;
        ground = theGround.create(0, 485, 'ground');
        ground.body.immovable = true;

        // Setup controls. and pre dialogue setup.
        cursors = game.input.keyboard.createCursorKeys();
        dialogue_Num = 0;

        // Create background
        bg = game.add.sprite(0, 0, 'intro_bg');

        // Create player and its attributes.
        player = game.add.sprite(450, 270, 'char');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        // Add player animations
        player.animations.add('left', [0, 1, 2], 5, true);
        player.animations.add('right', [4, 5, 6], 5, true);
        player.movable = false;

        // Create buddy.
        buddy = game.add.sprite(1850, 300, 'buddy_adult');
        game.physics.arcade.enable(buddy);
        buddy.body.gravity.y = 400;
        buddy.body.collideWorldBounds = true;
        buddy.alpha = 0.20;

        // Setup camera movement.
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // Setup music
        music = game.add.audio('audio_ending');
        music.loop = true;
        music.play();

        // **** letter by letter functions
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
                border = game.add.sprite(200, 200, 'border');
                border.loadTexture('border');
                border.x = xpos;
                border.y = ypos;
                text = game.add.text(border.x+20, border.y+15, '', { font: "24px Questrial", fill: "#000000" });
                border.created = true;
            }
            if (clr == 'milo'){
                text.fill = milo_speech_clr;
            }
            if (clr == 'friend'){
                text.fill = friend_speech_clr;
            }
            if (clr == 'neutral'){
                text.fill = '#000000';
            }
            if (clr == 'ending'){
                text.fill = '#ffffff';
                text.fontSize = 48;
            }

            if (letterIndex === speech.length){
                //  We're finished
                letterIndex = 0;
                dialogue_Num++;

                console.log('lByl v1');

                switch(dialogue_Num){
                    case 1:
                        text.endOfDial1 = true;
                        break;
                    case 2:
                        text.endOfDial2 = true;
                        break;
                    case 3:
                        text.endOfDial3 = true;
                        break;
                    case 4:
                        text.endOfDial4 = true;
                        break;
                    case 5:
                        text.endOfDial5 = true;
                        break;
                    case 6:
                        text.endOfDial6 = true;
                        break;
                    case 7:
                        text.endOfDial7 = true;
                        break;
                    case 8:
                        text.endOfDial8 = true;
                        break;
                    case 9:
                        text.endOfDial9 = true;
                        break;
                    case 10:
                        text.endOfDial10 = true;
                        break;
                    case 11:
                        text.endOfDial11 = true;
                        break;
                    case 12:
                        text.endOfDial12 = true;
                        break;
                    case 13:
                        text.endOfDial13 = true;
                        break;
                    case 14:
                        text.endOfDial14 = true;
                        break;
                    case 15:
                        text.endOfDial15 = true;
                        break;
                    case 16:
                        text.endOfDial16 = true;
                        break;
                    case 17:
                        text.endOfDial17 = true;
                        break;
                    case 18:
                        text.endOfDial18 = true;
                        break;
                    case 19:
                        text.endOfDial19 = true;
                        break;
                }

                return;
            }
            //  get the letter in the message
            letter = speech[letterIndex];
            //  flag variable
            wordIndex = 0;
            //  Call the 'nextWord' function to concat the message into the game.
            game.time.events.repeat(letterDelay, letter.length, function(){nextWord(speech);}, this);
            //  Advance to the next letter
            letterIndex++;
        }

        function nextWord(speech2){
            //  Add the next letter onto the text string
            text.text = text.text.concat(letter[wordIndex]);
            if (text1sound.isPlaying){
                text1sound.restart();
            } else{
                text1sound.play();
            }
            //  Advance the word index to the next word in the line
            wordIndex++;
            //  Last word?
            if (wordIndex === letter.length){
                //  Get the next line after the lineDelay amount of ms has elapsed
                game.time.events.add(letterDelay, function(){nextLine(speech2);}, this);
            }
        }

        // dialogue handling
        function dialogueKeyPress(char) {
            if(char == 'x' && text.endOfDial1) {
                text.endOfDial1 = false;
                text.text = '';
                nextLine(ending_intro_speech[1]);
            }
            if(char == 'x' && text.endOfDial2) {
                text.endOfDial2 = false;
                text.text = '';
                black_bg.loadTexture(null);
                border.created = false;
                firstStop = true;

                game.time.events.add(Phaser.Timer.SECOND, function(){
                    player.movable = true;
                });
            }

            // *********** FIRST DIALOGUE SEGMENT

            if(char == 'x' && text.endOfDial3) {
                text.endOfDial3 = false;
                text.text = '';
                nextLine(ending_speech[1])
            }
            if(char == 'x' && text.endOfDial4) {
                text.endOfDial4 = false;
                text.text = '';
                border.destroy();
                border.created = false;

                player.movable = true;
                secondStop = true;
            }

            // ************ LAST DIALOGUE SEGMENT

            if(char == 'x' && text.endOfDial5) {
                text.endOfDial5 = false;
                text.text = '';
                nextLine(ending_speech[3]);
            }

            if(char == 'x' && text.endOfDial6) {
                text.endOfDial6 = false;
                text.text = '';

                black_bg.loadTexture('blk_bg');
                game.add.tween(player).to({alpha:0}, 3000, Phaser.Easing.Default, true, 0, 0, false);
                game.add.tween(bg).to({alpha:0}, 3000, Phaser.Easing.Default, true, 0, 0, false);
                game.add.tween(buddy).to({alpha:0}, 3000, Phaser.Easing.Default, true, 0, 0, false);
                game.add.tween(border).to({alpha:0}, 3000, Phaser.Easing.Default, true, 0, 0, false);
                border.created = true;

                game.time.events.add(Phaser.Timer.SECOND*5, function(){
                    nextLine(ending_ending_speech, 1700, 150, 'ending');
                });
                game.time.events.add(Phaser.Timer.SECOND*8, function(){
                    game.add.tween(game.world).to({alpha:0}, 300, Phaser.Easing.Default, true, 0, 0, false);
                    console.log('The game is complete.');
                });
            }
        }

        // intro setup.
        black_bg = game.add.sprite(0, 0, 'blk_bg');

        game.time.events.add(Phaser.Timer.SECOND*2, function(){
            text = game.add.text(border.x+20, border.y+15, '', { font: "62px Questrial", fill: "#ffffff" });
            nextLine(ending_intro_speech[0], 75, 300);
            game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
        });
    },

    update: function(){
        // Collide player and buddy with ground.
        game.physics.arcade.collide(player, theGround);
        game.physics.arcade.collide(buddy, theGround);

        // Reset player velocity.
        player.body.velocity.x = 0;

        // Player controls (L, R, D, U)
        if (cursors.left.isDown && player.movable){
            player.body.velocity.x = -60;
            player.animations.play('left');
        } else if (cursors.right.isDown && player.movable){
            player.body.velocity.x = 60;
            player.animations.play('right');
        } else {
            // Stop and stand still
            player.animations.stop();
            player.frame = 3;
        }

        // next dialogue at x=875
        if(player.x > 875 && firstStop) {
            firstStop = false;
            player.movable = false;
            nextLine(ending_speech[0], 750, 180, 'milo');
        }

        // FINAL dialogue at x=1750
        if(player.x > 1750 && secondStop) {
            secondStop = false;
            player.movable = false;
            nextLine(ending_speech[2], 1750, 175, 'friend');
        }


        // Relevant functions ********************
        // **** letter by letter functions
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
                border = game.add.sprite(200, 200, 'border');
                border.loadTexture('border');
                border.x = xpos;
                border.y = ypos;
                text = game.add.text(border.x+20, border.y+15, '', { font: "24px Questrial", fill: "#000000" });
                border.created = true;
            }
            if (clr == 'milo'){
                text.fill = milo_speech_clr;
            }
            if (clr == 'friend'){
                text.fill = friend_speech_clr;
            }
            if (clr == 'neutral'){
                text.fill = '#000000';
            }

            if (letterIndex === speech.length){
                //  We're finished
                letterIndex = 0;
                dialogue_Num++;

                console.log('lByl v1');

                switch(dialogue_Num){
                    case 1:
                        text.endOfDial1 = true;
                        break;
                    case 2:
                        text.endOfDial2 = true;
                        break;
                    case 3:
                        text.endOfDial3 = true;
                        break;
                    case 4:
                        text.endOfDial4 = true;
                        break;
                    case 5:
                        text.endOfDial5 = true;
                        break;
                    case 6:
                        text.endOfDial6 = true;
                        break;
                    case 7:
                        text.endOfDial7 = true;
                        break;
                    case 8:
                        text.endOfDial8 = true;
                        break;
                    case 9:
                        text.endOfDial9 = true;
                        break;
                    case 10:
                        text.endOfDial10 = true;
                        break;
                    case 11:
                        text.endOfDial11 = true;
                        break;
                    case 12:
                        text.endOfDial12 = true;
                        break;
                    case 13:
                        text.endOfDial13 = true;
                        break;
                    case 14:
                        text.endOfDial14 = true;
                        break;
                    case 15:
                        text.endOfDial15 = true;
                        break;
                    case 16:
                        text.endOfDial16 = true;
                        break;
                    case 17:
                        text.endOfDial17 = true;
                        break;
                    case 18:
                        text.endOfDial18 = true;
                        break;
                    case 19:
                        text.endOfDial19 = true;
                        break;
                }

                return;
            }
            //  get the letter in the message
            letter = speech[letterIndex];
            //  flag variable
            wordIndex = 0;
            //  Call the 'nextWord' function to concat the message into the game.
            game.time.events.repeat(letterDelay, letter.length, function(){nextWord(speech);}, this);
            //  Advance to the next letter
            letterIndex++;
        }

        function nextWord(speech2){
            //  Add the next letter onto the text string
            text.text = text.text.concat(letter[wordIndex]);
            if (text1sound.isPlaying){
                text1sound.restart();
            } else{
                text1sound.play();
            }
            //  Advance the word index to the next word in the line
            wordIndex++;
            //  Last word?
            if (wordIndex === letter.length){
                //  Get the next line after the lineDelay amount of ms has elapsed
                game.time.events.add(letterDelay, function(){nextLine(speech2);}, this);
            }
        }
    },

    render: function(){

    }
};