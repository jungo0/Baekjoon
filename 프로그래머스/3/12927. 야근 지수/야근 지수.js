function solution(n, works) {
  if (works.reduce((a, c) => a + c, 0) <= n) return 0;

  let sorted = works.sort((a, b) => b - a);

  while (n) {
    let max_num = sorted[0];
    
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] >= max_num) {
        sorted[i] -= 1;
        n -= 1;
      }
      if (!n) break;
    }
  }

  return works.reduce((acc, cur) => acc + cur ** 2, 0);
}