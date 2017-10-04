var part4 = function(game){};
var choice1, choice2, choice3, choice4;
var num23 = 1;

part4.prototype = {
    create: function(){
        // Part 4: 3rd mini-game event. Dialogue and choices.
        console.log('youre in part 4 (3rd minigame)');
        
        // Set world bounds and physics.
        game.world.setBounds(0, 0, 2400, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set music
        
        // Create character
        player = game.add.sprite(375, 225, 'mainChar');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        player.movable = false;
        
        // Create keyboard controls and camera
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        // Create dialogue and relevant materials.
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
        
        
        
        // Update text box when X is pressed.
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) && text.endOfDialogue){
            text.endOfDialogue = false;
            dialogueNum++;
            content = "What would you like\nto do after\nhighschool?";
            text.text = '';
            nextLine();
            
            // Display the choices that you have
            choice1 = game.add.text(50, 150, 'Later', { font: "24px Old School Adventures", fill: "#ffffff"});
        }
        
        // Swaying motion of text
//        if (choice1.move){
//            choice1.angle += 1;
//            choice1.fontSize += 1;
//        }
    },
    
    render: function(){
        
    }
}