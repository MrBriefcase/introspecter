var intro_pt2 = function(game){};
var intro_pt2_speech = [
    "Oh boy...",
    "Another\nday...",
    "Man, what am\nI doing with\nmy life...",
    
    "Why did she\nhave to go?",
    "Why...",
    
    "She was\nimportant\nto me...",
    "A best friend...",
    
    "River..."
];

intro_pt2.prototype = {
    create: function(){
        console.log('youre in intro_pt2');
        
        game.world.setBounds(0, 0, 2400, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        theGround = game.add.group();
        theGround.enableBody = true;
        ground = theGround.create(0, 485, 'ground');
        ground.body.immovable = true;
        cursors = game.input.keyboard.createCursorKeys();
        var bg = game.add.sprite(0, 0, 'intro_bg');
        bg.tint = 0x651a1a;
        
        border = game.add.sprite(200, 200, null);
        border.created = false;
        
        dialogue_Num = 0;
        
        game.time.events.add(Phaser.Timer.SECOND*2, function(){
            nextLine(intro_pt2_speech[0], 200, 200, 'milo');
            game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
        });
        
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
//                border = game.add.sprite(200, 200, 'border2');
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
        
        function dialogueKeyPress(char){
            if (char == 'x' && text.endOfDial1){
                text.endOfDial1 = false;
                text.text = '';
                nextLine(intro_pt2_speech[1]);
            }
            if (char == 'x' && text.endOfDial2){
                text.endOfDial2 = false;
                text.text = '';
                nextLine(intro_pt2_speech[2]);
            }
            if (char == 'x' && text.endOfDial3){
                text.endOfDial3 = false;
                
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                firstStop = true;
            }
            
            
            // **** first segment
            

            if (char == 'x' && text.endOfDial4){
                text.endOfDial4 = false;
                text.text = '';
                nextLine(intro_pt2_speech[4]);
            }
            if (char == 'x' && text.endOfDial5){
                text.endOfDial5 = false;
                
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                secondStop = true;
            }
            
            
            // ******* second segment
            
            if (char == 'x' && text.endOfDial6){
                text.endOfDial6 = false;
                text.text = '';
                nextLine(intro_pt2_speech[6]);
            }
            if (char == 'x' && text.endOfDial7){
                text.endOfDial7 = false;
                
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                thirdStop = true;
            }
            if (char == 'x' && text.endOfDial8){
                text.endOfDial8 = false;
                music.stop();
                game.time.events.add(Phaser.Timer.SECOND*3, function(){game.state.start('intro_pt3');});
            }
            
        }
        
        // Create player and its attributes.
        player = game.add.sprite(300, 270, 'char');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        // Add player animations
        player.animations.add('left', [0, 1, 2], 5, true);
        player.animations.add('right', [4, 5, 6], 5, true);
        player.movable = false;
        
        // Create buddy.
        buddy = game.add.sprite(1850, 300, 'buddy');
        game.physics.arcade.enable(buddy);
        buddy.body.gravity.y = 400;
        buddy.body.collideWorldBounds = true;
        
        // Setup camera movement.
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        // Setup music
        music = game.add.audio('intro2');
        music.loop = true;
        music.play();
    },
    
    update: function(){
        // Collide player and buddy with ground.
        game.physics.arcade.collide(player, theGround);
        game.physics.arcade.collide(buddy, theGround);
        
        // Reset player velocity.
        player.body.velocity.x = 0;
        
        // Player controls (L, R, D, U)
        if (cursors.left.isDown && player.movable){
            player.body.velocity.x = -100;
            player.animations.play('left');
        } else if (cursors.right.isDown && player.movable){
            player.body.velocity.x = 100;
            player.animations.play('right');
        } else {
            // Stop and stand still
            player.animations.stop();
            player.frame = 3;
        }
        
        
        if (player.x > 875 && firstStop){
            firstStop = false;
            player.movable = false;
            nextLine(intro_pt2_speech[3], 825, 175, 'milo');
        }
        
        if (player.x > 1150 && secondStop){
            secondStop = false;
            player.movable = false;
            nextLine(intro_pt2_speech[5], 1100, 175, 'milo');
        }
        
        if (player.x > 1750 && thirdStop){
            thirdStop = false;
            player.movable = false;
            nextLine(intro_pt2_speech[7], 1650, 175, 'milo');
        }
        
        
        
        // **** letter by letter functions
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
//                border = game.add.sprite(200, 200, 'border2');
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
        game.debug.pointer(game.input.activePointer);
    }
}