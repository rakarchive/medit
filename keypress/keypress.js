const ctrl = require("./control")
const func = require("./function")
const char = require("./character")

module.exports = function (str, key) {
  if (key.ctrl) ctrl(key, this)
  else if (key.name?.length > 1) func(key, this)
  else char(key, this)

  return true
}
