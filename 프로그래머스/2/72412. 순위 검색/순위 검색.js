function solution(infos, querys) {

    const rule = new Map();
    infos.forEach(v => {
        const info = v.split(' ');
        const score = Number(info.pop());

        let key = info.join(''); 
        rule.set(key, rule.has(key) ? [...rule.get(key), score] : [score]);
    });

    for(let [key, value] of rule){
        rule.set(key, value.sort((a, b) => a - b));
    }

    return querys.map(e => {
        const conditions = e.split(/ and | |-/i).filter(e => e);
        return search(rule, conditions);
    });
}

const search = (rule, conditions) => {
    const score = conditions.pop();
    return Array.from(rule.keys())
        .filter(key => conditions.every(v => key.includes(v)))
        .reduce((a, c) => a + rule.get(c).slice(lowerBound(rule.get(c), score)).length, 0);
}

const lowerBound = (arr, target) => {
    let left = 0;
    let right = arr.length; 
    while(left < right){
        const mid = Math.floor((left + right) / 2);

        if(arr[mid] >= target) right = mid;
        else left = mid + 1;
    }

    return left;
}
