var lives, ball, ping, myShip;
var sparks = [];
var invaders = [];
var bullets = [];
var randos = [];
var blip, blip1, blip2, blip3, blip4;


var myArea = {
  canvas : document.getElementById("canvas"),
  start : function(){
    blip = new Audio("sounds/blip.wav");
    blip2 = new Audio("sounds/blip2.wav");
    blip3 = new Audio("sounds/blip3.wav");
    blip4 = new Audio("sounds/blip4.wav");
    this.laserSound = new Audio("sounds/laser.wav");
    this.lives = 3;
    // this.canvas.width = 800;
    this.gameOver = false;
    // this.canvas.height = 800;
    this.frameNo = 0;
    this.context = this.canvas.getContext('2d');
    this.context2 = this.canvas.getContext('2d');
    this.lives = 3;
    this.gameSpeed = 40;
    this.gameSpeedX  = .3;
    this.gameSpeedY = .1;
    this.ufoInterval = 400;
    this.invaders = 63;
    // document.body.insertBefore(this.canvas, document.body.childNodes[2]);
    this.interval = setInterval(updateMyArea, 20);
    this.canvas.style.cursor = "none";
    window.addEventListener('mousemove', function(e){
      // if (e.clientX >= myArea.canvas.getBoundingClientRect().left &&
      //     e.clientX <= myArea.canvas.getBoundingClientRect().right){
      //       myArea.x = e.clientX - myArea.canvas.getBoundingClientRect().left;
      // }
      //what is X coordinate of cursor.
    myArea.x = e.clientX;
    });
    document.onmousedown = function(){
      var canvasContext = myArea.x - myArea.canvas.getBoundingClientRect().left;
      var fireX;
      if(canvasContext < 10){
        fireX =10;}
      else if (canvasContext > 735){
        fireX = 735;
      }
      else{
        fireX = canvasContext;
      }
      fire(fireX);
      return false;
    };

    // mySound = new Audio("sounds/ping.wav");
    // my compnent constructor syntax
    // (width, height, cx, cy, type, source, sx, sy, swidth, sheight, soffset, dwidth, dheight){

    myShip = new Component(null, null, null, 726, "myShip", 'img/invaders.gif', 147, 631, 77, 46, null, 50, 30);
    lives = new Component(10, 200, 0, 10, "lives", 'img/invaders.gif', 147, 631, 77, 46, null, 50, 30);

    //row7
    for (var i = 0; i < 9; i++) {
      invaders.push (new Component(10, 10, 40 + (i*85), 10, "invader", 'img/invaders.gif', 18, 13 , 112 , 83, 146, 40, 34));
    }
    //row2-6
    for (var y = 0; y < 5; y++) {
      for (var i = 0; i < 9; i++) {
        invaders.push (new Component(10, 10, 40 +(i *85 ), 50 + (y * 50) , "invader", 'img/invaders.gif', 311, 13, 83, 86, 116 , 39, 40));
      }
    }
    //row 1 (bottom)
    for (var i = 0; i < 9; i++) {
      invaders.push (new Component(10, 10, 40 + (i*85), 300, "invader", 'img/invaders.gif', 236, 494, 80, 82, 111 , 39, 40));
    }
  },
  clear : function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function(){
    clearInterval(this.interval);
  },
  makeUfo : function(){
    if(this.frameNo % this.ufoInterval ===0){
      var rando = Math.floor(Math.random() * 2000);
      var randocx = Math.floor(Math.random() *700);
      var newUfo = new Component(500, 500, 0 +randocx, 0, "ufo", 'img/invaders.gif', 17, 632 , 127 , 60, 0, 40, 34);
      invaders.push (newUfo);
      setTimeout(function(){
        newUfo.speedX = 0;
        var laser = new Bullet (newUfo.cx + 15, newUfo.cy + 23, 30, "myShip", "laser");
        myArea.laserSound.loop = true;
        // myArea.laserSound.play();
        bullets.push(laser);
        setTimeout(function(){
          laser.speedY = -30;
          setTimeout(function(){
            var ufoIndex = invaders.indexOf(this);
            var laserIndex = bullets.indexOf(laser);
            bullets.splice(laserIndex, 1);
            invaders.splice(ufoIndex, 1);
            myArea.laserSound.pause();
            myArea.laserSound.currentTime = 0;
          }, 1000);
        }, 1000)
      }, 2000 +rando);
    }
  }
}


function Component (width, height, cx, cy, type, source, sx, sy, swidth, sheight, soffset, dwidth, dheight){
  this.cx = cx;
  this.cy = cy;
  this.width = width;
  this.height = height;
  this.type = type;
  this.image = new Image();
  this.image.src = source;
  this.rotateCounter = 0;
  this.rotateCounter2 = 4;
  this.soffset = soffset;
  this.dwidth = dwidth;
  this.dheight = dheight;
  this.speedX = 20;
  this.speedY = 0;
  this.sxRef = sx;
  this.sx = sx;
  this.sx2 = sx +soffset;
  this.sy = sy;
  this.swidth = swidth;
  this.sheight = sheight;
  ctx = myArea.context;
  this.update = function(){
    if(this.type === "lives"){
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.fillText(myArea.lives, 750, 30);

      // ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, 10, 726, this.dwidth, this.dheight);
    }
    if(this.type === "myShip"){
      var canvasLeft = myArea.canvas.getBoundingClientRect().left;
      var canvasRight = myArea.canvas.getBoundingClientRect().right;
    // if (e.clientX >= myArea.canvas.getBoundingClientRect().left &&
    //     e.clientX <= myArea.canvas.getBoundingClientRect().right){
    //       myArea.x = e.clientX - myArea.canvas.getBoundingClientRect().left;
    // }
    if(myArea.x < canvasLeft +45){
      this.cx = 10;
    }
    else if(myArea.x >= canvasRight - 65){
      this.cx = 735;
    }
    else{
      this.cx = myArea.x - canvasLeft;
    }

      ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.cx, this.cy, this.dwidth, this.dheight);

    }
    else if (this.type === "invader"){
      if(myArea.frameNo % myArea.gameSpeed === 0 || myArea.frameNo === 1){
        this.newPos();
        this.rotateCounter ++;
      }
      if(this.rotateCounter % 2 === 0){
        this.sxRef = this.sx2;
      }
      else{
        this.sxRef = this.sx;
      }
      this.cx +=this.speedX;
      this.cy +=this.speedY;
      ctx.drawImage(this.image, this.sxRef, this.sy, this.swidth, this.sheight, this.cx, this.cy, this.dwidth, this.dheight);
    }
    else if (this.type ==="ufo"){
        var rando = Math.floor(Math.random() * invaders.length);
        this.cx += this.speedX;
        if(this.cx > 750 || this.cx < 0 ){
          this.speedX *= -1;
        }
        ctx.drawImage(this.image, this.sxRef, this.sy, this.swidth, this.sheight, this.cx, this.cy, this.dwidth, this.dheight);
    }
  },
  this.newPos = function(){
    if(this.rotateCounter2  === 4){
      // blip.play();
      this.speedX = 0;
      this.speedY = myArea.gameSpeedY;
      this.rotateCounter2 --;
    }
    else if(this.rotateCounter2 === 3){
      // blip2.play();
      this.speedX = myArea.gameSpeedX;
      this.speedY =0;
      this.rotateCounter2 --;

    }
    else if( this.rotateCounter2  === 2){
      // blip3.play();
      this.speedX = 0;
      this.speedY = myArea.gameSpeedY;
      this.rotateCounter2 --;

    }
    else{
      // blip4.play();
      this.speedX = -1 * myArea.gameSpeedX;
      this.speedY = 0;
      this.rotateCounter2 = 4;
    }
  }

}
function Bullet (cx, cy, speedY, target, type){
  this.type = type;
  this.cx = cx;
  this.cy = cy;
  this.dwidth = 18;
  this.dheight = 30;
  this.image = new Image();
  this.image.src = "img/invaders.gif";
  this.speedY = speedY;
  this.target = target;
  ctx = myArea.context;
  this.update = function(){
    if(this.type === "bullet"){
      if(this.cy > 800 || this.cy < 0){
        var bulletIndex = bullets.indexOf(this);
        bullets.splice(bulletIndex, 1);
      }
      this.cy += this.speedY;
      //  reference :     ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.cx, this.cy, this.dwidth, this.dheight);
      ctx.drawImage(this.image, 484, 390, 36, 60, this.cx, this.cy, this.dwidth, this.dheight);
    }
    else if (this.type === "laser"){
      ctx2 = myArea.context2;
      ctx2.fillStyle = "yellow";
      ctx2.shadowBlur = 20;
      ctx2.shadowColor = "red";
      if(this.dheight < this.cy){
        this.speedY = 0;
        this.dheight = 0;
      }
      this.dheight += this.speedY;
      ctx2.fillRect(this.cx, this.cy, 10, this.dheight);
    }
  },
  this.crashWith = function(otherObj){
    var myLeft = this.cx;
    var myRight = this.cx + this.dwidth;
    var myTop = this.cy;
    var myBottom = this.cy + this.dheight;
    var otherLeft = otherObj.cx;
    var otherRight = otherObj.cx + otherObj.dwidth;
    var otherBottom = otherObj.cy + otherObj.dheight;
    var otherTop = otherObj.cy;
    if( myLeft < otherRight && myRight > otherLeft && myTop < otherBottom && (myBottom > otherTop)) {
      var bulletIndex = bullets.indexOf(this);
      bullets.splice(bulletIndex, 1);
      var explode = new Audio("sounds/explode.wav");
      explode.play();
      if(this.target ==="invader"){
        var invaderIndex = invaders.indexOf(otherObj);
        otherObj.sx = 356;
        otherObj.sx2 = 356;
        otherObj.sy = 626;
        otherObj.swidth = 100;
        otherObj.sheight = 77;
        drawSparks(otherObj.cx, otherObj.cy);
        myArea.invaders --;
        setTimeout(function(){
          invaders[invaderIndex] = null;
        }, 200);
      }
      if(this.target === "myShip"){
        myArea.lives --;
        otherObj.sx =240;
        otherObj.sy = 632;
        otherObj.swidth = 108;
        otherObj.sheight = 63;
        setTimeout(function(){
            myShip = new Component(null, null, null, 726, "myShip", 'img/invaders.gif', 147, 631, 77, 46, null, 50, 30);
        }, 500);
        if(this.type === "laser"){
          myArea.laserSound.pause();
          myArea.laserSound.currentTime = 0;
        }
      }
    }
  }
}
function updateMyArea(){
  myArea.frameNo ++;
  myArea.clear();
  myShip.update();
  lives.update();
  alienFire();
  myArea.makeUfo();
  speedUp();

  invaders.forEach(function(invader){
    if(invader){invader.update();}
  })
  if(sparks.length >0){
    sparks.forEach(function(spark){
      spark.update();
    });
  }
  if(bullets.length > 0){
    bullets.forEach(function(bullet){
      if(bullet.target === "invader"){
        invaders.forEach(function(invader){
          if(invader){bullet.crashWith(invader);}
        });
      }
      else if(bullet.target === "myShip"){
        bullet.crashWith(myShip);
      }
      bullet.update();
    });
  }
}

function Spark(cx, cy, speedX, speedY){
  this.cx  = cx;
  this.cy = cy;
  this.gravity = .4;
  this.speedX = speedX;
  this.speedY = speedY;
  this.update = function(){
    if(this.cy > 1000){
      var sparkIndex = sparks.indexOf(this);
      sparks.splice(sparkIndex,1)
    }
    var ctx = myArea.context;
    ctx.shadowBlur = 5;
    ctx.fillStyle = "white";
    // ctx.shadowColor = "yellow"
    this.speedY += this.gravity;
    this.speedX *= .96;
    this.cx += this.speedX;
    this.cy += this.speedY;
    ctx.fillRect(this.cx, this.cy, 10, 10);
  };
}

var drawSparks = function(x, y){
  sparks.push(new Spark(x,y, 10, 15));
  sparks.push(new Spark(x,y, 12, 14));
  sparks.push(new Spark(x,y, 15, 11));
  sparks.push(new Spark(x,y, 18, 20));
  sparks.push(new Spark(x-30, y, -10, 15));
  sparks.push(new Spark(x+30, y, -5, 13));
  sparks.push(new Spark(x-30, y, -13, 11));
  sparks.push(new Spark(x+30, y, -16, 18));
}

function fire(fireX){
  var shoot = new Audio("sounds/shoot.wav");
  // shoot.play();
  bullets.push(new Bullet(fireX +15, 690, -10, "invader", "bullet"));
}

function alienFire(){
  if(myArea.frameNo % 100 === 0){
    var rando = Math.floor(Math.random() * invaders.length);
    var randoX = invaders[rando].cx +20;
    var randoY = invaders[rando].cy;
    bullets.push(new Bullet(randoX, randoY, 10 , "myShip", "bullet"));
  }
}
function speedUp(){
  if(myArea.invaders < 3){
    myArea.ufoInterval = 10;
  }
  else if(myArea.invaders < 15){
    myArea.gameSpeed = 6;
    myArea.gameSpeedY = .7;
    myArea.ufoInterval = 300;
  }
  else if(myArea.invaders < 30){
    myArea.gameSpeed = 10;
    myArea.gameSpeedX = .6;
    myArea.gameSpeedY = .4;
    myArea.ufoInterval = 350;
  }
}

myArea.start();
