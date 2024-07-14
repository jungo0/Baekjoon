function solution(record) {
  const answer = [];
  const userInfo = {};

  for (let i = 0; i < record.length; i++) {
    const [command, uid, nickname] = record[i].split(" ");
    
    if (command === "Enter") {
      userInfo[uid] = nickname;
      answer.push(`${uid}님이 들어왔습니다.`);
    } else if (command === "Leave") {
      answer.push(`${uid}님이 나갔습니다.`);
    } else if (command === "Change") {
      userInfo[uid] = nickname;
    }
  }

  for (let i = 0; i < answer.length; i++) {
    const uid = answer[i].split("님이")[0];
    answer[i] = answer[i].replace(uid, userInfo[uid]);
  }

  return answer;
}