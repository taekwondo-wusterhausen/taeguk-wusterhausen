const nunjucks = require("nunjucks")

/**
 * Returns the name of the type.
 * @param {nunjucks.Environment} env
 * @returns {void}
 */
module.exports = function addType(env) {
    /**
     * See https://stackoverflow.com/a/7894320
     * @param {unknown} obj
     * @returns {string}
     */
    function getType(obj) {
        // "[object String]" => "String"
        return Object.prototype.toString.call(obj).slice(8, -1)
    }
    env.addFilter("type", getType)
}
