'use strict';

function MyArray(...args) {
  this.length = 0;
  this.push = function (item) {
    this[this.length] = item;
    return ++this.length;
  };
  for (let i = 0; i < args.length; i++) {
    this.push(args[i]);
  }
}

// reduceRight

const myArr1 = new MyArray('1', '2', '3', '4', '5');

MyArray.reduceRight = function (arr, callback, startValue) {
  let result;
  let startIndex;

  if (startValue) {
    result = startValue;
    startIndex = 0;
  } else {
    result = arr[0];
    startIndex = 1;
  }

  for (let i = arr.length - 1; i >= startIndex; i--) {
    result = callback(result, arr[i], i, arr);
  }

  return result;
};

console.log(MyArray.reduceRight(myArr1, (a, b) => a + b, '6'));


