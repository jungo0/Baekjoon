const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const strs = input.slice(1).map((str) => str.trim());

function checkPattern(str) {
  let index = 0;
  while (index < str.length) {
    if (str[index] === '1') {
      if (index + 2 < str.length && str[index + 1] === '0' && str[index + 2] === '0') {
        index += 3;
        while (index < str.length && str[index] === '0') index++;

        if (str[index] === '1') index++;
        else return false;

        while (index < str.length && str[index] === '1') {
          if (index + 2 < str.length && str[index + 1] === '0' && str[index + 2] === '0') break;
          else index++;
        }
      } else return false;
    } else {
      if (str[index + 1] === '1') index += 2;
      else return false;
    }
  }
  return true;
}
strs.map((str) => {
  if (checkPattern(str)) console.log('YES');
  else console.log('NO');
});