var gameIntro = function(game){};
var moveRight = true;
var menu_bg;

gameIntro.prototype = {
    create: function(){
        // Create functions to move to different states.
        menu_bg = game.add.sprite(0, 0, 'menu_bg');
        
        function playGame(){
            // ***** RETURN TO NORMAL WHEN DONE
//            game.state.start('TheGame');
//            game.state.start('Part2');
//            game.state.start('Part4');
            
//            game.add.tween(menu_bg).to({ alpha: 0 }, 2000, Phaser.Easing.Default, true, 0, 0, false);
//            game.add.tween(playButton).to({ alpha: 0 }, 2000, Phaser.Easing.Default, true, 0, 0, false);
            var tween = game.add.tween(game.world).to({ alpha: 0 }, 2000, Phaser.Easing.Default, true, 0, 0, false);
            tween.onComplete.add(function(){game.state.start('TheGame');}, this);
            
        };
        
        function viewCredits(){
            game.state.start('Credits');
        };
        
        // Create the Play and Credits button.
        var playButton = game.add.button(250, 300, 'playBtn', playGame, this);
        var creditsButton = game.add.button(250, 450, 'credBtn', viewCredits, this);
    },
    
    update: function(){
        if (menu_bg.x > -400 && moveRight){
            menu_bg.x -= 0.5;
        } else{
            moveRight = false;
        }
        if (menu_bg.x < 0 && !moveRight){
            menu_bg.x += 0.5;
        } else{
            moveRight = true;
        }
    },
    
    render: function(){
//        game.debug.spriteInfo(menu_bg, 32, 32);
        game.debug.pointer(game.input.activePointer);
    }
};