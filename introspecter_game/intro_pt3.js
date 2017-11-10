var intro_pt3 = function(game){};
var intro_pt3_speech = [
    "It's alright.",
    
    "Sometimes bad things\njust happen.",
    
    "All good things\nmust come to an end.",
    
    "When that is?",
    
    "You won't know.",
    
    "Look back on yourself",
    
    "For me."
];

intro_pt3.prototype = {
    create: function(){
        console.log('youre in intro_pt3');
        
        game.world.setBounds(0, 0, 2400, 600);
        dialogue_Num = 0;
        border = game.add.sprite(50, 50, null);
        border.created = false;
        
        game.time.events.add(Phaser.Timer.SECOND*2, function(){
            nextLine(intro_pt3_speech[0], 75, 150, 'friend');
            game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
        });
        
        // text printing functions
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
//                border = game.add.sprite(200, 200, 'border2');
                border.x = xpos;
                border.y = ypos;
                text = game.add.text(border.x+20, border.y+15, '', { font: "62px Questrial", fill: "#ffffff" });
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
            if(char =='x' && text.endOfDial1){
                text.endOfDial1 = false;
                text.text = '';
                nextLine(intro_pt3_speech[1]);
            }
            if(char =='x' && text.endOfDial2){
                text.endOfDial2 = false;
                text.text = '';
                nextLine(intro_pt3_speech[2]);
            }
            if(char =='x' && text.endOfDial3){
                text.endOfDial3 = false;
                text.text = '';
                nextLine(intro_pt3_speech[3]);
            }
            if(char =='x' && text.endOfDial4){
                text.endOfDial4 = false;
                text.text = '';
                nextLine(intro_pt3_speech[4]);
            }
            if(char =='x' && text.endOfDial5){
                text.endOfDial5 = false;
                text.text = '';
                nextLine(intro_pt3_speech[5]);
            }
            if(char =='x' && text.endOfDial6){
                text.endOfDial6 = false;
                text.text = '';
                nextLine(intro_pt3_speech[6]);
            }
            if(char =='x' && text.endOfDial7){
                text.endOfDial7 = false;
                text.text = '';
                music.stop();
                
                game.time.events.add(Phaser.Timer.SECOND*2, function(){game.state.start('Part2');})
            }
        }
        
        
        
        // setup music
        music = game.add.audio('intro3');
        music.loop = true;
        music.play();
    },
    
    update: function(){
        
    },
    
    render: function(){
        game.debug.pointer(game.input.activePointer);
    }
}