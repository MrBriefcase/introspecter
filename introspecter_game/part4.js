var part4 = function(game){};

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
        
        // Create keyboard controls
        cursors = game.input.keyboard.createCursorKeys();
        
        // Create dialogue.
        
    },
    
    update: function(){
        
    },
    
    render: function(){
        
    }
}