module.exports = function (sequence, editor) {
  editor.buffer.insertString(sequence, editor.cursor.row, editor.cursor.column)
  if (sequence === editor.buffer.EOL) {
    editor.cursor.row++
    editor.cursor.column = 0
  } else {
    editor.cursor.column += sequence.length
  }
  //console.log(editor.buffer)
}
