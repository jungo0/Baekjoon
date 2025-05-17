const BLANKED = 0;
const BLOCKED = 1;

let SIZE, GAME_BOARD, TABLE, blocks, visited;

const solution = (game_board, table) => {
  let answer = 0;
  
  SIZE = game_board.length;
  GAME_BOARD = deepCopy(game_board);
  TABLE = deepCopy(table);
  blocks = [];
  
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (TABLE[i][j] === BLOCKED) {
        blocks.push(getBlock(i, j, 0, 0));
      }
    }
  }
  
  for (let rotate = 0; rotate < 4; rotate++) {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (GAME_BOARD[i][j] === BLANKED) {
          visited = deepCopy(GAME_BOARD);
          const emptySize = getEmptySize(i, j);
          for (let k = 0; k < blocks.length; k++) {
            const block = blocks[k];
            if (block.length !== emptySize) {
              continue;
            }
            if (checkFit(block, i, j)) {
              answer += block.length;
              putBoard(block, i ,j);
              blocks.splice(k, 1);
              break;
            }
          }
        }
      }
    }
    rotateBoard();
  }
  return answer;
};

const getBlock = (r, c, movedR, movedC) => {
  TABLE[r][c] = 0;
  const pieces = [{
    row: movedR,
    col: movedC
  }];
  if (r > 0 && TABLE[r - 1][c] === BLOCKED) {
    pieces.push(...getBlock(r - 1, c, movedR - 1, movedC));
  }
  if (r < SIZE - 1 && TABLE[r + 1][c] === BLOCKED) {
    pieces.push(...getBlock(r + 1, c, movedR + 1, movedC));
  }
  if (c > 0 && TABLE[r][c - 1] === BLOCKED) {
    pieces.push(...getBlock(r, c - 1, movedR, movedC - 1));
  }
  if (c < SIZE - 1 && TABLE[r][c + 1] === BLOCKED) {
    pieces.push(...getBlock(r, c + 1, movedR, movedC + 1));
  }
  return pieces;
};

const getEmptySize = (r, c) => {
  visited[r][c] = BLOCKED;
  let cnt = 1;
  if (r > 0 && visited[r - 1][c] === BLANKED) {
    cnt += getEmptySize(r - 1, c);
  }
  if (r < SIZE - 1 && visited[r + 1][c] === BLANKED) {
    cnt += getEmptySize(r + 1, c);
  }
  if (c > 0 && visited[r][c - 1] === BLANKED) {
    cnt += getEmptySize(r, c - 1);
  }
  if (c < SIZE - 1 && visited[r][c + 1] === BLANKED) {
    cnt += getEmptySize(r, c + 1);
  }

  return cnt;
};

const checkFit = (block, r, c) => block.every((piece => {
  const { row, col } = piece;
  return (r + row < SIZE) && (c + col < SIZE) && (GAME_BOARD[r + row][c + col] === BLANKED);
}));

const putBoard = (block, r, c) => {
  block.map((piece) => {
    const { row, col } = piece;
    GAME_BOARD[r + row][c + col] = BLOCKED;
  });
};

const rotateBoard = () => {
  const newBoard = deepCopy(GAME_BOARD);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      newBoard[c][SIZE - 1 - r] = GAME_BOARD[r][c];
    }
  }
  GAME_BOARD = newBoard;
};

const deepCopy = (matrix) => {
  const size = matrix.length;
  const newMatrix = Array.from(Array(size), () => Array(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      newMatrix[i][j] = matrix[i][j];
    }
  }
  return newMatrix;
};
