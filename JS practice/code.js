/**function isPalindrome(str) {
  let i = 0; 
  let j = str.length - 1;
  while(i != j && i < j){
    if(str[i] !== str[j]) return false;
    i++;
    j--;
  }
  return true;
}
console.log(isPalindrome("malayalam"))**/

/**function findMax(arr) {
  let max = arr[0];
  let i = 1;
  while(i < arr.length){
    if(arr[i] > max){
          max = arr[i];
    }
    i++;
  }
  return max;
}
console.log(findMax([3,5,66,-1,0]))**/

/**function charCount(str) {
  let obj = {};
  for(let i = 0; i < str.length; i++){
    let char = str[i]; 
    obj[char] = (obj[char] || 0) + 1;
  }
  return obj;
}

console.log(charCount("banana"))**/
/**
Input:
arr = [2, 7, 11, 15]
target = 9
Output:
[0, 1]
**/
/** function twoSum(arr, target) {
    let sum = arr[0];
    for(let i = 0 ; i < arr.length ; i++){
        for(let j = i+1 ; j < arr.length ; j++){
          if(arr[i] + arr[j] === target) return [i, j]
      }
    }
  return "target not found"
}
console.log(twoSum([2, 17, 7, 15], 9))**/

/**function twoSum(arr, target) {
    let map = new Map();
    for(let i = 0 ; i < arr.length ; i++){
        map.set(arr[i],i);
    }
  for(let i = 0 ; i < arr.length ; i++){
    let complement = target - arr[i];
      if(map.has(complement)) return [i,map.get(complement)]
    }
  return []
}

console.log(twoSum([2, 17, 7, 15], 9))**/
// arr = [0,1,0,0,0,0,5,6]
/**function moveZeroes(arr) {
    let slow  = 0;
    let fast = 0;
  while(fast<arr.length){
    if(arr[fast] === 0){
      fast++;
    }else if(arr[slow] === 0 && arr[fast] !== 0) {
        let temp = arr[slow];
        arr[slow] = arr[fast];
        arr[fast] = temp;
        slow++;
        fast++;
      }
    else{
      fast++;
    }
  }
  return arr;
  }
console.log(moveZeroes([1,2,3,4,5,6]))**/
