function solution(n, bans) {
    const alpha = 'abcdefghijklmnopqrstuvwxyz'
    let len = 1;
    while (n > 26 ** len) {
        len++;
    }
    
    const strToIndex = (str) => [...str].reduce((a, c) => a * 26 + (c.charCodeAt(0) - 96), 0);    
    
    bans.sort((a, b) => strToIndex(a) - strToIndex(b));
    
    for (const ban of bans) {
        if (ban.length > len) break;
        if (strToIndex(ban) <= n) n += 1;
    }
    
    let answer = "";
    while (len--) {
        answer = alpha[(n - 1) % 26] + answer;
        n = Math.floor((n - 1) / 26);
    }

    return answer;
}
