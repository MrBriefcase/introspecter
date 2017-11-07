var game = new Phaser.Game(640, 360, Phaser.AUTO,"Name",{preload:preload, create: create, update:update, render:render});

function preload() {
		this.load.image('background', 'assets/images/background.jpg');
        this.load.image('charr', 'assets/images/hero.jpg');
        this.load.image('mush','assets/images/mush.png');
	}
    var charr;
    var mush;
	function create(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
		this.background = this.game.add.sprite(0, 0, 'background');
        
        charr = this.charr = this.game.add.sprite(this.game.world.centerX, 360, 'charr'); 
        charr.anchor.setTo(.5,1);
        charr.scale.setTo(1, 1);
        
        
        mush = this.mush = this.game.add.sprite(600, 360, 'mush');
        mush.anchor.setTo(.5,1);
        mush.scale.setTo(.5);
        game.physics.enable([charr, mush], Phaser.Physics.ARCADE);
        charr.body.immovable = true;
        
        game.camera.follow(charr, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	}
	function update(){
        mush.body.velocity.x = -50;
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            charr.x -= 4;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            charr.x += 4;
        }
        var num = 1;
        if (charr.overlap(mush) && game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            charr.tint = 0xff00ff;
                
                num++;
                if(num == 1){
                    mush.tint = 0xf4f441;
                } else if(num == 2){
                    mush.tint = 0xf49842;
                } else if(num == 3){
                    mush.tint = 0xef3817;
                } else if(num == 4){
                    mush.kill();
                }
               
            console.log(num);
        } else {
            charr.tint = 0xffffff;
        }
        game.physics.arcade.collide(charr, mush);
	}



function render() {

    game.debug.bodyInfo(charr, 50, 50);

    //game.debug.body(charr);
    //game.debug.body(mush);

}

