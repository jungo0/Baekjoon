const getDivisors = (number) => {
  const divisors = [];
  for (let i = 2; i <= number; i++) {
    if (number % i === 0) divisors.push(i);
  }
  return divisors.reverse();
};

const findMaxDivisor = (cardsA, cardsB, divisors) => {
  const results = [];
  for (let divisor of divisors) {
    if (cardsA.every((card) => card % divisor === 0) && 
        cardsB.every((card) => card % divisor !== 0)
    ) {
      results.push(divisor);
    }
  }
  return results;
};

const solution = (arrayA, arrayB) => {
  const sortedA = arrayA.sort((a, b) => a - b);
  const sortedB = arrayB.sort((a, b) => a - b);

  const maxADivisors = getDivisors(sortedA[sortedA.length - 1]);
  const maxBDivisors = getDivisors(sortedB[sortedA.length - 1]);

  const maxADivisor = findMaxDivisor(sortedA, sortedB, maxADivisors);
  const maxBDivisor = findMaxDivisor(sortedB, sortedA, maxBDivisors);

  const results = maxADivisor.concat(maxBDivisor);
  const result = results.length ? Math.max(...results) : 0;
  return result;
};

solution([2, 2, 2], [3, 3, 3]);