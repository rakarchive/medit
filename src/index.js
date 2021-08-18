const Editor = require("./editor")
const keypress = require("./keypress")
//const keypress = require("../keypress/keypress")

/*
 * Renderers
 * Functions to render the
 * TextBuffer
 */
const base = require("../render/base")

const editor = new Editor({
  text: "Hello, World!",
  eol: "\n",
  cursor: {
    row: 0,
    column: 0,
  },
  config: {
    useTabs: false,
    tabSize: 2,
  },
})

editor.keypress(keypress)

/*
* Renderer functions:

editor.use(section)
editor.use(tabToSpace)
editor.use(cursor)
*/
editor.use(base)

editor.start()
