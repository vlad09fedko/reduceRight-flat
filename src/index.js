'use strict';

function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this.push(args[i]);
  }
}

MyArray.prototype = new MyArrayProto();

const myArr1 = new MyArray('1', '2', '3', '4', '5');
const myArr2 = new MyArray(
  new MyArray('1', new MyArray('2', new MyArray('3', '4', '5'))),
);

function MyArrayProto() {
  this.push = function () {
    if (arguments) {
      for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i];
      }
    }

    return this.length;
  };

  this.forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };

  this.concat = function (...args) {
    const result = new MyArray();

    for (let i = 0; i < this.length; i++) {
      result.push(this[i]);
    }

    for (let i = 0; i < args.length; i++) {
      if (args[i] instanceof Array) {
        result.push(...args[i]);
      } else if (args[i] instanceof MyArray) {
        for (let j = 0; j < args[i].length; j++) {
          result.push(args[i][j]);
        }
      } else {
        result.push(args[i]);
      }
    }

    return result;
  };

  // reduceRight
  this.reduceRight = function (callback, startValue) {
    let result;
    let startIndex;

    if (startValue) {
      result = startValue;
      startIndex = 0;
    } else {
      result = this[0];
      startIndex = 1;
    }

    for (let i = this.length - 1; i >= startIndex; i--) {
      result = callback(result, this[i], i, this);
    }

    return result;
  };

  // flat
  this.flat = function (depth = 1) {
    if (depth < 1) return this.concat();

    let result = new MyArray();
    this.forEach(item => {
      if (item instanceof MyArray) {
        const flattenedArray = item.flat(depth - 1);
        result = result.concat(flattenedArray);
      } else {
        result.push(item);
      }
    });

    return result;
  };
}

console.log(myArr1.reduceRight((a, b) => a + b, '6'));
console.log(myArr2.flat(3));
