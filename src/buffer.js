const { readFileSync: read } = require("fs")

class TextBuffer {
  constructor({ text, eol }) {
    this.EOL = eol
    this.lines = text.split(this.EOL)
  }

  insertString(string, lineNo, index) {
    const line = this.lines[lineNo]
    const first = line.substring(0, index)
    const last = line.substring(index)

    if (string.includes(this.EOL)) {
      const lines = (first + string + last).split(this.EOL)
      const length = lines.length

      this.lines[lineNo] = lines[0]

      for (let i = 1; i < length; i++) {
        this.insertLine(lines[i], lineNo + i)
      }
    } else {
      this.lines[lineNo] = first + string + last
    }
  }

  insertLine(line, index) {
    if (index) this.lines.splice(index, 0, line)
    else this.lines.push(line)
  }

  read(path) {
    const file = read(path).toString()
    this.lines = file.split(this.EOL)
  }
}

module.exports = TextBuffer
