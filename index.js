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
  console.log("should only run once");
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
  console.log(
    "🚀 ~ file: index.js:26 ~ field.addEventListener ~ xCord:",
    xCord
  );
  let yCord = e.offsetY;
  console.log(
    "🚀 ~ file: index.js:28 ~ field.addEventListener ~ yCord:",
    yCord
  );

  console.log(calculateBounds(xCord, yCord));
});

const OFFSET = 4;

function drawCross(startX, startY) {
  ctx.strokeStyle = "red";
  ctx.lineWidth = "10";
  ctx.beginPath();
  ctx.moveTo(startX + OFFSET, startY + OFFSET);
  ctx.lineTo(startX + cell_sz - OFFSET, startY + cell_sz - OFFSET);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(startX + cell_sz - OFFSET, startY + OFFSET);
  ctx.lineTo(startX + OFFSET, startY + cell_sz - OFFSET);
  ctx.stroke();
  ctx.strokeStyle = "black";
}

//first x: 0 - cellsz y: 0 - cellsz
function calculateBounds(x, y) {
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
  }

  return cellNum;
}

function between(num, min, max) {
  return num > min && num < max;
}
