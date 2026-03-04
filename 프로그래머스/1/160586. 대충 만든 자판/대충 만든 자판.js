function solution(keymap, targets) {
    const answer = [];

    const map = new Map();
  
    keymap.forEach((keys) => {
       for(let i=0; i<keys.length; i++) {

           map.has(keys[i]) ? map.set(keys[i], Math.min(map.get(keys[i]), i+1)) : map.set(keys[i], i+1);
       }
    });

    targets.forEach((target) => {
        let sum = 0;
        for(let i=0; i<target.length; i++) {
   
            if(map.has(target[i])) {
                sum += map.get(target[i]);
            } else {
                sum = -1;
                break;
            }
        }
        answer.push(sum)
    });
    return answer;
  }