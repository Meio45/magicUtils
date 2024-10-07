// arrayPush.test.js

// 引入 assert 库用于断言
import utils from '../../src/index.js'
const assert = require('assert');

const {arrayPush} = utils;
console.log('arrayPush utils:', arrayPush);

describe('arrayPush', () => {
    it('should append values to the end of the array', () => {
        const array = [1, 2, 3];
        const values = [4, 5, 6];
        const result = arrayPush(array, values);
        assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    it('should handle empty values array', () => {
        const array = [1, 2, 3];
        const values = [];
        const result = arrayPush(array, values);
        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    it('should handle empty array', () => {
        const array = [];
        const values = [4, 5, 6];
        const result = arrayPush(array, values);
        assert.deepStrictEqual(result, [4, 5, 6]);
    });

    it('should handle both arrays being empty', () => {
        const array = [];
        const values = [];
        const result = arrayPush(array, values);
        assert.deepStrictEqual(result, []);
    });

    it('should handle appending single value', () => {
        const array = [1, 2, 3];
        const values = [4];
        const result = arrayPush(array, values);
        assert.deepStrictEqual(result, [1, 2, 3, 4]);
    });

    it('should not modify the original values array', () => {
        const array = [1, 2, 3];
        const values = [4, 5, 6];
        const originalValues = [...values]; // 复制一份原始值以便比较
        arrayPush(array, values);
        assert.deepStrictEqual(values, originalValues);
    });

    it('should work with arrays of different types', () => {
        const array = [1, 'two', true];
        const values = [false, 'four', 5];
        const result = arrayPush(array, values);
        assert.deepStrictEqual(result, [1, 'two', true, false, 'four', 5]);
    });
});
