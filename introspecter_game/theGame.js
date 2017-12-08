var theGame = function(game){};


// Variables for letter by letter text.

var intro_pt1_speeches = [
    "Oh boy!",
    "Today's a\ngreat day!",
    "I'm gonna have\nso much fun with\nmy best friend!",
    
    "You and Shiloh\nbe careful\nplaying!",
    "Look both ways\nbefore crossing\nthe street!",
    
    "Yeah mom!",
    "I know!\nWe'll be\ncareful!",
    
    "Hey Milo! <3",
    "What'll we\ndo today? :3",
    
    "I dunno\nactually...",
    "ANYTHING!",
    ".  .  .",
    "RACE YOU TO\nTHE OTHER\nSIDE!",
    "Loser buys\nour snacks!"
];

var milo_speech_clr = '#59a9f8';
var friend_speech_clr = '#f5a0a0';

var letter = [];
var wordIndex = 0;
var letterIndex = 0;
var letterDelay = 20;

var dialogue_Num = 0;

var firstStop = false;
var secondStop = false;
var thirdStop = false;

var leftRight_velo = 100;
var sfx;
var theGameFlag = true;
var instructions;
var press_x;
var grow_press = 1;
var grow_press_Right = true;

var arrow_dir;
var arrow_dir_show = true;
var car;
var carCheck = false;
var x_continue;
var slowItDown_2 = 0;

var textBox_tween1, textBox_tween2, textBox_tween3, textBox_tween4;
var intro_pt1_bg;


theGame.prototype = {
    preload: function(){

    },
    
    create: function(){
        console.log('youre in the main game state');
        // Create the beginning sequence of the game
        game.add.tween(game.world).to({ alpha: 1 }, 2000, Phaser.Easing.Default, true, 0, 0, false);
        
        // Setup world, which will setup the camera.
        game.world.setBounds(0, 0, 2400, 600);
        
        // Enable physics.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Create ground and make it collideable.
        theGround = game.add.group();
        theGround.enableBody = true;
        ground = theGround.create(0, 485, 'ground');
        ground.body.immovable = true;
        
        // Setup controls.
        cursors = game.input.keyboard.createCursorKeys();
        
        // Create background & setup filter for it.
        intro_pt1_bg = game.add.sprite(0, 0, 'intro_bg');
        // intro_pt1_bg.filters = [filter];

        // create the car
        car = game.add.sprite(2400, 240, 'car');
        game.physics.arcade.enable(car);
        
        // Create border.
        border = game.add.sprite(200, 200, null);
        border.created = false;

        // reset dialogue_Num
        dialogue_Num = 0;

        // ADD INSTRUCTIONS
        instructions = game.add.sprite(150, 100, 'instructions');
        press_x = game.add.sprite(425, 360, 'continue_x');
        
        game.input.keyboard.addCallbacks(this, null, null, introKeyPress);
        
        function introKeyPress(char){
            if (char == 'x'){
                game.input.keyboard.onPressCallback = null;
                
                // tween to alpha 0 intrusctions
                game.add.tween(instructions).to({alpha:0}, 1000, Phaser.Easing.Default, true, 0, 0, false);
                game.add.tween(press_x).to({alpha:0}, 1000, Phaser.Easing.Default, true, 0, 0, false);
                
                game.time.events.add(Phaser.Timer.SECOND*2, function(){
                    nextLine(intro_pt1_speeches[0], 200, 200, 'milo');
                    game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
                });
            }
        }

        
        // functions get hoisted!!!
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
//                border = game.add.sprite(200, 200, 'border2');
                border.loadTexture('border');
                border.x = xpos;
                border.y = ypos;
                text = game.add.text(border.x+15, border.y+15, '', { font: "22px dpcomic", fill: "#000000" });
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
                // **** experimental code *****
                x_continue = game.add.text(border.x+border.width-30, border.y+border.height-35, 'x', { font: "20px dpcomic", fill: "#000000" });
                
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
        

        
        // Key press function for continuing dialogue
        function dialogueKeyPress(char){
            if (char == 'x' && text.endOfDial1){
                // refresh dialogue or clear text box.
                text.endOfDial1 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[1]);
            }
            if (char == 'x' && text.endOfDial2){
                text.endOfDial2 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[2]);
            }
            
            
            if (char == 'x' && text.endOfDial3){
                text.endOfDial3 = false;
                
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                firstStop = true;
                
                // display ARROW TUTORIAL
                arrow_dir = game.add.sprite(650, 355, 'this_way');
                arrow_dir.alpha = 0.6;
            }
            
            
            // ********** segment
            
            
            if (char == 'x' && text.endOfDial4){
                text.endOfDial4 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[4]);
            }
            if (char == 'x' && text.endOfDial5){
                // milos turn
                text.endOfDial5 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                nextLine(intro_pt1_speeches[5], 750, 230, 'milo');
            }
            if (char == 'x' && text.endOfDial6){
                text.endOfDial6 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[6]);
            }
            if (char == 'x' && text.endOfDial7){
                text.endOfDial7 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                secondStop = true;
            }
            
            
            // ********** second segment
            
            if (char == 'x' && text.endOfDial8){
                text.endOfDial8 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[8]);
            }
            if (char == 'x' && text.endOfDial9){
                text.endOfDial9 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                nextLine(intro_pt1_speeches[9], 1050, 230, 'milo');
            }
            if (char == 'x' && text.endOfDial10){
                text.endOfDial10 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[10]);
            }
            if (char == 'x' && text.endOfDial11){
                text.endOfDial11 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[11]);
            }
            if (char == 'x' && text.endOfDial12){
                text.endOfDial12 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[12]);
            }
            if (char == 'x' && text.endOfDial13){
                text.endOfDial13 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(intro_pt1_speeches[13]);
            }
            if (char == 'x' && text.endOfDial14){
                text.endOfDial14 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                player.animations._anims.right.speed = 15;
                player.animations._anims.left.speed = 15;
                
                thirdStop = true;
            }
        }
        
        // Create player and its attributes.
        player = game.add.sprite(300, 370, 'char_kid');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        // Add player animations
        player.animations.add('left', [3, 2, 1, 0], 5, true);
        player.animations.add('right', [5, 6, 7, 8], 5, true);
        player.scale.setTo(2, 2);
        player.movable = false;
        
        // Create buddy.
        buddy = game.add.sprite(1200, 300, 'buddy_kid');
        game.physics.arcade.enable(buddy);
        buddy.body.gravity.y = 400;
        buddy.body.collideWorldBounds = true;
        buddy.followed = false;
        // add buddy animations
        buddy.animations.add('left', [3, 2, 1, 0], 15, true);
        buddy.animations.add('right', [5, 6, 7, 8], 15, true);
        buddy.scale.setTo(2, 2);
        
        // Setup camera movement.
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        // Add music and sound.
        music = game.add.audio('intro1');
        music.loop = true;
        music.play();
        text1sound = game.add.audio('text1sound');
    },
    
    update: function(){
        // Collide player and buddy with ground.
        game.physics.arcade.collide(player, theGround);
        game.physics.arcade.collide(buddy, theGround);
        
        // Reset player velocity.
        player.body.velocity.x = 0;
        buddy.body.velocity.x = 0;
        
        // instructions!!!!!
        if (press_x.alive){
            if (grow_press < 1.15 && grow_press_Right){
                grow_press += 0.005;
                press_x.scale.setTo(grow_press, grow_press);
            } else if(grow_press >= 1.15 && grow_press_Right){
                grow_press_Right = false;
            }
            
            if(grow_press > 0.85 && !grow_press_Right){
                grow_press -= 0.005;
                press_x.scale.setTo(grow_press, grow_press);
            } else if(grow_press <= 0.85 && !grow_press_Right){
                grow_press_Right = true;
            }
        }
        if (arrow_dir != undefined){
            if (grow_press < 1.10 && grow_press_Right){
                grow_press += 0.005;
                arrow_dir.scale.setTo(grow_press, grow_press);
            } else if(grow_press >= 1.10 && grow_press_Right){
                grow_press_Right = false;
            }
            
            if(grow_press > 0.90 && !grow_press_Right){
                grow_press -= 0.005;
                arrow_dir.scale.setTo(grow_press, grow_press);
            } else if(grow_press <= 0.90 && !grow_press_Right){
                grow_press_Right = true;
            }
        }
        
        // DESTROY ARROW TUTORIAL
        if (player.x > 480 && arrow_dir_show){
            arrow_dir_show = false;
            game.add.tween(arrow_dir).to({alpha:0}, 750, Phaser.Easing.Default, true, 0, 0, false);
        }

        // Size adjustment for x-continue.
        // test code ******
        slowItDown_2++;
        if(x_continue != undefined && slowItDown_2%5 == 0) {
            if(x_continue.fontSize <= 21 && textGrow) {
                x_continue.fontSize++;
            } else if(x_continue.fontSize > 21) {
                textGrow = false;
            }
            if(x_continue.fontSize >= 15 && !textGrow) {
                x_continue.fontSize--;
            } else if (x_continue.fontSize < 15) {
                textGrow = true;
            }
        }
        
        
        // Player controls (L, R, D, U)
        if (cursors.left.isDown && player.movable){
            player.body.velocity.x = -leftRight_velo;
            player.animations.play('left');
            if (buddy.followed && ((buddy.x - player.x) > 100)){
                buddy.body.velocity.x = -leftRight_velo;
                buddy.animations.play('left');
            } else{
                buddy.body.velocity.x = 0;
            }
        } else if (cursors.right.isDown && player.movable){
            player.body.velocity.x = leftRight_velo;
            player.animations.play('right');
            if (buddy.followed && ((player.x - buddy.x) > 100)){
                buddy.body.velocity.x = leftRight_velo;
                buddy.animations.play('right');
            } else{
                buddy.body.velocity.x = 0;
            }
        } else {
            // Stop and stand still
            player.animations.stop();
            player.frame = 4;
            buddy.animations.stop();
            buddy.frame = 4;
        }
        
        
        // SEGEMNETING THE PARTS !!!!!!!!!!!!!!!!
        if (player.x > 875 && firstStop){
            firstStop = false;
            
            player.movable = false;
            nextLine(intro_pt1_speeches[3], 460, 230);

            // function wiggle(aProgress, aPeriod1, aPeriod2) {
            //     var current1 = aProgress * Math.PI * 2 * aPeriod1;
            //     var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);
            //
            //     return Math.sin(current1) * Math.cos(current2);
            // }
            game.add.tween(border).to({ x:border.x+6 }, 100, function (k) {
                return wiggle(k, 0.5, 0.2);
            }, true, 0, 5, false);
            game.add.tween(border).to({  y:border.y+6 }, 100, function (k) {
                return wiggle(k, 0.2, 0.5);
            }, true, 0, 5, false);
            game.add.tween(text).to({ x:text.x+6 }, 100, function (k) {
                return wiggle(k, 0.5, 0.2);
            }, true, 0, 5, false);
            game.add.tween(text).to({  y:text.y+6 }, 100, function (k) {
                return wiggle(k, 0.2, 0.5);
            }, true, 0, 5, false);
        }
        
        
        if (player.x > 1150 && secondStop){
            secondStop = false;
            
            player.movable = false;
            nextLine(intro_pt1_speeches[7], 1200, 230, 'friend');
        }
        
        
        if (thirdStop){
            thirdStop = false;
            leftRight_velo = 200;
        }

        
        // Once player reaches a point in the map, pass to the next game point.        
        if (player.x > 1880 && theGameFlag){
            theGameFlag = false;
            carCheck = true;

            car.body.gravity.x = -1000;
            // this.nextPart();
        }

        // Check CAR and BUDDY x position
        if(buddy.x > car.x && carCheck) {
            carCheck = false;

            this.nextPart();
        }
        
        // Once player passes buddy, buddy follows
        if (player.x > 1300){
            buddy.followed = true;
        }
        
        // dialogue functions
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
//                border = game.add.sprite(200, 200, 'border2');
                border.loadTexture('border');
                border.x = xpos;
                border.y = ypos;
                text = game.add.text(border.x+15, border.y+15, '', { font: "24px dpcomic", fill: "#000000" });
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
                
                console.log('lByl v2');
                // test code ***********
                x_continue = game.add.text(border.width-30, border.height-30, 'x', { font: "20px dpcomic", fill: "#000000" });
                
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

        // Function for wiggling text.
        function wiggle(aProgress, aPeriod1, aPeriod2) {
            var current1 = aProgress * Math.PI * 2 * aPeriod1;
            var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);

            return Math.sin(current1) * Math.cos(current2);
        }
    },
    
    render: function(){
//        game.debug.spriteInfo(player, 50, 50);
//        game.debug.pointer(game.input.activePointer);
    },
    
    nextPart: function(){
        // tween music to vol. 0
        // twwen world alpha to 0
        // play crash sfx
        // delay start
        
        // game.add.tween(music).to({ volume: 0 }, 500, Phaser.Easing.Default, true, 0, 0, false);

        music.stop();
        var tween = game.add.tween(game.world).to({ alpha: 0 }, 50, Phaser.Easing.Default, true, 0, 0, false);
        
        sfx = game.add.audio('crash_sfx');
        sfx.play();

        // Much cleaner way of tweening.
        tween.onComplete.add(function(){game.state.start('intro_pt2');}, this);
    }
}