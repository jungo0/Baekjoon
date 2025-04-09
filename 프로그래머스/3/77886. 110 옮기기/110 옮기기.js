function solution(s) {
    const result = []
    for(const s_el of s) {
        let count = 0
        const cur = s_el.split("")
        const stack = []
        for(let i = 0 ; i < cur.length ; i ++) {
            const third = cur[i]
            if(stack.length > 1) {
                const second = stack.pop()
                const first = stack.pop()
                
                if(first+second+third === "110") {
                    count++
                    continue
                } else {
                    stack.push(first, second, third)
                }
            } else {
                stack.push(third)
            }
        }
        if(!count) {
            result.push(s_el)
        } else {
            const list = []
            const reverse110 = "011"
            while(stack.length) {
                const curElement = stack.pop()
                if(curElement === '0') {
                    stack.push("0")
                    break
                }
                list.push("1")
            }
            while(count) {
                list.push(...[...reverse110])
                count--
            }
            
            while(stack.length) {
                list.push(stack.pop())
            }
            result.push(list.reverse().join(""))
        }
    }
    return result
}