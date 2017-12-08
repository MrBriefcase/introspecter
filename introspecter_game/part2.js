var part2 = function(game){};

var black_bg;
var fourthStop = false;

var fruit1, fruit2, fruit3, fruit4;
var fruits = [fruit1, fruit2, fruit3, fruit4];

var part2_intro_speech = "You were never\na good person.";

var part2_ending_speech = "But still you had a choice?";

var dyingFruitSpeech = [
    "What the...",
    "Alright, I'll\ndig deep.",
    "For you, Shiloh.",
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
var fruitCounter = 0;

var play_filter = false;
var fSrc, customUniforms;

var text_2;
var text_3;
var mashing_tutorial;
var bg, bg2;
var growBigger = true;
var border;

var camSpot;
var checkFruit;

var blood_texture;
var past_overlay;


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
        
        
        // TWEEEN THE WORLD BACK
        // game.add.tween(game.world).to({alpha:1}, 700, Phaser.Easing.Default, true, 0, 0, false);
        game.world.alpha = 1;
        
        // Create the bg image and later bg image. and ground.
        theGround = game.add.group();
        theGround.enableBody = true;
        ground = theGround.create(0, 440, 'ground');
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

        // Filter src.
        // fSrc = [
        //
        //     "precision mediump float;",
        //
        //     "uniform float     time;",
        //     "uniform vec2      resolution;",
        //     "uniform sampler2D iChannel0;",
        //
        //     "void main( void ) {",
        //
        //     "vec2 uv = gl_FragCoord.xy / resolution.xy;",
        //     "uv.y *= -1.0;",
        //     "uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);",
        //     "vec4 texColor = texture2D(iChannel0, uv);",
        //     "gl_FragColor = texColor;",
        //
        //     "}"
        // ];
        // customUniforms = {
        //     iChannel0: { type: 'sampler2D', value: bg.texture, textureData: { repeat: false } }
        // };
        
        
        // **** letter by letter functions
        function nextLine(speech, xpos, ypos, clr){
            if (!border.created){
                // create border
                border = game.add.sprite(200, 200, 'border');
                border.loadTexture('border');
                border.x = xpos;
                border.y = ypos;
                text = game.add.text(border.x+20, border.y+15, '', { font: "24px dpcomic", fill: "#000000" });
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

        
        // setup intro stuff
        black_bg = game.add.sprite(0, 0, 'blk_bg');

        game.time.events.add(Phaser.Timer.SECOND*2, function(){
            text = game.add.text(border.x+20, border.y+15, '', { font: "62px dpcomic", fill: "#ffffff" });
            nextLine(part2_intro_speech, 100, 150);
            game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);
        });
        
        function dialogueKeyPress(char){
            if (char == 'x' && text.endOfDial1){
                text.endOfDial1 = false;
                text.text = '';
                x_continue.text = '';
                black_bg.loadTexture(null);
                border.created = false;
                
                game.time.events.add(Phaser.Timer.SECOND*1, function(){nextLine(dyingFruitSpeech[0], 300, 150, 'milo'); 
                    music = game.add.audio('audio_pt1'); 
                    music.loop = true; 
                    music.play();
                });
            }
            
            // intro dialogue done, character in focus
            if (char == 'x' && text.endOfDial2){
                text.endOfDial2 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[1]);
            }
            if (char == 'x' && text.endOfDial3){
                text.endOfDial3 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[2]);
            }
            if (char == 'x' && text.endOfDial4){
                text.endOfDial4 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[3]);
            }
            if (char == 'x' && text.endOfDial5){
                text.endOfDial5 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                firstStop = true;

                // display ARROW TUTORIAL
                arrow_dir = game.add.sprite(620, 310, 'this_way');
                arrow_dir.alpha = 0.6;
                arrow_dir_show = true;
            }
            
            // *** first segment
            
            if (char == 'x' && text.endOfDial6){
                text.endOfDial6 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[5]);

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
            if (char == 'x' && text.endOfDial7){
                text.endOfDial7 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                nextLine(dyingFruitSpeech[6], 790, 150, 'milo');
            }
            if (char == 'x' && text.endOfDial8){
                text.endOfDial8 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[7]);
            }
            if (char == 'x' && text.endOfDial9){
                text.endOfDial9 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                secondStop = true;
            }
            
            // *** second segment
            
            if (char == 'x' && text.endOfDial10){
                text.endOfDial10 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[9]);

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
            if (char == 'x' && text.endOfDial11){
                text.endOfDial11 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                nextLine(dyingFruitSpeech[10], 1280, 150, 'milo');
            }
            if (char == 'x' && text.endOfDial12){
                text.endOfDial12 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[11]);
            }
            if (char == 'x' && text.endOfDial13){
                text.endOfDial13 = false;
                text.text = '';
                x_continue.text = '';
                border.loadTexture(null);
                border.created = false;
                player.movable = true;
                
                thirdStop = true;
            }
            
            // *** third Segment
            
            if (char == 'x' && text.endOfDial14){
                text.endOfDial14 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[13]);
            }
            if (char == 'x' && text.endOfDial15){
                text.endOfDial15 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[14]);
            }
            if (char == 'x' && text.endOfDial16){
                text.endOfDial16 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(dyingFruitSpeech[15]);
            }
            if (char == 'x' && text.endOfDial17){
                text.endOfDial17 = false;
                text.text = '';
                x_continue.text = '';
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

        // overlay
        past_overlay = game.add.sprite(0, 0, 'past_filter');
        past_overlay.fixedToCamera = true;

        // wiggle function
        function wiggle(aProgress, aPeriod1, aPeriod2) {
            var current1 = aProgress * Math.PI * 2 * aPeriod1;
            var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);

            return Math.sin(current1) * Math.cos(current2);
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
        // game.physics.arcade.overlap(player, fruits[0], eatFruit, null, this);
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
            fourthStop = false;
            
            player.movable = false;
            black_bg.loadTexture('blk_bg');
            // text = game.add.text(border.x+20, border.y+15, '', { font: "62px Questrial", fill: "#ffffff" });
            // black_bg.bringToTop();
            // text.bringToTop();
            game.add.tween(bg2).to({alpha:0}, 300, Phaser.Easing.Default, true, 0, 0, false);
            game.add.tween(player).to({alpha:0}, 300, Phaser.Easing.Default, true, 0, 0, false);
            game.add.tween(bg).to({alpha:0}, 300, Phaser.Easing.Default, true, 0, 0, false);
            game.add.tween(fruits[3]).to({alpha:0}, 300, Phaser.Easing.Default, true, 0, 0, false);
            border.created = true;
            
            game.time.events.add(Phaser.Timer.SECOND*2, function(){
                nextLine(part2_ending_speech, 1700, 150, 'ending');
            });
        }

        if (player.x > 550 && arrow_dir_show){
            arrow_dir_show = false;
            game.add.tween(arrow_dir).to({alpha:0}, 750, Phaser.Easing.Default, true, 0, 0, false);
        }

        // animate arrow instruction
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
        
        if (player.x > 1360 && secondStop){
            secondStop = false;
            player.movable = false;
            
            nextLine(dyingFruitSpeech[8], 975, 180, 'neutral');

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
        
        
        // 
        // Fruit eatting function!
        //
        function eatFruit(){
            player.movable = false;
            console.log('player touched fruit');
            // create growing x instruction
            text_2 = game.add.text(1175, 340, 'x', { font: "24px dpcomic", fill: "#ffffff" });

            text_3 = game.add.text(1170, 300, 'Mash "X"', { font: "20px dpcomic", fill: "#ffffff" });
            mashing_tutorial = game.add.tween(text_3).to({alpha: 0}, 1000, Phaser.Easing.Default, false, 0, 0, false);
            game.time.events.add(4000, function(){mashing_tutorial.start();});
            
            checkFruit = game.input.keyboard.addKey(Phaser.Keyboard.X);
            checkFruit.onDown.add(froo1);
        }
        function eatFruit2(){
            player.movable = false;
            console.log('player touched fruit2');
            // create growing x instruction
            text_2 = game.add.text(1325, 340, 'x', { font: "24px dpcomic", fill: "#ffffff" });
            
            checkFruit = game.input.keyboard.addKey(Phaser.Keyboard.X);
            checkFruit.onDown.add(froo2);
        }
        function eatFruit3(){
            player.movable = false;
            console.log('player touched fruit3');
            // create growing x instruction
            text_2 = game.add.text(1475, 340, 'x', { font: "24px dpcomic", fill: "#ffffff" });
            
            checkFruit = game.input.keyboard.addKey(Phaser.Keyboard.X);
            checkFruit.onDown.add(froo3);
        }
        function eatFruit4(){
            player.movable = false;
            console.log('player touched fruit4');
            // create growing x instruction
            text_2 = game.add.text(1625, 340, 'x', { font: "24px dpcomic", fill: "#ffffff" });
            
            checkFruit = game.input.keyboard.addKey(Phaser.Keyboard.X);
            checkFruit.onDown.add(froo4);
        }
        function eatFruit5(){
            player.movable = false;
            console.log('finished eating');

            // camera cutscene
            game.time.events.add(Phaser.Timer.SECOND, moveCamera, this);
        }
        function moveCamera(){
            game.camera.follow(camSpot, Phaser.Camera.FOLLOW_LOCKON, 0.005, 0.005);
            game.time.events.add(Phaser.Timer.SECOND*6, flashAndBG, this);
        }
        function flashAndBG(){
            music.stop();
            music = game.add.audio('audio_pt1_v2');
            music.loop = true;
            music.play();
            
            game.camera.flash(0xff0000, Phaser.Timer.SECOND*6);
            game.time.events.add(Phaser.Timer.SECOND*0.25, function(){
                // New bg
                bg.loadTexture('pt1_bg_red');

                // // sine wave filter.
                // filter = new Phaser.Filter(game, customUniforms, fSrc);
                // filter.set
                // bg.filters = [ filter ];
                // play_filter = true;

                // Add the blood texture fixed to camera
                blood_texture = game.add.sprite(0, 0, 'camera_blood');
                blood_texture.alpha = 0.7;
                blood_texture.fixedToCamera = true;
                blood_texture.bringToTop();

                // change fruits to dead bodies.
                fruits[0].loadTexture('dead_body_1');
                fruits[1].loadTexture('dead_body_2');
                fruits[2].loadTexture('dead_body_3');
                fruits[3].loadTexture('dead_body_4');
            }, this);
            game.time.events.add(Phaser.Timer.SECOND*10, function(){
                player.bringToTop();
                text.bringToTop();
                blood_texture.bringToTop();
                game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            }, this);
            game.time.events.add(Phaser.Timer.SECOND*11, function(){
                nextLine(dyingFruitSpeech[12], 1700, 160, 'milo');
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

                player.movable = true;
                finishedFirstFruit = true;
                fruitCounter = 0;
                text_2.text = '';

                checkFruit.onDown.remove(froo1);
            }

            if (eatingSound.isPlaying){
                eatingSound.restart();
            } else{
                eatingSound.play();
            }
        }

        function froo2(){
            fruitCounter++;
            if (fruitCounter == 7){
                // Change fruit texture
                fruits[1].loadTexture('fruit2_2');
                
            } else if (fruitCounter == 14){
                fruits[1].loadTexture('fruit2_3');
            } else if (fruitCounter == 21){
                fruits[1].loadTexture('fruit2_4');

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

        function froo3(){
            fruitCounter++;
            if (fruitCounter == 7){
                // Change fruit texture
                fruits[2].loadTexture('fruit3_2');
                
            } else if (fruitCounter == 14){
                fruits[2].loadTexture('fruit3_3');
            } else if (fruitCounter == 21){
                fruits[2].loadTexture('fruit3_4');

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

        function froo4(){
            fruitCounter++;
            if (fruitCounter == 7){
                // Change fruit texture
                fruits[3].loadTexture('fruit4_2');
                
            } else if (fruitCounter == 14){
                fruits[3].loadTexture('fruit4_3');
            } else if (fruitCounter == 21){
                fruits[3].loadTexture('fruit4_4');

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
                border.loadTexture('border');
                border.x = xpos;
                border.y = ypos;
                text = game.add.text(border.x+20, border.y+15, '', { font: "24px dpcomic", fill: "#000000" });
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

        // wiggle function
        function wiggle(aProgress, aPeriod1, aPeriod2) {
            var current1 = aProgress * Math.PI * 2 * aPeriod1;
            var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);

            return Math.sin(current1) * Math.cos(current2);
        }

        // filter updating.
        // if(play_filter) {
        //     filter.update();
        // }
    },
    
    render: function(){
        // game.debug.spriteInfo(player, 50, 50);
        // game.debug.pointer(game.input.activePointer);
    }
}