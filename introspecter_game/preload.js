var preload = function(game){};

WebFontConfig = {
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Questrial']
    },

    //  Custom fonts specified in a css file.
    custom: {
        families: ['yoster', 'Parisienne-Regular', 'dpcomic', 'orange-kid', 'saturno'],
        urls: ['./GameFonts.css']
    }
};

preload.prototype = {
    preload: function(){
        var example = game.add.sprite(game.world.centerX, game.world.centerY, 'examp');
        example.anchor.setTo(0.5, 0.5);
        // Load up all the necessary game assets

        // Load up the webfont script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Play button and Credit button. and back button. Menu stuff
        game.load.image('menu_bg', './images/MenuPage/MN_PG_v2.png');
        game.load.image('playBtn', './images/MenuPage/MenuPage_PlayBT.png');
        game.load.image('credBtn', './images/MenuPage/MenuPage_CreditBT.png');
        game.load.image('backBtn', './images/back_btn.png');
        game.load.image('introspecter', './images/title_logo.png');
        
        // instructions
        game.load.image('instructions', './images/instructions_v2.png');
        game.load.image('this_way', './images/go_right_v2.png');
        game.load.image('continue_x', './images/press_x.png');
        
        // Player sprite and 1st background. and ground.
        game.load.image('intro_bg', './images/intro_bg.png');
        game.load.image('past_bg', './images/bg_1_to_3_v2.png');
        game.load.image('bg_1', './images/bg_proto.png');
        game.load.image('mainChar', './images/photo.jpg');
        game.load.image('ground', './images/ground.png');
        game.load.image('blk_bg', './images/simple_blk_bg.png');
        
        // test spritesheets
        game.load.spritesheet('char', './images/test_spritesheet_v2.png', 50, 150);
        game.load.spritesheet('char_kid', './images/kiddy_spritesheet.png', 19, 53);
        game.load.spritesheet('buddy_kid', './images/friend_spritesheet_21x54.png', 21, 54);

        // various assets (intro, pt2)
        game.load.image('car', './images/car_placeholder.png');
        game.load.image('part2_bg', './images/Part2_BG.png');
        
        // Load buddy char. and border. and fruit. and dead bodies.
        game.load.image('buddy', './images/buddy.png');
        game.load.image('buddy_adult', './images/kid_friend/adult_friend_front.png');
        game.load.image('border', './images/border_v5.png');
        game.load.image('border2', './images/border_v2.png');
        game.load.image('border_v3', './images/dialogue_box.png');
        game.load.image('fruit1_1', './images/fruit1_1.png');
        game.load.image('fruit1_2', './images/fruit1_2.png');
        game.load.image('fruit1_3', './images/fruit1_3.png');
        game.load.image('fruit1_4', './images/fruit1_4.png');
        game.load.image('fruit2_1', './images/fruit2_1.png');
        game.load.image('fruit2_2', './images/fruit2_2.png');
        game.load.image('fruit2_3', './images/fruit2_3.png');
        game.load.image('fruit2_4', './images/fruit2_4.png');
        game.load.image('fruit3_1', './images/fruit3_1.png');
        game.load.image('fruit3_2', './images/fruit3_2.png');
        game.load.image('fruit3_3', './images/fruit3_3.png');
        game.load.image('fruit3_4', './images/fruit3_4.png');
        game.load.image('fruit4_1', './images/fruit4_1.png');
        game.load.image('fruit4_2', './images/fruit4_2.png');
        game.load.image('fruit4_3', './images/fruit4_3.png');
        game.load.image('fruit4_4', './images/fruit4_4.png');
        game.load.image('dead_body_1', './images/dead_body_1.png');
        game.load.image('dead_body_2', './images/dead_body_2.png');
        game.load.image('dead_body_3', './images/dead_body_3.png');
        game.load.image('dead_body_4', './images/dead_body_4.png');
        
        // Load up music and sounds.
        game.load.audio('introTest', ['./audio/Cosmic_Disaster_OST.wav']);
        game.load.audio('intro1', './audio/music/01_back_to_my_roots.wav');
        game.load.audio('intro2', './audio/music/02_A_Cold_Night.wav');
        game.load.audio('intro3', './audio/music/03_Cheer_Up.wav');
        game.load.audio('audio_pt1', './audio/music/04_FairytaleLand.wav');
        game.load.audio('audio_pt1_v2', './audio/music/FairytaleLand_v2.wav');
        game.load.audio('audio_pt2', './audio/music/05_HERE_WE_GOOOO.wav');
        game.load.audio('audio_pt3', './audio/music/06_Classroom2v3.wav');
        game.load.audio('audio_ending', './audio/music/07_Werent_We.wav');
        game.load.audio('audio_credits', './audio/music/08_are_you_happy_to_see_me.wav');
        game.load.audio('text1sound', './audio/text_sound1.wav');
        game.load.audio('bite_sfx', './audio/sound_fx/bite.wav');
        game.load.audio('crash_sfx', './audio/sound_fx/crash.mp3');

        // CHOICE part assets
        game.load.image('pos_bar', './images/choice_assets/pos_fill.png');
        game.load.image('neg_bar', './images/choice_assets/neg_fill.png');
        game.load.image('neut_bar', './images/choice_assets/neut_fill.png');
        game.load.image('bar_border', './images/choice_assets/border_outline.png');
        game.load.image('choice_instructions', './images/choice_assets/choices_instruction.png');

        // Load test videos.
        game.load.video('jump_boy', './jump_boy.mp4');
        
        // Setup some variables.
        // i think these are accessible in the create() of other parts.
        var buddy;
        var border;
        var player;
        var cursors;
        var music;
        var text1sound;
        var eatingSound;
        var ground;
        var theGround;
        var video;
        
        var loadingBar = this.add.sprite(100, 450, "Loading");            
        loadingBar.anchor.setTo(0, 0);
        // set the preloadBar sprite as a loader sprite.
        game.load.setPreloadSprite(loadingBar);
    },
    
    create: function(){
        // Pass the state to the intro screen (menu).
        game.state.start('GameIntro');
    }
};