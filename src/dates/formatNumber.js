/**
 * Formats a number to a specific decimal point.
 * @param {number} num - The number to format.
 * @param {number} decimals - The number of decimal places.
 * @return {string} The formatted number.
 */
const formatNumber = (num, decimals) => {
    if (typeof num !== 'number' || typeof decimals !== 'number') {
        throw new TypeError('formatNumber expects number arguments');
    }
    return num.toFixed(decimals);
};

export default formatNumber;
