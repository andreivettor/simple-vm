const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.textRendering = "optimizeLegibility";

const BACKGROUND_COLOR = "#050d05";

const DEFAULT_COLOR = "white";
const HOVERED_COLOR = "teal";

const BIT_VIEW_SIZE = 100;
const BIT_VIEW_OFFSET = 50;
const BIT_VIEW_WIDTH = 2;

const bits = [0, 0, 0, 0, 0, 0, 0, 0];
const boxes = [];

let decimalValue = 0;

for (let i = 0; i < bits.length; i++) {
  boxes[i] = new Path2D();
  boxes[i].rect(
    BIT_VIEW_OFFSET + (BIT_VIEW_SIZE + BIT_VIEW_WIDTH) * i,
    BIT_VIEW_OFFSET,
    BIT_VIEW_SIZE,
    BIT_VIEW_SIZE
  );
}

// EVENTS
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draw();
});

canvas.addEventListener("mousemove", (event) => {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].isHovered = ctx.isPointInPath(
      boxes[i],
      event.clientX,
      event.clientY
    );
  }

  draw();
});

canvas.addEventListener("click", (event) => {
  for (let i = 0; i < boxes.length; i++) {
    const isClicked = ctx.isPointInPath(boxes[i], event.clientX, event.clientY);

    if (isClicked) {
      bits[i] = 1 - bits[i];
      update();
    }
  }

  draw();
});

const update = () => {
  decimalValue = 0;
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === 0) continue;
    decimalValue += Math.pow(2, bits.length - i - 1);
  }
};

const draw = () => {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bits.length; i++) {
    ctx.strokeStyle = boxes[i].isHovered ? HOVERED_COLOR : DEFAULT_COLOR;
    ctx.lineWidth = BIT_VIEW_WIDTH;
    ctx.stroke(boxes[i]);

    ctx.fillStyle = boxes[i].isHovered ? HOVERED_COLOR : DEFAULT_COLOR;
    ctx.font = "50px Outfit";
    ctx.fillText(
      bits[i],
      BIT_VIEW_OFFSET + (BIT_VIEW_SIZE + BIT_VIEW_WIDTH) * i + 35,
      BIT_VIEW_OFFSET + 65
    );

    ctx.fillStyle = DEFAULT_COLOR;
    ctx.font = "200 60px Outfit";
    ctx.fillText("Decimal value: " + decimalValue, BIT_VIEW_OFFSET, 250);
  }
};

draw();
