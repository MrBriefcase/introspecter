var preload = function(game){};

preload.prototype = {
    preload: function(){
        // Load up all the necessary game assets
        
        // Play button and Credit button. and back button.
        game.load.image('playBtn', './images/play_button.png');
        game.load.image('credBtn', './images/credits_button.png');
        game.load.image('backBtn', './images/back_btn.png');
        
        // Player sprite and 1st background.
        game.load.image('bg_1', './images/bg_proto.png');
        game.load.image('mainChar', './images/photo.jpg');
        
        // Load buddy char. and border. and fruit.
        game.load.image('buddy', './images/buddy.png');
        game.load.image('border', './images/border.png');
        game.load.image('border2', './images/border_v2.png');
        game.load.image('fruit', './images/fruit.png');
        game.load.image('fruit2', './images/fruit2.png');
        game.load.image('fruit3', './images/fruit3.png');
        game.load.image('fruit4', './images/fruit4.png');
        game.load.image('fruit5', './images/fruit5.png');
        
        // Load up music and sounds.
        game.load.audio('introTest', ['./audio/Cosmic_Disaster_OST.wav']);
        game.load.audio('FloFliz', ['./audio/FloFliz.mp3']);
        
        // Setup variables.
        var buddy;
        var border;
        var player;
        var cursors;
        var music;
    },
    
    create: function(){
        // Pass the state to the intro screen (menu).
        game.state.start('GameIntro');
    }
};