var part2 = function(game){};

var black_bg;
var black_bg2;
var fourthStop = false;

var fruit_y = 1000;
var fruit1, fruit2, fruit3, fruit4;
var fruits = [fruit1, fruit2, fruit3, fruit4];

//var part2_intro_speech = [
//    "You ", "were ", "never ", "a ", "good ", "person. "
//];
var part2_intro_speech = "You were never\na good person.";

//var part2_ending_speech = [
//    "But ", "still ", "you ", "had ", "a ", "choice? "
//];
var part2_ending_speech = "But still you had a choice?";

var dyingFruitSpeech = [
    "What the...",
    "Alright, I'll\ndig deep.",
    "For you, River.",
    "It's all in my\nhead, right?",
    
    "Hey!",
    "Give us some\nfood!",
    
    "No! F*** off!",
    "These are\nmine!",
    
    "Please!",
    "We're hungry!",
    
    "Ha! You think\nI care?",
    "I need this\nmore than\nyou.",
    
    "I didn't mean\nto...",
    "I just...",
    "I didn't know...",
    "I gotta move\nforward."
];

var firstFruitEaten = false;
var finishedFirstFruit = false;
var fruitEaten2 = false;
var finishedFruit2 = false;
var fruitEaten3 = false;
var finishedFruit3 = false;
var fruitEaten4 = false;
var finishedFruit4 = false;
var fruitEaten5 = false;
var finishedFruit5 = false;
var fruitCounter = 0;

//var content = "Where am I?";
var text_2;
var bg, bg2;
var growBigger = true;
var border, border_2, border_3;
var borders, borders_2, borders_3;
var dialogueFocus = false;

var dialogueNum = 0;
var dialogueScene2 = false;
var dialogueScene3 = false;
var endOfPart1 = false;

var camSpot;
var checkFruit;


part2.prototype = {    
    create: function(){
        console.log('youre in part 2, bug when you press X before text loads');
        // NOT ANYMORE!!!
        
        // Set world bounds and physics.
        game.world.setBounds(0, 0, 2400, 600);
        dialogue_Num = 0;
        border = game.add.sprite(50, 50, null);
        border.created = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Create the bg image and later bg image. and ground.
        theGround = game.add.group();
        theGround.enableBody = true;
        ground = theGround.create(0, 460, 'ground');
        ground.body.immovable = true;
        
        bg2 = game.add.sprite(0, 0, 'past_bg');
        bg = game.add.sprite(0, 0, null);
        
        // Create cam spot. for later. and BG... for later
        camSpot = game.add.sprite(1400, 600, null);
        
        
        // Create main character.        
        player = game.add.sprite(375, 225, 'char');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        player.movable = false;
        // Add player animations
        player.animations.add('left', [0, 1, 2], 10, true);
        player.animations.add('right', [4, 5, 6], 10, true);
        
        // Create fruits (1, 2, 3, 4).
//        for (i=0; i<4; i++){
//            fruit_y += 150;
//            fruits[i] = game.add.sprite(fruit_y, 300, 'fruit');
//            game.physics.arcade.enable(fruits[i]);
//            fruits[i].body.gravity.y = 400;
//            fruits[i].body.collideWorldBounds = true;
//        }
        fruits[0] = game.add.sprite(1150, 300, 'fruit1_1');
        game.physics.arcade.enable(fruits[0]);
        fruits[0].body.gravity.y = 400;
        fruits[0].body.collideWorldBounds = true;
        fruits[1] = game.add.sprite(1300, 300, 'fruit2_1');
        game.physics.arcade.enable(fruits[1]);
        fruits[1].body.gravity.y = 400;
        fruits[1].body.collideWorldBounds = true;
        fruits[2] = game.add.sprite(1450, 300, 'fruit3_1');
        game.physics.arcade.enable(fruits[2]);
        fruits[2].body.gravity.y = 400;
        fruits[2].body.collideWorldBounds = true;
        fruits[3] = game.add.sprite(1600, 300, 'fruit4_1');
        game.physics.arcade.enable(fruits[3]);
        fruits[3].body.gravity.y = 400;
        fruits[3].body.collideWorldBounds = true;
        
        // Create controls.
        cursors = game.input.keyboard.createCursorKeys();
        
        // Create camera movement.
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        
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
        
        // setup music
//        music = game.add.audio('audio_pt2');
//        music.loop = true;
//        music.play();
        
        // setup intro stuff
        black_bg = game.add.sprite(0, 0, 'blk_bg');
        
        game.time.events.add(Phaser.Timer.SECOND*2, function(){
            text = game.add.text(border.x+20, border.y+15, '', { font: "62px Questrial", fill: "#ffffff" });
            nextLine(part2_intro_speech, 75, 300);
            game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
        });
        
        function dialogueKeyPress(char){
            if (char == 'x' && text.endOfDial1){
                text.endOfDial1 = false;
                text.text = '';
                black_bg.loadTexture(null);
                border.created = false;
                
                game.time.events.add(Phaser.Timer.SECOND*1, function(){nextLine(dyingFruitSpeech[0], 300, 150, 'milo'); music = game.add.audio('audio_pt1'); music.loop = true; music.play();})
            }
            
            // intro dialogue done, character in focus
            if (char == 'x' && text.endOfDial2){
                text.endOfDial2 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[1]);
            }
            if (char == 'x' && text.endOfDial3){
                text.endOfDial3 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[2]);
            }
            if (char == 'x' && text.endOfDial4){
                text.endOfDial4 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[3]);
            }
            if (char == 'x' && text.endOfDial5){
                text.endOfDial5 = false;
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                firstStop = true;
            }
            
            // *** first segment
            
            if (char == 'x' && text.endOfDial6){
                text.endOfDial6 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[5]);
            }
            if (char == 'x' && text.endOfDial7){
                text.endOfDial7 = false;
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                nextLine(dyingFruitSpeech[6], 790, 180, 'milo');
            }
            if (char == 'x' && text.endOfDial8){
                text.endOfDial8 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[7]);
            }
            if (char == 'x' && text.endOfDial9){
                text.endOfDial9 = false;
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                secondStop = true;
            }
            
            // *** second segment
            
            if (char == 'x' && text.endOfDial10){
                text.endOfDial10 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[9]);
            }
            if (char == 'x' && text.endOfDial11){
                text.endOfDial11 = false;
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                nextLine(dyingFruitSpeech[10], 1280, 180, 'milo');
            }
            if (char == 'x' && text.endOfDial12){
                text.endOfDial12 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[11]);
            }
            if (char == 'x' && text.endOfDial13){
                text.endOfDial13 = false;
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                thirdStop = true;
            }
            
            // *** third Segment
            
            if (char == 'x' && text.endOfDial14){
                text.endOfDial14 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[13]);
            }
            if (char == 'x' && text.endOfDial15){
                text.endOfDial15 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[14]);
            }
            if (char == 'x' && text.endOfDial16){
                text.endOfDial16 = false;
                text.text = '';
                nextLine(dyingFruitSpeech[15]);
            }
            if (char == 'x' && text.endOfDial17){
                text.endOfDial17 = false;
                text.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                fourthStop = true;
            }
            if (char == 'x' && text.endOfDial18){
                text.endOfDial18 = false;
                music.stop();
                
                game.time.events.add(Phaser.Timer.SECOND*1, function(){
                    game.state.start('Part3');
                })
            }
        }
        
        // Sounds and music
        eatingSound = game.add.audio('bite_sfx');
    },
    
    
    
    update: function(){
        // Collide player and fruits with the ground.
        game.physics.arcade.collide(player, theGround);
        game.physics.arcade.collide(fruits[0], theGround);
        game.physics.arcade.collide(fruits[1], theGround);
        game.physics.arcade.collide(fruits[2], theGround);
        game.physics.arcade.collide(fruits[3], theGround);
        // Perform function when player touches fruits.
//        game.physics.arcade.overlap(player, fruits[0], eatFruit, null, this);
        if (player.x > 1100 && !firstFruitEaten){
            firstFruitEaten = true;
            eatFruit();
        } else if (player.x > 1250 && !fruitEaten2){
            fruitEaten2 = true;
            eatFruit2();
        } else if (player.x > 1400 && !fruitEaten3){
            fruitEaten3 = true;
            eatFruit3();
        } else if (player.x > 1550 && !fruitEaten4){
            fruitEaten4 = true;
            eatFruit4();
        } else if (player.x > 1800 && !fruitEaten5){
            fruitEaten5 = true;
            eatFruit5();
        } else if (player.x > 2100 && fourthStop){
            // Advance to part 3 of the game.
//            dialogueScene3 = true;
//            endOfPart1 = true;
            fourthStop = false;
            
            player.movable = false;
            black_bg.loadTexture('blk_bg');
            text = game.add.text(border.x+20, border.y+15, '', { font: "62px Questrial", fill: "#ffffff" });
            black_bg.bringToTop();
            text.bringToTop();
            
            game.time.events.add(Phaser.Timer.SECOND*2, function(){
                nextLine(part2_ending_speech, 75, 150);
            });
        }
        
        // Reset player velocity
        player.body.velocity.x = 0;
        
        // Player controls (L, R, D, U)
        if (cursors.left.isDown && player.movable){
            player.body.velocity.x = -200;
            player.animations.play('left');
        } else if (cursors.right.isDown && player.movable){
            player.body.velocity.x = 200;
            player.animations.play('right');
        } else {
            // Stop and stand still
            player.animations.stop();
            player.frame = 3;
        }
        
        
        if (player.x > 890 && firstStop){
            firstStop = false;
            player.movable = false;
            
            nextLine(dyingFruitSpeech[4], 500, 180, 'neutral');
        }
        
        if (player.x > 1360 && secondStop){
            secondStop = false;
            player.movable = false;
            
            nextLine(dyingFruitSpeech[8], 975, 180, 'neutral');
        }
        
        
        // 
        // Fruit eatting function!
        //
        function eatFruit(){
            player.movable = false;
            console.log('player touched fruit');
            // create growing x instruction
            text_2 = game.add.text(1175, 370, 'x', { font: "24px Questrial", fill: "#ffffff" });
            
            checkFruit = game.input.keyboard.addKey(Phaser.Keyboard.X);
            checkFruit.onDown.add(froo1);
        }
        function eatFruit2(){
            player.movable = false;
            console.log('player touched fruit2');
            // create growing x instruction
            text_2 = game.add.text(1325, 370, 'x', { font: "24px Questrial", fill: "#ffffff" });
            
            checkFruit = game.input.keyboard.addKey(Phaser.Keyboard.X);
            checkFruit.onDown.add(froo2);
        }
        function eatFruit3(){
            player.movable = false;
            console.log('player touched fruit3');
            // create growing x instruction
            text_2 = game.add.text(1475, 370, 'x', { font: "24px Questrial", fill: "#ffffff" });
            
            checkFruit = game.input.keyboard.addKey(Phaser.Keyboard.X);
            checkFruit.onDown.add(froo3);
        }
        function eatFruit4(){
            player.movable = false;
            console.log('player touched fruit4');
            // create growing x instruction
            text_2 = game.add.text(1625, 370, 'x', { font: "24px Questrial", fill: "#ffffff" });
            
            checkFruit = game.input.keyboard.addKey(Phaser.Keyboard.X);
            checkFruit.onDown.add(froo4);
        }
        function eatFruit5(){
            player.movable = false;
            console.log('finished eating');
//            game.camera.follow(null);
            game.time.events.add(Phaser.Timer.SECOND, moveCamera, this);
            // create growing x instruction
            // text_2 = game.add.text(1775, 450, 'x', { font: "24px Old School Adventures", fill: "#ffffff" })
        }
        function moveCamera(){
            game.camera.follow(camSpot, Phaser.Camera.FOLLOW_LOCKON, 0.005, 0.005);
            game.time.events.add(Phaser.Timer.SECOND*6, flashAndBG, this);
        }
        function flashAndBG(){
            game.camera.flash(0xff0000, Phaser.Timer.SECOND*6);
            game.time.events.add(Phaser.Timer.SECOND*0.25, function(){
                bg.loadTexture('bg_1');
                for (i=0; i<4; i++){
                    fruits[i].sendToBack();
                }
            }, this);
            game.time.events.add(Phaser.Timer.SECOND*10, function(){
                player.bringToTop();
                text.bringToTop();
                game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
//                player.movable = true;
            }, this);
            game.time.events.add(Phaser.Timer.SECOND*11, function(){
                nextLine(dyingFruitSpeech[12], 1700, 180, 'milo');
            }, this);
        }                        
        
        // updating X Instruction size
        if (text_2){
            if (text_2.fontSize < 36 && growBigger){
                text_2.fontSize++;
            } else if (text_2.fontSize >= 36){
                growBigger = false;
                text_2.fontSize--;
            } else if (text_2.fontSize > 16 && !growBigger){
                text_2.fontSize--;
            } else if (text_2.fontSize <= 16){
                growBigger = true;
                text_2.fontSize++;
            }
        }
        
        //******
        // When X is pressed, during eating fruit, cycle through different frames until you get to the eaten fruit frame (fruits 1 - 5)
        //******
        
        
//        if (firstFruitEaten && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFirstFruit){
        function froo1(){
            fruitCounter++;
            console.log('frtCt: ' + fruitCounter);
            if (fruitCounter == 7){
                // Change fruit texture
                fruits[0].loadTexture('fruit1_2');
                
            }
            if (fruitCounter == 14){
                fruits[0].loadTexture('fruit1_3');
            }
            if (fruitCounter == 21){
                fruits[0].loadTexture('fruit1_4');
//            } else if (fruitCounter >= 200){
//                fruits[0].loadTexture('fruit5');
                player.movable = true;
                finishedFirstFruit = true;
                fruitCounter = 0;
                text_2.text = '';
                
//                checkFruit = null;
                checkFruit.onDown.remove(froo1);
            }
            
            if (eatingSound.isPlaying){
                eatingSound.restart();
            } else{
                eatingSound.play();
            }
        }
//        if (fruitEaten2 && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFruit2){
        function froo2(){
            fruitCounter++;
            if (fruitCounter == 7){
                // Change fruit texture
                fruits[1].loadTexture('fruit2_2');
                
            } else if (fruitCounter == 14){
                fruits[1].loadTexture('fruit2_3');
            } else if (fruitCounter == 21){
                fruits[1].loadTexture('fruit2_4');
//            } else if (fruitCounter >= 200){
//                fruits[1].loadTexture('fruit5');
                player.movable = true;
                finishedFruit2 = true;
                fruitCounter = 0;
                text_2.text = '';
                
                checkFruit.onDown.remove(froo2);
            }
            
            if (eatingSound.isPlaying){
                eatingSound.restart();
            } else{
                eatingSound.play();
            }
        }
//        if (fruitEaten3 && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFruit3){
        function froo3(){
            fruitCounter++;
            if (fruitCounter == 7){
                // Change fruit texture
                fruits[2].loadTexture('fruit3_2');
                
            } else if (fruitCounter == 14){
                fruits[2].loadTexture('fruit3_3');
            } else if (fruitCounter == 21){
                fruits[2].loadTexture('fruit3_4');
//            } else if (fruitCounter >= 200){
//                fruits[2].loadTexture('fruit5');
                player.movable = true;
                finishedFruit3 = true;
                fruitCounter = 0;
                text_2.text = '';
                
                checkFruit.onDown.remove(froo3);
            }
            
            if (eatingSound.isPlaying){
                eatingSound.restart();
            } else{
                eatingSound.play();
            }
        }
//        if (fruitEaten4 && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFruit4){
        function froo4(){
            fruitCounter++;
            if (fruitCounter == 7){
                // Change fruit texture
                fruits[3].loadTexture('fruit4_2');
                
            } else if (fruitCounter == 14){
                fruits[3].loadTexture('fruit4_3');
            } else if (fruitCounter == 21){
                fruits[3].loadTexture('fruit4_4');
//            } else if (fruitCounter >= 200){
//                fruits[3].loadTexture('fruit5');
                player.movable = true;
                finishedFruit4 = true;
                fruitCounter = 0;
                text_2.text = '';
                
                checkFruit.onDown.remove(froo4);
            }
            
            if (eatingSound.isPlaying){
                eatingSound.restart();
            } else{
                eatingSound.play();
            }
        }
        
        
        // Text speech functions
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
                border = game.add.sprite(200, 200, 'border');
                border.loadTexture('border_v3');
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
//        game.debug.spriteInfo(player, 50, 50);
        game.debug.pointer(game.input.activePointer);
    }
}