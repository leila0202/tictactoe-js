const field = document.getElementById("field");
const ctx = field.getContext("2d");
const title = document.getElementById("title");

const WIDTH = field.width;
const HEIGHT = field.height;
const COUNT = 10;

const ROWS = COUNT;
const COLS = COUNT;
const CELL_SZ = WIDTH / COUNT;
const OFFSET = CELL_SZ / 2 / 6;
const LINE_WIDTH = CELL_SZ / 15;

const cells = [];
const cell = {};
let player = Math.random() < 0.5 ? "X" : "O";
let turn = 0;
let won = false;

function initArray() {
  for (let i = 0; i < ROWS; i++) {
    cells[i] = [];
    for (let j = 0; j < COLS; j++) {
      cells[i][j] = "";
    }
  }
}

initArray();

const refresh = document.getElementById("refresh");

refresh.setAttribute("disabled", "true");

setHeader(`Player ${player}'s turn`);

function setHeader(text) {
  title.textContent = text;
}

refresh.addEventListener("click", () => {
  window.location.reload();
});

function playPiece(xCoord, yCoord) {
  findCell(xCoord, yCoord);

  if (cells[cell.y][cell.x] != "") {
    return;
  }

  cells[cell.y][cell.x] = player;
  turn += 1;

  won = checkWin();
  drawPiece(cell.end, cell.start);
  if (turn === COUNT * COUNT && !won) return;
  setHeader(`Player ${player}'s turn`);

  if (won) {
    setHeader(`Player ${player} won`);
    refresh.removeAttribute("disabled");
  }
}

field.addEventListener("click", (e) => {
  const xCoord = e.offsetX;
  const yCoord = e.offsetY;
  if (!won) playPiece(xCoord, yCoord);
});

function drawCells(x, y) {
  for (let i = 1; i < COUNT; i++) {
    ctx.beginPath();
    ctx.moveTo(x * i, 0);
    ctx.lineTo(x * i, y);
    ctx.stroke();
  }
}

drawCells(CELL_SZ, HEIGHT);
for (let i = 1; i < COUNT; i++) {
  ctx.beginPath();
  ctx.moveTo(0, CELL_SZ * i);
  ctx.lineTo(WIDTH, CELL_SZ * i);
  ctx.stroke();
}

function between(num, min, max) {
  return num > min && num < max;
}

function findCell(xCoord, yCoord) {
  let x = 0;
  let y = 0;
  let start = 0;
  let end = 0;
  for (let i = 0; i < COUNT; i++) {
    if (between(yCoord, CELL_SZ * i, CELL_SZ * (i + 1))) {
      y = i;
      start = CELL_SZ * i;
    }
    if (between(xCoord, CELL_SZ * i, CELL_SZ * (i + 1))) {
      x = i;
      end = CELL_SZ * i;
    }
  }
  cell.x = x;
  cell.y = y;
  cell.start = start;
  cell.end = end;
}

// |_|_|_|
// |_|_|_|
// |_|_|_|
function checkWin() {
  if (turn === COUNT * COUNT && !won) {
    setHeader("No Winner");
    refresh.removeAttribute("disabled");
    return false;
  }

  if (cells[0][0] === player) {
    if (cells[0][1] === player && cells[0][2] === player) {
      return true;
    } else if (cells[1][0] === player && cells[2][0] === player) {
      return true;
    } else if (cells[1][1] === player && cells[2][2] === player) {
      return true;
    }
  }

  if (cells[0][1] === player) {
    if (cells[1][1] === player && cells[2][1] === player) {
      return true;
    }
  }

  if (cells[0][2] === player) {
    if (cells[1][1] === player && cells[2][0] === player) {
      return true;
    } else if (cells[1][2] === player && cells[2][2] === player) {
      return true;
    }
  }

  if (
    cells[1][0] === player &&
    cells[1][1] === player &&
    cells[1][2] === player
  ) {
    return true;
  }

  if (
    cells[2][0] === player &&
    cells[2][1] === player &&
    cells[2][2] === player
  ) {
    return true;
  }

  return false;
}

function drawCircle(x, y) {
  ctx.lineWidth = LINE_WIDTH;
  ctx.strokeStyle = "blue";
  const xMiddle = x + CELL_SZ / 2;
  const yMiddle = y + CELL_SZ / 2;
  ctx.beginPath();
  ctx.arc(xMiddle, yMiddle, CELL_SZ / 2 - OFFSET, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawCross(startX, startY) {
  ctx.lineWidth = LINE_WIDTH;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(startX + OFFSET, startY + OFFSET);
  ctx.lineTo(startX + CELL_SZ - OFFSET, startY + CELL_SZ - OFFSET);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(startX + CELL_SZ - OFFSET, startY + OFFSET);
  ctx.lineTo(startX + OFFSET, startY + CELL_SZ - OFFSET);
  ctx.stroke();
}

function drawPiece(xCoord, yCoord) {
  if (player === "X") {
    drawCross(xCoord, yCoord);
    if (!won) player = "O";
  } else if (player === "O") {
    drawCircle(xCoord, yCoord);
    if (!won) player = "X";
  }
}
