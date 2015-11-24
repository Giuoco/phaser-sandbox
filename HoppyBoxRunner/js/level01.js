// JavaScript File
/*global game */
/*global Phaser */


/*global platforms */
/*global background */
/*global nearground */
/*global player */
/*global playerhurt */
/*global stones */
/*global butflys */

/*global scoreDisplay */
/*global score */
/*global isCongratz */


/*global highScoreDisplay */
/*global highScore */

/*global instructions */
/*gloval lvltimer */

/*level1State methods*/

var instructions;
var instructions2;

var doubleJumpBool = false;

function onTapLvl1(thisPlayer, doubleTap) 
{
    //check to make sure hoppy isn't hurt
    if(player!=null)
    {
        //check to see if hoppy is on the ground
        if(player.body.touching.down)
        {
            doubleJumpBool = true;
            player.body.velocity.y = -350;
            
        }
        
        if(!player.body.touching.down && doubleJumpBool)
        {
            player.body.velocity.y += -200;
            doubleJumpBool = false;
        }
    }
}

function hurtPlayer() {
    playerhurt = game.add.sprite(player.x,player.y, 'hurthoppy');
    
    player.destroy();
    player=null;
    //  We need to enable physics on the player
    game.physics.arcade.enable(playerhurt);
    
    //  Player physics properties. Give the little guy a slight bounce.
    playerhurt.body.bounce.y = 0.0;
    playerhurt.body.gravity.y = 300;
    
    playerhurt.body.velocity.y = -350;
    playerhurt.body.velocity.x = 10;
    
    score = 0;
    lvltimer = 0;
}

function addHoppy()
{
     //add player
        // The player and its settings
    if(!player)
    {
        player = game.add.sprite(100, game.world.height - 150, 'hoppy');
    
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
    
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.0;
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;
    }
}

function addStone()
{
    var stone = stones.create(750,game.world.height-150,'stone');
    stone.animations.add('roll');
    stone.animations.play('roll',10,true);
    stone.body.gravity.y=400;
    stone.body.bounce.y=0.6;
    stone.body.gravity.x= game.rnd.integerInRange(-50, -600);
}

function addButfly()
{
    var butfly = butflys.create(750,game.world.height-225,'butfly');
    butfly.animations.add('spin');
    butfly.animations.play('spin',10,true);

    butfly.body.gravity.x= game.rnd.integerInRange(-50, -600);
}

function collectButflys(player, butfly)
{
    butfly.kill();
    
    score += 3;
    
    if(score > highScore)
    {
        highScore = score;
    }
    
   
    
}
 
var stonecounter = 0;
var butflycounter = 0;


function timerTick()
{
    //one second passed
    stonecounter++;
    butflycounter++;
    
    if (stonecounter>4)
    {
        addStone();
        stonecounter=0;
    }
    
    if(butflycounter>3)
    {
        addButfly();
        butflycounter = 0;
    }
    
     if(score > 3)
    {
        instructions.visible=false;
        instructions2.visible=false;
    } else
    {
        instructions.visible=true;
        instructions2.visible=true;
    }
    
    lvltimer++;
    
}



var level1State = {
   preload: function(){
    
    },

    create: function (){
    
     //  A simple background for our game
        game.add.sprite(0, 0, 'sky');
        background = game.add.tileSprite(0, 0, 800, 600, 'pines');
        nearground = game.add.tileSprite(0, 0, 800, 600, 'brush');
        
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;
        
        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        
        // add hoppy!
        addHoppy();
         
        //stones
        stones = game.add.group();
         //  We will enable physics for any stone that is created in this group
        stones.enableBody = true;
        
        butflys = game.add.group();
        butflys.enableBody = true;
        
        //create a timer for endless adding of stones
        game.time.events.loop(Phaser.Timer.SECOND, timerTick, this);
        
        //setup hud
        highScoreDisplay = game.add.text(16, 16, 'High Score: 0', { fontSize: '32px', fill: '#000' });
        scoreDisplay = game.add.text(16, 40, 'Score: 0', { fontSize: '32px', fill: '#000' });
        timerDisplay = game.add.text(650,16, 'Timer: ', {fontSize: '32px', fill: '#000'});
        instructions = game.add.text(250,60, 'Hoppy Box Runner!  Tap to jump!', {fontSize: '24px', fill: '#000'});
        instructions2 = game.add.text(250,90, 'Jump Rocks, Collect Butterflies!', {fontSize: '24px', fill: '#000'});
        
        //setup level controls for this level
        game.input.onTap.add(onTapLvl1, this);
        

    },

    update: function(){
          //move the parallax
        background.tilePosition.x += -1;
        nearground.tilePosition.x += -2;
        
        //  Collide the player and the butflys with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stones, platforms);
        
        //  Checks to see if the player overlaps with any of the butflys, if he does call the collectbutfly function
        game.physics.arcade.overlap(player, stones, hurtPlayer, null, this);
        
          //  Checks to see if the player overlaps with any of the butflys, if he does call the collectbutfly function
        game.physics.arcade.overlap(player, butflys, collectButflys, null, this);
        
        //update hud
        scoreDisplay.text = 'Score: ' + score;
        highScoreDisplay.text = 'High Score: ' + highScore;
        timerDisplay.text = 'Time: ' + lvltimer;
        
        // if the stone is falling off the screen then destroy it.
        stones.forEach(
            function(stone)
            {
                if(stone.x < 0)
                {
                    stone.destroy();
                    if(player!=null)
                    {
                        score+=1;
        
                        if(score > highScore)
                        {
                            highScore = score;
                           
                        }
                    }
                }
            }, this
        );    
        
        //check to see if player hurt needs destroyed
        if(playerhurt)
        {
            if(playerhurt.y > 900)   
            {
                playerhurt.destroy();
                playerhurt=null;
                
                addHoppy();
            }
        }
        
        if(!isCongratz && lvltimer > 60)
        {
            
            //remove hoppy so he doesn't get hit by a stone, or confused in state change.
            player.destroy();
            player = null;

            //change state
            game.state.start('congratz');
            
            
        }
        

    }    
};


