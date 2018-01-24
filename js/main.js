var game = new Phaser.Game(640, 360, Phaser.AUTO); 
var GameState = {
    preload: function(){
        this.load.image('background', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep.png');
        this.load.image('rightArrow', 'assets/images/right_arrow.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        this.scale.pageAlignHorizontally = true; 
        this.scale.pageAlignVertically = true; 
        
        this.rightArrow = this.game.add.sprite(500, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5); 
        this.rightArrow.customParams = {direction: 1};
        
        this.rightArrow.inputEnabled = true; 
        this.rightArrow.pixelPerfectClick = true; 
        this.rightArrow.event.onInputDown.add(this.switchAnimal, this); 
        
        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5); 
        this.leftArrow.scale.x = -1 ; 
        this.leftArrow.customParams = {direction: -1};
        
        //leftArrow allow user input
        this.leftArrow.inputEnabled = true; 
        this.leftArrow.pixelPerfectClick = true; 
        this.leftArrow.event.onInputDown.add(this.SwitchAnimal, this); 
        
        
        this.background = this.game.add.sprite(0, 0, 'background');
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5, 0.5); 
        this.chicken.scale.setTo(2); 
        this.sheep = this.game.add.sprite(100, 250, 'sheep');
        this.sheep.scale.setTo(0.5);
        this.sheep.anchor.setTo(0.5); 
        this.sheep.angle = -45; 
    },
    update: function(){
        this.sheep.angle += 0.5;
    },
    
    switchAnimal: function(sprite, event){
        console.log('move animal'); 
    }
};


game.state.add('GameState', GameState);
game.state.start('GameState');