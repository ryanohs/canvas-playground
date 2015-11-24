var canvas = document.getElementById("canvas");
window.addEventListener("resize", resizeCanvas, false);
function resizeCanvas()
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
var scene = canvas.getContext("2d");

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Circle = function(x, y, color) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.maxr = 60;
  this.remove = false;

  this.step = () => {
    this.r++;
    if(this.r > this.maxr) {
      this.remove = true;
    }
  }

  this.render = () => {
    scene.beginPath();
    scene.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    scene.strokeStyle = color;
    scene.lineWidth = 2;
    scene.stroke();
    scene.closePath();
  }
}

var Clicks = function(dots) {
  this.game; // injected

  var objects = [];


  this.mouseDown = mouse => {
    this.mouseXY(mouse);
  }
  this.mouseXY = mouse => {
    if(mouse.isMouseDown) {
      objects.push(new Circle(mouse.x, mouse.y, "green"));
    }
  }

  this.keydown = e => {
    switch(e.keyCode)
    {
      case 37:
        this.left();
        break;
      case 38:
        this.up();
        break;
      case 39:
        this.right();
        break;
      case 40:
        this.down();
        break;
    }
  };

  this.step = () => {
    objects.forEach(o => o.step());
    objects = objects.filter(o => !o.remove);
  };

  this.render = () => {
    scene.fillStyle = "#ccc";
    scene.fillRect(0,0,canvas.width,canvas.height);
    objects.forEach(o => o.render());
  };

  this.start = () => {
    // todo
  };
};

var clicks = new Clicks(scene);
var game = new Game(canvas, clicks, 60);

game.run();
