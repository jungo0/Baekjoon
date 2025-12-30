function solution(triangle) {
    let sum_arr = []    
    triangle.forEach((arr)=>{
        if(sum_arr.length===0){
            sum_arr=arr
        }else{
            let temp = []
            for(let i=0; i<=arr.length-1; ++i){
                if(sum_arr[i-1]&&sum_arr[i]){
                    let max = Math.max(sum_arr[i-1],sum_arr[i])
                    temp.push(max+arr[i])
                }else if(i===arr.length-1){
                    temp.push(arr[i]+sum_arr[i-1])
                }else{
                    temp.push(arr[i]+sum_arr[i])   
                }
            }  
            sum_arr=temp
        }  
    })
    return Math.max(...sum_arr);
}