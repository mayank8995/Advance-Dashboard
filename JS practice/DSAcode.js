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
// function longestSubstring(str) {

//     let set = new Set();
//     let slow = 0;
//     let maxLength = 0;
//     for(let fast = 0; fast < str.length; fast++){

//       while(set.has(str[fast])){
//         set.delete(str[slow]);
//         slow++;
//       }
//       set.add(str[fast]);
//       maxLength = Math.max(maxLength, fast - slow + 1);
//     }
//   return maxLength
// }

// console.log(longestSubstring("aaaba"))

//Return length of longest contiguous subarray containing at most 2 distinct numbers.
// function LongestSubArray(arr){
//    let slow = 0;
//    let fast;
//    let maxLength = 0;
//    let map = new Map();
//    for(fast = 0; fast<arr.length; fast++){
//         map.has(arr[fast]) ?  map.set(arr[fast], map.get(arr[fast]) + 1) : map.set(arr[fast], 1);
//         while(map.size > 2){
//           map.set(arr[slow], map.get(arr[slow]) - 1);
//           if(map.get(arr?.[slow]) === 0) map.delete(arr[slow]);
//           slow++;
//         }
//         maxLength = Math.max(maxLength, fast - slow + 1)
//       }
//    return maxLength;
// }
// console.log(LongestSubArray([1, 2, 1, 3, 2, 2]))
// console.log(LongestSubArray([1,2,3,9,9,1,2,1,2,3,4,5,7,8,9,5,8,9,9,9,9,9,9]))
// console.log(LongestSubArray([1,2,1,2,1,2,1,2,1,2,3,4,5,7,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]))
// console.log(LongestSubArray([1,1,1,2,2,3,3,3,2,2,2]))
// console.log(LongestSubArray([1,1,1,1,1]))
// console.log(LongestSubArray([1,2,3,3,4]))
// console.log(LongestSubArray([1,2,1,2,3]))



//Maximum Sum Subarray of Size K
function maxSumSubarray(arr,k){
    if(k > arr.length) return "No valid maxsum of subarray of size k exists"
    let slow = 0;
    let currentWindowSum = 0;
    let maxSum = Number.MIN_SAFE_INTEGER;
    for(let fast = 0; fast < arr.length; fast++){
        currentWindowSum += arr[fast];
        if(fast - slow + 1 === k){
            maxSum = Math.max(maxSum, currentWindowSum)
            currentWindowSum -= arr[slow];
            slow++;
        }
    }
    return maxSum;
}
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2],3))
console.log(maxSumSubarray([2,2,2,2,2,2],3))
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2,1,1,1,1,1,1,1,1,1],5))
console.log(maxSumSubarray([1,1,1,1,1,1,1,1,1],4))
console.log(maxSumSubarray([1,2,3,4,5,6,7,8,9],3))
console.log(maxSumSubarray([2,4,3,6,5,7,8],4))
console.log(maxSumSubarray([],4))
console.log(maxSumSubarray([-5, -2, -8],2))



//arr = [2, 1, 5, 1, 3, 2] k = 3