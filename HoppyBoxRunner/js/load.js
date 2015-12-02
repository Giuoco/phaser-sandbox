// JavaScript File
/*global game */
/*global Phaser */
/*global gameState */



var loadState = {


    highScorelvl1:0,
    highScorelvl2:0,

    loadLevel: function(){
        game.state.start('level1');
    },
    
    loadLevel2: function(){
        game.state.start('level2');
    },


    
    loadScreenDone: function(){
        //game.input.onTap.add(this.loadLevel, this);
        var x = game.add.text(400,500, 'Tap Butterfly or Lightning Bug to play!', {fontSize:'24px', fill: '#ffffff', align:'center'});
        x.anchor.set(0.5);
        
        
       var butIcon =  game.add.button(150,120, 'butfly', this.loadLevel, this);
       var butIcon2 =  game.add.button(150,200, 'lightbug', this.loadLevel2, this);    
       
                
        var hoppyState = gameState.getState();
        
        if(hoppyState.lvl_01_high_score)
        {
            this.highScorelvl1.text = 'Level 1 High Score: ' + hoppyState.lvl_01_high_score;
        }
        else
        {
            this.highScorelvl1.text = 'Level 1 Not Complete';

        }
        
        if(hoppyState.lvl_02_high_score)
        {
            this.highScorelvl2.text = 'Level 2 High Score: ' + hoppyState.lvl_02_high_score;
            
        }
        else
        {
            this.highScorelvl2.text = 'Level 2 Not Complete';

        }
            
    },
    











/*-----------------------------------------------------------------------------*/

    loading:0,

    preload: function(){
        this.loading = game.add.text(400, 60, 'Loading....', { fontSize: '32px', fill: '#ffffff', align: 'center' });
        this.loading.anchor.set(0.5);
         //load up resources
        game.load.image('sky', 'assets/sunnysky.png');
        game.load.image('pines', 'assets/tallpinebackground.png');
        game.load.image('brush', 'assets/forebackground.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('hoppy', 'assets/hoppy.png');
        game.load.image('hurthoppy', 'assets/hurthoppy.png');
        game.load.image('eveningGround','assets/eveningPlatform.png');
        game.load.image('life', 'assets/life.png');
        
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
        
        //create a timer for after preload loading is finished.
        game.time.events.add(Phaser.Timer.QUARTER, this.loadScreenDone, this);
        
        this.highScorelvl1 = game.add.text(400, 150, 'Level 1 loading... ', {fontSize: '32px', fill:'#ffffff', align: 'center'});
        this.highScorelvl1.anchor.set(0.5);
        
        this.highScorelvl2 = game.add.text(400, 225, 'Level 2 loading... ', {fontSize: '32px', fill:'#ffffff', align: 'center'});
        this.highScorelvl2.anchor.set(0.5);
        
        this.loading.visible=false;    

    },

    update: function(){

    },
    
    render: function(){
        //game.debug.text(JSON.stringify(hoppyState),200,400);
    }

};


