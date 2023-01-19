const cursor = document.querySelector("div.cursor");
const canvasIn = document.querySelector("canvas.in");
const canvasOut = document.querySelector("canvas.out");

let isMouseDown = false;

const growCursor = function () {
  cursor.classList.add("is-down");
};

const shrinkCursor = function () {
  cursor.classList.remove("is-down");
};

const moveCursor = function (x, y) {
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
};

const setupCanvas = function (canvas) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const dpi = window.devicePixelRatio;

  canvas.width = dpi * w;
  canvas.height = dpi * h;

  canvas.style.width = w + "px";
  canvas.style.height = h + "px";

  const context = canvas.getContext("2d");
  context.scale(dpi, dpi);

  if (canvas.classList.contains("in")) {
    context.fillStyle = "#000000";
    context.strokeStyle = "#ffffff";
  } else {
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#000000";
  }

  context.lineWidth = 80;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.shadowBlur = 80;

  context.rect(0, 0, w, h);
  context.fill();
};

const startDraw = function (canvas, x, y) {
  const context = canvas.getContext("2d");
  context.moveTo(x, y);
  context.beginPath();
};

const moveDraw = function (canvas, x, y) {
  const context = canvas.getContext("2d");
  if (isMouseDown) {
    context.lineTo(x, y);
    context.stroke();
  }
};

setupCanvas(canvasIn);
setupCanvas(canvasOut);

document.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  growCursor();
  startDraw(canvasIn, event.pageX, event.pageY);
  startDraw(canvasOut, event.pageX, event.pageY);
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
  shrinkCursor();
});

document.addEventListener("mousemove", (event) => {
  moveCursor(event.pageX, event.pageY);
  moveDraw(canvasIn, event.pageX, event.pageY);
  moveDraw(canvasOut, event.pageX, event.pageY);
});

window.addEventListener("resize", () => {
  setupCanvas(canvasIn);
  setupCanvas(canvasOut);
});
