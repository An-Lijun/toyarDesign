export default class Draggable {
  constructor(el) {
    this.el = el;
    this.parentEl = null;
    this.parentRect = {};
    this.dx = 0;
    this.dy = 0;
    this.isDragging = false;
    this.init();
  }

  init() {
    this.parentEl = this.el.parentNode;
    this.parentEl.addEventListener("click", this.handleClick.bind(this));
    this.parentRect = this.parentEl.getBoundingClientRect();
    this.el.addEventListener("mousedown", this.handleMouseDown.bind(this));
  }

  handleClick(e) {
    if (e.target === e.currentTarget) {
      const dx = e.offsetX;
      const dy = e.offsetY;
      if (typeof this.onClick === "function") {
        this.dx = dx;
        this.dy = dy;
        this.onClick({
          dx: this.dx,
          dy: this.dy,
        });
      }
    }
  }

  handleMouseDown(e) {
    e.stopPropagation();
    this.isDragging = true;
    this.startPos = {
      x: e.clientX - this.dx,
      y: e.clientY - this.dy,
    };
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  handleMouseMove(e) {
    e.stopPropagation();
    if (this.isDragging) {
      const dxTemp = e.clientX - this.startPos.x;
      const dyTemp = e.clientY - this.startPos.y;
      const { width: parentWidth, height: parentHeight } = this.parentRect;
      if (typeof this.onMouseMove === "function") {
        this.dx = this.clamp(dxTemp, 0, parentWidth);
        this.dy = this.clamp(dyTemp, 0, parentHeight);
        this.onMouseMove({
          dx: this.dx,
          dy: this.dy,
        });
      }
    }
  }

  handleMouseUp(e) {
    e.stopPropagation();
    this.isDragging = false;
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  on(eventName, callback) {
    if (eventName === "mousemove") {
      this.onMouseMove = callback;
    }
    if (eventName === "click") {
      this.onClick = callback;
    }
  }

  setDraggablePostion(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
	
  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }
}
