function solution(phone_book) {
    let hashMap = {}
    
    for(const v of phone_book){
        hashMap[v] = true
    }
    
    for(const num of phone_book){
        for(let i=1; i < num.length; i++){
            const prefix = num.substring(0,i)
            if(hashMap[prefix]) return false
        }
    }
    
    return true
}
