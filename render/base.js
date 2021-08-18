module.exports = function (view, editor) {
  console.log("\u001b[2J")
  return editor.buffer.lines.join(editor.buffer.EOL)
}
