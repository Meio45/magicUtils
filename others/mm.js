// 定义 LazyWrapper 类
class LazyWrapper {
    constructor(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
    }

    filter(predicate) {
        this.__actions__.push({
            type: 'filter',
            func: predicate
        });
        return this;
    }

    map(mapper) {
        this.__actions__.push({
            type: 'map',
            func: mapper
        });
        return this;
    }

    take(n) {
        this.__actions__.push({
            type: 'take',
            count: n
        });
        return this;
    }

    value() {
        let result = this.__wrapped__;
        for (const action of this.__actions__) {
            if (action.type === 'filter') {
                result = result.filter(action.func);
            } else if (action.type === 'map') {
                result = result.map(action.func);
            } else if (action.type === 'take') {
                result = result.slice(0, action.count);
            }
        }
        return result;
    }
}

// 定义一个数组
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 使用链式调用和惰性求值
const result = new LazyWrapper(array)
    .filter(n => n % 2 === 0) // 过滤出偶数
    .map(n => n * n)          // 将每个偶数平方
    .take(3)                  // 取前3个元素
    .value();                 // 获取最终值

console.log(result); // 输出: [4, 16, 36]