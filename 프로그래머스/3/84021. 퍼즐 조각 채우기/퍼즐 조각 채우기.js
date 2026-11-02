const getSpace = (table, checker, map, key, i, j) => {
  if (table[i][j] === checker) {
    if (!map.has(key)) map.set(key, []);
    const coord = map.get(key);

    coord.push([i, j]);
    table[i][j] = 1 - checker;
    const candidates = [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
    ];

    for (const [ni, nj] of candidates) {
      if (table?.[ni]?.[nj] === checker)
        getSpace(table, checker, map, key, ni, nj);
    }
  }
};

const getRotateBlock = (block, count) => {
  const [R, C] = [block.length, block[0].length];
  if (count === 1) {
    const rotatedBlock = new Array(C)
      .fill(null)
      .map(() => new Array(R).fill(0));
    for (let x = 0; x < block.length; x++) {
      for (let y = 0; y < block[x].length; y++) {
        rotatedBlock[y][R - x - 1] = block[x][y];
      }
    }
    return rotatedBlock;
  }
  if (count === 2) {
    const rotatedBlock = new Array(R)
      .fill(null)
      .map(() => new Array(C).fill(0));
    for (let x = 0; x < block.length; x++) {
      for (let y = 0; y < block[x].length; y++) {
        rotatedBlock[R - x - 1][C - y - 1] = block[x][y];
      }
    }
    return rotatedBlock;
  }
  if (count === 3) {
    const rotatedBlock = new Array(C)
      .fill(null)
      .map(() => new Array(R).fill(0));
    for (let x = 0; x < block.length; x++) {
      for (let y = 0; y < block[x].length; y++) {
        rotatedBlock[C - y - 1][x] = block[x][y];
      }
    }
    return rotatedBlock;
  }
};

function solution(game_board, table) {
  let answer = 0;
  const blocks = new Map();
  let blockCount = 0;

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      if (table[i][j] === 0) continue;
      getSpace(table, 1, blocks, blockCount, i, j);
      blockCount++;
    }
  }

  const iterate = (iter, callback) => {
    for (const [key, coord] of iter) {
      const xList = [];
      const yList = [];
      let [xMax, xMin, yMax, yMin] = [0, Infinity, 0, Infinity];
      coord.forEach(([x, y]) => {
        xList.push(x);
        yList.push(y);
        xMax = Math.max(x, xMax);
        xMin = Math.min(x, xMin);
        yMax = Math.max(y, yMax);
        yMin = Math.min(y, yMin);
      });
      const space = new Array(xMax - xMin + 1)
        .fill(null)
        .map(() => new Array(yMax - yMin + 1).fill(0));

      const size = coord.length;

      coord.forEach(([x, y]) => {
        space[x - xMin][y - yMin] = 1;
      });
      callback(space, size, key);
    }
  };

  const blockCallback = (block, blockSize, key) => {
    const r1Block = getRotateBlock(block, 1);
    const r2Block = getRotateBlock(block, 2);
    const r3Block = getRotateBlock(block, 3);
    const blockDict = {
      size: blockSize,
      0: block,
      1: r1Block,
      2: r2Block,
      3: r3Block,
    };
    blocks.set(key, blockDict);
  };

  iterate(blocks, blockCallback);

  const blanks = new Map();
  let blanksCount = 0;

  for (let i = 0; i < game_board.length; i++) {
    for (let j = 0; j < game_board[0].length; j++) {
      if (game_board[i][j] === 0) {
        getSpace(game_board, 0, blanks, blanksCount, i, j);
        blanksCount++;
      }
    }
  }

  const blankCallback = (blank, blankSize) => {
    const blankStr = JSON.stringify(blank);
    outer: for (const [key, blockDict] of blocks) {
      if (blockDict.size !== blankSize) continue;
      for (let r = 0; r < 4; r++) {
        const blockStr = JSON.stringify(blockDict[r]);
        if (blankStr === blockStr) {
          answer += blankSize;
          blocks.delete(key);
          break outer;
        }
      }
    }
  };

  iterate(blanks, blankCallback);

  return answer;
}
