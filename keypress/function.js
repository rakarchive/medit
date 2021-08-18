const type = require("../util/type")

module.exports = function (key, editor) {
  switch (key.name) {
    case "space":
      type(" ", editor)
      break
    case "return":
      type(editor.buffer.EOL, editor)
      break
    case "tab":
      if (editor.config.useTabs) type("\t", editor)
      else type(" ".repeat(editor.config.tabSize), editor)
      break
    case "escape":
      editor.exit()
      process.exit(0)
    default:
    //console.log(key)
  }
}
