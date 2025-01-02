function solution(expression) {
    let max = 0
    let value = ''
    let origin=[]
    for(let i=0; i<=expression.length-1; ++i){
        let cha = expression[i]
        if(cha==='-'||cha==='+'||cha==='*'){
            origin.push(Number(value))
            value=''
            origin.push(cha)
        }else if(i===expression.length-1){
            value+=cha
            origin.push(Number(value))
        }else{
            value+=cha
        }
    }
    
    const op_order_arr =
    [['*','+','-'],
    ['*','-','+'],
    ['+','*','-'],
    ['+','-','*'],
    ['-','*','+'],
    ['-','+','*']]
    
    op_order_arr.forEach((op_arr)=>{
        let arr = [...origin]
        
        op_arr.forEach((op)=>{
            let i =0
            while(i<=arr.length-1){
                if(arr[i+1] && arr[i+1]===op){
                    let cha = arr[i+1]
                    let replaced_val = undefined
                    if(cha==='+'){
                        replaced_val = arr[i]+arr[i+2] 
                    }else if(cha==='-'){
                        replaced_val = arr[i]-arr[i+2]
                    }else if(cha==='*'){
                        replaced_val = arr[i]*arr[i+2]
                    }
                    arr.splice(i,3,replaced_val)
                    
                }else{
                    ++i
                }
    
            }
        
        })
        max=Math.max(max,Math.abs(arr[0]))
    })
 
 
    return max;
}