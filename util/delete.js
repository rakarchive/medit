module.exports = function (cursor, editor) {
  const { buffer } = editor
  const { row, column } = cursor

  if (column === buffer.lines[row].length) {
    if (row !== buffer.lines.length - 1) {
      const lineContent = buffer.lines.splice(row + 1, 1)[0]
      buffer.lines[row] += lineContent

      return 2
    }
  } else {
    const lineContent = buffer.lines[row]
    const front = lineContent.slice(0, column)
    const back = lineContent.slice(column + 1)

    buffer.lines[row] = front + back

    return 2
  }

  return 0
}
