var part3 = function(game){};

var protect_speech = [
    "SHILOH!",
    "I'll save you\nthis time!!",
    
    ".",
    ". .",
    ". . .",
    
    "NOOO!!",
    ".",
    ". .",
    ". . ."
];
var protect_ending_speech = "Nothing is stronger\nthan fate?";
var pt2_start_end = false;

var background, charr, friend, mush, mush2, mush3;
var pt2_tint;
var num = 0, num2 = 0, num3 = 0, num4 = 0;
var alive = true, alive2 = true, alive3 = true;
var place = true;
var pt2_blk_bg;

part3.prototype = {
    create: function(){
        // Noah's part to complete.
        console.log('youre in part 3');

        //set bounds to 800 x 600
        game.world.setBounds(0, 0, 800, 600);

        // pre dialogue setup
        dialogue_Num = 0;
        border.created = false;

        //game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.sprite(0, 0, 'part2_bg');
        pt2_tint = game.add.sprite(0, 0, 'pt2_tint');
        pt2_tint.alpha = 0;
        game.add.tween(pt2_tint).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.InOut, true, 0, -1, true);

        player = game.add.sprite(30, 460, 'char');
        player.anchor.setTo(.5,1);
        player.scale.setTo(1, 1);
        player.immovable = true;
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        // Add player animations
        player.animations.add('left', [0, 1, 2], 5, true);
        player.animations.add('right', [4, 5, 6], 5, true);

        friend = game.add.sprite(400, 460,'pt2_buddy');
        friend.anchor.setTo(.5,1);
        friend.scale.setTo(1.5, 1.5);

        mush = game.add.sprite(700, 460, 'mon_1');
        mush.anchor.setTo(.5,1);
        mush.scale.setTo(2);
        game.physics.enable([player, mush], Phaser.Physics.ARCADE);
        mush.body.immovable = true;

        mush2 = game.add.sprite(-100, 460, 'mon_1_rev');
        mush2.anchor.setTo(.5,1);
        mush2.scale.setTo(2);
        game.physics.enable([player, mush2], Phaser.Physics.ARCADE);

        mush3 = game.add.sprite(700, 460, 'mon_1');
        mush3.anchor.setTo(.5,1);
        mush3.scale.setTo(2);
        game.physics.enable([player, mush3], Phaser.Physics.ARCADE);

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // Process dialogue.
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

        // dialogue handling.
        function dialogueKeyPress(char) {
            if(char == 'x' && text.endOfDial1) {
                text.endOfDial1 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(protect_speech[1]);

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
            if(char == 'x' && text.endOfDial2) {
                text.endOfDial2 = false;
                text.text = '';
                x_continue.text = '';
                border.created = false;
                border.destroy();

                player.immovable = false;
            }
        }

        // Delay start of dialogue.
        game.time.events.add(1500, function(){
            nextLine(protect_speech[0], 250, 150, 'milo');
            game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);

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
        });

        // game.state.start('Part4');

        // wiggle function
        function wiggle(aProgress, aPeriod1, aPeriod2) {
            var current1 = aProgress * Math.PI * 2 * aPeriod1;
            var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);

            return Math.sin(current1) * Math.cos(current2);
        }
    },
    
    update: function(){

        // when player moves past a certain point, trigger mush movement!
        if(player.x >= 200){
            mush.body.velocity.x = -45;
            place = false;
        }

        // resets charr velocity, so he doesn't get stuck in movement.
        player.body.velocity.x = 0;

        if(player.x >= 200 ){
            mush.body.velocity.x = -50;
            place = false;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !player.immovable)
        {
            player.x -= 4;
            player.animations.play('left');
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !player.immovable)
        {
            player.x += 4;
            player.animations.play('right');
        } else {
                // Stop and stand still
                player.animations.stop();
                player.frame = 3;
        }

//        if(charr.overlap(mush)){
//            charr.tint = 0xff00ff;
//        }
        if (friend.overlap(mush)&& alive == true && !pt2_start_end) {
            num2++;
            console.log(num2);
            if(num2 >= 30 && num2 <= 59){
                friend.tint = '0xe9f4c1';
            } else if(num2 >= 60 && num2 <= 89){
                friend.tint = '0xf4cfcb';
            } else if(num2 >= 90 && num2 <= 119){
                friend.tint = '0xefad9a';
            } else if(num2 >= 120){

                // set trigger, stop player, play bad dialogue
                pt2_start_end = true;
                player.immovable = true;

                game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);

                game.time.events.add(2000, function(){
                    friend.loadTexture('didnt_help');
                });

                game.time.events.add(4000, function(){
                    nextLine(protect_speech[5], 250, 150, 'milo');
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
                });

            }


        }
        if (friend.overlap(mush2)&& alive2 == true && !pt2_start_end) {
            num2++;
            console.log(num2);
            if(num2 >= 30 && num2 <= 59){
                friend.tint = '0xe9f4c1';
            } else if(num2 >= 60 && num2 <= 89){
                friend.tint = '0xf4cfcb';
            } else if(num2 >= 90 && num2 <= 119){
                friend.tint = '0xefad9a';
            } else if(num2 >= 120){
                // set trigger, stop player, play bad dialogue
                pt2_start_end = true;
                player.immovable = true;

                game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);

                game.time.events.add(2000, function(){
                    friend.loadTexture('didnt_help');
                });

                game.time.events.add(4000, function(){
                    nextLine(protect_speech[5], 250, 150, 'milo');
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
                });
            }


        }
        if (friend.overlap(mush3)&& alive3 == true && !pt2_start_end) {
            num2++;
            console.log(num2);
            if(num2 >= 30 && num2 <= 59){
                friend.tint = '0xe9f4c1';
            } else if(num2 >= 60 && num2 <= 89){
                friend.tint = '0xf4cfcb';
            } else if(num2 >= 90 && num2 <= 119){
                friend.tint = '0xefad9a';
            } else if(num2 >= 120){
                // set trigger, stop player, play bad dialogue
                pt2_start_end = true;
                player.immovable = true;

                game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);

                game.time.events.add(2000, function(){
                    friend.loadTexture('didnt_help');
                });

                game.time.events.add(4000, function(){
                    nextLine(protect_speech[5], 250, 150, 'milo');
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
                });
            }


        }
        if (player.overlap(mush) && game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            num++;
            console.log(num);
            if(num >= 30 && num <= 59){
                // mush.tint = 0xf4f441;
                mush.loadTexture('mon_2', 0);
            } else if(num >= 60 && num <= 89){
                mush.loadTexture('mon_3', 0);
            } else if(num >= 90 && num <= 119){
                mush.loadTexture('mon_4', 0);
            } else if(num >= 120){
                alive = false;
                mush.kill();
                //mush.destroy();
                mush2.body.velocity.x = 50;
            }


        }
        if (player.overlap(mush2) && game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            num3++;
            console.log(num3);
            if(num3 >= 30 && num3 <= 59){
                mush2.loadTexture('mon_2_rev', 0);
            } else if(num3 >= 60 && num3 <= 89){
                mush2.loadTexture('mon_3_rev', 0);
            } else if(num3 >= 90 && num3 <= 119){
                mush2.loadTexture('mon_4_rev', 0);
            } else if(num3 >= 120){
                alive2 = false;
                mush2.kill();
                //mush.destroy();
                mush3.body.velocity.x = -50;
            }


        }
        if (player.overlap(mush3) && game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            num4++;
            console.log(num4);
            if(num4 >= 30 && num4 <= 59){
                mush3.loadTexture('mon_2', 0);
            } else if(num4 >= 60 && num4 <= 89){
                mush3.loadTexture('mon_3', 0);
            } else if(num4 >= 90 && num4 <= 119){
                mush3.loadTexture('mon_4', 0);
            } else if(num4 >= 120){
                alive3 = false;
                mush3.kill();
            }


        }

        // ***** Pulls the player!!! (collision)
        // game.physics.arcade.collide(player, mush);


        // game.physics.arcade.collide(player, mush);

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



        // process end of scene
        if(!mush.alive && !mush2.alive && !mush3.alive && !pt2_start_end) {
            console.log('process end dialogue pt2');

            pt2_start_end = true;
            player.immovable = true;

            game.input.keyboard.addCallbacks(this, null, null, dialogueKeyPress);

            game.time.events.add(2000, function(){
                friend.loadTexture('didnt_help');
            });

            game.time.events.add(4000, function(){
                nextLine(protect_speech[5], 250, 150, 'milo');
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
            });
        }




        // wiggle function
        function wiggle(aProgress, aPeriod1, aPeriod2) {
            var current1 = aProgress * Math.PI * 2 * aPeriod1;
            var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);

            return Math.sin(current1) * Math.cos(current2);
        }

        // Process dialogue.
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

        // dialogue handling.
        function dialogueKeyPress(char) {
            if(char == 'x' && text.endOfDial3) {
                text.endOfDial3 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(protect_speech[6]);
            }
            if(char == 'x' && text.endOfDial4) {
                text.endOfDial4 = false;
                text.text = '';
                x_continue.text = '';
                nextLine(protect_speech[7]);
            }
            if(char == 'x' && text.endOfDial5) {
                text.endOfDial5 = false;
                text.text = '';
                x_continue.text = '';
                border.destroy()

                pt2_blk_bg = game.add.sprite(0, 0, 'blk_bg');
                pt2_blk_bg.alpha = 0;

                game.add.tween(pt2_blk_bg).to({alpha:1}, 2000, Phaser.Easing.Default, true, 0, 0, false);


                text = game.add.text(border.x+20, border.y+15, '', { font: "62px dpcomic", fill: "#ffffff" });
                game.time.events.add(4000, function(){
                    nextLine(protect_ending_speech, 150, 150);
                });
            }
            if (char == 'x' && text.endOfDial6){
                text.endOfDial6 = false;
                text.text = '';
                x_continue.text = '';
                border.created = false;

                game.time.events.add(Phaser.Timer.SECOND*1, function(){
                    game.state.start('Part4');
                })
            }
        }
    },
    
    render: function(){
        
    }
}