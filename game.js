var Game = function(canvas, instance, fps){
  // inject self
  instance.game = this;

  var draw = () => {
    setTimeout(() => {
        requestAnimationFrame(draw);
        step();
        render();
    }, 1000 / fps);
  };

  var step = () => {
    instance.step();
  };

  var render = () => {
    instance.render();
  };

  this.run = () => {
    instance.start();
    draw();
  };

  this.over = () => {
    gameOver = true;
    setTimeout(() => {
      gameOver = false;
      instance.start();
    }, 3000);
  };

  this.won = () => {
    gameWon = true;
    setTimeout(() => {
      gameWon = false;
      instance.start();
    }, 5000);
  };

  if(instance.keydown) document.addEventListener("keydown", instance.keydown);
  if(instance.keyup) document.addEventListener("keyup", instance.keyup);

  var isMouseDown = false;

  var mouseDown = e => {
    isMouseDown = true;
    e.preventDefault();
    var mouse = {
      x: e.pageX || e.touches[0].pageX - canvas.offsetLeft,
      y: e.pageY || e.touches[0].pageY - canvas.offsetTop,
      isMouseDown: isMouseDown
    };
    if(instance.mouseDown) instance.mouseDown(mouse);
  }

  var mouseUp = e => {
    isMouseDown = false;
    e.preventDefault();
    var mouse = {
      x: e.pageX || e.touches[0].pageX - canvas.offsetLeft,
      y: e.pageY || e.touches[0].pageY - canvas.offsetTop,
      isMouseDown: isMouseDown
    };
    if(instance.mouseUp) instance.mouseUp(mouse);
  }

  var mouseXY = e => {
    e.preventDefault();
    var mouse = {
      x: e.pageX || e.touches[0].pageX - canvas.offsetLeft,
      y: e.pageY || e.touches[0].pageY - canvas.offsetTop,
      isMouseDown: isMouseDown
    };
    if(instance.mouseXY) instance.mouseXY(mouse);
  }

  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("touchstart", mouseDown, false);
  canvas.addEventListener("mousemove", mouseXY, false);
  canvas.addEventListener("touchmove", mouseXY, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  canvas.addEventListener("touchend", mouseUp, false);
  canvas.addEventListener("touchcancel", mouseUp, false);

  canvas.ondragstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
  }

  canvas.onselectstart = function(e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      if (e && e.stopPropagation) { e.stopPropagation(); }
      return false;
  }

  // prevent mobile scaling?
  document.body.ontouchstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
  }
  document.body.ontouchmove = function(e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      if (e && e.stopPropagation) { e.stopPropagation(); }
      return false;
  }
};
