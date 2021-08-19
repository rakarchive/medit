const type = require("../util/type")

module.exports = function (key, editor) {
  type(key.sequence, editor)
  return 2
}
