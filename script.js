const Game = function () {
  let curPlayer = "X";
  let board = new Board();

  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      if (
        board.get(winConditions[i][0]) == curPlayer &&
        board.get(winConditions[i][1]) == curPlayer &&
        board.get(winConditions[i][2]) == curPlayer
      ) {
        board = new Board();
        alert(curPlayer + " wins!");
        curPlayer = "X";
        return true;
      }
    }

    if (board.isFull()) {
      alert("Tie!");
      board = new Board();
      return true;
    }
    curPlayer = curPlayer == "X" ? "O" : "X";
    return false;
  };

  const move = (index) => {
    if (board.set(index, curPlayer)) {
      if (!checkWin()) {
        aiMove();
      }
    }
  };

  const aiMove = () => {
    let index;
    do {
      index = Math.floor(Math.random() * 9);
    } while (board.get(index) != 0);

    board.set(index, curPlayer);
    checkWin();
  };

  return { move };
};

const Board = function () {
  const board = Array(9).fill(0);
  const resetBoard = () => {
    board.fill(0);
    for (let i = 0; i < 9; i++) {
      document.getElementById("" + i).innerText = "";
    }
  };

  const set = (index, player) => {
    let moved = false;
    if (board[index] == 0) {
      board[index] = player;
      document.getElementById("" + index).innerText = player;
      moved = true;
    }
    console.log(board);
    return moved;
  };

  const get = (index) => {
    return board[index];
  };

  const isFull = () => {
    return board.indexOf(0) == -1;
  };

  resetBoard();

  return { set, resetBoard, get, isFull };
};

window.onload = () => {
  const game = new Game();

  for (let i = 0; i < 9; i++) {
    document
      .getElementById("" + i)
      .addEventListener("click", () => game.move(i));
  }
};
