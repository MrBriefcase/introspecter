var credits = function(game){};

credits.prototype = {
    create: function(){
        console.log('youre in the credits state');
        
        video = game.add.video('jump_boy');
        video.play();
        video.addToWorld();
        
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