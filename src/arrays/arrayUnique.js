/**
 * 数组去重，返回一个新的不包含重复元素的数组
 *
 * @param {Array} array - 要去重的数组。
 * @returns {Array} 返回去重后的 `array`。
 */
function arrayUnique(array) {
    return [...new Set(array)];
}

export default arrayUnique;

// const arr = [1, 1, 2, 3, 4, 4];
// const uniqueArr = arrayUnique(arr);
// console.log(uniqueArr); // 输出: [1, 2, 3, 4]