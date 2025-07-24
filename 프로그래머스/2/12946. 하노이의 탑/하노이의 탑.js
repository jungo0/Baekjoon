function solution(n) {
  const answer = [];
  hanoi(n, 1, 2, 3, answer);
  return answer;
}

const hanoi = (n, start, via, end, answer) => {
  if(n === 1) answer.push([start, end]);
  else {
    hanoi(n-1, start, end, via, answer);
    answer.push([start, end]);
    hanoi(n-1, via, start, end, answer);
  }
}
