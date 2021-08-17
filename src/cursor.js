class Cursor {
  constructor({ row, column }) {
    this.row = row || 0
    this.column = column || 0
  }
}

module.exports = Cursor
