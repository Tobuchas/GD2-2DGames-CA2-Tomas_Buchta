import GameObject from "../engine/gameObject.js"
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';


import Collectible from './collectible.js';
import ProjectileEnemy from './projectileEnemy.js';
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
        this.movementLimit = 200;
        this.moveRight = true;
        this.healthBar = null;
        this.lives = 3;
        this.canFire=false;
        this.timer=300;
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
        
//        this.isOnPlatform = false;
//        const platforms = this.game.gameObjects.filter((obj)=> obj instanceof Platform);
//        for(const platform of platforms)
//        {
//           
//            if(physics.isColliding(platform.getComponent(Physics)))
//            {
//                physics.velocity.y = 0;
//                physics.acceleration.y = 0;
//                this.y = platform.y - this.getComponent(Renderer).height;
//                this.isOnPlatform = true;
//
//            }
//        }

        if(this.y > this.game.canvas.height-50)
        {
            this.y = this.game.canvas.height-50;
        }
        
       
        
        if(this.x > this.game.canvas.width*(2/3)+110)
        {
            this.x = this.game.canvas.width*(2/3)+110;
        }
        if(this.x < this.game.canvas.width/3-160)
        {
            this.x = this.game.canvas.width/3-160;
        }
        
        
        const player = this.game.gameObjects.find((obj)=> obj instanceof Player);
        
        this.timer--;
        if (this.timer===0)
        {
            this.canFire=true;
            this.timer=300;
        }
        
        if(this.canFire)
        {
            let projectile = new ProjectileEnemy(this.x + (this.getComponent(Renderer).width/2) , 
            this.y + this.getComponent(Renderer).height/2, 20,20,Images.projectile1, "PlayerProjectile",
            this.direction*-1);
            this.game.addGameObject(projectile);
            this.canFire = false;

            //setTimeout(()=>{this.canFire = true;}, 500);
        }
        
        
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
            let collectible = new Collectible(this.x + (this.getComponent(Renderer).width/2) , 
            this.y + this.getComponent(Renderer).height/2);
            this.game.addGameObject(collectible);
             this.game.removeGameObject(this.healthBar);
            this.game.removeGameObject(this);
        }
    }
}

export default Enemy
