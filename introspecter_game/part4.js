var part4 = function(game){};

var choice1, choice2, choice3, choice4;
var swayChoices = false;
var textGrow = true;
var rotateRight = true;
var tutorialChoose = true;
var slowItDown = 0;
var typeableWords = [];

var chooseGrow = true;



part4.prototype = {
    create: function(){
        // Part 4: 3rd mini-game event. Dialogue and choices.
        console.log('youre in part 4 (3rd minigame)');
        
        // Set world bounds and physics.
        game.world.setBounds(0, 0, 2400, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set music and sounds
        text1sound = game.add.audio('text1sound');
        
        // Create character
        player = game.add.sprite(375, 225, 'char');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        player.movable = false;
        
        // Create keyboard controls and camera
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        // Create dialogue and relevant materials.
        dialogueNum = 0;
        borders = game.add.group();
        var content = 'Milo.';
        game.time.events.add(1000, createText, this);
        
        // Appropriate functions
        function createText(){
            dialogueFocus = true;
            border = borders.create(200, 100, 'border2');
            text = game.add.text(border.x+50, border.y+50, '', { font: "24px Old School Adventures", fill: "#ffffff" });
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
                game.time.events.add(letterDelay, nextLine, this);
            }
        }
    },
    
    update: function(){
        // Relevant functions
        function nextLine(){
            if (letterIndex === content.length){
                //  We're finished
                letterIndex = 0;
                switch (dialogueNum){
                    case 1:
                        text.dialogueAfterChoice = true;
                        break;
                    case 2:
                        text.dialogueAfterChoice2 = true;
                        break;
                    case 3:
                        text.dialogueAfterChoice3 = true;
                        break;
//                    case 4:
//                        text.dialogueAfterChoice4 = true;
//                        break;
                    default:
                        break;
                }
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
                game.time.events.add(letterDelay, nextLine, this);
            }
        }
        
        function addChoices(){
            choice1 = game.add.text(100, 155, 'Go to UBC', { font: "18px Old School Adventures", fill: "#ffffff"});
            choice2 = game.add.text(670, 155, 'Go to SFU', { font: "18px Old School Adventures", fill: "#ffffff"});
            choice3 = game.add.text(100, 450, 'Go to BCIT', { font: "18px Old School Adventures", fill: "#ffffff"});
            choice4 = game.add.text(670, 450, 'Study music', { font: "18px Old School Adventures", fill: "#ffffff"});
            
            choice1.anchor.x = 0.5;
            choice1.anchor.y = 0.5;
            choice2.anchor.x = 0.5;
            choice2.anchor.y = 0.5;
            choice3.anchor.x = 0.5;
            choice3.anchor.y = 0.5;
            choice4.anchor.x = 0.5;
            choice4.anchor.y = 0.5;
            
            choice1.angle = 5;
            choice2.angle = -6;
            choice3.angle = 4;
            choice4.angle = -3;
            
            choice1.inputEnabled = true;
            choice2.inputEnabled = true;
            choice3.inputEnabled = true;
            choice4.inputEnabled = true;
            
            choice1.input.useHandCursor = true;
            choice2.input.useHandCursor = true;
            choice3.input.useHandCursor = true;
            choice4.input.useHandCursor = true;
            
            choice1.events.onInputDown.add(nextDialogue, this);
            choice2.events.onInputDown.add(nextDialogue, this);
            choice3.events.onInputDown.add(nextDialogue, this);
            choice4.events.onInputDown.add(nextDialogue, this);
            
            swayChoices = true;
        }
        
        
        
        // Update text box when X is pressed.
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.endOfDialogue){
            text.endOfDialogue = false;
            content = "What would you like\nto do after\nhighschool?";
            text.text = '';
            nextLine();
            
            // Display the choices that you have
            game.time.events.add(Phaser.Timer.SECOND*4, addChoices, this);
        }
        
        // Swaying motion of text
        if (swayChoices && (slowItDown%4 == 0)){
            console.log('loop entered');
            
            // Size adjustment
            if (choice1.fontSize <= 21 && textGrow){
                choice1.fontSize++;
            } else if (choice1.fontSize > 21){
                textGrow = false;
            }
            if (choice1.fontSize >= 15 && !textGrow){
                choice1.fontSize--;
            } else if (choice1.fontSize < 15){
                textGrow = true;
            }
            
            if (choice2.fontSize <= 21 && textGrow){
                choice2.fontSize++;
            } else if (choice2.fontSize > 21){
                textGrow = false;
            }
            if (choice2.fontSize >= 15 && !textGrow){
                choice2.fontSize--;
            } else if (choice2.fontSize < 15){
                textGrow = true;
            }
            
            if (choice3.fontSize <= 21 && textGrow){
                choice3.fontSize++;
            } else if (choice3.fontSize > 21){
                textGrow = false;
            }
            if (choice3.fontSize >= 15 && !textGrow){
                choice3.fontSize--;
            } else if (choice3.fontSize < 15){
                textGrow = true;
            }
            
            if (choice4.fontSize <= 21 && textGrow){
                choice4.fontSize++;
            } else if (choice4.fontSize > 21){
                textGrow = false;
            }
            if (choice4.fontSize >= 15 && !textGrow){
                choice4.fontSize--;
            } else if (choice4.fontSize < 15){
                textGrow = true;
            }
            
            // Angle adjustment
            if (choice1.angle <= 6 && rotateRight){
                choice1.angle++;
            } else if (choice1.angle > 6){
                rotateRight = false;
            }
            if (choice1.angle >= -6 && !rotateRight){
                choice1.angle--;
            } else if (choice1.angle < -6){
                rotateRight = true;
            }
            
            if (choice2.angle <= 7 && rotateRight){
                choice2.angle++;
            } else if (choice2.angle > 7){
                rotateRight = false;
            }
            if (choice2.angle >= -7 && !rotateRight){
                choice2.angle--;
            } else if (choice2.angle < -7){
                rotateRight = true;
            }
            
            if (choice3.angle <= 5 && rotateRight){
                choice3.angle++;
            } else if (choice3.angle > 5){
                rotateRight = false;
            }
            if (choice3.angle >= -5 && !rotateRight){
                choice3.angle--;
            } else if (choice3.angle < -5){
                rotateRight = true;
            }
            
            if (choice4.angle <= 8 && rotateRight){
                choice4.angle++;
            } else if (choice4.angle > 8){
                rotateRight = false;
            }
            if (choice4.angle >= -8 && !rotateRight){
                choice4.angle--;
            } else if (choice4.angle < -8){
                rotateRight = true;
            }
        }
        
        // Slows down the text motion.
        slowItDown++;
        
        function nextDialogue(){
            // Get rid of choices.
            console.log('nextDialogue works!');
            swayChoices = false;
            choice1.destroy();
            choice2.destroy();
            choice3.destroy();
            choice4.destroy();
            
            // Print out the next batch of dialogue.
            // when printing new text:
            //
            //      - disable FLAG
            //      - dialogueNum++
            //      - change the message
            //      - clear the text var
            //      - call the function
            dialogueNum++;
            // dialogueNum is: 1
            content = "It didn't really\nmatter, did it?";
            text.text = '';
            game.time.events.add(Phaser.Timer.SECOND*2, nextLine, this);
        }
        
        // Setup the background fade in. and more dialogue.
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.dialogueAfterChoice){
            // Print out more dialogue
            text.dialogueAfterChoice = false;
            dialogueNum++;
            // dialogueNum is: 2
            content = 'You were forced\nto take over\nthe family business...';
            text.text = '';
            nextLine();
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.dialogueAfterChoice2){
            // Print out more dialogue
            text.dialogueAfterChoice2 = false;
            dialogueNum++;
            // dialogueNum is: 3
            content = 'However...';
            text.text = '';
            nextLine();
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.dialogueAfterChoice3){
            // Print out more dialogue
            text.dialogueAfterChoice3 = false;
            dialogueNum++;
            // dialogueNum is: 4
            content = 'Even then,\nyou made your\nown choice.';
            text.text = '';
            nextLine();
            // text.dialogueAfterChoice4 is: true
            
            // Display the CHOOSEEEEEEEEEEEEE INSTRUCTION
            game.time.events.add(Phaser.Timer.SECOND*4.5, function(){
                createTypeableWord('CHOOSE', 350);
            }, this);
        }
        
        function createTypeableWord(typeThis, yPos){
            var word = typeThis;
            var typeThisWord = [];
            
            var xPos = 350;
            
            for (var i = 0; i < word.length; i++){
                typeThisWord[i] = game.add.text(xPos, yPos, word[i], { font: "12px Old School Adventures", fill: "#ffffff" });
                xPos += 15;
            }
            typeableWords.push(typeThisWord);
            
            console.log('create typeable word fn works!');
        }
        
        // Make the CHOOSE instruction typeable and each letter grow and shrink
        // to indicate it needs to be typed.
        if (typeableWords.length == 1 && tutorialChoose){
            tutorialChoose = false;
            growShrink(typeableWords[0]);
        }
        
        
        // Function to GROW and SHRINK typeable words. Pass in typeable word.
        // ************NEEDS ATTENTION
        // While loop runs too many times for some reason
        // and slows down the game and prevents updating. *NEED FIX
        function growShrink(str){
            var word = str;
            
            for (var i = 0; i < word.length; i++){
                str[i].typed = false;
            }
            for (var i = 0; i < word.length; i++){
                
                // Grow and shrink
                // Old whileloop was here.
                console.log('gets here');
                
                if (str[0].fontSize <= 16 && chooseGrow){
                    str[0].fontSize++;
                } else if (str[0].fontSize > 16){
                    chooseGrow = false;
                }
                if (str[0].fontSize >= 8 && !chooseGrow){
                    str[0].fontSize--;
                } else if (str[0].fontSize < 8){
                    chooseGrow = true;
                }
                
                // Check for keypress.
                if (game.input.keyboard.isDown(Phaser.KeyCode.C)){
                    console.log('onto the next key');
                }
                
            }
        }
        
        console.log('update has run this times');
    },
    
    render: function(){
        
    }
}