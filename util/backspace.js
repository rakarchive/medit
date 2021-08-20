module.exports = function (cursor, editor) {
  const { buffer } = editor
  const { row, column } = cursor
  let newCursor

  if (column === 0) {
    if (row) {
      const lineContent = buffer.lines.splice(row, 1)[0]

      newCursor = { row: row - 1, column: buffer.lines[row - 1].length }

      buffer.lines[row - 1] += lineContent

      return newCursor
    }
  } else {
    const lineContent = buffer.lines[row]
    const front = lineContent.slice(0, column - 1)
    const back = lineContent.slice(column)

    buffer.lines[row] = front + back

    return { row: row, column: column - 1 }
  }
}
