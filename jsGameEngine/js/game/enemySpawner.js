import Enemy from './enemy.js';
import GameObject from '../engine/gameobject.js'
import Renderer from '../engine/renderer.js'
import HealthBar from './healthBar.js';
import Game from '../engine/game.js';





class EnemySpawner extends GameObject
{
    constructor(x, y,w, h, color="purple")
    {
        super(x,y);
        this.addComponent(new Renderer(color, w, h));
        this.cooldown=3000;
        this.timer=300;
    }
    update(deltaTime)
    {
        this.timer--;
        if(this.timer===0)
        {
            let enemy = new Enemy(this.x, this.y);
            let hb = new HealthBar(enemy.x, enemy.y-15,enemy.getComponent(Renderer).width, 10 );
            enemy.setHealthBar(hb);
            this.game.addGameObject(hb);
            this.game.addGameObject(enemy);
            this.timer=this.cooldown;
        }
        
        
        super.update(deltaTime);
    }
    
}
export default EnemySpawner;