const type = require("../util/type")
const backspace = require("../util/backspace")
const deletekey = require("../util/delete")

module.exports = function (key, editor) {
  const { config, cursor, buffer } = editor

  const columns = () => buffer.lines[cursor.row].length
  const rows = () => buffer.lines.length - 1

  let render = 0

  switch (key.name) {
    /*
     * Character Keys
     */
    case "space":
      type(" ", editor)

      render = 2
      break
    case "return":
      type(editor.buffer.EOL, editor)

      render = 2
      break
    case "tab":
      if (config.useTabs) {
        type("\t", editor)
      } else {
        type(" ".repeat(config.tabSize), editor)
      }

      render = 2
      break
    /*
     * Cursor Keys
     */
    case "right":
      if (cursor.column === columns()) {
        if (cursor.row !== rows()) {
          cursor.row++
          cursor.column = 0

          render = 1
        }
      } else {
        cursor.column++
        render = 1
      }

      break
    case "left":
      if (cursor.column === 0) {
        if (cursor.row !== 0) {
          cursor.row--
          cursor.column = columns()

          render = 1
        }
      } else {
        cursor.column--
        render = 1
      }

      break
    case "up":
      if (cursor.row !== 0) {
        cursor.row--

        if (cursor.column > columns()) {
          cursor.column = columns()
        }

        render = 1
      }

      break
    case "down":
      if (cursor.row !== rows()) {
        cursor.row++

        if (cursor.column > columns()) {
          cursor.column = columns()
        }

        render = 1
      }

      break
    case "home":
      cursor.column = 0
      render = 1
      break
    case "end":
      cursor.column = columns()
      render = 1
      break
    /*
     * Deletation keys
     */
    case "backspace":
      const newCursor = backspace(cursor, editor)
      if (newCursor) {
        const { row, column } = newCursor
        cursor.row = row
        cursor.column = column
        render = 2
      }
      break
    case "delete":
      render = deletekey(cursor, editor)
      break
    /*
     * Control Keys
     */
    case "escape":
      editor.exit()
      process.exit(0)
  }

  return render
}
