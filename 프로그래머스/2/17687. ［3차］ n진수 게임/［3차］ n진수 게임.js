function solution(n, t, m, p) {
    var answer = '';
    let number = 0
    let turn = 0 
    let isStopPoint = false
    while(1){
        let converted = number.toString(n)
        
        for(let i=0; i<=converted.length-1; ++i){
            ++turn 
            if(turn>p+(t-1)*m){
               isStopPoint = true
               break;
            }
            if(m===p && turn%m===0){
                if(turn%m===0){
                    answer+=converted[i].toUpperCase()
                }
            }else{
                if(turn%m===p){
                    answer+=converted[i].toUpperCase()
                }
            }
        }
        
        if(isStopPoint){
            break;
        }
        ++number
    }
    return answer;
}