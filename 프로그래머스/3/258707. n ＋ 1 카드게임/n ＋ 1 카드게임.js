function solution(coin, cards) {
    var answer = 0;
    const n = cards.length
    const start = n/3
    let index = 0
    const num = n+1
    const map = new Map()
    const save = new Map()
    let round =0
    
    for(let i=0;i<start;i++){
        if(map.has(num-cards[i])){
            round++
            map.delete(num-cards[i])
        }else{
            map.set(cards[i], true)        
        }
    }
    
    for(index ; index<start;index++){
        let i = index*2 +start
        const num1 = cards[i]
        const num2 = cards[i+1]
        
        if(coin && map.has(num-num1)){
            coin--
            round++
            map.delete(num-num1)
        }else{
            save.set(num1,true)
        }
        
        if(coin && map.has(num-num2)){
            coin--
            round++
            map.delete(num-num2)
        }else{
            save.set(num2,true)
        }
        
        if(round) {
            round--
        }else{
            let flag = false
            if(coin>=2){
                for(let key of save.keys()){
                    if(save.has(num-key)){
                        save.delete(key)
                        save.delete(num-key)
                        coin-=2
                        flag =true
                        break
                    }
                }
            }
            
            if(!flag) break
        }
      
    }
    
    return index+1;
}
