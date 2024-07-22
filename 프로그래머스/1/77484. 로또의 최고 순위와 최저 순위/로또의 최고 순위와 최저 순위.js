function solution(lottos, win_nums) {
    let min = 0;
    let max = 0;
    for (let val of lottos){
        for (let val2 of win_nums){
            if(val === val2)
                min += 1;
        }
    }
    max = min + lottos.filter(v=>v===0).length;
    return[max === 0? 6 : 7-max, min === 0? 6 : 7-min]
}