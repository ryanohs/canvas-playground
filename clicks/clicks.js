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
  this.maxr = 120;
  this.remove = false;

  this.colorStepS = (100 - color.s)/this.maxr;
  this.colorStepL = (100 - color.l)/this.maxr;

  this.step = () => {
    this.r++;
    if(this.r > this.maxr) {
      this.remove = true;
    }
  }

  this.render = () => {
    scene.beginPath();
    scene.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    var hsl = "hsl(" + color.h + ", " + (color.s + this.colorStepS * this.r) + "%, " + (color.l + this.colorStepL * this.r) + "%)";
    scene.strokeStyle = hsl;
    scene.lineWidth = 2;
    scene.stroke();
    scene.closePath();
  }
}

var Clicks = function(dots) {
  this.game; // injected

  var objects = [];
  var hue = 180;

  this.mouseDown = mouse => {
    this.mouseXY(mouse);
  }

  this.mouseXY = mouse => {
    if(mouse.isMouseDown) {
      var color = {h: hue++, s: 75, l: 75};
      if(hue == 360) hue = 0;
      objects.push(new Circle(mouse.x, mouse.y, color));
    }
  }

  this.step = () => {
    objects.forEach(o => o.step());
    objects = objects.filter(o => !o.remove);
  };

  this.render = () => {
    scene.clearRect(0,0,canvas.width,canvas.height);
    objects.forEach(o => o.render());
  };

  this.start = () => {
    // todo
  };
};

var clicks = new Clicks(scene);
var game = new Game(canvas, clicks, 60);

game.run();
