var part3 = function(game){};

var protect_speech = [
    "RIVER!",
    "I'll save you this time!!",
    
    ".", ". .", ". . .",
    
    "NOOO!!",
    ".", ". .", ". . .",
];
var protect_ending_speech = [
    "Nothing ", "is ", "stronger ", "than ", "fate? "
];

part3.prototype = {
    create: function(){
        // Noah's part to complete.
        console.log('youre in part 3');



        game.state.start('Part4');
        
    },
    
    update: function(){
        
    },
    
    render: function(){
        
    }
}