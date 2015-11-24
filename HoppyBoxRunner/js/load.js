// JavaScript File
/*global game */
/*global Phaser */
/*global player */

var loadState = {
    preload: function(){
        var loading = game.add.text(250, 60, 'Loading....', { fontSize: '32px', fill: '#ffffff' });
         //load up resources
        game.load.image('sky', 'assets/sunnysky.png');
        game.load.image('pines', 'assets/tallpinebackground.png');
        game.load.image('brush', 'assets/forebackground.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('hoppy', 'assets/hoppy.png');
        game.load.image('hurthoppy', 'assets/hurthoppy.png');
        
        
        //each frame is 60 wide and 50 tall (60X50)
        game.load.spritesheet('stone', 'assets/rollingstone.png',60,53,3);
        game.load.spritesheet('butfly', 'assets/Butterfly50X50X4.png',50,50,4);
        game.load.spritesheet('star', 'assets/StarSheet_50X50X5.png', 50,50,5);
    },

    create: function (){
        //create a timer for endless adding of stones
        game.time.events.add(Phaser.Timer.SECOND*2, loadScreenDone, this);



    },

    update: function(){
    
    }
};

function loadScreenDone(){
        game.state.start('level1');
}


