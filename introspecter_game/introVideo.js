var introVideo = function(game){};

var pulp_fiction;

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

    },

    render: function () {

    }
};