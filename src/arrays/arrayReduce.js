/**
 * 对数组中的每一个元素应用一个函数，最终汇总为单一的返回值
 *
 * @param {Array} array - 要简化的数组。
 * @param {Function} callback - 函数应用。
 * @param {*} initialValue - 初始值。
 * @returns {*} 返回简化后的值。
 */
function arrayReduce(array, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

export default arrayReduce;

// 使用示例
// const numbers = [1, 2, 3, 4, 5];
// const sum = arrayReduce(numbers, (acc, n) => acc + n, 0);
// console.log(sum); // 输出: 15
