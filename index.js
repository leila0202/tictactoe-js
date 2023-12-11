const field = document.getElementById("field");
const ctx = field.getContext("2d");
let player = Math.random() < 0.5 ? "X" : "O";
const width = field.width;
const height = field.height;
const ROWS = 3;
const COLS = 3;
let cells = [];
let cell = {};

for (let i = 0; i < ROWS; i++) {
  cells[i] = [];
  for (let j = 0; j < COLS; j++) {
    cells[i][j] = "";
  }
}

let turn = 0;
let won = false;
const refresh = document.getElementById("refresh");
const cell_sz = width / 3;
const OFFSET = 6;
const LINE_WIDTH = 15;

refresh.setAttribute("disabled", "true");
document.getElementById("title").textContent = `Player ${player}'s turn`;

refresh.addEventListener("click", () => {
  window.location.reload();
});

field.addEventListener("click", (e) => {
  const xCoord = e.offsetX;
  const yCoord = e.offsetY;
  playPiece(xCoord, yCoord);
});

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
    ctx.moveTo(x * i, 0);
    ctx.lineTo(x * i, y);
    ctx.stroke();
  }
}

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

function findCell(xCoord, yCoord) {
  let x = 0;
  let y = 0;
  let start = 0;
  let end = 0;
  for (let i = 0; i <= 2; i++) {
    if (between(yCoord, cell_sz * i, cell_sz * (i + 1))) {
      y = i;
      start = cell_sz * i;
    }
    if (between(xCoord, cell_sz * i, cell_sz * (i + 1))) {
      x = i;
      end = cell_sz * i;
    }
  }
  cell.x = x;
  cell.y = y;
  cell.start = start;
  cell.end = end;
}

function playPiece(xCoord, yCoord) {
  if (won) {
    return;
  }

  ctx.lineWidth = LINE_WIDTH;
  findCell(xCoord, yCoord);

  if (cells[cell.y][cell.x] != "") {
    return;
  }
  cells[cell.y][cell.x] = player;
  console.table(cells);
  won = checkWin(player);
  drawPiece(cell.end, cell.start);

  document.getElementById("title").textContent = `Player ${player}'s turn`;

  turn += 1;
  if (won) {
    document.getElementById("title").textContent = `Player ${player} won`;
    //drawTextCentered(`Player ${player} won`, "Comis Sans", 60);
    refresh.removeAttribute("disabled");
  }

  if (turn == 9 && !won) {
    document.getElementById("title").textContent = "No winner";
    //drawTextCentered(`No Winner`, "Comis Sans", 60);
    refresh.removeAttribute("disabled");
    return;
  }
}

function drawPiece(xCord, yCord) {
  if (player == "X") {
    drawCross(xCord, yCord);
    if (!won) player = "O";
  } else if (player == "O") {
    drawCircle(xCord, yCord);
    if (!won) player = "X";
  }
}

function drawTextCentered(text, font, size) {
  ctx.clearRect(0, 0, field.width, field.height);
  ctx.font = `${size}px ${font}`;
  const txtSz = ctx.measureText(text);
  ctx.fillText(text, (field.width - txtSz.width) / 2, field.height / 2);
}

function checkWin(player) {
  if (cells[0][0] == player) {
    if (cells[0][1] == player && cells[0][2] == player) {
      return true;
    } else if (cells[1][0] == player && cells[2][0] == player) {
      return true;
    } else if (cells[1][1] == player && cells[2][2] == player) {
      return true;
    }
  }

  if (cells[1][0] == player) {
    if (cells[4] == player && cells[7] == player) {
      return true;
    }
  }

  if (cells[2] == player) {
    if (cells[4] == player && cells[6] == player) {
      return true;
    } else if (cells[5] == player && cells[8] == player) {
      return true;
    }
  }

  if (cells[3] == player && cells[4] == player && cells[5] == player) {
    return true;
  }

  if (cells[6] == player && cells[7] == player && cells[8] == player) {
    return true;
  }

  return false;
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
