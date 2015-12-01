/*global game */
/*global Phaser */
/*global gameState */


var congratzState = {


    

    
    changeScreenDone: function(){
                //setup level controls for this level
            game.input.onTap.add(this.onTapCongratz1, this);
            
            var Congrat2 = game.add.text(400, 200, 'Tap to continue!', { fontSize: '32px', fill: '#ffffff', align: 'center' });
            Congrat2.anchor.set(0.5);
    
    },
    
    onTapCongratz1: function(thisPlayer, doubleTap) 
    {
       
       game.state.start('load');
    },
    









/*----------------------------------------------------------------------------*/


    preload: function(){

        var state = gameState.getState();

        var txt = "Wow! Yay!";
        var Congratz = game.add.text(400, 60, txt, { fontSize: '32px', fill: '#ffffff', align: 'center' });
        Congratz.anchor.set(0.5);
        var Congrat2 = game.add.text(400, 100, 'Level Finished!', { fontSize: '48px', fill: '#ffffff', align: 'center' });
        Congrat2.anchor.set(0.5);
        

    },

    hoppy:0,
    
    create: function (){
        //create a timer for endless adding of stones
        game.time.events.add(Phaser.Timer.SECOND*5, this.changeScreenDone, this);
        
        this.hoppy = game.add.sprite(300, game.world.height - 150, 'hoppy');
        
        
        var star1 = game.add.sprite(350,game.world.height-250, 'star');
         star1.animations.add('spin');
         star1.animations.play('spin',10,true);
        
        var star2 = game.add.sprite(400,game.world.height-275, 'star');
         star2.animations.add('spin');
         star2.animations.play('spin',10,true);
        
        var star3 = game.add.sprite(450,game.world.height-250, 'star');
         star3.animations.add('spin');
         star3.animations.play('spin',10,true);

    },

    update: function(){
        
        if(this.hoppy.scale.x > 0)
        {
            
            this.hoppy.x+=4;
            if(this.hoppy.x > 475)
            {
                this.hoppy.scale.x = -1;
            }
        }
        
        if(this.hoppy.scale.x <0 )
        {
            this.hoppy.x+=-4;
            if(this.hoppy.x<375)
            {
                this.hoppy.scale.x = 1;
            }
        }
        
    }
};
