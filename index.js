//TODO: Organize code for readability
const field = document.getElementById("field");
const ctx = field.getContext("2d");
const title = document.getElementById("title");

const WIDTH = field.width;
const HEIGHT = field.height;
const COUNT = 3;

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
  drawPiece(cell.x * CELL_SZ, cell.y * CELL_SZ);
  if (turn === COUNT * COUNT && !won) return;
  setHeader(`Player ${player}'s turn`);

  if (won) {
    setHeader(`Player ${player} won`);
    refresh.removeAttribute("disabled");
  }
}

field.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    const xCoord = e.offsetX;
    const yCoord = e.offsetY;
    if (!won) playPiece(xCoord, yCoord);
  }
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
// TODO: generalize the drawing of cells
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
  for (let i = 0; i < COUNT; i++) {
    if (between(yCoord, CELL_SZ * i, CELL_SZ * (i + 1))) {
      cell.y = i;
    }
    if (between(xCoord, CELL_SZ * i, CELL_SZ * (i + 1))) {
      cell.x = i;
    }
  }
}

// |x|_|_|
// |x|_|_|
// |_|_|_|

//TODO: Check win for bigger fields
//TODO: generalize WIN checking without massive if conditions
function checkWin() {
  //console.table(cells);
  if (turn === COUNT * COUNT && !won) {
    setHeader("No Winner");
    refresh.removeAttribute("disabled");
    won = false;
  }

  for (let j = 0; j < COUNT; j++) {
    if (cell.y === j) {
      for (let i = 0; i < COUNT; i++) {
        if (cells[j][i] === player) {
          won = true;
        } else {
          won = false;
          break;
        }
      }
    }
  }

  if (won) return won;

  for (let j = 0; j < COUNT; j++) {
    if (cell.x === j) {
      for (let i = 0; i < COUNT; i++) {
        if (cells[i][j] === player) {
          won = true;
        } else {
          won = false;
          break;
        }
      }
    }
  }

  if (won) return won;
  //cells[0][0] === player &&
  //cells[1][1] === player &&
  //cells[2][2] === player
  for (let j = 0; j < COUNT; j++) {
    if (cells[j][j] === player) {
      won = true;
    } else {
      won = false;
      break;
    }
  }

  if (won) return won;

  //cells[0][2] === player &&
  //cells[1][1] === player &&
  //cells[2][0] === player
  for (let i = COUNT - 1; i >= 0; i--) {
    //0 + (2-1)
    if (cells[0 + (COUNT - 1 - i)][i] === player) {
      won = true;
    } else {
      won = false;
      break;
    }
  }

  console.log(won);
  return won;
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

// TODO: Maybe Change to Draw Line for more widespread usage?
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
