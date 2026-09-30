function solution(enroll, referral, seller, amount) {
    const parentMap = new Map();
    const totalProfitMap = new Map();

    enroll.forEach((name, i) => {
        parentMap.set(name, referral[i]);
        totalProfitMap.set(name, 0);
    });

    function distributeProfit(currentName, money) {
        if (currentName === "-" || money < 1) return;

        const parent = parentMap.get(currentName);
        const parentCommission = Math.floor(money * 0.1); // 추천인에게 넘겨줄 10% (원 단위 절사)
        const myProfit = money - parentCommission;        // 내가 가질 90%

        // 내 수익 누적
        totalProfitMap.set(currentName, totalProfitMap.get(currentName) + myProfit);

        // 추천인에게 remaining 금액 전달 (재귀 호출)
        distributeProfit(parent, parentCommission);
    }

    seller.forEach((name, i) => {
        const profit = amount[i] * 100; // 칫솔 1개당 100원
        distributeProfit(name, profit);
    });

    return enroll.map(name => totalProfitMap.get(name));
}