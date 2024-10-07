
/**
 * 检查数组是否包含某个元素，返回布尔值
 *
 * @param {Array} array - 要检查的数组。
 * @param {*} value - 要检查的值。
 * @returns {boolean} 返回布尔值，表示是否包含该元素。
 */
function arrayIncludes(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

export default arrayIncludes;

// 使用示例
// const numbers = [1, 2, 3, 4, 5];
// console.log(arrayIncludes(numbers, 3)); // 输出: true
// console.log(arrayIncludes(numbers, 6)); // 输出: false
