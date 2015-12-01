//global variables

/*storage methods */

var gameState =
{
    
    getState: function(){
        var state = JSON.parse(localStorage.getItem('gameState'));
        
        if(!state)
        {
            state = {};
        }
        
        return state;
    },
    
    setState: function(state){
        localStorage.setItem('gameState', JSON.stringify(state));
    }
}


/*global Phaser*/
/*global bootState */
/*global loadState */
/*global level1State */
/*global level2State */
/*global congratzState */

var gameWidth=800;
var gameHeight=600;


//create this game in the gaveDiv container
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('level1', level1State);
game.state.add('congratz', congratzState);
game.state.add('level2', level2State);



game.state.start('boot');