var gameIntro = function(game){};

gameIntro.prototype = {
    create: function(){
        // Create functions to move to different states.
        function playGame(){
            // ***** RETURN TO NORMAL WHEN DONE
            game.state.start('TheGame');
//            game.state.start('Part2');
//            game.state.start('Part4');
        };
        
        function viewCredits(){
            game.state.start('Credits');
        };
        
        // Create the Play and Credits button.
        var playButton = game.add.button(275, 150, 'playBtn', playGame, this);
        var creditsButton = game.add.button(275, 450, 'credBtn', viewCredits, this);
    }
};