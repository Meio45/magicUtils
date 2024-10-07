/**
 * 查找数组中符合条件的第一个元素并返回
 *
 * @param {Array} array - 要查找的数组。
 * @param {Function} predicate - 判断条件的函数。
 * @returns {*} 返回找到的元素，未找到则返回 `undefined`。
 */
function arrayFind(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            return array[i];
        }
    }
    return undefined;
}

export default arrayFind;

// 使用示例
// const numbers = [1, 2, 3, 4, 5];
// const found = arrayFind(numbers, n => n > 3);
// console.log(found); // 输出: 4
