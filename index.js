//TODO: Organize code for readability
const field = /** @type{HTMLCanvasElement}*/ (document.getElementById("field"));
const ctx = field.getContext("2d");
const title = document.getElementById("title");

const WIDTH = field.width;
const HEIGHT = field.height;
const boardSize = 3;

const CELL_SZ = WIDTH / boardSize;
const OFFSET = CELL_SZ / 2 / 6;
const LINE_WIDTH = CELL_SZ / 15;

const cells = [];
const cell = {};
let player = Math.random() < 0.5 ? "X" : "O";
let turn = 0;
let won = false;

function initArray() {
  for (let i = 0; i < boardSize; i++) {
    cells[i] = [];
    for (let j = 0; j < boardSize; j++) {
      cells[i][j] = "";
    }
  }
}

initArray();

const refresh = /** @type{HTMLButtonElement}*/ (
  document.getElementById("refresh")
);

if (refresh !== null) {
  refresh.disabled = true;
}
setHeader(`Player ${player}'s turn`);

/**
 * @param {string} text The Text that should be use inside the "title"
 */
function setHeader(text) {
  if (title === null) {
    console.error("no title element found");
    return;
  }
  title.textContent = text;
}

refresh?.addEventListener("click", () => {
  window.location.reload();
});

/**
 * @param {number} xCoord
 * @param {number} yCoord
 */
function playPiece(xCoord, yCoord) {
  findCell(xCoord, yCoord);

  if (cells[cell.y][cell.x] != "") {
    return;
  }

  cells[cell.y][cell.x] = player;
  turn += 1;

  won = checkWin();
  drawPiece(cell.x * CELL_SZ, cell.y * CELL_SZ);
  if (turn === boardSize * boardSize && !won) return;
  setHeader(`Player ${player}'s turn`);

  if (won) {
    setHeader(`Player ${player} won`);
    refresh.disabled = false;
  }
}

field.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    const xCoord = e.offsetX;
    const yCoord = e.offsetY;
    if (!won) playPiece(xCoord, yCoord);
  }
});

/**
 * @param {number} x
 * @param {number} y
 */
function drawCells(x, y) {
  for (let i = 1; i < boardSize; i++) {
    ctx?.beginPath();
    ctx?.moveTo(x * i, 0);
    ctx?.lineTo(x * i, y);
    ctx?.stroke();
  }
}

drawCells(CELL_SZ, HEIGHT);
// TODO: generalize the drawing of cells
for (let i = 1; i < boardSize; i++) {
  ctx?.beginPath();
  ctx?.moveTo(0, CELL_SZ * i);
  ctx?.lineTo(WIDTH, CELL_SZ * i);
  ctx?.stroke();
}

/**
 * @param {number} xCoord
 * @param {number} yCoord
 */
function findCell(xCoord, yCoord) {
  cell.y = Math.floor(yCoord / CELL_SZ);
  cell.x = Math.floor(xCoord / CELL_SZ);

  console.log(`${yCoord}/${xCoord} -> ${cell.y}/${cell.x}`);
}

//TODO: generalize WIN checking without massive if conditions
function checkWin() {
  if (turn === boardSize * boardSize && !won) {
    setHeader("No Winner");
    refresh?.removeAttribute("disabled");
    won = false;
  }

  for (let j = 0; j < boardSize; j++) {
    if (cell.y === j) {
      for (let i = 0; i < boardSize; i++) {
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

  for (let j = 0; j < boardSize; j++) {
    if (cell.x === j) {
      for (let i = 0; i < boardSize; i++) {
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
  for (let j = 0; j < boardSize; j++) {
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
  for (let i = boardSize - 1; i >= 0; i--) {
    //0 + (2-1)
    if (cells[0 + (boardSize - 1 - i)][i] === player) {
      won = true;
    } else {
      won = false;
      break;
    }
  }

  return won;
}

/**
 * @param {number} x
 * @param {number} y
 */
function drawCircle(x, y) {
  if (ctx === null) {
    console.error("no context found");
    return;
  }
  ctx.lineWidth = LINE_WIDTH;
  ctx.strokeStyle = "blue";
  const xMiddle = x + CELL_SZ / 2;
  const yMiddle = y + CELL_SZ / 2;
  ctx?.beginPath();
  ctx?.arc(xMiddle, yMiddle, CELL_SZ / 2 - OFFSET, 0, 2 * Math.PI);
  ctx?.stroke();
}

// TODO: Maybe Change to Draw Line for more widespread usage?
/**
 * @param {number} startX
 * @param {number} startY
 */
function drawCross(startX, startY) {
  if (ctx === null) {
    console.error("no context found");
    return;
  }
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
