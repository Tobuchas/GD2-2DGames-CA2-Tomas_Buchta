import GameObject from "../engine/gameObject.js"
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';

import Player from './player.js';
import Enemy from './enemy.js';
import Platform from './platform.js';

class ProjectileEnemy extends GameObject
{
    constructor(x,y, w, h, img, tag, dir)
    {
        super(x,y);
        this.addComponent(new Renderer('white', w, h, img));
        this.addComponent(new Physics({x:0, y:300}, {x:0, y:0}, {x:0,y:0}));
        this.tag = tag;
    }
    
    update(deltaTime)
    {
        
      
        if(this.x  < 0 || this.x > 2000 || this.y  < 0 || this.y > 2000)
        {
            this.game.removeGameObject(this);
        }
        
        const objs = this.game.gameObjects.filter( (obj) => 
            (obj instanceof Player || obj instanceof Platform));
        for(let o of objs)
        {
          
            if(this.getComponent(Physics).isColliding(o.getComponent(Physics)))
            {
                this.game.removeGameObject(this);
                if(o instanceof Player)
                {
                    o.hit();
                }
            }
        }
        
        super.update(deltaTime);
    }
}

export default ProjectileEnemy;


