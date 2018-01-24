var game = new Phaser.Game(640, 360, Phaser.AUTO); 
var GameState = {
    preload: function(){
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
        this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3); 
        this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3); 
        this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3); 
        this.load.image('arrow', 'assets/images/arrow.png');
        
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        this.scale.pageAlignHorizontally = true; 
        this.scale.pageAlignVertically = true; 
        
        this.background = this.game.add.sprite(0, 0, 'background');
        this.animalData= [
            {key: "chicken", text: "CHICKEN"},
            {key: "horse" , text:"HORSE"},
            {key: "pig", text:"PIG"},
            {key:"sheep", text:"SHEEP"},
        ];
        this.animals = this.game.add.group();
        
        var self = this;         
        this.animalData.forEach(function(element){
            var animal; 
            animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
            animal.anchor.setTo(0.5); 
            animal.customParams = {text: element.text};
            animal.animations.add('animate', [0,1,2,1,0,1], 3, false);
            
            animal.inputEnabled = true; 
            animal.pixelPerfectClick = true; 
            animal.events.onInputDown.add(self.animateAnimal, self); 
        });
        this.currentAnimal = this.animals.next(); 
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY); 
        
        
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
        
        this.pig.inputEnabled = true; 
        this.pig.pixelPerfectClick = true; 
        this.pig.event.onInputDown.add(this.animateAnimal, this);
        
    },
    update: function(){
        this.sheep.angle += 0.5;
    },
    
    switchAnimal: function(sprite, event){
        //console.log('move animal'); 
        if(this.isMoving){
            return false; 
        }
        this.isMoving = true; 
        var newAnimal;
        var endX; 
        if(sprite.customParams.direction > 0){
            newAnimal = this.animals.next(); 
            newAnimal.x = -newAnimal.width/2; 
            endX = 640 - this.currentAnimal.width/2; 
        } else {
            newAnimal = this.animals.previous(); 
            newAnimal.x = 640 + newAnimal.width/2 ; 
            endX = - this.currentAnimal.width/2; 
        }
        var newAnimalMovement = this.game.add.tween(newAnimal); 
        newAnimalMovement.to({x: this.game.world.centerX}, 1000); 
        newAnimalMovement.onComplete.add(function(){
           this.isMoving = false;  
        }, this);
        newAnimalMovement.start(); 
        
        this.game.add.tween(this.currentAnimal)
            .to({x:endX})
            .start();
        
        this.currentAnimal = newAnimal; 
    },
    animateAnimal: function(sprite, event){
        sprite.play('animate');
    },
};


game.state.add('GameState', GameState);
game.state.start('GameState');