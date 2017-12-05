var credits = function(game){};

var vid_tween;

credits.prototype = {
    preload: function(){
        // game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js');
        game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Pixelate.js');
    },

    create: function(){
        console.log('youre in the credits state');

        // tween
        game.add.tween(game.world).to({ alpha: 1 }, 500, Phaser.Easing.Default, true, 0, 0, false);

        // video = game.add.video('jump_boy');
        // video.play();
        // video.addToWorld();

        // TESTING VID TWEEN
        // vid_tween = game.add.sprite(0, 0, 'blk_bg');
        // game.time.events.add(2000, function() {
        //     game.add.tween(vid_tween).to({alpha: 0}, 5000, Phaser.Easing.Default, true, 0, 0, false);
        // });

        // insert Credit Page photo. and prof pics.
        game.add.sprite(0, 0, 'cred_pg');
        game.add.sprite(550, 30, 'noah_pic');
        game.add.sprite(550, 175, 'jenny_pic');
        game.add.sprite(550, 320, 'judy_pic');
        game.add.sprite(550, 440, 'dar_pic');

        filter2 = game.add.filter('Pixelate', 800, 600);
        game.world.filters = [filter2];
        
        function backToIntro(){
            game.add.tween(filter2).to({sizeX: 50, sizeY: 50}, Phaser.Timer.SECOND*0.5, Phaser.Easing.Default, true, 0, 0, false);
            var tween = game.add.tween(game.world).to({ alpha: 0 }, Phaser.Timer.SECOND*0.5, Phaser.Easing.Default, true, 0, 0, false);
            tween.onComplete.add(function(){game.state.start('GameIntro');}, this);
        };
        
        // Create credits items.
        // var creditTxt = game.add.text(200, 50, '', { font: '32px Old School Adventures', fill: '#ffffff' });
        // creditTxt.text = 'A Game By:\n\nJUDY\n\nJENNY\n\nNOAH\n\nDAREN';
        
        // Create back button.
        var backBtn = game.add.button(275, 550, 'backBtn', backToIntro, this);
    }
}