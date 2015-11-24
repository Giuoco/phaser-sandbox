//global variables

var platforms; //group
var background;
var nearground;
var player;
var playerhurt;
var stones; //group
var butflys;//group

var scoreDisplay = "";
var score = 0;
var isCongratz = false;


var highScoreDisplay = "";
var highScore = 0;

var timerDisplay;
var lvltimer = 0;


var gameWidth = 800;
var gameHeight = 600;
/*global Phaser*/
/*global bootState */
/*global loadState */
/*global level1State */
/*global congratzState */


//create this game in the gaveDiv container
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('level1', level1State);
game.state.add('congratz', congratzState);
game.state.add('level2', level2State);



game.state.start('boot');