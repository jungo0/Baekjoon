function solution(cards) {

    var answer = [];

    cardArr = cards.map((element)=>{
        return({num: element-1, check: false});
    })


    for(var i = 0; i<cardArr.length;i++){
       
        if(cardArr[i].check === false){
            var plusArr = [];
            var element = cardArr[i];
            var nextIndex;
            var curIndex = i;
            while(true){
                nextIndex = element.num;
                if(element.check===true){
                    break;
                }
                else{
                    cardArr[curIndex].check = true;
                    curIndex = nextIndex;
                    plusArr.push(element.num);
                    element = cardArr[nextIndex];
                }
            }

            answer.push(plusArr);
        }
    }
    
    answer.sort((a,b)=>{
        if(a.length>b.length){
            return -1;
        }
        else{
            return 1;
        }
    }
    )
    
    if(answer.length<2){
        return 0;
    }
    
    return answer[0].length* answer[1].length;
}
