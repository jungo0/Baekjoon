const getCombinations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((el) => [el]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((el) => [fixed, ...el]);
    results.push(...attached);
  });

  return results; 
};

var checkArr = [];

function checkUnique(numArr, arr) {
  var map = new Map();
  var input;
  for (var arrIndex = 0; arrIndex < arr.length; arrIndex++) {
    input = "";
    numArr.forEach((element) => {
      input += arr[arrIndex][element];
    });
    if (map.has(input)) {
      return false;
    }
    map.set(input);
  }

  return true;
}

function checkminimal(numArr) {
  for (var checkIndex = 0; checkIndex < checkArr.length; checkIndex++) {
    var count = 0;
    for (var i = 0; i < numArr.length; i++) {
      if (checkArr[checkIndex].includes(numArr[i])) {
        count++;
      }
    }

    if (count === checkArr[checkIndex].length && count !== 0) {
      return false;
    }
  }

  return true;
}

function solution(relation) {
  var inputArr = relation[0].map((element, index) => {
    return index;
  });

  for (var i = 1; i <= inputArr.length; i++) {
    var comArr = getCombinations(inputArr, i);

    for (var comIndex = 0; comIndex < comArr.length; comIndex++) {
      if (checkminimal(comArr[comIndex])) {
        if (checkUnique(comArr[comIndex], [...relation])) {
          checkArr.push(comArr[comIndex]);
        }
      }
    }
  }

  return checkArr.length;
}