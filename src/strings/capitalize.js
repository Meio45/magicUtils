/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @return {string} The capitalized string.
 */
const capitalize = (str) => {
    if (typeof str !== 'string') {
        throw new TypeError('capitalize expects a string argument');
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default capitalize;
