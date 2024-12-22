import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import {Images} from "../engine/resources.js"
import Game from '../engine/game.js';

class Collectible extends GameObject
{
    constructor(x, y)
    {
        super(x, y);
        this.addComponent(new Renderer("yellow",30,30, Images.collectible));
        this.addComponent(new Physics({x:0, y:0},{x:0, y:100},{x:0, y:0}));
        
        this.tag = "star";
        
        this.floatTime = 1.0;
        this.timeFloating = this.floatTime;
        this.vDirection = 1;
        
        this.maxWidth = 30;
        this.hDirection = 1;
        
    }
    
    update(deltaTime)
    {
        let physics = this.getComponent(Physics);
        let renderer = this.getComponent(Renderer);
        
        
        if(this.y>this.game.canvas.height)
        {
            this.game.removeGameObject(this);
        }
        
        renderer.width += this.hDirection;
        this.x += (this.hDirection/2)*-1;
        if(renderer.width > 30 || renderer.width <1)
        {
            this.hDirection *=-1;
        }
        super.update(deltaTime);
    }
    
  
}

export default Collectible

