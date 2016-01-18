function Ball(size, color, position, direction, speed){
    this.size = size;
    this.color = color;
    this.opacity = 1;
    this.exploding = false;
    if(position !== undefined){
        this.x = position.x;
        this.y = position.y;
    } else {
        this.x = this.size;
        this.y = this.size;
    }
    this.direction = direction ? direction : getRandom(0, 2*Math.PI);
    this.speed = speed ? speed : getRandom(0,10);


    this.draw();
}

Ball.prototype.tick = function(){
    this.x += Math.cos(this.direction)*this.speed;
    this.y += Math.sin(this.direction)*this.speed;

    this.checkCollision();
    this.draw();
};

Ball.prototype.checkCollision = function(){
    //with screen borders
    if(this.x+this.size >= canvas.width || this.x-this.size <= 0){
        this.direction = Math.PI-this.direction;
    }
    if(this.y+this.size >= canvas.height || this.y-this.size <= 0){
        this.direction = Math.PI+(Math.PI-this.direction);
    }
    //with other balls
    for(var i = 0; i < balls.length; i++){
        var b = balls[i];
        if(b !== this && distanceBetween(this, b) <= this.size+b.size){
            if(!this.exploding){
                this.explode();
                this.exploding = true;
            }
            if(!b.exploding){
                b.explode();
                b.exploding = true;
            }
        }
    }
};

Ball.prototype.explode = function(){
    var thisBall = this,
        interval;
    chain.push(this);
    chainTime = 1;
    thisBall.speed *= 0.1;

    setTimeout(function(){
        var bindex = balls.indexOf(thisBall);
        var cindex = chain.indexOf(thisBall);
        balls.splice(bindex, 1);
        chain.splice(cindex, 1);
        thisBall = null;
    }, 1000*1);

    interval = setInterval(function(){
        if(chainTime <= 0){
            balls.push(new Ball(30, getRandomColor(), {x: getRandom(30, 800), y: getRandom(30, 800)}, 0, 3));
            clearInterval(interval);
        }
        if(thisBall){
            if(thisBall.size < thisBall.size*1.5) thisBall.size += 0.1;
            if(thisBall.opacity > 0.5) thisBall.opacity -= 0.03;
        }
    },(1000/60));
};

Ball.prototype.draw = function(){
  if(ctx !== undefined){
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
      ctx.fill();
  }  else {
      console.error('Can\'t draw! Context not defined!');
  }
};


function distanceBetween(pos1, pos2){
    var xd = pos1.x - pos2.x;
    var yd = pos1.y - pos2.y;
    return Math.sqrt(xd*xd+yd*yd);
}


