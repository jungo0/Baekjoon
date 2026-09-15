function solution(common) {
    const last = common[common.length - 1];
    
    const diff1 = common[1] - common[0];
    const diff2 = common[2] - common[1];

    if (diff1 === diff2) {
        return last + diff1;
    } else {
        const ratio = common[1] / common[0];
        return last * ratio;
    }
}