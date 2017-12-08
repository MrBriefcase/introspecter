var gameIntro = function(game){};
var moveRight = true;
var menu_bg;
var title_logo;

var filter, filter2;
var background;
var bg_screen;
var sprite;
var twink1, twink2, twink3, twink4, twink5;
var star_ct = 0;

var btn_sound;
var music_started = false;

gameIntro.prototype = {
    preload: function(){
        // game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js');
        // game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Pixelate.js');
    },

    create: function(){
        // Tween ***** NEEDS WORK (finish tween)
        game.world.alpha = 0;
        game.add.tween(game.world).to({alpha:1}, 1000, Phaser.Easing.Default, true, 0, 0, false);

        // Create functions to move to different states.
        menu_bg = game.add.sprite(0, 0, 'menu_bg');

        menu_bg.tint = '0xe8c0df';
        // title_logo = game.add.sprite(100, 75, 'introspecter');

        // Set music and sounds
        if(!music_started) {
            music_started = true;
            music = game.add.audio('menu_sound');
            music.loop = true;
            music.play();
        }
        btn_sound = game.add.audio('btn_sfx');


        function playGame(){
            // ***** RETURN TO NORMAL WHEN DONE
           // game.state.start('TheGame');
           // game.state.start('Part2');
           // game.state.start('Part4');

            btn_sound.play();
            game.add.tween(filter2).to({sizeX: 50, sizeY: 50}, Phaser.Timer.SECOND*2, Phaser.Easing.Default, true, 0, 0, false);
            var tween = game.add.tween(game.world).to({ alpha: 0 }, Phaser.Timer.SECOND*2, Phaser.Easing.Default, true, 0, 0, false);
            tween.onComplete.add(function(){music.stop();game.state.start('TheGame');}, this);
            
        };
        
        function viewCredits(){
            btn_sound.play();
            game.add.tween(filter2).to({sizeX: 50, sizeY: 50}, Phaser.Timer.SECOND*0.5, Phaser.Easing.Default, true, 0, 0, false);
            var tween = game.add.tween(game.world).to({ alpha: 0 }, Phaser.Timer.SECOND*0.5, Phaser.Easing.Default, true, 0, 0, false);
            tween.onComplete.add(function(){game.state.start('Credits');}, this);
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
        var playButton = game.add.button(225, 325, 'playBtn', playGame, this);
        var creditsButton = game.add.button(225, 450, 'credBtn', viewCredits, this);

        //BG_texture
        bg_screen = game.add.sprite(0, 0, 'bg_texture');
        bg_screen.alpha = 0.4;

        title_logo = game.add.sprite(100, 75, 'introspecter');

        // sinewave filter
        // var fragmentSrc = [
        //
        //     "precision mediump float;",
        //
        //     "uniform float     time;",
        //     "uniform vec2      resolution;",
        //     "uniform sampler2D iChannel0;",
        //
        //     "void main( void ) {",
        //
        //     "vec2 uv = gl_FragCoord.xy / resolution.xy;",
        //     "uv.y *= -1.0;",
        //     "uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);",
        //     "vec4 texColor = texture2D(iChannel0, uv);",
        //     "gl_FragColor = texColor;",
        //
        //     "}"
        // ];
        // var customUniforms = {
        //     iChannel0: { type: 'sampler2D', value: title_logo.texture, textureData: { repeat: true } }
        // };
        //
        // filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
        // filter.setResolution(800, 600);
        //
        // title_logo.filters = [ filter ];
        // // **** end of sinewave.

        //Twinkle. Shine on.
        twink1 = game.add.sprite(580, 225, 'star1');
        twink1.isShining = true;
        twink2 = game.add.sprite(580, 225, 'star2');
        twink2.isShining = true;
        twink3 = game.add.sprite(580, 225, 'star3');
        twink3.isShining = true;
        twink4 = game.add.sprite(580, 225, 'star3');
        twink4.isShining = true;
        twink5 = game.add.sprite(580, 225, 'star3');
        twink5.isShining = true;

        //twinkle loop
        game.time.events.loop(Phaser.Timer.SECOND*0.25, function(){
            star_ct++;
            if(twink5.isShining && star_ct < 10) {
                twink5.alpha = 0;
                twink5.isShining = false;
            } else if(!twink5.isShining && star_ct < 10) {
                twink5.alpha = 1;
                twink5.isShining = true;
            }

            if(star_ct == 10) {
                twink4.alpha = 0;
                // console.log('reaches here');
            }
            if(star_ct == 11) {
                twink3.alpha = 0;
                // console.log('reaches here');
            }
            if(star_ct == 12) {
                twink2.alpha = 0;
           }
            if(star_ct == 13) {
                twink1.alpha = 0;
            }
            if(star_ct > 13 && star_ct < 24) {

            }
            if(star_ct == 24) {
                twink1.alpha = 1;
            }
            if(star_ct == 25) {
                twink2.alpha = 1;
            }
            if(star_ct == 26) {
                twink3.alpha = 1;
            }
            if(star_ct == 27) {
                twink4.alpha = 1;
            }
            if(star_ct == 28) {
                twink5.alpha = 1;
                twink5.isShining = true;
                star_ct = 0;
            }
        });

        // Filter setup (VDU lines)
        //  From http://glslsandbox.com/e#18578.0
        // var fragmentSrc = [
        //
        //     "precision mediump float;",
        //
        //     "uniform float     time;",
        //     "uniform vec2      resolution;",
        //     "uniform vec2      mouse;",
        //
        //     "float noise(vec2 pos) {",
        //     "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
        //     "}",
        //
        //     "void main( void ) {",
        //
        //     "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
        //     "float pos = (gl_FragCoord.y / resolution.y);",
        //     "float mouse_dist = 0.0;",
        //     "float distortion = clamp(1.0 - (0.0 + 0.1) * 3.0, 0.0, 1.0);",
        //
        //     "pos -= (distortion * distortion) * 0.1;",
        //
        //     "float c = sin(pos * 400.0) * 0.4 + 0.4;",
        //     "c = pow(c, 0.2);",
        //     "c *= 0.2;",
        //
        //     "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
        //     "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",
        //
        //     "c += distortion * 0.08;",
        //     "// noise",
        //     "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",
        //
        //
        //     "gl_FragColor = vec4( 0.1, c, 0.3, 0.01 );",
        //     "}"
        // ];
        // filter = new Phaser.Filter(game, null, fragmentSrc);
        // filter.setResolution(800, 600);

        // sprite = game.add.sprite();
        // sprite.width = 800;
        // sprite.height = 600;
        //
        // sprite.filters = [ filter ];

        // fullscreen
        // Stretch to fill


        // VVVVVVVVVVV minus this line to go full (retain aspect ratio);
        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //
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


        filter = game.add.filter('Pixelate', 800, 600);
        filter2 = game.add.filter('Pixelate', 800, 600);
        filter.sizeX = 10;
        filter.sizeY = 10;

        menu_bg.filters = [filter];
        game.world.filters = [filter2];
        // game.add.tween(filter).to( { sizeX: 1, sizeY: 1 }, 5000, Phaser.Easing.Default, true, 0, 0, false);


        // EXPERIMENT, wiggling!!! ****** USE THIS FOR WIGGLING TEXT BOXES
        // Make sure to implement for just a fraction of a second.

        // function wiggle(aProgress, aPeriod1, aPeriod2) {
        //     var current1 = aProgress * Math.PI * 2 * aPeriod1;
        //     var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);
        //
        //     return Math.sin(current1) * Math.cos(current2);
        // }
        // game.add.tween(title_logo).to({ x:title_logo.x+10 }, 100, function (k) {
        //     return wiggle(k, 0.5, 0.2);
        // }, true, 0, -1, false);
        // game.add.tween(title_logo).to({  y:title_logo.y+10 }, 100, function (k) {
        //     return wiggle(k, 0.2, 0.5);
        // }, true, 0, -1, false);
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

        // filter.update(); game.debug.spriteInfo(menu_bg, 32, 32);
    },
    
    render: function(){
//
//         game.debug.pointer(game.input.activePointer);
    }
};