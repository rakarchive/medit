const ctrl = require("./control")
const func = require("./function")
const char = require("./character")

module.exports = function (str, key) {
  let render

  if (key.ctrl) {
    render = ctrl(key, this)
  } else if (key.name?.length > 1) {
    render = func(key, this)
  } else {
    render = char(key, this)
  }

  return render
}
