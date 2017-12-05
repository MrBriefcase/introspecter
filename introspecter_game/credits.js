var credits = function(game){};

var vid_tween;

credits.prototype = {
    create: function(){
        console.log('youre in the credits state');
        
        video = game.add.video('jump_boy');
        video.play();
        video.addToWorld();

        // TESTING VID TWEEN
        vid_tween = game.add.sprite(0, 0, 'blk_bg');
        game.time.events.add(2000, function() {
            game.add.tween(vid_tween).to({alpha: 0}, 5000, Phaser.Easing.Default, true, 0, 0, false);
        });

        
        function backToIntro(){
            game.state.start('GameIntro');
        };
        
        // Create credits items.
        var creditTxt = game.add.text(200, 50, '', { font: '32px Old School Adventures', fill: '#ffffff' });
        creditTxt.text = 'A Game By:\n\nJUDY\n\nJENNY\n\nNOAH\n\nDAREN';
        
        // Create back button.
        var backBtn = game.add.button(200, 450, 'backBtn', backToIntro, this);
    }
}