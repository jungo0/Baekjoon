function solution(enroll, referral, seller, amount) {
  let result = {};
  let parent = {};

  for (let i = 0; i < enroll.length; i++) {
      parent[enroll[i]] = referral[i];
  }

  for (let name of enroll) {
      result[name] = 0;
  }

  for (let j = 0; j < seller.length; j++) {
      let money = amount[j] * 100;
      let curName = seller[j];

      while(curName !== "-" && money > 0) {
          result[curName] += money - Math.floor(money / 10);
          curName = parent[curName];
          money = Math.floor(money / 10);
      }
  }

  return enroll.map(name => result[name]);
}