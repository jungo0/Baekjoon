function solution(gems) {
  let answer = [0, 100001];

  let gemLen = new Set(gems).size;
  let gemMap = new Map();

  for (let i = 0; i < gems.length; i++) {
    gemMap.delete(gems[i]); 
    gemMap.set(gems[i], i + 1); 

    if (gemMap.size === gemLen) {
      const tmpIdx = [gemMap.values().next().value, i + 1];
      const answerLen = answer[1] - answer[0];
      const mapLen = tmpIdx[1] - tmpIdx[0];
      if (answerLen > mapLen) {
        answer = tmpIdx;
      }
    }
  }
  return answer;
}