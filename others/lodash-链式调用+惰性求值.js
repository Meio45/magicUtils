/* eslint-disable */

(function () {

    var INFINITY = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991,
        MAX_INTEGER = 1.7976931348623157e+308,
        NAN = 0 / 0,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined,
        funcTag = '[object Function]';

    /**
     * 对函数的参数进行转换后调用原函数
     *
     * @param func 原函数
     * @param transform 转换函数，接收一个参数，返回转换后的结果
     * @returns 返回一个新的函数，该函数接收一个参数，通过转换函数对该参数进行转换后调用原函数
     */
    function overArg(func, transform) {
        return function (arg) {
            return func(transform(arg));
        };
    }

    function arrayEach(array, iteratee) {
        var index = -1,
            length = array == null ? 0 : array.length;

        while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
                break;
            }
        }
        return array;
    }

    const runInContext = (function runInContext(context) {

        var arrayProto = Array.prototype,
            funcProto = Function.prototype,
            objectProto = Object.prototype,
            nativeKeys = overArg(Object.keys, Object),
            isArray = Array.isArray;

        function baseLodash() {
        }

        var baseCreate = (function () {
            function object() { }
            return function (proto) {
                object.prototype = proto;
                var result = new object;
                object.prototype = undefined;
                return result;
            };
        }());

        /**
         * LodashWrapper 构造函数
         *
         * @param value 初始值
         * @param chainAll 是否链式调用
         */
        function LodashWrapper(value, chainAll) {
            // 存储原始值
            this.__wrapped__ = value;
            // 存储执行的动作数组
            this.__actions__ = [];
            // 是否启用链式调用
            this.__chain__ = !!chainAll;
            // 当前索引值
            this.__index__ = 0;
            // 存储计算后的值
            this.__values__ = undefined;
        }

        //lodash
        function lodash(value) {
            return new LodashWrapper(value);
        }

        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;

        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;

        var nativeObjectToString = objectProto.toString;
        var baseFor = createBaseFor();

        function isPrototype(value) {
            var Ctor = value && value.constructor,
                proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

            return value === proto;
        }

        function createBaseFor(fromRight) {
            return function (object, iteratee, keysFunc) {
                var index = -1,
                    iterable = Object(object),
                    props = keysFunc(object),
                    length = props.length;

                while (length--) {
                    var key = props[fromRight ? length : ++index];
                    if (iteratee(iterable[key], key, iterable) === false) {
                        break;
                    }
                }
                return object;
            };
        }

        function isLength(value) {
            return typeof value == 'number' &&
                value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }

        function isFunction(value) {
            if (!isObject(value)) {
                return false;
            }
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in Safari 9 which returns 'object' for typed arrays and other constructors.
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }

        function isObject(value) {
            var type = typeof value;
            return value != null && (type == 'object' || type == 'function');
        }

        function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
        }

        function baseGetTag(value) {
            if (value == null) {
                return value === undefined ? undefinedTag : nullTag;
            }
            return (symToStringTag && symToStringTag in Object(value))
                ? getRawTag(value)
                : objectToString(value);
        }

        function objectToString(value) {
            return nativeObjectToString.call(value);
        }

        function iteratee(func) {
            return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
        }

        function identity(value) {
            return value;
        }

        function baseIteratee(value) {
            // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
            // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
            if (typeof value == 'function') {
                return value;
            }
            if (value == null) {
                return identity;
            }
            if (typeof value == 'object') {
                return isArray(value)
                    ? baseMatchesProperty(value[0], value[1])
                    : baseMatches(value);
            }
            return property(value);
        }

        function getIteratee() {
            var result = lodash.iteratee || iteratee;
            result = result === iteratee ? baseIteratee : result;
            return arguments.length ? result(arguments[0], arguments[1]) : result;
        }

        function arrayMap(array, iteratee) {
            var index = -1,
                length = array == null ? 0 : array.length,
                result = Array(length);

            while (++index < length) {
                result[index] = iteratee(array[index], index, array);
            }
            return result;
        }

        function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value),
                isArg = !isArr && isArguments(value),
                isBuff = !isArr && !isArg && isBuffer(value),
                isType = !isArr && !isArg && !isBuff && isTypedArray(value),
                skipIndexes = isArr || isArg || isBuff || isType,
                result = skipIndexes ? baseTimes(value.length, String) : [],
                length = result.length;

            for (var key in value) {
                if ((inherited || hasOwnProperty.call(value, key)) &&
                    !(skipIndexes && (
                        // Safari 9 has enumerable `arguments.length` in strict mode.
                        key == 'length' ||
                        // Node.js 0.10 has enumerable non-index properties on buffers.
                        (isBuff && (key == 'offset' || key == 'parent')) ||
                        // PhantomJS 2 has enumerable non-index properties on typed arrays.
                        (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
                        // Skip index properties.
                        isIndex(key, length)
                    ))) {
                    result.push(key);
                }
            }
            return result;
        }

        function baseKeys(object) {
            if (!isPrototype(object)) {
                return nativeKeys(object);
            }
            var result = [];
            for (var key in Object(object)) {
                if (hasOwnProperty.call(object, key) && key != 'constructor') {
                    result.push(key);
                }
            }
            return result;
        }

        //提取源函数上所有的方法名
        function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }

        function baseForOwn(object, iteratee) {
            return object && baseFor(object, iteratee, keys);
        }

        function arrayFilter(array, predicate) {
            var index = -1,
                length = array == null ? 0 : array.length,
                resIndex = 0,
                result = [];

            while (++index < length) {
                var value = array[index];
                if (predicate(value, index, array)) {
                    result[resIndex++] = value;
                }
            }
            return result;
        }

        function baseFunctions(object, props) {
            return arrayFilter(props, function (key) {
                return isFunction(object[key]);
            });
        }

        function baseToNumber(value) {
            if (typeof value == 'number') {
                return value;
            }
            if (isSymbol(value)) {
                return NAN;
            }
            return +value;
        }

        function createMathOperation(operator, defaultValue) {
            return function (value, other) {
                var result;
                if (value === undefined && other === undefined) {
                    return defaultValue;
                }
                if (value !== undefined) {
                    result = value;
                }
                if (other !== undefined) {
                    if (result === undefined) {
                        return other;
                    }
                    if (typeof value == 'string' || typeof other == 'string') {
                        value = baseToString(value);
                        other = baseToString(other);
                    } else {
                        value = baseToNumber(value);
                        other = baseToNumber(other);
                    }
                    result = operator(value, other);
                }
                return result;
            };
        }

        var add = createMathOperation(function (augend, addend) {
            return augend + addend;
        }, 0);

        function map(collection, iteratee) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee, 3));
        }

        function copyArray(source, array) {
            var index = -1,
                length = source.length;

            array || (array = Array(length));
            while (++index < length) {
                array[index] = source[index];
            }
            return array;
        }

        function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
        }

        function chain(value) {
            var result = lodash(value); //返回一个lodash包装器 wrapper的实例对象
            result.__chain__ = true; //设置__chain__属性为true; 都使用了 chain 必须得指出链式调用
            return result; //返回创建的实例对象
        }

        function arrayPush(array, values) {
            var index = -1,
                length = values.length,
                offset = array.length;

            while (++index < length) {
                array[offset + index] = values[index];
            }
            return array;
        }

        function arrayReduce(array, iteratee, accumulator, initAccum) {
            var index = -1,
                length = array == null ? 0 : array.length;

            if (initAccum && length) {
                accumulator = array[++index];
            }
            while (++index < length) {
                accumulator = iteratee(accumulator, array[index], index, array);
            }
            return accumulator;
        }

        function baseWrapperValue(value, actions) {
            var result = value;
            if (result instanceof LazyWrapper) {
                result = result.value();
            }
            return arrayReduce(actions, function (result, action) {
                return action.func.apply(action.thisArg, arrayPush([result], action.args));
            }, result);
        }

        function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
        }


        /*mixin
        * @param {Object} object 目标对象，将源对象上的方法添加到该对象上
        * @param {Object} source 源对象，将该对象上的方法添加到目标对象上
        * @param {object} options 配置参数，例如添加的方式是否支持链式调用 {chain:true}
        */
        function mixin(object, source, options) {

            var props = keys(source), //提取source对象上所有属性名
                methodNames = baseFunctions(source, props); //提取源对象上的所有函数名

            // 若option为空，且source不是对象或source没有方法名
            if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
                options = source;
                source = object;
                object = this; // 此处的this就是 _ (lodash)
                // 重新提取source对象上的所有函数名，此时source中保存的是目标对象
                methodNames = baseFunctions(source, keys(source));
            }
            // 如果 options 不是对象，或者 chain 不在 options的对象或者原型链中，则 chain 为 true （默认值）
            // 否则，chain 的值为 options.chain 的布尔值。
            var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
                // 检查 object 是否是一个函数
                isFunc = isFunction(object);

            // 遍历 methodNames 数组，将 source 对象上的方法添加到 object 对象上
            arrayEach(methodNames, function (methodName) {
                // func 当前的函数
                var func = source[methodName];
                object[methodName] = func;

                // 如果 object 是一个函数，则将该方法添加到 object 的原型对象中，使所有实例都能访问到
                if (isFunc) {
                    object.prototype[methodName] = function () {
                        // 当前this指lodash
                        var chainAll = this.__chain__; // 获取当前对象的 __chain__ 属性值，是否支持链式调用
                        if (chain || chainAll) {
                            var result = object(this.__wrapped__), // 创建一个新的 LodashWrapper 对象，并传递this的 __wrapped__ 属性值作为参数
                                /** result 是 new LodashWrapper 实例 
                                {
                                    __actions__: [],         // 存储待执行的函数
                                    __chain__: true,         // 是否支持链式调用
                                    __index__: 0,            // 索引值
                                    __values__: undefined,  // 存放当前对象的 __values__ 数组
                                    __wrapped__: value       // 存放参数
                                }
                                **/
                                // 复制lodash当前的 __actions__ 数组 赋值给 result 对象的 __actions__ 数组，再存储到 actions 中
                                actions = result.__actions__ = copyArray(this.__actions__);

                            // 添加 函数 和 args 和 this 指向，延迟计算调用
                            actions.push({ 'func': func, 'args': arguments, 'thisArg': object });

                            //继承当前对象的链式调用属性
                            result.__chain__ = chainAll;

                            // 返回 result 对象，支持链式调用
                            return result;
                        }
                        // 如果当前对象不支持链式调用，则直接调用 func 方法。
                        // 把当前实例的 value 和 arguments 对象 传递给 func 函数作为参数调用。返回调用结果。
                        return func.apply(object, arrayPush([this.value()], arguments));
                    };
                }
            });

            return object;
        }

        lodash.mixin = mixin;
        lodash.map = map;
        lodash.chain = chain;
        lodash.filter = filter;

        mixin(lodash, lodash);

        // lodash.map = function (array, iteratee) {
        //     let index = -1,
        //         length = array == null ? 0 : array.length,
        //         result = Array(length);

        //     while (++index < length) {
        //         result[index] = iteratee(array[index], index, array);
        //     }
        //     return result;
        // };

        lodash.prototype.reverse = function () {
            const value = this.__wrapped__;
            if (Array.isArray(value)) {
                this.__wrapped__ = value.reverse();
            }
            return this;
        };

        // lodash.prototype.value = function () {
        //     return this.__wrapped__;
        // };

        // mixin(lodash, lodash);

        /*------------------------------------------------------------------------*/
        lodash.add = add;
        mixin(lodash, (function () {
            var source = {};
            baseForOwn(lodash, function (func, methodName) {
                if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                    source[methodName] = func;
                }
            });
            return source;
        }()), { 'chain': false });


        /* 惰性求值------------------------------------------------------------------------*/

        function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
        }

        function lazyValue() {
            var array = this.__wrapped__.value(),
                dir = this.__dir__,
                isArr = isArray(array),
                isRight = dir < 0,
                arrLength = isArr ? array.length : 0,
                view = getView(0, arrLength, this.__views__),
                start = view.start,
                end = view.end,
                length = end - start,
                index = isRight ? end : (start - 1),
                iteratees = this.__iteratees__,
                iterLength = iteratees.length,
                resIndex = 0,
                takeCount = nativeMin(length, this.__takeCount__);

            if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
                return baseWrapperValue(array, this.__actions__);
            }
            var result = [];

            outer:
            while (length-- && resIndex < takeCount) {
                index += dir;

                var iterIndex = -1,
                    value = array[index];

                while (++iterIndex < iterLength) {
                    var data = iteratees[iterIndex],
                        iteratee = data.iteratee,
                        type = data.type,
                        computed = iteratee(value);

                    if (type == LAZY_MAP_FLAG) {
                        value = computed;
                    } else if (!computed) {
                        if (type == LAZY_FILTER_FLAG) {
                            continue outer;
                        } else {
                            break outer;
                        }
                    }
                }
                result[resIndex++] = value;
            }
            return result;
        }

        lodash.prototype.value = wrapperValue;

        return lodash;
    });

    const MagicMeio = runInContext();

    // 将 `lodash` 实例导出到全局变量
    if (typeof window !== 'undefined') {
        window.MagicMeio = MagicMeio;
    } else if (typeof global !== 'undefined') {
        global.MagicMeio = MagicMeio;
    }

    console.log('MagicMeioH', MagicMeio);

    console.log('-----------------------------------');

    // 查看MagicMeio对象上的方法
    console.log(Object.keys(MagicMeio));

    // ®®查看MagicMeio原型链上的方法
    console.log(Object.keys(MagicMeio.prototype));

    // const instance = MagicMeio([1, 2, 3]);

    // 查看MagicMeio实例化对象上的所有方法
    // console.log('Methods on MagicMeio instance:');
    // Object.keys(instance).forEach(key => {
           //     if (typeof instance[key] === 'function') {
    //         console.log(key);
    //     }
    // });

    // 查看MagicMeio原型链上的所有方法
    // console.log('Methods on MagicMeio.prototype:');
    // Object.keys(MagicMeio.prototype).forEach(key => {
    //     if (typeof MagicMeio.prototype[key] === 'function') {
    //         console.log(key);
    //     }
    // });


}.call(this));


// console.log('-----------------------------------');
// const tripled = MagicMeio.add(1, 2);
// console.log(tripled)

// var a = MagicMeio([1, 2, 3]).map().value();
// console.log(a)
const array = [1, 2, 2, 3, 4, 4, 5];

const result = MagicMeio
    .chain(array)
    .filter(n => n % 2 === 0)
    .map(n => n * n)
    .value()
console.log('result', result)

const result2 = MagicMeio(array)
    .filter(n => n % 3 === 0)
    .map(n => n * n)
    .value()
console.log('result2', result2)

const result3 = MagicMeio(array)
    .map(n => n * n)
    .value()
console.log('result3', result3)

function square(n) {
    return n * n;
}
console.log(MagicMeio.map([4, 8], square))
