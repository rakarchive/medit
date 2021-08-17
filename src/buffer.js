const { readFileSync: read } = require("fs")

class TextBuffer {
  constructor({ text, eol }) {
    this.EOL = eol
    this.lines = text.split(this.EOL)
  }

  insert(line, index) {
    if (index)
      this.lines.splice(index, 0, line)
    else
      this.lines.push(line)
  }

  read(path) {
    const file = read(path).toString()
    this.lines = file.split(this.EOL)
  }
}

module.exports = TextBuffer
