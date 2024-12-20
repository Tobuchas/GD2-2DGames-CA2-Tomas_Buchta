import Game from '../engine/game.js';
import Button from './Button.js';
import Confiner from '../engine/confiner.js';
import Player from './player.js';
import HealthBar from './healthBar.js'


class WelcomeScreen extends Game
{
    
    constructor(canvasId) {
    super(canvasId);
    let startBtn = new Button(100,100,100,40, 'green', "Start");
        this.addGameObject(startBtn);
        this.camera.target = startBtn; 
   }
}

export default WelcomeScreen;
