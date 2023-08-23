const fs = require("fs");
const heights = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map(Number);

let dwarf = null;

for (let i = 0; i < heights.length - 1; i++) {
  for (let j = i + 1; j < heights.length; j++) {
    const sum = heights.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    if (sum - heights[i] - heights[j] === 100) {
      dwarf = heights.filter(
        (height) => height !== heights[i] && height !== heights[j]
      );

      break;
    }
  }

  if (dwarf) {
    break;
  }
}

console.log(dwarf.sort((a, b) => a - b).join("\n"));