/**
 * 过滤数组中符合条件的元素并返回一个新数组
 *
 * @param {Array} array - 要过滤的数组。
 * @param {Function} predicate - 判断条件的函数。
 * @returns {Array} 返回过滤后的数组。
 */
function arrayFilter(array, predicate) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

export default arrayFilter;

// 使用示例
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = arrayFilter(numbers, n => n % 2 === 0);
console.log(evenNumbers); // 输出: [2, 4]
