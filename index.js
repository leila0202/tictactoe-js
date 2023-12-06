const field = document.getElementById("field");
const ctx = field.getContext("2d");
let player = "X";
let width = field.width;
let height = field.height;
let cells = new Array(9);
cells.fill("");
let won = false;

const refresh = document.getElementById("refresh");
refresh.setAttribute("disabled", "true");
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
let turn = 0;
// 0 1 2
// 3 4 5
// 6 7 8

function calculateBounds(x, y) {
  if (won) {
    window.alert(`Please Restart the Game - Player ${player} won`);
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
  won = checkWin(player);

  drawFigure(xCord, yCord);

  if (won) {
    document.getElementById("title").innerText = `Player ${player} won`;
    refresh.removeAttribute("disabled");
  }
}

function drawFigure(xCord, yCord) {
  if (player == "X") {
    drawCross(xCord, yCord);
    if (!won) player = "O";
  } else if (player == "O") {
    drawCircle(xCord, yCord);
    if (!won) player = "X";
  }
}

function checkWin(player) {
  turn += 1;
  if (turn == 10 && !won) {
    document.getElementById("title").innerText = `No winner`;
    refresh.toggleAttribute("disabled");
    return;
  }
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

refresh.addEventListener("click", () => {
  window.location.reload();
});
