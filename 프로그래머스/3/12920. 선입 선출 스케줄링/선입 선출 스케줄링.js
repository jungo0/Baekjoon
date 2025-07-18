function solution (n, cores) {
  const len = cores.length;
  
  var rest = n - len;
  let left = 1;
  let right = Math.max(...cores) * rest / len;
  
  while(left < right) {
    const mid = (left + right) / 2 >> 0;
    let capacity = 0;
    
    for(const core of cores) {
      capacity += mid / core >> 0;
    }
    
    if(capacity >= rest) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  
  for(const core of cores) {
    rest -= (right-1) / core >> 0;
  }
  
  for(let i = 0; i < len; i++) {
    if(right % cores[i] === 0) {
      rest -= 1;
      if(!rest) {
        return i + 1;
      }
    }
  }
}
