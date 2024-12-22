import GameObject from '../engine/gameobject.js'
import Animation from '../engine/Animation.js'
import Renderer from '../engine/renderer.js'
import Animator from '../engine/Animator.js'
//import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import Input from "../engine/input.js"
import {Images} from '../engine/resources.js'
import Platform from './platform.js'
import Collectible from './collectible.js'
import Checkpoint from './checkpoint.js'
import Projectile from './projectile.js'
import HealthBar from './healthBar.js'
import ParticleSystem from '../engine/particleSystem.js'



import {RunImages} from '../engine/resources.js'
class Player extends GameObject
{
    constructor(x, y, w, h, healthBar)
    {
        super(x, y);
       // this.addComponent(new Renderer('red', w, h, Images.player));
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}, { x: 0, y: 0 }) );
        this.addComponent(new Input());
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        let run = new Animation('red',w,h, RunImages, 10);
        let idle = new Animation('red', w, h, [RunImages[0]], 10);
        
        this.animator.addAnimation("run", run);
        this.animator.addAnimation("idle", idle);
        this.animator.setAnimation("idle");
        this.tag = "player";
        this.isOnPlatform = false;
        this.direction = 1;
        this.score = 0;
        this.defaultSpeed=100;
        this.speed = 100;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 300;
        this.jumpTime = 1.0;
        this.jumpTimer = 0;
        this.lives = 3;
        this.inVulnreable =false;
        this.canFire = true;
        this.startPoint = {x: x, y:y};
        this.healthBar = healthBar;
        this.healthBar.maxValue = this.lives;
        this.healthBar.currentValue = this.lives;
        
    }
    
    update(deltaTime)
    {
        
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        const renderer = this.getComponent(Renderer);
        
        var moveCheck = false;

        physics.velocity.x = 0;
        physics.velocity.y = 0;
        if(input.isKeyDown("ArrowRight"))
        {
            
            physics.velocity.x = this.speed;
            this.direction = -1;
            console.log("in");
            this.animator.setAnimation("run");
            moveCheck=true;
        }
        if(input.isKeyDown("ArrowLeft"))
        {
            physics.velocity.x = -this.speed;
            this.direction = 1;
            this.animator.setAnimation("run");
            moveCheck=true;
        }
        if(input.isKeyDown("ArrowUp"))
        {
            
            physics.velocity.y = -this.speed;
            this.animator.setAnimation("run");
            moveCheck=true;
        }
        if(input.isKeyDown("ArrowDown"))
        {
            
            physics.velocity.y = this.speed;
            this.animator.setAnimation("run");
            moveCheck=true;
        }
        if (moveCheck!==true)
        {
            
            this.animator.setAnimation("idle");
        }
        
//        if(moveCheck==true)
//        {
//            if (this.x<this.game.canvas.width/3)
//            {
//                this.x=this.game.canvas.width/3;
//            }
//            else if (this.x>this.game.canvas.width-this.canvas.width/3)
//            {
//                this.x-this.game.canvas.width-this.canvas.width/3;
//            }
//        }
        
        if(input.isKeyDown("Space"))
        {
            if(this.canFire)
            {
                let projectile = new Projectile(this.x + (renderer.width/2) , 
                this.y + renderer.height/2, 20,20,Images.projectile1, "PlayerProjectile",
                this.direction*-1);
                this.game.addGameObject(projectile);
                input.keys["Space"]=false;
                this.canFire = false;
                
                setTimeout(()=>{this.canFire = true;}, 300);
            }
        }
        
        
        
        if(input.isKeyDown("ShiftLeft"))
        {
            this.speed =300;
        }
        else
        {
            this.speed=this.defaultSpeed;
        }

        
       
        
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for(const platform of platforms)
        {
          
            if(physics.isColliding(platform.getComponent(Physics)))
            {
     //               physics.acceleration.x = 0;
   //                 physics.velocity.x = 0;
 //                   this.x = platform.x - this.getComponent(Renderer).width;
            }
            
        }
        const checkpoints = this.game.gameObjects.filter((obj) => obj instanceof Checkpoint);
        for(const checkpoint of checkpoints)
        {
            if(physics.isColliding(checkpoint.getComponent(Physics)))
            {
                this.startPoint.x = checkpoint.x;
                this.startPoint.y = checkpoint.y;
                
            }
        }
        
        const collectibles = this.game.gameObjects.filter
        ((obj)=> obj instanceof Collectible);
        for(const coll of collectibles)
        {
            if(physics.isColliding(coll.getComponent(Physics)))
            {
                this.collectStar(coll);
            }
        }
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
        
        
        super.update(deltaTime);
        
        
    }
    collidedWithEnemy()
    {
        if(!this.inVulnreable)
        {
            hit();
            console.log(this.lives);
          //  this.x = this.startPoint.x;
          //  this.y = this.startPoint.y;
            this.inVulnreable = true;
            setTimeout(()=>{this.inVulnreable = false;}, 2000);
        }
    }
    
    collectStar(collectible)
    {
        this.game.removeGameObject(collectible);
        this.emitParticles(collectible);
        this.score++;
       
    }
    
    emitParticles(collectible)
    {
        let renderer = collectible.getComponent(Renderer);
        const particleSystem = new ParticleSystem(collectible.x + (renderer.width/2),
        collectible.y+ (renderer.height/2),
        'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);

    }
    
    
    hit()
    {
        this.lives--;
        this.healthBar.currentValue = this.lives;
        if(this.lives === 0)
        {
             //END GAME
             this.game.stopped=true;
             this.game.welcomeScreen.start(); 
             this.game.delAll();
             
        }
    }
}

export default Player
