function solution(user_id, banned_id) {
    var answer =  new Set();
   let visitied = Array.from({length:user_id.length},()=>true);
  let nowIdx =0;
  DFS(nowIdx,[]);
  function DFS(idx,arr){
       
    if(idx>=banned_id.length){
  
      let endArr = arr.slice(0);
      endArr.sort();
      answer.add(JSON.stringify([...endArr]))
      return;
    }
    let targetBid = banned_id[idx];
    for(let i=0; i<user_id.length;i++){
      let uId = user_id[i];
      if(uId.length!==targetBid.length || !visitied[i]){
        continue;
      }
      for(let j=0; j<uId.length+1;j++){
        let uIdLetter = uId[j];
        let bIdLetter = targetBid[j];
        if(bIdLetter==='*'){
          continue;
        }
        if(uIdLetter!==bIdLetter){
          break;
        }
        if(j===uId.length){
        
          visitied[i] = false;
          arr.push(uId);
       
          DFS(idx+1,arr)
       
          arr.pop();
          visitied[i] = true;
        }
      }
      
    }
    
  }
  


  
    return answer.size;
}