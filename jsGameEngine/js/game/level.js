import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import Collectible from './collectible.js';
import Checkpoint from './checkpoint.js';
import Enemy from './enemy.js';
import PlayerUI from './PlayerUI.js';
import HealthBar from './healthBar.js'
import Button from './Button.js';
import EnemySpawner from './enemySpawner.js';


class Level extends Game
{
    constructor(canvasId, welcomeScreen)
    {
        super(canvasId);
        
        this.welcomeScreen=welcomeScreen;
        
        let healthBar = new HealthBar(this.canvas.width/2-100, this.canvas.height-20, 200, 20);
        
        const player = new Player(600, this.canvas.height - 100,50, 50, healthBar);
        
        this.camera.confiner = new Confiner(0,0,2000,this.canvas.height);
        this.camera.target = player;
        this.addGameObject(player);
        
        const platforms = [
                    new Platform(0, this.canvas.height-1000, this.canvas.width/3-150, 2000),
                    new Platform(this.canvas.width-this.canvas.width/3+150, this.canvas.height-1000, this.canvas.width/3, 2000)
                    
        ];
        
        for(const platform of platforms)
        {
            this.addGameObject(platform);
        }
        
        
        
        
        const spawners = [
            new EnemySpawner((this.canvas.width/3-150),10,10),
            new EnemySpawner((this.canvas.width/3)+(this.canvas.width/(3*5)),10,10),
            new EnemySpawner((this.canvas.width/3+2*this.canvas.width/(3*5)),10,10),
            new EnemySpawner((this.canvas.width/3+3*this.canvas.width/(3*5)),10,10),
            new EnemySpawner((this.canvas.width/3+4*this.canvas.width/(3*5)+150),10,10)
        ];
        
        for(const spawn of spawners)
        {
            this.addGameObject(spawn);
        }
        
        let ui = new PlayerUI(10,10);
        
     
        this.addGameObject(ui);
        ui.addGameObject(healthBar, this.canvas.width-200, 10);
//        this.addGameObject(new Checkpoint(450, this.canvas.height-100, 20,40, 'yellow'));
        
        this.addGameObject(new Button(this.canvas.width-110,10,100,40,'lightGrey', "Pause"));  
        
    }
}
export default Level

