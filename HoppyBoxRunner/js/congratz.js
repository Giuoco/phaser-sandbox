/*global game */
/*global Phaser */
/*global score */
/*global isCongratz */
var hoppy;
var congratzState = {
    preload: function(){

        var txt = "Wow! Yay! Score: "+score+"!!!";
        var Congratz = game.add.text(400, 60, txt, { fontSize: '32px', fill: '#ffffff', align: 'center' });
        Congratz.anchor.set(0.5);
        var Congrat2 = game.add.text(400, 100, 'Level 1 Finished!', { fontSize: '48px', fill: '#ffffff', align: 'center' });
        Congrat2.anchor.set(0.5);
        

    },

    create: function (){
        //create a timer for endless adding of stones
        game.time.events.add(Phaser.Timer.SECOND*5, changeScreenDone, this);
        
        hoppy = game.add.sprite(300, game.world.height - 150, 'hoppy');
        
        
        var star1 = game.add.sprite(350,game.world.height-250, 'star');
         star1.animations.add('spin');
         star1.animations.play('spin',10,true);
        
        var star2 = game.add.sprite(400,game.world.height-275, 'star');
         star2.animations.add('spin');
         star2.animations.play('spin',10,true);
        
        var star3 = game.add.sprite(450,game.world.height-250, 'star');
         star3.animations.add('spin');
         star3.animations.play('spin',10,true);
        
        /*
        sprite.anchor.setTo(.5, 1); //so it flips around its middle
        sprite.scale.x = 1; //facing default direction
        sprite.scale.x = -1; //flipped
        
        */
        isCongratz = true;
        
        

    },

    update: function(){
        
        if(hoppy.scale.x > 0)
        {
            
            hoppy.x+=4;
            if(hoppy.x > 475)
            {
                hoppy.scale.x = -1;
            }
        }
        
        if(hoppy.scale.x <0 )
        {
            hoppy.x+=-4;
            if(hoppy.x<375)
            {
                hoppy.scale.x = 1;
            }
        }
        
    }
};

function changeScreenDone(){
            //setup level controls for this level
        game.input.onTap.add(onTapCongratz1, this);
        
        var Congrat2 = game.add.text(400, 200, 'Tap to continue!', { fontSize: '32px', fill: '#ffffff', align: 'center' });
        Congrat2.anchor.set(0.5);

}

function onTapCongratz1(thisPlayer, doubleTap) 
{
   game.state.start('level2');
}