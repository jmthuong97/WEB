
'use strict'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generate(testLengthArray) {
  var list = new Array;
  var count = 0;
  while (count < testLengthArray.length) {
    var input = new Array;
    while (input.length < testLengthArray[count]) {
      input.push(getRandomInt(-10000, 10000));
    }
    input = mergeSort(input);
    var target = getTarget(input);
    var output = search(input, target);
    list.push({ "input": input, "target": target, "output": output });
    console.log("input: " + input + "target: " + target + " output: " + output);
    count++;
  }
  console.log(testLengthArray.length);
  return list;
}

function getTarget(input) {
  var cmd = getRandomInt(0, 1);
  switch (cmd) {
    case 0:
      var rand = getRandomInt(0, input.length - 1);
      return input[rand];
      break;
    case 1:
      var rand1
      while (true) {
        rand1 = getRandomInt(-10000, 10000);
        if (search(input, rand1) == -1)
          break;
      }
      console.log(rand1);
      return rand1;
      break;
  }

}

function search(input, target) {
  for (var i = 0; i < input.length; i++) {
    if (input[i] == target) {
      return i;
    }
  }
  return -1;
}

// =============== Sort ==============
function mergeSort(arr) {
  if (arr.length < 2)
    return arr;
  var middle = parseInt(arr.length / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle, arr.length);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length)
    result.push(left.shift());
  while (right.length)
    result.push(right.shift());
  return result;
}

module.exports = generate