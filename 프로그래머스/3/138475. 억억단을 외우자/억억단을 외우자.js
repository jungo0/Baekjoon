function solution(e, starts) {
  const denominators = getAllDenominators(e);
  const lowestMaxNumArr = getLowestMaxNumArr(denominators, e);

  return starts.map((s) => lowestMaxNumArr[s]);
}

function getAllDenominators(size) {
  const result = new Array(size + 1).fill(2);
  result[0] = 0;
  result[1] -= 1;

  for (let i = 2; i <= size; i++) {
    for (let j = 2, end = Math.floor(size / i); j <= end; j++) {
      result[i * j]++;
    }
  }

  return result;
}

function getLowestMaxNumArr(arr, size) {
  const lowestMaxNumArr = new Array(size + 1).fill(0);
  lowestMaxNumArr[size] = size;

  for (let i = size - 1; i > 0; i--) {
    const cur = arr[i];
    const prev = arr[lowestMaxNumArr[i + 1]];

    lowestMaxNumArr[i] = cur >= prev ? i : lowestMaxNumArr[i + 1];
  }

  return lowestMaxNumArr;
}
