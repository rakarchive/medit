const HIDE_CURSOR = "\u001b[?25l"
const SHOW_CURSOR = "\u001b[?25h"

module.exports = function (view, editor) {
  const columns = process.stdout.columns
  return editor.buffer.lines.reduce(
    (accumulator, item) =>
      accumulator +
      (accumulator ? editor.buffer.EOL : "") +
      item +
      " ".repeat(columns - item.length),
    ""
  )
}
