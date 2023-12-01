const field = document.getElementById("field");
const ctx = field.getContext("2d");
let player = "X";
let width = field.width;
let height = field.height;

const cell_sz = width / 3;

drawCells(cell_sz, height);
for (let i = 1; i <= 2; i++) {
  ctx.beginPath();
  ctx.moveTo(0, cell_sz * i);
  ctx.lineTo(width, cell_sz * i);
  ctx.stroke();
}

function drawCells(x, y) {
  for (let i = 1; i <= 2; i++) {
    ctx.beginPath();
    console.log(i);
    ctx.moveTo(x * i, 0);
    ctx.lineTo(x * i, y);
    ctx.stroke();
  }
}

field.addEventListener("click", (e) => {
  let xCord = e.offsetX;

  let yCord = e.offsetY;

  calculateBounds(xCord, yCord);
});

const OFFSET = 6;
const LINE_WIDTH = 15;

function drawCross(startX, startY) {
  ctx.strokeStyle = "red";

  ctx.beginPath();
  ctx.moveTo(startX + OFFSET, startY + OFFSET);
  ctx.lineTo(startX + cell_sz - OFFSET, startY + cell_sz - OFFSET);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(startX + cell_sz - OFFSET, startY + OFFSET);
  ctx.lineTo(startX + OFFSET, startY + cell_sz - OFFSET);
  ctx.stroke();
}

function calculateBounds(x, y) {
  ctx.lineWidth = LINE_WIDTH;
  let cellNum = -1;
  let xCord = 0;
  let yCord = 0;
  // 0 - cell_sz
  if (between(y, 0, cell_sz)) {
    if (between(x, 0, cell_sz)) {
      xCord = 0;
      yCord = 0;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      xCord = cell_sz;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      xCord = cell_sz * 2;
    }
  }

  if (between(y, cell_sz, cell_sz * 2)) {
    yCord = cell_sz;
    if (between(x, 0, cell_sz)) {
      xCord = 0;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      xCord = cell_sz;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      xCord = cell_sz * 2;
    }
  }
  if (between(y, cell_sz * 2, cell_sz * 3)) {
    yCord = cell_sz * 2;
    if (between(x, 0, cell_sz)) {
      xCord = 0;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      xCord = cell_sz;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      xCord = cell_sz * 2;
    }
  }
  if (player == "X") {
    drawCross(xCord, yCord);
    player = "O";
  } else if (player == "O") {
    drawCircle(xCord, yCord);
    player = "X";
  }
}

function drawCircle(x, y) {
  ctx.strokeStyle = "blue";
  const xMiddle = x + cell_sz / 2;
  const yMiddle = y + cell_sz / 2;
  ctx.beginPath();
  ctx.arc(xMiddle, yMiddle, cell_sz / 2 - OFFSET, 0, 2 * Math.PI);
  ctx.stroke();
}

function between(num, min, max) {
  return num > min && num < max;
}
