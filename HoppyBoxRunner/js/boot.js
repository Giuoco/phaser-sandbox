/*global game */
/*global Phaser*/
/*global player*/

var bootState = {

    preload: function(){
    
    },

    create: function (){
        
        //setup physics and scaling
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = "visual";

       
        game.state.start('load');
    },

    update: function(){
    
    }

};



