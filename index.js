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
