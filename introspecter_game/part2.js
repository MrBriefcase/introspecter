var part2 = function(game){};

var fruit_y = 1000;
var fruit1, fruit2, fruit3, fruit4;
var fruits = [fruit1, fruit2, fruit3, fruit4];

var part2_intro_speech = [
    "You ", "were ", "never ", "a ", "good ", "person. "
];
var part2_ending_speech = [
    "But ", "still ", "you ", "had ", "a ", "choice? "
];
var dyingFruitSpeech = [
    "What the...",
    "Alright, I'll dig deep.",
    "For you, River.",
    "It's all in my head, right?",
    
    "Hey!",
    "Give us some food!",
    
    "No! F*** off!",
    "These are mine!",
    
    "Please!",
    "We're hungry!",
    
    "Ha! You think I care?",
    "I need this more than you.",
    
    "I didn't mean to...",
    "I just...",
    "I didn't know...",
    "I gotta move forward."
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


part2.prototype = {    
    create: function(){
        console.log('youre in part 2, bug when you press X before text loads');
        
        // Set world bounds and physics.
        game.world.setBounds(0, 0, 2400, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Create the bg image and later bg image. and ground.
        theGround = game.add.group();
        theGround.enableBody = true;
        ground = theGround.create(0, 460, 'ground');
        ground.body.immovable = true;
        
        bg2 = game.add.sprite(0, 0, 'past_bg');
        bg = game.add.sprite(0, 0, null);
        
        // Add music... Holder for now
//        music = game.add.audio('FloFliz');
//        music.loopFull();
        text1sound = game.add.audio('text1sound');
        
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
        for (i=0; i<4; i++){
            fruit_y += 150;
            fruits[i] = game.add.sprite(fruit_y, 300, 'fruit');
            game.physics.arcade.enable(fruits[i]);
            fruits[i].body.gravity.y = 400;
            fruits[i].body.collideWorldBounds = true;
        }
        
        // Create controls.
        cursors = game.input.keyboard.createCursorKeys();
        
        // Create camera movement.
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        // Create dialogue....
        borders = game.add.group();
        borders_2 = game.add.group();
        borders_3 = game.add.group();
        game.time.events.add(1000, createText, this);
        
        function createText(){
            dialogueFocus = true;
            border = borders.create(200, 200, 'border2');
            text = game.add.text(border.x+50, border.y+50, '', { font: "24px Questrial", fill: "#ffffff" });
            nextLine();
        }
        
        function nextLine(){
            if (letterIndex === content.length){
                //  We're finished
                letterIndex = 0;
                text.endOfDialogue = true;
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
            //  Add the next letter onto the text string and make a sound
            text.text = text.text.concat(letter[wordIndex]);
            if(text1sound.isPlaying){
                text1sound.restart();
            } else{
                text1sound.play();
            }
            //  Advance the word index to the next word in the line
            wordIndex++;
            //  Last word?
            if (wordIndex === letter.length){
                //  Get the next line after the lineDelay amount of ms has elapsed
                game.time.events.add(letterDelay, nextLine, this);
            }
        }
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
        } else if (player.x > 2100 && !endOfPart1){
            // Advance to part 3 of the game.
            dialogueScene3 = true;
            endOfPart1 = true;
        }
        
        // Reset player velocity
        player.body.velocity.x = 0;
        
        // PLayer controls (L, R, D, U)
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
        
        // Move to next text dialogue.
        if (dialogueFocus && game.input.keyboard.isDown(Phaser.Keyboard.X) && text.endOfDialogue){
            text.endOfDialogue = false;
            dialogueNum++;
            // New dialogue.
            content = "I can hardly\nremember \nanything...";
            text.text = '';
            createText();
            console.log('printed second box');
        }
        
        // Move to 3rd dialogue box.
        if (dialogueFocus && game.input.keyboard.isDown(Phaser.Keyboard.X) && text.endOfDialogue2){
            text.endOfDialogue2 = false;
            dialogueNum++;
            // New dialogue.
            content = "someone help\nme...";
            text.text = '';
            createText();
            console.log('printed 3rd box');
        }
        
        // Get rid of text box and make char movable
        if (dialogueFocus && game.input.keyboard.isDown(Phaser.Keyboard.X) && text.endOfDialogue3){
            text.endOfDialogue3 = false;
            dialogueNum++;
            text.text = '';
            borders.destroy();
            player.movable = true;
            console.log('getting rid of text box');
        }
        
        // Pre-text before food.
        // When player approaches the food, play dialogue
        if (player.x > 890 && (dialogueNum == 3)) {
            // Play dialogue
            dialogueNum++;
            player.movable = false;
            dialogueScene2 = true;
//            content = "Man, I'm pretty\nhungry.";
//            createText(500, 200);
        }
        
        if (dialogueScene2){
            dialogueScene2 = false;
            content = "Man, I'm pretty\nhungry.";
            createText2();
        }
        
        
        
        // Dialogue before moving to part 3.
        if (dialogueScene3){
            dialogueScene3 = false;
            content = "Msg before\npart 3.";
            createText3();
        }
        if (endOfPart1 && (dialogueNum == 6) && game.input.keyboard.isDown(Phaser.Keyboard.X)){
            dialogueNum++;
        }
        if (endOfPart1 && game.input.keyboard.isDown(Phaser.Keyboard.X) && (dialogueNum > 6)){
            game.state.start('Part3');
        }
        
        
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.endOfDialogue4){
            text.endOfDialogue4 = false;
            dialogueNum++;
            text.text = '';
            content = "these look\ntasty!";
            createText2();
        }
        
        // End of 2nd series of text.
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.endOfDialogue5){
            text.endOfDialogue5 = false;
            dialogueNum++;
            text.text = '';
            borders_2.destroy();
            // Executes in final dialogue group.
            player.movable = true;
        }
        
        
        
        // Appropriate functions
        function createText(){
            dialogueFocus = true;
            border = borders.create(game.camera.view.x+200, game.camera.view.y+200, 'border2');
            var text = game.add.text(border.x+50, border.y+50, '', { font: "24px Questrial", fill: "#ffffff" });
            nextLine();
        }
        function createText2(){
            dialogueFocus = true;
            border_2 = borders_2.create(700, 200, 'border2');
            text.x = 750;
            nextLine();
            console.log('printing dialogue_2');
        }
        function createText3(){
            border_3 = borders_3.create(2000, 200, 'border2');
            border_3.bringToTop();
            text.x = 2050;
            player.movable = false;
            nextLine();
            console.log('final dialogue before');
        }
        
        function nextLine(){
            if (letterIndex === content.length){
                //  We're finished
//                if (!text.endOfDialogue3){
//                    text.endOfDialogue = false;
//                    text.endOfDialogue2 = false;
//                }
//                if (!text.endOfDialogue && !text.endOfDialogue2){
//                    text.endOfDialogue3 = true;
//                }
//                if (!text.endOfDialogue){
//                    text.endOfDialogue2 = true;
//                }
                switch (dialogueNum){
                    case 1:
                        text.endOfDialogue2 = true;
                        break;
                    case 2:
                        text.endOfDialogue3 = true;
                        break;
                    case 4:
                        text.endOfDialogue4 = true;
                        break;
                    case 5:
                        text.endOfDialogue5 = true;
                        break;
                    default:
                        break;
                }
                
                letterIndex = 0;
                wordIndex = 0;
                return;
            }

            //  get the letter in the message
            letter = content[letterIndex];
            
            //  flag variable
            wordIndex = 0;

            //  Call the 'nextWord' function to concat the message into the game.
            game.time.events.add(20, nextWord, this);

            //  Advance to the next letter
            letterIndex++;
        }

        function nextWord(){
            //  Add the next letter onto the text string
            text.text = text.text.concat(letter);
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
                game.time.events.add(20, nextLine, this);
            }
        }
        
        // 
        // Fruit eatting function!
        //
        function eatFruit(){
            player.movable = false;
            console.log('player touched fruit');
            // create growing x instruction
            text_2 = game.add.text(1175, 370, 'x', { font: "24px Questrial", fill: "#ffffff" })
        }
        function eatFruit2(){
            player.movable = false;
            console.log('player touched fruit2');
            // create growing x instruction
            text_2 = game.add.text(1325, 370, 'x', { font: "24px Questrial", fill: "#ffffff" })
        }
        function eatFruit3(){
            player.movable = false;
            console.log('player touched fruit3');
            // create growing x instruction
            text_2 = game.add.text(1475, 370, 'x', { font: "24px Questrial", fill: "#ffffff" })
        }
        function eatFruit4(){
            player.movable = false;
            console.log('player touched fruit4');
            // create growing x instruction
            text_2 = game.add.text(1625, 370, 'x', { font: "24px Questrial", fill: "#ffffff" })
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
                player.movable = true;
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
        if (firstFruitEaten && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFirstFruit){
            fruitCounter++;
            if (fruitCounter > 50 && fruitCounter < 100){
                // Change fruit texture
                fruits[0].loadTexture('fruit2');
                
            } else if (fruitCounter >= 100 && fruitCounter < 150){
                fruits[0].loadTexture('fruit3');
            } else if (fruitCounter >= 150 && fruitCounter < 200){
                fruits[0].loadTexture('fruit4');
            } else if (fruitCounter >= 200){
                fruits[0].loadTexture('fruit5');
                player.movable = true;
                finishedFirstFruit = true;
                fruitCounter = 0;
                text_2.text = '';
            }
        }
        if (fruitEaten2 && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFruit2){
            fruitCounter++;
            if (fruitCounter > 50 && fruitCounter < 100){
                // Change fruit texture
                fruits[1].loadTexture('fruit2');
                
            } else if (fruitCounter >= 100 && fruitCounter < 150){
                fruits[1].loadTexture('fruit3');
            } else if (fruitCounter >= 150 && fruitCounter < 200){
                fruits[1].loadTexture('fruit4');
            } else if (fruitCounter >= 200){
                fruits[1].loadTexture('fruit5');
                player.movable = true;
                finishedFruit2 = true;
                fruitCounter = 0;
                text_2.text = '';
            }
        }
        if (fruitEaten3 && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFruit3){
            fruitCounter++;
            if (fruitCounter > 50 && fruitCounter < 100){
                // Change fruit texture
                fruits[2].loadTexture('fruit2');
                
            } else if (fruitCounter >= 100 && fruitCounter < 150){
                fruits[2].loadTexture('fruit3');
            } else if (fruitCounter >= 150 && fruitCounter < 200){
                fruits[2].loadTexture('fruit4');
            } else if (fruitCounter >= 200){
                fruits[2].loadTexture('fruit5');
                player.movable = true;
                finishedFruit3 = true;
                fruitCounter = 0;
                text_2.text = '';
            }
        }
        if (fruitEaten4 && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFruit4){
            fruitCounter++;
            if (fruitCounter > 50 && fruitCounter < 100){
                // Change fruit texture
                fruits[3].loadTexture('fruit2');
                
            } else if (fruitCounter >= 100 && fruitCounter < 150){
                fruits[3].loadTexture('fruit3');
            } else if (fruitCounter >= 150 && fruitCounter < 200){
                fruits[3].loadTexture('fruit4');
            } else if (fruitCounter >= 200){
                fruits[3].loadTexture('fruit5');
                player.movable = true;
                finishedFruit4 = true;
                fruitCounter = 0;
                text_2.text = '';
            }
        }
        // LAST FRUIT!!!
        // ***Do camera movement as well
        // *******
//        if (fruitEaten5 && game.input.keyboard.downDuration(Phaser.Keyboard.X, 120) && !finishedFruit5){
//            fruitCounter++;
//            if (fruitCounter > 50 && fruitCounter < 100){
//                // Change fruit texture
//                fruits[4].loadTexture('fruit2');
//                
//            } else if (fruitCounter >= 100 && fruitCounter < 150){
//                fruits[4].loadTexture('fruit3');
//            } else if (fruitCounter >= 150 && fruitCounter < 200){
//                fruits[4].loadTexture('fruit4');
//            } else if (fruitCounter >= 200){
//                fruits[4].loadTexture('fruit5');
//                player.movable = true;
//                finishedFruit5 = true;
//                fruitCounter = 0;
//                text_2.text = '';
//            }
//        }
    },
    
    render: function(){
        game.debug.spriteInfo(player, 50, 50);
    }
}