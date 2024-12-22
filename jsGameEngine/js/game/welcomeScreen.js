import Game from '../engine/game.js';
import Button from './Button.js';
import Confiner from '../engine/confiner.js';
import Player from './player.js';
import HealthBar from './healthBar.js'


class WelcomeScreen extends Game
{
    
    constructor(canvasId) {
    super(canvasId);
    let startBtn = new Button(this.canvas.width/2-50,500,100,40, 'green', "Start");
        this.addGameObject(startBtn);
        this.camera.target = startBtn;
    let info = new Button(this.canvas.width/2-200,300,400,80, 'purple', "WASD, Shift for faster movment, Space to shoot");
        this.addGameObject(info);
    let title = new Button(this.canvas.width/2-100,100,200,80, 'red', "Snowdown showdown");
        this.addGameObject(title);
   }
}

export default WelcomeScreen;
