let fs = require("fs");
let input = fs.readFileSync("/dev/stdin")
		.toString()
		.trim()
		.split("\n");
let count = 0;

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[i].length; j++) {
		if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
			if (input[i][j] === "F") count++;
		}
	}
}

console.log(count);