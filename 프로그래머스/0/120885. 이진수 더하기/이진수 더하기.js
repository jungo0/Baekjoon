function solution(bin1, bin2) {
    let result = '';
    let carry = 0; // 올림수
    
    let i = bin1.length - 1;
    let j = bin2.length - 1;
    
    while (i >= 0 || j >= 0 || carry > 0) {
        const num1 = i >= 0 ? Number(bin1[i]) : 0;
        const num2 = j >= 0 ? Number(bin2[j]) : 0;
        
        const sum = num1 + num2 + carry;
        
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2); 
        i--;
        j--;
    }
    
    return result;
}