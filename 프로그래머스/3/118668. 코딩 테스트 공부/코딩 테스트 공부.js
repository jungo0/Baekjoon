function createHeap() {
  const list = [],
    compare = (parent, child) => {
      if (parent[2] == child[2]) {
        return parent[0] + parent[1] > child[0] + child[1];
      }
      return parent[2] < child[2];
    };

  const swap = (i, j) => {
    const tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  };

  const push = (value) => {
    list.push(value);
    let i = list.length - 1;
    let parentIndex = Math.floor((i + 1) / 2) - 1;
    while (i != 0 && !compare(list[parentIndex], list[i])) {
      swap(i, parentIndex);
      i = parentIndex;
      parentIndex = Math.floor((i + 1) / 2) - 1;
    }
  };

  const pop = () => {
    const value = list[0];
    list[0] = list[list.length - 1];
    list.pop();
    let parentIndex = 0;
    let leftChildIndex = 2 * (parentIndex + 1) - 1;
    let rightChildIndex = leftChildIndex + 1;
    while (leftChildIndex < list.length) {
      let swapIndex = -1;
      if (leftChildIndex == list.length - 1) {
        if (!compare(list[parentIndex], list[leftChildIndex]))
          swap(parentIndex, leftChildIndex);
        break;
      }
      else if (compare(list[parentIndex], list[leftChildIndex])) {
        if (compare(list[parentIndex], list[rightChildIndex])) break;
        else {
          swapIndex = rightChildIndex;
        }
      }
      else {
        if (compare(list[leftChildIndex], list[rightChildIndex]))
          swapIndex = leftChildIndex;
        else swapIndex = rightChildIndex;
      }
      if (swapIndex >= 0) {
        swap(parentIndex, swapIndex);
        parentIndex = swapIndex;
        rightChildIndex = 2 * (parentIndex + 1);
        leftChildIndex = rightChildIndex - 1;
      }
    }
    return value;
  };

  return { push, pop, list };
}

function speed(problem) {
  const [_, __, alpRwd, copRwd, cost] = problem;
  return (alpRwd + copRwd) / cost;
}

function solution(alp, cop, problems) {
  // 비용이 적게 드는 순으로 정렬한다.
  const sortedProblems = problems.filter((p) => speed(p) > 1);
  sortedProblems.sort((a, b) => speed(a) - speed(b));

  // reduce를 사용해서 목표 알고력/코딩력을 구한다.
  const targetPoint = problems.reduce(
    (score, problem) => {
      return [Math.max(score[0], problem[0]), Math.max(score[1], problem[1])];
    },
    [0, 0]
  );

  let answer =
    Math.max(0, targetPoint[0] - alp) + Math.max(0, targetPoint[1] - cop);
  const costBoard = new Array(targetPoint[0] + 1)
    .fill(undefined)
    .map(() => new Array(targetPoint[1] + 1).fill(Infinity));

  const heap = createHeap();
  heap.push([alp, cop, 0]);

  while (heap.list.length) {
    let [currAlp, currCop, cost] = heap.pop();
    currAlp = Math.min(targetPoint[0], currAlp);
    currCop = Math.min(targetPoint[1], currCop);
    if (costBoard[currAlp][currCop] > cost) {
      for (let i = currAlp; i >= alp; i--) {
        if (costBoard[i][currCop] > cost) {
          costBoard[i][currCop] = cost;
        }
      }
      for (let i = currCop; i >= cop; i--) {
        if (costBoard[currAlp][i] > cost) {
          costBoard[currAlp][i] = cost;
        }
      }
      costBoard[currAlp][currCop] = cost;

      sortedProblems.forEach((p) => {
        const [alp_req, cop_req, alp_rwd, cop_rwd, problemCost] = p;
        if (alp_req > currAlp || cop_req > currCop) return;
        heap.push([currAlp + alp_rwd, currCop + cop_rwd, cost + problemCost]);
      });
      if (currAlp < targetPoint[0]) heap.push([currAlp + 1, currCop, cost + 1]);
      if (currCop < targetPoint[1]) heap.push([currAlp, currCop + 1, cost + 1]);
    }
  }

  return costBoard[targetPoint[0]][targetPoint[1]];
}