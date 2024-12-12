import GameObject from "../engine/gameObject.js"
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';


import Player from './player.js';
import Platform from './platform.js';
import HealthBar from './healthBar.js';

class Enemy extends GameObject
{
    constructor(x, y)
    {
        super(x,y);
        this.addComponent(new Renderer('green',50,50, Images.enemy));
        this.addComponent(new Physics({x:50, y:0},{x:0, y:0}));
        this.movementDistance = 0;
        this.movementLimit = 100;
        this.moveRight = true;
        this.healthBar = null;
        this.lives = 3;
    }
    setHealthBar(hb)
    {
        this.healthBar = hb;
        this.healthBar.maxValue = this.lives;
        this.healthBar.currentValue = this.lives;
    }
    update(deltaTime)
    {
         let physics = this.getComponent(Physics);
       
        if(this.moveRight)
        {
            if(this.movementDistance < this.movementLimit)
            {
                physics.velocity.x = 50;
                this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
                this.getComponent(Renderer).gameObject.direction = 1;

            }
            else
            {
                this.moveRight = false;
                physics.velocity.x = 0;
                this.movementDistance = 0;
            }
        }
        else
        {
             if(this.movementDistance < this.movementLimit)
            {
                physics.velocity.x = -50;
                this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
                this.getComponent(Renderer).gameObject.direction = -1;

            }
            else
            {
                this.moveRight = true;
                physics.velocity.x = 0;
                this.movementDistance = 0;
            }
        }
        
        this.isOnPlatform = false;
        const platforms = this.game.gameObjects.filter((obj)=> obj instanceof Platform);
        for(const platform of platforms)
        {
           
            if(physics.isColliding(platform.getComponent(Physics)))
            {
                physics.velocity.y = 0;
                physics.acceleration.y = 0;
                this.y = platform.y - this.getComponent(Renderer).height;
                this.isOnPlatform = true;

            }
        }
        
        const player = this.game.gameObjects.find((obj)=> obj instanceof Player);
        if(physics.isColliding(player.getComponent(Physics)))
        {
            player.collidedWithEnemy();
        }
        super.update(deltaTime);
        this.healthBar.x = this.x;
        this.healthBar.y = this.y-15;
        
    }
    
    hit()
    {
        this.lives--;
        this.healthBar.currentValue = this.lives;
        if(this.lives === 0)
        {
             this.game.removeGameObject(this.healthBar);
            this.game.removeGameObject(this);
        }
    }
}

export default Enemy
