var part4 = function(game){};

var choice1, choice2, choice3, choice4;
var swayChoices = false;
var textGrow = true;
var rotateRight = true;
var tutorialChoose = true;
var slowItDown = 0;
var typeableWords = [];
//var correct = [];

var choiceBG;
var typingMiniGame = false;
var wordsLoop;

var chooseGrow = true;

var positiveChoice = 0;
var negativeChoice = 0;
var neutralChoice = 0;
var posBar, negBar, neutBar;
var updateProgressBar = false;
var processEndOfDialogue = false;

var negativeWords = ['WORTHLESS', 'GARBAGE', 'TRASH', 'DISAPPOINT', 'FAILURE', 'RUDE', 'ROTTEN', 'BORING', 'TERRIBLE',
    'PESSIMISTIC', 'DISHONEST', 'AWFUL', 'GLOOMY', 'CYNICAL', 'QUITTER'];
var positiveWords = ['HAPPY', 'PERSERVERE', 'DOABLE', 'CONFIDENT', 'GENUINE', 'HONEST', 'TRUTHFUL', 'EMPATHETIC',
    'ENERGETIC', 'EXPRESSIVE', 'TRUSTING', 'IMPRESSIVE', 'DETERMINED', 'OUTSPOKEN', 'OUTSPOKEN'];

var choice_intro_speech = [
    "But ", "still ", "you ", "had ", "a ", "choice. "
];

var choice_speech = [
    "I had a few\nchoices after\nhighschool.",
    "It was so hard\nto choose.",
    "Where did\nI go again?",

    "It didn't matter,\ndid it?",
    "Fate had\na path\nfor me...",
    "I had to take\nover the family\nbusiness...",
    "But still!\nI made\na choice!!"
];

var posi_speech = [
    "Yea! No\nmatter where\nI was...",
    "I could\nstill control\nmy attitude!",
    "I could still\nbe whoever I\nchoose to be!"
];

var nega_speech = [
    "Noo...",
    "I hate\neverything...",
    "There is\nno purpose to\nany of this..."
];

var neut_speech = [
    "hahaaha, who\nam I\nkidding?",
    "I missed\nall my\nopportunities...",
    "I'm an\napathetic\npiece of shit."
];

var holdEndDialogue;


part4.prototype = {
    create: function(){
        // Part 4: 3rd mini-game event. Dialogue and choices.
        console.log('youre in part 4 (3rd minigame)');
        
        // Set world bounds and physics.
        game.world.setBounds(0, 0, 2400, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set music and sounds
        music = game.add.audio('audio_pt3');
        music.loop = true;
        music.play();
        text1sound = game.add.audio('text1sound');

        // Add choiceBG
        choiceBG = game.add.sprite(0, 0, null);
        
        // Create character
        player = game.add.sprite(375, 225, 'char');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        player.movable = false;
        player.frame = 3;
        
        // Create keyboard controls and camera
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        // Create dialogue and relevant materials.
        dialogue_Num = 0;
        // borders = game.add.group();
        // var content = 'Milo.';
        // game.time.events.add(1000, createText, this);

        // Appropriate functions
        // function createText(){
        //     dialogueFocus = true;
        //     border = borders.create(200, 100, 'border2');
        //     text = game.add.text(border.x+50, border.y+50, '', { font: "24px Old School Adventures", fill: "#ffffff" });
        //     nextLine();
        // }




        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
                border = game.add.sprite(200, 200, 'border');
                border.loadTexture('border');
                border.x = xpos;
                border.y = ypos;
                border.scale.setTo(1.5, 1.5);
                text = game.add.text(border.x+20, border.y+15, '', { font: "36px Questrial", fill: "#ffffff" });
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


        // Start of the dialogue
        game.time.events.add(Phaser.Timer.SECOND*2, function(){
            border.created = false;

            nextLine(choice_speech[0], 250, 150, 'milo');
            game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
        });

        function dialogueKeyPress(char){
            // dialogue 0 - 2
            if (char == 'x' && text.endOfDial1){
                text.endOfDial1 = false;
                text.text = '';
                nextLine(choice_speech[1]);
            }
            if (char == 'x' && text.endOfDial2){
                text.endOfDial2 = false;
                text.text = '';
                nextLine(choice_speech[2]);
            }
            if (char == 'x' && text.endOfDial3){
                text.endOfDial3 = false;

                // display choices
                game.time.events.add(Phaser.Timer.SECOND*2, addChoices, this);
            }

            // dialogue 4 - 6
            if (char == 'x' && text.endOfDial4){
                text.endOfDial4 = false;
                text.text = '';
                nextLine(choice_speech[4]);
            }
            if (char == 'x' && text.endOfDial5){
                text.endOfDial5 = false;
                text.text = '';
                nextLine(choice_speech[5]);
            }
            if (char == 'x' && text.endOfDial6){
                text.endOfDial6 = false;
                text.text = '';
                nextLine(choice_speech[6]);

                // start CHOOSE tutorial
                game.time.events.add(2000, function(){
                    createTypeableWord("CHOOSE", 350, 400);
                    game.input.keyboard.addCallbacks(this, null, null, keyPress);
                });
            }
        }


        // function nextLine(){
        //     if (letterIndex === content.length){
        //         //  We're finished
        //         letterIndex = 0;
        //         text.endOfDialogue = true;
        //         return;
        //     }
        //     //  get the letter in the message
        //     letter = content[letterIndex];
        //     //  flag variable
        //     wordIndex = 0;
        //     //  Call the 'nextWord' function to concat the message into the game.
        //     game.time.events.repeat(letterDelay, letter.length, nextWord, this);
        //     //  Advance to the next letter
        //     letterIndex++;
        // }
        //
        // function nextWord(){
        //     //  Add the next letter onto the text string
        //     text.text = text.text.concat(letter[wordIndex]);
        //     if (text1sound.isPlaying){
        //         text1sound.restart();
        //     } else{
        //         text1sound.play();
        //     }
        //     //  Advance the word index to the next word in the line
        //     wordIndex++;
        //     //  Last word?
        //     if (wordIndex === letter.length){
        //         //  Get the next line after the lineDelay amount of ms has elapsed
        //         game.time.events.add(letterDelay, nextLine, this);
        //     }
        // }

        function addChoices(){
            choice1 = game.add.text(100, 155, 'Go to UBC', { font: "32px Questrial", fill: "#ffffff"});
            choice2 = game.add.text(670, 155, 'Go to SFU', { font: "32px Questrial", fill: "#ffffff"});
            choice3 = game.add.text(100, 450, 'Go to BCIT', { font: "32px Questrial", fill: "#ffffff"});
            choice4 = game.add.text(670, 450, 'Study music', { font: "32px Questrial", fill: "#ffffff"});

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

        // play dialogue after choice made.
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
            // dialogueNum++;
            // dialogueNum is: 1
            // content = "It didn't really\nmatter, did it?";

            text.text = '';
            game.time.events.add(Phaser.Timer.SECOND*2, function(){
                nextLine(choice_speech[3]);
            }, this);
        }

        // Only used for CHOOSE tutorial
        function createTypeableWord(typeThis, xPos, yPos){
            var word = typeThis;
            var typeThisWord = [];

            var xHold = xPos;

            for (var i = 0; i < word.length; i++){
                typeThisWord[i] = game.add.text(xHold, yPos, word[i], { font: "12px Questrial", fill: "#ffffff" });
                typeThisWord[i].typed = false;
                typeThisWord[i].isCurrChar = false;
                xHold += 15;
            }
            typeThisWord[0].isCurrChar = true;
            typeableWords.push(typeThisWord);

            console.log('create typeable word fn works!');
        }

        // All important keyPress function (will modify after functionality works)
        // ****** ONLY USED FOR CHOOSE TUTORIAL
        function keyPress(char){
            console.log('keypress works');
            console.log('char: ' + char);

            // Loop through CHOOSE and when match, change colour
            // .isCurrChar ****** SOLUTION TO MY FUTURE PROBLEM(type in sequential order)
            for (var i = 0; i < typeableWords[0].length; i++){
                if (typeableWords[0][i].typed == false && typeableWords[0][i].isCurrChar){
                    // check (char == this letter) ? change colour : ---
                    if (typeableWords[0][i].text.toLowerCase() == char){
                        console.log('typed the correct key');

                        // Change text color
                        typeableWords[0][i].fill = '#5683ff';

                        // why does doing this change alll to true????!!!****FIXED
                        typeableWords[0][i].typed = true;

                        // next letter is the curr char.
                        if (i != typeableWords[0].length - 1){
                            typeableWords[0][i].isCurrChar = false;
                            typeableWords[0][i+1].isCurrChar = true;
                        }

                        break;
                    } else {
                        // restart word.
                        restartWord(typeableWords[0]);
                    }
                } else{
                    continue;
                }
            }

            // if all CHOOSE is typed then move on. (only need to check the last character)
            if (typeableWords[0][5].typed && tutorialChoose){
                tutorialChoose = false;
                // delete key catcher
                game.input.keyboard.onPressCallback = null;

                // delay delete CHOOSE, Text box
                // v    v   v   v   v
                // fade in new BG
                // v    v   v   v   v
                // start WORD TYPING MINIGAME

                game.time.events.add(Phaser.Timer.SECOND*3, function(){
                    text.text = '';
                    border.created = false;
                    border.destroy();

                    destroyWord(typeableWords[0]);
                    typeableWords.splice(0, 1);

                    choiceBG.loadTexture('bg_1');
                    // ****** NEED TO IMPLEMENT FADE

                    typingMiniGame = true;
                }, this);

//                game.time.events.add(Phaser.Timer.SECONDS*5, function(){
//                    console.log('code reaches here!!!!'); // NEVER REACHES HERE!!!!!!NOOOOO
//
//                    choiceBG.loadTexture('bg_1');
//                }, this);
            }
        }

        // Destroy word
        function destroyWord(word){
            for (var i = 0; i < word.length; i++){
                word[i].destroy();
            }
        }

        // Restart word
        function restartWord(word){
            for (var i = 0; i < word.length; i++){
                word[i].fill = '#ffffff';
                word[i].typed = false;
                word[i].isCurrChar = false;
            }
            word[0].isCurrChar = true;
        }
    },
    
    update: function(){
        // Relevant functions
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
                border = game.add.sprite(200, 200, 'border');
                border.loadTexture('border');
                border.x = xpos;
                border.y = ypos;
                border.scale.setTo(1.5, 1.5);
                text = game.add.text(border.x+20, border.y+15, '', { font: "36px Questrial", fill: "#ffffff" });
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
//         function nextLine(){
//             if (letterIndex === content.length){
//                 //  We're finished
//                 letterIndex = 0;
//                 switch (dialogueNum){
//                     case 1:
//                         text.dialogueAfterChoice = true;
//                         break;
//                     case 2:
//                         text.dialogueAfterChoice2 = true;
//                         break;
//                     case 3:
//                         text.dialogueAfterChoice3 = true;
//                         break;
// //                    case 4:
// //                        text.dialogueAfterChoice4 = true;
// //                        break;
//                     default:
//                         break;
//                 }
//                 return;
//             }
//             //  get the letter in the message
//             letter = content[letterIndex];
//             //  flag variable
//             wordIndex = 0;
//             //  Call the 'nextWord' function to concat the message into the game.
//             game.time.events.repeat(letterDelay, letter.length, nextWord, this);
//             //  Advance to the next letter
//             letterIndex++;
//         }
//
//         function nextWord(){
//             //  Add the next letter onto the text string
//             text.text = text.text.concat(letter[wordIndex]);
//             if (text1sound.isPlaying){
//                 text1sound.restart();
//             } else{
//                 text1sound.play();
//             }
//             //  Advance the word index to the next word in the line
//             wordIndex++;
//             //  Last word?
//             if (wordIndex === letter.length){
//                 //  Get the next line after the lineDelay amount of ms has elapsed
//                 game.time.events.add(letterDelay, nextLine, this);
//             }
//         }
        
        // function addChoices(){
        //     choice1 = game.add.text(100, 155, 'Go to UBC', { font: "18px Questrial", fill: "#ffffff"});
        //     choice2 = game.add.text(670, 155, 'Go to SFU', { font: "18px Questrial", fill: "#ffffff"});
        //     choice3 = game.add.text(100, 450, 'Go to BCIT', { font: "18px Questrial", fill: "#ffffff"});
        //     choice4 = game.add.text(670, 450, 'Study music', { font: "18px Questrial", fill: "#ffffff"});
        //
        //     choice1.anchor.x = 0.5;
        //     choice1.anchor.y = 0.5;
        //     choice2.anchor.x = 0.5;
        //     choice2.anchor.y = 0.5;
        //     choice3.anchor.x = 0.5;
        //     choice3.anchor.y = 0.5;
        //     choice4.anchor.x = 0.5;
        //     choice4.anchor.y = 0.5;
        //
        //     choice1.angle = 5;
        //     choice2.angle = -6;
        //     choice3.angle = 4;
        //     choice4.angle = -3;
        //
        //     choice1.inputEnabled = true;
        //     choice2.inputEnabled = true;
        //     choice3.inputEnabled = true;
        //     choice4.inputEnabled = true;
        //
        //     choice1.input.useHandCursor = true;
        //     choice2.input.useHandCursor = true;
        //     choice3.input.useHandCursor = true;
        //     choice4.input.useHandCursor = true;
        //
        //     choice1.events.onInputDown.add(nextDialogue, this);
        //     choice2.events.onInputDown.add(nextDialogue, this);
        //     choice3.events.onInputDown.add(nextDialogue, this);
        //     choice4.events.onInputDown.add(nextDialogue, this);
        //
        //     swayChoices = true;
        // }
        
        
        
        // Update text box when X is pressed.
        // if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.endOfDialogue){
        //     text.endOfDialogue = false;
        //     content = "What would you like\nto do after\nhighschool?";
        //     text.text = '';
        //     nextLine();
        //
        //     // Display the choices that you have
        //     game.time.events.add(Phaser.Timer.SECOND*4, addChoices, this);
        // }
        
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

        // end dialogue key press function
        function dialogueKeyPress(char) {
            if(char == 'x' && text.endOfDial7) {
                text.endOfDial7 = false;
                text.text = '';
                nextLine(holdEndDialogue[1]);
            }
            if(char == 'x' && text.endOfDial8) {
                text.endOfDial8 = false;
                text.text = '';
                nextLine(holdEndDialogue[2]);
            }
            if(char == 'x' && text.endOfDial9) {
                text.endOfDial9 = false;

                console.log('GO TO THE END!!!');
                // TRANSITION TO NEXT SCENE
                // NEEDS WORK ***************
                // NEEDS WORK ***************
                // NEEDS WORK ***************
                // NEEDS WORK ***************
                // NEEDS WORK ***************
            }
        }

        
        // function nextDialogue(){
        //     // Get rid of choices.
        //     console.log('nextDialogue works!');
        //     swayChoices = false;
        //     choice1.destroy();
        //     choice2.destroy();
        //     choice3.destroy();
        //     choice4.destroy();
        //
        //     // Print out the next batch of dialogue.
        //     // when printing new text:
        //     //
        //     //      - disable FLAG
        //     //      - dialogueNum++
        //     //      - change the message
        //     //      - clear the text var
        //     //      - call the function
        //     // dialogueNum++;
        //     // dialogueNum is: 1
        //     // content = "It didn't really\nmatter, did it?";
        //
        //     text.text = '';
        //     game.time.events.add(Phaser.Timer.SECOND*2, nextLine, this);
        // }
        
        // Setup the background fade in. and more dialogue.
        // if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.dialogueAfterChoice){
        //     // Print out more dialogue
        //     text.dialogueAfterChoice = false;
        //     dialogueNum++;
        //     // dialogueNum is: 2
        //     content = 'You were forced\nto take over\nthe family business...';
        //     text.text = '';
        //     nextLine();
        // }
        // if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.dialogueAfterChoice2){
        //     // Print out more dialogue
        //     text.dialogueAfterChoice2 = false;
        //     dialogueNum++;
        //     // dialogueNum is: 3
        //     content = 'However...';
        //     text.text = '';
        //     nextLine();
        // }
        //
        //
        //
        //
        // if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.dialogueAfterChoice3){
        //     // Print out more dialogue
        //     text.dialogueAfterChoice3 = false;
        //     dialogueNum++;
        //     // dialogueNum is: 4
        //     content = 'Even then,\nyou made your\nown choice.';
        //     text.text = '';
        //     nextLine();
        //
        //     // text.dialogueAfterChoice4 is: true
        //
        //     // Display the CHOOSEEEEEEEEEEEEE INSTRUCTION
        //     game.time.events.add(Phaser.Timer.SECOND*3, function(){
        //         createTypeableWord('CHOOSE', 350, 350);
        //     }, this);
        // }
        
        
        
        
        
        // function createTypeableWord(typeThis, xPos, yPos){
        //     var word = typeThis;
        //     var typeThisWord = [];
        //
        //     var xHold = xPos;
        //
        //     for (var i = 0; i < word.length; i++){
        //         typeThisWord[i] = game.add.text(xHold, yPos, word[i], { font: "12px Old School Adventures", fill: "#ffffff" });
        //         typeThisWord[i].typed = false;
        //         typeThisWord[i].isCurrChar = false;
        //         xHold += 15;
        //     }
        //     typeThisWord[0].isCurrChar = true;
        //     typeableWords.push(typeThisWord);
        //
        //     console.log('create typeable word fn works!');
        // }
        
        // Alternate version with added gravity.
        // used for the majority of words.
        function createTypeableWord_v2(typeThis, xPos, yPos){
            var word = typeThis;
            var typeThisWord = [];
            
            var xHold = xPos;
            
            for (var i = 0; i < word.length; i++){
                typeThisWord[i] = game.add.text(xHold, yPos, word[i], { font: "24px Questrial", fill: "#ffffff" });
                typeThisWord[i].typed = false;
                typeThisWord[i].isCurrChar = false;
                game.physics.arcade.enable(typeThisWord[i]);
                typeThisWord[i].body.gravity.x = -50;
                xHold += 15;
            }
            typeThisWord[0].isCurrChar = true;
            typeableWords.push(typeThisWord);
            
            console.log('create typeable word fn works!');
        }
        
        
        
        
        // Make the CHOOSE instruction typeable and each letter grow and shrink ****** IMPORTANT
        // to indicate it needs to be typed.
//         if (typeableWords.length == 1 && tutorialChoose){
//             tutorialChoose = false;
// //            growShrink(typeableWords[0]);
// //            console.log('code reaches here');
// //            // Create correct-letter array for the CHOOSE word.
// //            for (var i = 0; i < typeableWords[0].length; i++){
// //                typeableWords[0][i].typed = false;
// //                typeableWords[0][i].isCurrChar = false;
// //            }
// //            console.log('code reaches after there');
//
//             // Set .isCurrChar for sequential buton pressing.
// //            typeableWords[0][0].isCurrChar = true;
//
//             // Catch all key inputs.
//             game.input.keyboard.addCallbacks(this, null, null, keyPress);
//
//         }
        
        
        
        
        
        // All important keyPress function (will modify after functionality works)
        // function keyPress(char){
        //     console.log('keypress works');
        //     console.log('char: ' + char);
        //
        //     // Loop through CHOOSE and when match, change colour
        //     // .isCurrChar ****** SOLUTION TO MY FUTURE PROBLEM(type in sequential order)
        //     for (var i = 0; i < typeableWords[0].length; i++){
        //         if (typeableWords[0][i].typed == false && typeableWords[0][i].isCurrChar){
        //             // check (char == this letter) ? change colour : ---
        //             if (typeableWords[0][i].text.toLowerCase() == char){
        //                 console.log('typed the correct key');
        //
        //                 // Change text color
        //                 typeableWords[0][i].fill = '#5683ff';
        //
        //                 // why does doing this change alll to true????!!!****FIXED
        //                 typeableWords[0][i].typed = true;
        //
        //                 // next letter is the curr char.
        //                 if (i != typeableWords[0].length - 1){
        //                     typeableWords[0][i].isCurrChar = false;
        //                     typeableWords[0][i+1].isCurrChar = true;
        //                 }
        //
        //                 break;
        //             } else {
        //                 // restart word.
        //                 restartWord(typeableWords[0]);
        //             }
        //         } else{
        //             continue;
        //         }
        //     }
        //
        //     // if all CHOOSE is typed then move on. (only need to check the last character)
        //     if (typeableWords[0][5].typed && tutorialChoose){
        //         tutorialChoose = false;
        //         // delete key catcher
        //         game.input.keyboard.onPressCallback = null;
        //
        //         // delay delete CHOOSE, Text box
        //         // v    v   v   v   v
        //         // fade in new BG
        //         // v    v   v   v   v
        //         // start WORD TYPING MINIGAME
        //
        //         game.time.events.add(Phaser.Timer.SECOND*3, function(){
        //             text.text = '';
        //             border.destroy();
        //
        //             destroyWord(typeableWords[0]);
        //             typeableWords.splice(0, 1);
        //
        //             choiceBG.loadTexture('bg_1');
        //             // ****** NEED TO IMPLEMENT FADE
        //
        //             typingMiniGame = true;
        //         }, this);
                
//                game.time.events.add(Phaser.Timer.SECONDS*5, function(){
//                    console.log('code reaches here!!!!'); // NEVER REACHES HERE!!!!!!NOOOOO
//                    
//                    choiceBG.loadTexture('bg_1');
//                }, this);
//             }
//         }
        
        
        
        // IMPLEMENT TYPING MINIGAME
        
        // function for creating a random word (-/0/+) at random y.
        function createRandomWord(){
//            console.log('fn called');
            var negOrPos = Math.round(Math.random());
            var yRandPos = Math.round(Math.random()*400) + 100;
            // only for 3 words.
            // make it for 20 words.
            // colourize to differentiate
            var randIndex = Math.round(Math.random()*14);
            if (negOrPos == 0){
                createTypeableWord_v2(negativeWords[randIndex], 800, yRandPos);
                // attach neg or pos identifier to last appended word.
                typeableWords[typeableWords.length-1].isNeg = true;
            } else if (negOrPos == 1){
                createTypeableWord_v2(positiveWords[randIndex], 800, yRandPos);
                // attach neg or pos identifier to last appended word.
                typeableWords[typeableWords.length-1].isNeg = false;
            }
        }
        
        if (typingMiniGame) {
            typingMiniGame = false;
            
            // Only creates one ******* need to fix!!!! *******
            // ****** NEED TO DO:
            // -- generate random word
            // -- generate at random Y location
            // -- generate at 1.5 second intervals (adjustable)
            // -- generate until 1 of 3 conditions met:
            //      - type enough + words (positive)
            //      - type enough - words (negative)
            //      - miss enough words (neutral)
            // createTypeableWord_v2('type this as fast as you can!', 1200, 300);
            
            // looped event:
            // game.time.events.loop(delay, fn, this);


            // ***** Create the sprites that display count progress.
            posBar = game.add.sprite(10, 10, 'pos_bar');
            negBar = game.add.sprite(40, 10, 'neg_bar');
            neutBar = game.add.sprite(70, 10, 'neut_bar');
            updateProgressBar = true;

            // ************* MAIN LOOP MECHANIC IS HERE *************
            wordsLoop = game.time.events.loop(Phaser.Timer.SECOND*1.5, createRandomWord, this);
            
            game.input.keyboard.addCallbacks(this, null, null, keyPressV2);
            // *****************************************************************
        }

        if(updateProgressBar) {
            // update progress bars proportionally to their respective count.
            posBar.scale.setTo(1, positiveChoice/20);
            negBar.scale.setTo(1, negativeChoice/20);
            neutBar.scale.setTo(1, neutralChoice/20);
        }


        if(processEndOfDialogue) {
            processEndOfDialogue = false;
            // do the end dialogue stuff.
            game.add.tween(posBar).to({alpha:0}, 2000, Phaser.Easing.Default, true, 0, 0, false);
            game.add.tween(negBar).to({alpha:0}, 2000, Phaser.Easing.Default, true, 0, 0, false);
            game.add.tween(neutBar).to({alpha:0}, 2000, Phaser.Easing.Default, true, 0, 0, false);

            if(positiveChoice == 20) {
                // process positive dialogue.
                holdEndDialogue = posi_speech;
                game.time.events.add(2500, function(){
                    nextLine(holdEndDialogue[0], 250, 150, 'milo');
                    game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
                });

            } else if(negativeChoice == 20) {
                // process negative dialogue.
                holdEndDialogue = nega_speech;
                game.time.events.add(2500, function(){
                    nextLine(holdEndDialogue[0], 250, 150, 'milo');
                    game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
                });

            } else {
                // process neutral dialogue.
                holdEndDialogue = neut_speech;
                game.time.events.add(2500, function(){
                    nextLine(holdEndDialogue[0], 250, 150, 'milo');
                    game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
                });
            }
        }
        
        // main loop for typing mini game
        
        // This check actually goes at the end of every keyPress.
//        if (positiveChoice == 10 || negativeChoice == 10 || neutralChoice == 10)
        
        
        
        // keyPress for the mini game portion
        
        // I only just realized that i should have used objects 10/31/17
        
        function keyPressV2(char){
//            console.log('keypress works again');
            
            // check char against all words and their currChar.
            for (var i = 0; i < typeableWords.length; i++){
                // check against all characters
                for (var j = 0; j < typeableWords[i].length; j++){
                    if (typeableWords[i][j].typed == false && typeableWords[i][j].isCurrChar){
                        // check (char == this letter) ? change colour : ---
                        if (typeableWords[i][j].text.toLowerCase() == char){
//                            console.log('typed the correct key');
                            
                            // Change text color
                            typeableWords[i][j].fill = '#5683ff';
                            
                            // why does doing this change alll to true????!!!****FIXED
                            typeableWords[i][j].typed = true;
                            
                            // next letter is the curr char.
                            if (j != typeableWords[i].length - 1){
                                typeableWords[i][j].isCurrChar = false;
                                typeableWords[i][j+1].isCurrChar = true;
                            } else {
                                // ***** j is the LAST CHARACTER
                                console.log('WORD FINISHED');

                                if (typeableWords[i].isNeg){
                                    negativeChoice++;
                                    console.log('negChoice: ' + negativeChoice);
                                } else {
                                    positiveChoice++;
                                    console.log('posChoice: ' +  positiveChoice);
                                }

                                destroyWord(typeableWords[i], i);

                                if (positiveChoice == 20 || negativeChoice == 20 || neutralChoice == 20) {
                                    // MOVE ONTO THE NEXT STAGE *******************
                                    // ********************************************
                                    console.log('You-ve reached a far point!');

                                    game.input.keyboard.onPressCallback = null;
                                    game.time.events.remove(wordsLoop);
                                    processEndOfDialogue = true;

                                }
                            }

                            // essential for some reason!!!!
                            break;
                        } else {
                            // restart word.
                            restartWord(typeableWords[i]);
                        }
                    } else{
//                        continue;
                    }
                    if (typeableWords[i][typeableWords[i].length-1].typed == true){
                        // when last letter is typed please update arrays and destroy word.
                        // console.log('WORD FINISHED');
                        //
                        // if (typeableWords[i].isNeg){
                        //     negativeChoice++;
                        //     console.log('negChoice: ' + negativeChoice);
                        // } else {
                        //     positiveChoice++;
                        //     console.log('posChoice: ' +  positiveChoice);
                        // }
                        //
                        // destroyWord(typeableWords[i], i);
                        //
                        // if (positiveChoice == 25 || negativeChoice == 25 || neutralChoice == 25) {
                        //     // MOVE ONTO THE NEXT STAGE *******************
                        //     // ********************************************
                        //     console.log('You-ve reached a far point!');
                        //
                        // }
                        // Check choice counts
                        //      if not maxed yet, increment appropriate num
                        //      and destroy word.
                        // Else
                        //      when maxed, destroy all words
                        //
                    }
                }
            }
        }
        
        // Destroy word
        function destroyWord(word, index){
            for (var i = 0; i < word.length; i++){
                word[i].destroy();
            }

            // splice the typeablewords array
            typeableWords.splice(index, 1);
            console.log('word is destroyed');
        }
        
        // Restart word
        function restartWord(word){
            for (var i = 0; i < word.length; i++){
                word[i].fill = '#ffffff';
                word[i].typed = false;
                word[i].isCurrChar = false;
            }
            word[0].isCurrChar = true;
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

        // CHECK if typeablewords are out of world bounds *********
        // When out of world bounds DESTROY word. (and update neutral count).

        for(var i = 0; i < typeableWords.length; i++) {
            var firstLtr = typeableWords[i][0];

            if(firstLtr.x < 500) {
                // start checking if the word should be destroyed.
                typeableWords[i].startChecking = true;
            }
        }

        for(var i = 0; i < typeableWords.length; i++) {
            var indexLast = typeableWords[i].length - 1;
            var LastLetter = typeableWords[i][indexLast];

            if(LastLetter.inWorld == false && typeableWords[i].startChecking) {
                destroyWord(typeableWords[i], i);
                // update neutral count.
                neutralChoice++;

                // check if neutral count is 25 or whatver number
                if(neutralChoice == 20) {
                    // Doing end of minigame stuff
                    console.log('You-ve reached a far point');

                    game.input.keyboard.onPressCallback = null;
                    game.time.events.remove(wordsLoop);
                    processEndOfDialogue = true;
                }

                console.log('neutral ct: ' + neutralChoice);
            }
        }

//        console.log('update has run this times');
    },
    
    render: function(){
        game.debug.pointer(game.input.activePointer);
    }
}