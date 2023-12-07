const field = document.getElementById("field");
const ctx = field.getContext("2d");
let player = Math.random() < 0.5 ? "X" : "O";
const width = field.width;
const height = field.height;
let cells = new Array(9);
let turn = 0;
let won = false;
const refresh = document.getElementById("refresh");
const cell_sz = width / 3;
const OFFSET = 6;
const LINE_WIDTH = 15;

cells.fill("");
refresh.setAttribute("disabled", "true");
document.getElementById("title").textContent = `Player ${player}'s turn`;

refresh.addEventListener("click", () => {
  window.location.reload();
});

field.addEventListener("click", (e) => {
  const xCord = e.offsetX;
  const yCord = e.offsetY;
  playPiece(xCord, yCord);
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

function playPiece(x, y) {
  if (won) {
    return;
  }

  ctx.lineWidth = LINE_WIDTH;
  let xCord = 0;
  let yCord = 0;
  // 0 - cell_sz
  if (between(y, 0, cell_sz)) {
    if (between(x, 0, cell_sz)) {
      if (cells[0] != "") {
        return;
      }
      cells[0] = player;
      xCord = 0;
      yCord = 0;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      if (cells[1] != "") {
        return;
      }
      cells[1] = player;
      xCord = cell_sz;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      if (cells[2] != "") {
        return;
      }
      cells[2] = player;
      xCord = cell_sz * 2;
    }
  }

  if (between(y, cell_sz, cell_sz * 2)) {
    yCord = cell_sz;
    if (between(x, 0, cell_sz)) {
      if (cells[3] != "") {
        return;
      }
      cells[3] = player;
      xCord = 0;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      if (cells[4] != "") {
        return;
      }
      cells[4] = player;
      xCord = cell_sz;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      if (cells[5] != "") {
        return;
      }
      cells[5] = player;
      xCord = cell_sz * 2;
    }
  }
  if (between(y, cell_sz * 2, cell_sz * 3)) {
    yCord = cell_sz * 2;
    if (between(x, 0, cell_sz)) {
      if (cells[6] != "") {
        return;
      }
      cells[6] = player;
      xCord = 0;
    }
    if (between(x, cell_sz, cell_sz * 2)) {
      if (cells[7] != "") {
        return;
      }
      cells[7] = player;
      xCord = cell_sz;
    }
    if (between(x, cell_sz * 2, cell_sz * 3)) {
      if (cells[8] != "") {
        return;
      }
      cells[8] = player;
      xCord = cell_sz * 2;
    }
  }

  drawPiece(xCord, yCord);
  document.getElementById("title").textContent = `Player ${player}'s turn`;
  turn += 1;
  won = checkWin(player);

  if (turn == 9 && !won) {
    document.getElementById("title").textContent = "No winner";
    //drawTextCentered(`No Winner`, "Comis Sans", 60);
    refresh.removeAttribute("disabled");
    return;
  }

  if (won) {
    document.getElementById("title").textContent = `Player ${player} won`;
    //drawTextCentered(`Player ${player} won`, "Comis Sans", 60);
    refresh.removeAttribute("disabled");
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
  if (cells[0] == player) {
    if (cells[1] == player && cells[2] == player) {
      return true;
    } else if (cells[3] == player && cells[6] == player) {
      return true;
    } else if (cells[4] == player && cells[8] == player) {
      return true;
    }
  }
  if (cells[1] == player) {
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
