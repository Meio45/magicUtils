/**
 * 返回数组中指定元素第一次出现的位置，如果没有找到则返回 -1
 *
 * @param {Array} array - 要搜索的数组。
 * @param {*} value - 要搜索的值。
 * @returns {number} 返回找到的索引位置，没有找到则返回 -1。
 */
function arrayIndexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

export default arrayIndexOf;

// 使用示例
const numbers = [1, 2, 3, 4, 5];
console.log(arrayIndexOf(numbers, 3)); // 输出: 2
console.log(arrayIndexOf(numbers, 6)); // 输出: -1
