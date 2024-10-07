/**
 * 对数组进行排序
 *
 * @param {Array} array - 要排序的数组。
 * @param {Function} [compareFunction] - 可选的比较函数，定义排序顺序。
 * @returns {Array} 返回排序后的数组。
 */
function arraySort(array, compareFunction) {
    return array.sort(compareFunction);
}

export default arraySort;

// 使用示例
// const numbers = [4, 2, 5, 1, 3];
// arraySort(numbers);
// console.log(numbers); // 输出: [1, 2, 3, 4, 5]
