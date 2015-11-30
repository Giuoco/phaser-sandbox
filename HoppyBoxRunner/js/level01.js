// JavaScript File
/*global game */
/*global Phaser */
/*global gameState */


var level1State = {
    
    lives:3,
    platforms:0,
    background:0,
    nearground:0,
    player:0,
    playerhurt:0,
    stones:0,
    butflys:0,
    scoreDisplay:"",
    score:0,
    isCongratz:false,
    highScoreDisplay:"",
    highScore:0,
    timerDisplay:0,
    lvltimer:0,
    lvl1music:0,
    jumpAudio:0,
    butflyBonus:1,
    bonus:0,
    
    


    hurtPlayer: function() {
        this.playerhurt = game.add.sprite(this.player.x,this.player.y, 'hurthoppy');
       
      
        this.player.destroy();
        this.player=null;
      
        //  We need to enable physics on the player
        game.physics.arcade.enable(this.playerhurt);
        
        //  Player physics properties. Give the little guy a slight bounce.
        this.playerhurt.body.bounce.y = 0.0;
        this.playerhurt.body.gravity.y = 300;
        
        this.playerhurt.body.velocity.y = -350;
        this.playerhurt.body.velocity.x = 10;
        
        this.score = 0;
        this.lvltimer = 0;
        this.lives-=1;
        
        
        if(this.lives < 1)
        {
            this.cleanup();
            game.state.start('load');
        }
        
        
    },
    
    cleanup: function(){
       //remove hoppy so he doesn't get hit by a stone, or confused in state change.
            if(this.player!=null)
            { 
                this.player.destroy();
                this.player = null;
            }   
            //done!
            var hoppyState = gameState.getState();
            hoppyState.lvl_01_score = this.score;
            hoppyState.lvl_01_complete = true;
            if(hoppyState.lvl_01_high_score)
            {
                if(hoppyState.lvl_01_high_score > this.highScore)
                {
                    hoppyState.lvl_01_high_score = this.highScore;
                }
            }
            else
            {
                hoppyState.lvl_01_high_score = this.highScore;
            }
        
            gameState.setState(hoppyState);


            //reset the lvl for future play
            this.score = 0;
            this.lvltimer = 0;
            this.lives = 3;
            this.isCongratz = false;
             this.lvl1music.stop();  
    },

    addHoppy: function()
    {
         //add player
            // The player and its settings
        if(!this.player)
        {
            this.player = game.add.sprite(100, game.world.height - 150, 'hoppy');
        
            //  We need to enable physics on the player
            game.physics.arcade.enable(this.player);
        
            //  Player physics properties. Give the little guy a slight bounce.
            this.player.body.bounce.y = 0.0;
            this.player.body.gravity.y = 600;
            this.player.body.collideWorldBounds = true;
        }
    },
    
    addStone: function()
    {
        var stone = this.stones.create(750,game.world.height-150,'stone');
        stone.animations.add('roll');
        stone.animations.play('roll',10,true);
        stone.body.gravity.y=400;
        stone.body.bounce.y=0.6;
        stone.body.gravity.x= game.rnd.integerInRange(-50, -600);
    },
    
    addButfly: function()
    {
        var butfly = this.butflys.create(750,game.world.height-225,'butfly');
        butfly.animations.add('spin');
        butfly.animations.play('spin',10,true);
    
        butfly.body.gravity.x= game.rnd.integerInRange(-50, -600);
    },

    
    collectButflys: function(player, butfly)
    {
        butfly.kill();
        
        
        //establish bonus!
        if(this.butflyBonus>2)
        {
            this.score += this.butflyBonus;
            this.showBonus();
        }
        else
        {
            //non bonus score
            this.score++;
        }
        
        if(this.score > this.highScore)
        {
            this.highScore = this.score;
        }
        
        if(this.butflyBonus<5)
        {
            this.butflyBonus++;
        }
        
    },

    showBonus: function()
    {
      this.bonus.alpha=1;
      this.bonus.text = 'X' + this.butflyBonus + '!!';
      this.bonus.visible=true;
      var btween = game.add.tween(this.bonus).to( { alpha: 0 }, 1000, "Linear", true);
      btween.onComplete.add(this.btweenComplete,this);
    },
    
    btweenComplete: function()
    {
        this.bonus.visible=false;
        this.bonus.alpha=1;
    },

   doubleJumpBool: false,

    onTapLvl1: function (thisPlayer, doubleTap) 
    {
        //check to make sure hoppy isn't hurt
        if(this.player!=null)
        {
            
            //check to see if hoppy is on the ground
            if(this.player.body.touching.down)
            {
                this.jumpAudio.play();
                this.doubleJumpBool = true;
                this.player.body.velocity.y = -350;
                
                
            }
            
            if(!this.player.body.touching.down && this.doubleJumpBool)
            {
                this.jumpAudio.play();
                this.player.body.velocity.y += -200;
                this.doubleJumpBool = false;
            }
        }
    },
   
    stonecounter: 0,
    butflycounter: 0,


    timerTick: function()
    {
        //one second passed
        this.stonecounter++;
        this.butflycounter++;
        
        if (this.stonecounter>10)
        {
            this.addStone();
            this.stonecounter=0;
        }
        
        if(this.butflycounter>3)
        {
            this.addButfly();
            this.butflycounter = 0;
        }
        
         if(this.score > 3)
        {
            var tween = game.add.tween(this.instructions).to( { alpha: 0 }, 1000, "Linear", true);
            tween.onComplete.add(this.instructionsDone,this);
            
        } else
        {
            this.instructions.alpha=1;
            this.instructions.visible=true;
        }
        
        this.lvltimer++;
        
    },

    instructionsDone: function()
    {
        this.instructions.visible = false;
    },

    instructions:"",
   

    /*-------------------------------------------------------------------------*/
    /*Phaser methods below */
   
    preload: function(){
    
    },
    
    

    create: function (){
    
     //  A simple background for our game
        game.add.sprite(0, 0, 'sky');
        this.background = game.add.tileSprite(0, 0, 800, 600, 'pines');
        this.nearground = game.add.tileSprite(0, 0, 800, 600, 'brush');
        
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();
        
        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;
        
        // Here we create the ground.
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        
        // add hoppy!
        this.addHoppy();
         
        //stones
        this.stones = game.add.group();
         //  We will enable physics for any stone that is created in this group
        this.stones.enableBody = true;
        
        this.butflys = game.add.group();
        this.butflys.enableBody = true;
        
        //create a timer for endless adding of stones
        game.time.events.loop(Phaser.Timer.SECOND, this.timerTick, this);
        
        //setup hud
        this.highScoreDisplay = game.add.text(16, 16, 'High Score: 0', { fontSize: '32px', fill: '#000' });
        this.scoreDisplay = game.add.text(16, 40, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.timerDisplay = game.add.text(650,16, 'Timer: ', {fontSize: '32px', fill: '#000'});
        this.instructions = game.add.text(400,300, 'Hoppy Box Runner!  Tap to jump! \nJump rocks, Collect stuff for points!!', {fontSize: '24px', fill: '#000'});
        this.instructions.anchor.set(0.5,0.5);
        
        this.bonus = game.add.text(200,300, 'X1!', {fontSize:'48px',fill:'#ffffff'});
        this.bonus.visible=false;
        
        
        
        this.jumpAudio = game.add.audio('jump');
        this.jumpAudio.volume = 0.1;
        this.lvl1music = game.add.audio('lvl01music'); 
        this.lvl1music.loopFull(0.5);
        
        var hoppyState = gameState.getState();
        if(hoppyState.lvl_01_high_score)
        {
            this.highScore = hoppyState.lvl_01_high_score;
        }
        
        //setup level controls for this level
        game.input.onTap.add(this.onTapLvl1, this);
    },

    update: function(){
          //move the parallax
        this.background.tilePosition.x += -1;
        this.nearground.tilePosition.x += -2;
        
        //  Collide the player and the butflys with the platforms
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stones, this.platforms);
        
        //  Checks to see if the player overlaps with any of the butflys, if he does call the collectbutfly function
        game.physics.arcade.overlap(this.player, this.stones, this.hurtPlayer, null, this);
        
          //  Checks to see if the player overlaps with any of the butflys, if he does call the collectbutfly function
        game.physics.arcade.overlap(this.player, this.butflys, this.collectButflys, null, this);
        
        //update hud
        this.scoreDisplay.text = 'Score: ' + this.score;
        this.highScoreDisplay.text = 'High Score: ' + this.highScore;
        this.timerDisplay.text = 'Time: ' + this.lvltimer;
        
        // if the stone is falling off the screen then destroy it.
        this.stones.forEach(
            function(stone)
            {
                if(stone.x < 0)
                {
                    stone.destroy();
                    if(this.player!=null)
                    {
                        this.score+=1;
        
                        if(this.score > this.highScore)
                        {
                            this.highScore = this.score;
                           
                        }
                    }
                }
            }, this
        );
        
        this.butflys.forEach(
            function(butfly)
            {
               if(butfly.x < 0)
               {
                   butfly.destroy();
                   //???had to access this property directly.  coun't use this, or parent... is this a closure?????
                   level1State.butflyBonus=1;
               }
            });
        
        //check to see if player hurt needs destroyed
        if(this.playerhurt)
        {
            if(this.playerhurt.y > 900)   
            {
                this.playerhurt.destroy();
                this.playerhurt=null;
                
                this.addHoppy();
            }
        }
        
        if(!this.isCongratz && this.lvltimer > 60)
        {
             
           this.cleanup();
            //change state
            game.state.start('congratz');
            
            
        }
        

    }    
};


