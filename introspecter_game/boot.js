var boot = function(game){};

// Do booting things here. Set sizes or whatever. Kinda not necessary.
boot.prototype = {
    preload: function(){
        game.load.image('examp', './images/white_logo.png');
    },
    
    create: function(){
        var example = game.add.sprite(game.world.centerX, game.world.centerY, 'examp');
        example.anchor.setTo(0.5, 0.5);
        
        // Preserves hard edges!!! (to maintain pixel look)
        game.stage.smoothed = false;
        
        // Pass the state to 'Preload'.
        game.time.events.add(Phaser.Timer.SECOND, nextState, this);
        
        function nextState(){
            game.state.start('Preload');
        }
    }
};