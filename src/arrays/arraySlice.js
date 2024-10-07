/**
 * 截取数组的一部分，并返回一个新数组，不修改原数组
 *
 * @param {Array} array - 要截取的数组。
 * @param {number} [begin] - 截取的起始位置。
 * @param {number} [end] - 截取的结束位置。
 * @returns {Array} 返回截取的新数组。
 */
function arraySlice(array, begin, end) {
    const result = [];
    const len = array.length;
    const start = begin >= 0 ? begin : Math.max(len + begin, 0);
    const upTo = end === undefined ? len : end;
    const finalEnd = upTo >= 0 ? Math.min(upTo, len) : len + upTo;

    for (let i = start; i < finalEnd; i++) {
        result.push(array[i]);
    }
    return result;
}

export default arraySlice;

// 使用示例
// const numbers = [1, 2, 3, 4, 5];
// const sliced = arraySlice(numbers, 1, 3);
// console.log(sliced); // 输出: [2, 3]
