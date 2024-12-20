import GameObject from '../engine/gameobject.js';
import Level from './level.js';
import Renderer from '../engine/renderer.js';

class Button extends GameObject
{
    constructor(x, y, w, h, color, str) {
      super(x,y);
      this.width = w;
      this.height = h;
      this.color = color;
      this.text = str;
      document.addEventListener('click', this.click.bind(this), false);
      this.addComponent(new Renderer('green',0,0));
  }
  
  draw(ctx)
  {
      super.draw(ctx);
      ctx.fillStyle=this.color;
      ctx.fillRect(this.game.camera.x + this.x,this.game.camera.y + this.y, this.width, this.height );
      ctx.textAlign = "center";
      ctx.font = "20px serif";
      ctx.fillStyle="white";
      ctx.fillText(this.text, this.game.camera.x + this.x + this.width/2, this.game.camera.y + this.y + 15);
  }
  
  click(event)
  {
      let rect = this.game.canvas.getBoundingClientRect();
      let width = this.width;
      let height = this.height;
      
      if (event.clientX - rect.left >= this.x && event.clientX - rect.left <= this.x + width && event.clientY - rect.top >= this.y && event.clientY - rect.top <= this.y + height) 
      {
          
        if(this.text === "Start")
        {
            const level = new Level(this.game.canvas.id,this.game);
            level.start();
        }
        if(this.text === "Pause")
        {
            this.game.pauseGame();
            if(this.game.pause)
               this.game.audioManager.PauseSound("bgm");
           else
               this.game.audioManager.PlaySound("bgm");
        }
        if(this.text === "Retry")
        {
            const level = new Level(this.game.canvas.id);
            level.start();
        }
      }    
  }



  

}

export default Button
