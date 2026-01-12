function solution (gems) {
  const list = [];
  const shoppingBag = new Map();
  const kinds = new Set(gems).size;
  
  for(let i = 0; i < gems.length; i++) {
    shoppingBag.delete(gems[i]);
    shoppingBag.set(gems[i], i+1);
    
    if(kinds === shoppingBag.size) {
      list.push([shoppingBag.values().next().value, i+1]);
    }
  }
  
  list.sort((a, b) => a[1]-a[0] === b[1]-b[0] ? a[0]-b[0] : (a[1]-a[0]) - (b[1]-b[0]));
  
  return list[0];
}