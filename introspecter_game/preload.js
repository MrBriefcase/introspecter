var preload = function(game){};

preload.prototype = {
    preload: function(){
        // Load up all the necessary game assets
        
        // Play button and Credit button. and back button.
        game.load.image('playBtn', './images/play_button.png');
        game.load.image('credBtn', './images/credits_button.png');
        game.load.image('backBtn', './images/back_btn.png');
        
        // Player sprite and 1st background. and ground.
        game.load.image('intro_bg', './images/intro_bg.png');
        game.load.image('past_bg', './images/bg_1_to_3.png');
        game.load.image('bg_1', './images/bg_proto.png');
        game.load.image('mainChar', './images/photo.jpg');
        game.load.image('ground', './images/ground.png');
        // test spritesheets
        game.load.spritesheet('char', './images/test_spritesheet.png', 50, 150);
        game.load.spritesheet('char_kid', './images/kiddy_spritesheet.png', 19, 53);
        
        // Load buddy char. and border. and fruit.
        game.load.image('buddy', './images/buddy.png');
        game.load.image('border', './images/border.png');
        game.load.image('border2', './images/border_v2.png');
        game.load.image('border_v3', './images/dialogue_box.png');
        game.load.image('fruit', './images/fruit1_1.png');
        game.load.image('fruit2', './images/fruit1_2.png');
        game.load.image('fruit3', './images/fruit1_3.png');
        game.load.image('fruit4', './images/fruit1_4.png');
        game.load.image('fruit5', './images/fruit5.png');
        
        // Load up music and sounds.
        game.load.audio('introTest', ['./audio/Cosmic_Disaster_OST.wav']);
        game.load.audio('FloFliz', ['./audio/FloFliz.mp3']);
        game.load.audio('text1sound', './audio/text_sound1.wav');
        
        // Load test videos.
        game.load.video('jump_boy', './jump_boy.mp4');
        
        // Setup variables.
        var buddy;
        var border;
        var player;
        var cursors;
        var music;
        var text1sound;
        var ground;
        var theGround;
        var video;
    },
    
    create: function(){
        // Pass the state to the intro screen (menu).
        game.state.start('GameIntro');
    }
};