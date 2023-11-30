const field = document.getElementById("field");
const ctx = field.getContext("2d");
let width = field.width;
let height = field.height;

const cell_sz = width / 3;
console.log("🚀 ~ file: index.js:7 ~ cell_sz:", cell_sz);

ctx.beginPath();
drawCells(cell_sz, height);
for (let i = 1; i <= 2; i++) {
  ctx.moveTo(0, cell_sz * i);
  ctx.lineTo(width, cell_sz * i);
}
ctx.stroke();

function drawCells(x, y) {
  for (let i = 1; i <= 2; i++) {
    ctx.moveTo(x * i, 0);
    ctx.lineTo(x * i, y);
    console.log("🚀 ~ file: index.js:18 ~ drawCells ~ x:", x);
  }
}

field.addEventListener("click", (e) => {
  let xCord = e.offsetX;
  let yCord = e.offsetY;
  console.log(`x: ${xCord}/ y: ${yCord}`);
  console.log(calculateBounds(xCord, yCord));
});

//first x: 0 - cellsz y: 0 - cellsz
function calculateBounds(x, y) {
  let cellNum = -1;
  // 0 - cell_sz
  if (between(y, 0, cell_sz)) {
    if (between(x, 0, cell_sz)) {
      cellNum = 0;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      cellNum = 1;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      cellNum = 2;
    }
  }

  if (between(y, cell_sz, cell_sz * 2)) {
    if (between(x, 0, cell_sz)) {
      cellNum = 3;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      cellNum = 4;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      cellNum = 5;
    }
  }
  if (between(y, cell_sz * 2, cell_sz * 3)) {
    if (between(x, 0, cell_sz)) {
      cellNum = 6;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      cellNum = 7;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      cellNum = 8;
    }
  }

  return cellNum;
}

function between(num, min, max) {
  return num > min && num < max;
}
