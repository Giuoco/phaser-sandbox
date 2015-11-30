// JavaScript File
/*global game */
/*global Phaser */
/*global gameState */



var loadState = {



    
    loadScreenDone: function(){
        game.input.onTap.add(this.loadLevel, this);
        var x = game.add.text(400,500, 'Tap to start!', {fontSize:'24px', fill: '#ffffff', align:'center'});
        x.anchor.set(0.5);
            
    },
    
    loadLevel: function(){
        game.state.start('level1');
    },











/*-----------------------------------------------------------------------------*/



    preload: function(){
        var loading = game.add.text(400, 60, 'Loading....', { fontSize: '32px', fill: '#ffffff', align: 'center' });
        loading.anchor.set(0.5);
         //load up resources
        game.load.image('sky', 'assets/sunnysky.png');
        game.load.image('pines', 'assets/tallpinebackground.png');
        game.load.image('brush', 'assets/forebackground.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('hoppy', 'assets/hoppy.png');
        game.load.image('hurthoppy', 'assets/hurthoppy.png');
        game.load.image('eveningGround','assets/eveningPlatform.png');
        
        game.load.image('eveningSky', 'assets/eveningSky.png');
        game.load.image('eveningTrees', 'assets/eveningTrees.png');
        game.load.image('eveningBrush','assets/eveningBrush.png');
        game.load.spritesheet('lightbug','assets/eveningBugSpriteSheet_50X50X4.png',50,50,4);
        
        //each frame is 60 wide and 50 tall (60X50)
        game.load.spritesheet('stone', 'assets/rollingstone.png',60,53,3);
        game.load.spritesheet('butfly', 'assets/Butterfly50X50X4.png',50,50,4);
        game.load.spritesheet('star', 'assets/StarSheet_50X50X5.png', 50,50,5);
        
        
        
        game.load.audio('jump', 'assets/jump_10.wav');
        game.load.audio('lvl01music', 'assets/carrusel_110_pianos_lent_locutortv.mp3');
        game.load.audio('cheering', 'assets/kids_cheering.mp3');
    },

    create: function (){
        
        //create a timer for endless adding of stones
        
        
        game.time.events.add(Phaser.Timer.SECOND*1, this.loadScreenDone, this);
        
        var hoppyState = gameState.getState();
        if(hoppyState.lvl_01_high_score)
        {
            var highScore = game.add.text(400, 300, 'Level 1 High Score: ' + hoppyState.lvl_01_high_score, {fontSize: '32px', fill:'#ffffff', align: 'center'});
            highScore.anchor.set(0.5);
        }

    },

    update: function(){
    
    },
    
    render: function(){
        //game.debug.text(JSON.stringify(hoppyState),200,400);
    }

};


