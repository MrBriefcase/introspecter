var gameIntro = function(game){};
var moveRight = true;
var menu_bg;
var title_logo;

var filter;
var background;
var sprite;

gameIntro.prototype = {
    preload: function(){
        // game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js');
    },

    create: function(){
        // Tween ***** NEEDS WORK (finish tween)
        game.add.tween(game.world).to({alpha:1}, 1000, Phaser.Easing.Default, true, 0, 0, false);

        // Create functions to move to different states.
        menu_bg = game.add.sprite(0, 0, 'menu_bg');
        // title_logo = game.add.sprite(100, 75, 'introspecter');


        function playGame(){
            // ***** RETURN TO NORMAL WHEN DONE
           // game.state.start('TheGame');
           // game.state.start('Part2');
           // game.state.start('Part4');

            var tween = game.add.tween(game.world).to({ alpha: 0 }, 2000, Phaser.Easing.Default, true, 0, 0, false);
            tween.onComplete.add(function(){game.state.start('TheGame');}, this);
            
        };
        
        function viewCredits(){
            game.state.start('Credits');
        };


        // FILTER: MARBLE
        // background = game.add.sprite(0, 0);
        // background.width = 800;
        // background.height = 600;
        // filter = game.add.filter('Marble', 800, 600);
        // filter.alpha = 0.2;

        //	The following properties are available (shown at default values)

        //	filter.speed = 10.0;
        //	filter.intensity = 0.30;

        // background.filters = [filter];
        
        // Create the Play and Credits button.
        var playButton = game.add.button(250, 300, 'playBtn', playGame, this);
        var creditsButton = game.add.button(250, 450, 'credBtn', viewCredits, this);
        title_logo = game.add.sprite(100, 75, 'introspecter');

        // Filter setup (VDU lines)
        //  From http://glslsandbox.com/e#18578.0
        var fragmentSrc = [

            "precision mediump float;",

            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform vec2      mouse;",

            "float noise(vec2 pos) {",
            "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
            "}",

            "void main( void ) {",

            "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
            "float pos = (gl_FragCoord.y / resolution.y);",
            "float mouse_dist = 0.0;",
            "float distortion = clamp(1.0 - (0.0 + 0.1) * 3.0, 0.0, 1.0);",

            "pos -= (distortion * distortion) * 0.1;",

            "float c = sin(pos * 400.0) * 0.4 + 0.4;",
            "c = pow(c, 0.2);",
            "c *= 0.2;",

            "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
            "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

            "c += distortion * 0.08;",
            "// noise",
            "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",


            "gl_FragColor = vec4( 0.1, c, 0.3, 0.05 );",
            "}"
        ];
        filter = new Phaser.Filter(game, null, fragmentSrc);
        filter.setResolution(800, 600);

        sprite = game.add.sprite();
        sprite.width = 800;
        sprite.height = 600;

        sprite.filters = [ filter ];

        // fullscreen
        // Stretch to fill

        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        // game.input.onDown.add(gofull, this);
        // function gofull() {
        //
        //     if (game.scale.isFullScreen)
        //     {
        //         game.scale.stopFullScreen();
        //     }
        //     else
        //     {
        //         game.scale.startFullScreen(false);
        //     }
        //
        // }
    },
    
    update: function(){
        if (menu_bg.x > -400 && moveRight){
            menu_bg.x -= 0.5;
        } else{
            moveRight = false;
        }
        if (menu_bg.x < 0 && !moveRight){
            menu_bg.x += 0.5;
        } else{
            moveRight = true;
        }

        filter.update();
    },
    
    render: function(){
//        game.debug.spriteInfo(menu_bg, 32, 32);
        game.debug.pointer(game.input.activePointer);
    }
};