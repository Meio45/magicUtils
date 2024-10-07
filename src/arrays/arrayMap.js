/**
 * 对数组中的每一个元素应用一个函数，并返回一个新的数组
 *
 * @param {Array} array - 要映射的数组。
 * @param {Function} callback - 映射函数。
 * @returns {Array} 返回映射后的数组。
 */
function arrayMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

export default arrayMap;

// 使用示例
// const numbers = [1, 2, 3, 4, 5];
// const squares = arrayMap(numbers, n => n * n);
// console.log(squares); // 输出: [1, 4, 9, 16, 25]
