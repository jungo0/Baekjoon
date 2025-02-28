const solution = (fees, records) => {
  let answer = [];
  let carList = {};
  let cumulativeTime = new Map();
  const [defaultTime, defaultRate, unitTime, unitRate] = fees;

  // 입출차 기록으로 시간 계산
  for (let record of records) {
    const [times, carNum, state] = record.split(" ");
    const [hour, min] = times.split(":");
    let time = Number(hour * 60) + Number(min);

    switch (state) {
      case "IN":
        carList[carNum] = time;
        break;
      case "OUT":
        cumulativeTime.set(
          carNum,
          cumulativeTime.get(carNum) === undefined
            ? time - carList[carNum]
            : cumulativeTime.get(carNum) + (time - carList[carNum])
        );
        delete carList[carNum];
        break;
    }
  }

  // 아직 출차되지 않은 차가 존재한다면, 11:59 기준으로 시간 계산
  for (let [key, value] of Object.entries(carList)) {
    cumulativeTime.set(
      key,
      cumulativeTime.get(key) === undefined
        ? 1439 - value
        : cumulativeTime.get(key) + (1439 - value)
    );
    delete carList[key];
  }

  // 정렬
  cumulativeTime = new Map(
    Array.from(cumulativeTime).sort((a, b) => a[0] - b[0])
  );

  // 최종 주차 금액
  for (let time of cumulativeTime.values()) {
    answer.push(
      time <= defaultTime
        ? defaultRate
        : defaultRate + Math.ceil((time - defaultTime) / unitTime) * unitRate
    );
  }
  return answer;
};