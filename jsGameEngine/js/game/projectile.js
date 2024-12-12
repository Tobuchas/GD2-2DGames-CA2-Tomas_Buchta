import GameObject from "../engine/gameObject.js"
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';


import Enemy from './enemy.js';
import Platform from './platform.js';

class Projectile extends GameObject
{
    constructor(x,y, w, h, img, tag, dir)
    {
        super(x,y);
        this.addComponent(new Renderer('white', w, h, img));
        this.addComponent(new Physics({x:100*dir, y:0}, {x:100*dir, y:0}, {x:0,y:0}));
        this.tag = tag;
    }
    
    update(deltaTime)
    {
      
        if(this.x  < 0 || this.x > 2000)
        {
            this.game.removeGameObject(this);
        }
        
        const objs = this.game.gameObjects.filter( (obj) => 
            (obj instanceof Enemy || obj instanceof Platform));
        for(let o of objs)
        {
          
            if(this.getComponent(Physics).isColliding(o.getComponent(Physics)))
            {
                this.game.removeGameObject(this);
                if(o instanceof Enemy)
                {
                    o.hit();
                }
            }
        }
        
        super.update(deltaTime);
    }
}

export default Projectile;


