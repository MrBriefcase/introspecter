var game = new Phaser.Game(640, 360, Phaser.AUTO,"Name",{preload:preload, create: create, update:update, render:render});
var num = 0, num2 = 0, num3 = 0, num4 = 0;
var charr;
var mush;
var friend;
var alive = true, alive2 = true, alive3 = true;
var place = true;
function preload() {
		this.load.image('background', 'assets/images/background.jpg');
        this.load.image('charr', 'assets/images/hero.jpg');
        this.load.image('mush','assets/images/mush.png');
        this.load.image('mush2','assets/images/mush.png');
        this.load.image('mush3','assets/images/mush.png');
        this.load.image('friend', 'assets/images/friend.png');
	}
    
	function create(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
		this.background = this.game.add.sprite(0, 0, 'background');
        
        charr = this.charr = this.game.add.sprite(30, 360, 'charr'); 
        charr.anchor.setTo(.5,1);
        charr.scale.setTo(1, 1);
        
        
        
        
        friend = this.friend = this.game.add.sprite(this.game.world.centerX, 360,'friend');
        friend.anchor.setTo(.5,1);
        friend.scale.setTo(1, 1);
        
        mush = this.mush = this.game.add.sprite(700, 360, 'mush');
        mush.anchor.setTo(.5,1);
        mush.scale.setTo(.5);
        game.physics.enable([charr, mush], Phaser.Physics.ARCADE);
        charr.body.immovable = true;
        mush.body.immovable = true;
        
        mush2 = this.mush2 = this.game.add.sprite(-100, 360, 'mush2');
        mush2.anchor.setTo(.5,1);
        mush2.scale.setTo(.5);
        game.physics.enable([charr, mush2], Phaser.Physics.ARCADE);
        
        mush3 = this.mush3 = this.game.add.sprite(700, 360, 'mush');
        mush3.anchor.setTo(.5,1);
        mush3.scale.setTo(.5);
        game.physics.enable([charr, mush3], Phaser.Physics.ARCADE);
        
        game.camera.follow(charr, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	}
	function update(){
        if(charr.x >= 200 ){
            mush.body.velocity.x = -50;
            place = false;
           }
        
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            charr.x -= 4;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            charr.x += 4;
        }
//        if(charr.overlap(mush)){
//            charr.tint = 0xff00ff;
//        }
        if (friend.overlap(mush)&& alive == true) {                
                num2++;
                console.log(num2);
                if(num2 >= 30 && num2 <= 59){
                    friend.tint = 0xf4f441;
                } else if(num2 >= 60 && num2 <= 89){
                    friend.tint = 0xf49842;
                } else if(num2 >= 90 && num2 <= 119){
                    friend.tint = 0xef3817;
                } else if(num2 >= 120){
                    friend.kill();
                }
               
            
        }
        if (friend.overlap(mush2)&& alive2 == true) {                
                num2++;
                console.log(num2);
                if(num2 >= 30 && num2 <= 59){
                    friend.tint = 0xf4f441;
                } else if(num2 >= 60 && num2 <= 89){
                    friend.tint = 0xf49842;
                } else if(num2 >= 90 && num2 <= 119){
                    friend.tint = 0xef3817;
                } else if(num2 >= 120){
                    friend.kill();
                }
               
            
        }
        if (friend.overlap(mush3)&& alive3 == true) {                
                num2++;
                console.log(num2);
                if(num2 >= 30 && num2 <= 59){
                    friend.tint = 0xf4f441;
                } else if(num2 >= 60 && num2 <= 89){
                    friend.tint = 0xf49842;
                } else if(num2 >= 90 && num2 <= 119){
                    friend.tint = 0xef3817;
                } else if(num2 >= 120){
                    friend.kill();
                }
               
            
        }
        if (charr.overlap(mush) && game.input.keyboard.isDown(Phaser.Keyboard.X)) {                
                num++;
                console.log(num);
                if(num >= 30 && num <= 59){
                    mush.tint = 0xf4f441;
                } else if(num >= 60 && num <= 89){
                    mush.tint = 0xf49842;
                } else if(num >= 90 && num <= 119){
                    mush.tint = 0xef3817;
                } else if(num >= 120){
                    alive = false;
                    mush.kill();
                    //mush.destroy();
                    mush2.body.velocity.x = 50;
                }
               
            
        }
        if (charr.overlap(mush2) && game.input.keyboard.isDown(Phaser.Keyboard.X)) {                
                num3++;
                console.log(num3);
                if(num3 >= 30 && num3 <= 59){
                    mush2.tint = 0xf4f441;
                } else if(num3 >= 60 && num3 <= 89){
                    mush2.tint = 0xf49842;
                } else if(num3 >= 90 && num3 <= 119){
                    mush2.tint = 0xef3817;
                } else if(num3 >= 120){
                    alive2 = false;
                    mush2.kill();
                    //mush.destroy();
                    mush3.body.velocity.x = -50;
                }
               
            
        }
        if (charr.overlap(mush3) && game.input.keyboard.isDown(Phaser.Keyboard.X)) {                
                num4++;
                console.log(num4);
                if(num4 >= 30 && num4 <= 59){
                    mush3.tint = 0xf4f441;
                } else if(num4 >= 60 && num4 <= 89){
                    mush3.tint = 0xf49842;
                } else if(num4 >= 90 && num4 <= 119){
                    mush3.tint = 0xef3817;
                } else if(num4 >= 120){
                    alive3 = false;
                    mush3.kill();                    
                }
               
            
        }
        game.physics.arcade.collide(charr, mush);
	}



function render() {

    //game.debug.bodyInfo(charr, 50, 50);

    //game.debug.body(charr);
    //game.debug.body(mush);

}

