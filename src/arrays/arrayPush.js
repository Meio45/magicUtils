/**
 * 将一个数组的元素全部添加到另一个数组的末尾
 *
 * @param {Array} array - 要修改的数组。
 * @param {Array} values - 要附加的值。
 * @returns {Array} 返回修改后的 `array`。
 */
function arrayPush(array, values) {
    let index = -1;
    const {length} = values;
    const offset = array.length;

    while (++index < length) {
        array[offset + index] = values[index];
    }
    return array;
}

export default arrayPush;

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// arrayPush(arr1, arr2);
// console.log(arr1); // 输出: [1, 2, 3, 4, 5, 6]