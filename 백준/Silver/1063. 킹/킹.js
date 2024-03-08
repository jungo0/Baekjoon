let [positions, ...commands] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const pos = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
};

const move = {
  R: [1, 0],
  L: [-1, 0],
  B: [0, -1],
  T: [0, 1],
  RT: [1, 1],
  LT: [-1, 1],
  RB: [1, -1],
  LB: [-1, -1],
};

const [kingPos, stonePos, N] = positions.split(" ");
const result = [];

let [x, y] = kingPos.split("");
let [x2, y2] = stonePos.split("");
y = Number(y);
y2 = Number(y2);

let king = [pos[x], y];
let stone = [pos[x2], y2];

for (let i = 0; i < N; i++) {
  const nx = king[0] + move[commands[i]][0];
  const ny = king[1] + move[commands[i]][1];

  if (0 < nx && nx <= 8 && 0 < ny && ny <= 8) { // 체스판 반경 지정(킹이 밖으로 나갈 경우 그 이동은 건너뜀)
    if (nx === stone[0] && ny === stone[1]) { //key point) 킹 위치가 돌이 있는 위치라면, 돌도 같은 방향으로 이동한다.
      const sx = stone[0] + move[commands[i]][0];
      const sy = stone[1] + move[commands[i]][1];
      if (0 < sx && sx <= 8 && 0 < sy && sy <= 8) { // 체스판 반경 지정(돌이 밖으로 나갈 경우 그 이동은 건너뜀)
        king = [nx, ny];
        stone = [sx, sy];
      } else {
        continue;
      }
    } else {
      king = [nx, ny];
    }
  } else {
    continue;
  }
}

const kingAns = Object.keys(pos).find((key) => pos[key] === king[0]);
const stoneAns = Object.keys(pos).find((key) => pos[key] === stone[0]);
result.push([kingAns, king[1]].join(""));
result.push([stoneAns, stone[1]].join(""));
console.log(result.join("\n"));