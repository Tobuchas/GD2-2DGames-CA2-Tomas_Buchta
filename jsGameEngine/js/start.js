// Import the Level class from './game/level.js'.
import Level from './game/level.js';
import WelcomeScreen from './game/welcomeScreen.js';

// Create a new instance of the Level class with 'gameCanvas' as the canvas ID.
//const game = new Level('gameCanvas');
const game = new WelcomeScreen('gameCanvas');

// Start the game by calling the start method of the Level instance.
game.start();
