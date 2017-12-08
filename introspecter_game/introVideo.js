var introVideo = function(game){};

var pulp_fiction;
var chkpt = false;

introVideo.prototype = {
    preload: function () {

    },

    create: function () {
        pulp_fiction = game.add.video('intro_vid');
        pulp_fiction.play();
        pulp_fiction.addToWorld();
        pulp_fiction.onComplete.add(function(){
            game.state.start('GameIntro');
        });
    },

    update: function () {
        if(game.input.keyboard.isDown(Phaser.Keyboard.X) && !chkpt) {
            chkpt = true;
            pulp_fiction.stop();
            var tween = game.add.tween(game.world).to({alpha:1}, 1000, Phaser.Easing.Default, true, 0, 0, false);
            tween.onComplete.add(function(){game.state.start('GameIntro');});
        }
    },

    render: function () {

    }
};