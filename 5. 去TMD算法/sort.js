// 冒泡排序(bubble sort)：
// 从左到右，两两对比，如果前一个数比后一个数大，则两数交换位置
// 直到没有数可以交换的时候，结束这个数，再到下一个数，再到整个数组排序好
// 算法描述：
// 1. 比较相邻两个数，如果第一个数比第二个数大，则交换位置
// 2. 对每两个响铃的数做 1 的操作，从开始一对到结尾一对，在最后的数就是最大的数
// 3.针对所有元素上面的操作，除了最后一个
// 4. 重复 1-3，直到排序完成

function bubbleSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

const arr = [123, 34, 654, 23, 45, 257, 1, 23, 75];
// console.log(bubbleSort(arr));

// 选择排序：
// 1. 在数据中找到最小的，放到队列的首位
// 2. 从剩余的数据中找到最小的，放到已排队列的末尾
// 3. 重复第二个步骤，直到排序完成

function selectionSort(a) {
  let len = a.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    // 最前的位置
    minIndex = i;
    // 最前的数据与后面的每一个数字做对比
    for (let j = i + 1; j < len; j++) {
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }
    // 上面循环完，便找到了最小的那个数，用最小那个数与排序后的最后一个数做交换
    [a[minIndex], a[i]] = [a[i], a[minIndex]];
  }
  return a;
}
// console.log(selectionSort(arr));

// 插入排序：
// 将待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列
// 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置

function insertionSort(a) {
  let preIndex, current;
  for (let i = 1; i < a.length; i++) {
    preIndex = i - 1;
    current = a[i];
    while (preIndex >= 0 && a[preIndex] > current) {
      a[preIndex + 1] = a[preIndex];
      preIndex--;
    }
    a[preIndex + 1] = current;
  }
  return a;
}
console.log(insertionSort(arr));
