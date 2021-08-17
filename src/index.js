const Editor = require("./editor")
const keypress = require("./keypress")

const editor = new Editor({
  text: "Hello, World!",
  eol: "\n",
  cursor: {
    row: 0,
    column: 0
  },
  config: {
    tabSize: 2
  }
})

editor.keypress(keypress)

/*
* Renderer functions:

editor.use(section)
editor.use(tabToSpace)
editor.use(cursor)
*/

editor.start()
