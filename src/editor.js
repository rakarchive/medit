const readline = require("readline")
const { EOL } = require("os")

const TextBuffer = require("./buffer")
const Cursor = require("./cursor")

const ALTERNATE_BUFFER = Buffer.from([
  0x1b, 0x5b, 0x3f, 0x31, 0x30, 0x34, 0x39, 0x68,
])
const MAIN_BUFFER = Buffer.from([
  0x1b, 0x5b, 0x3f, 0x31, 0x30, 0x34, 0x39, 0x6c,
])

class Editor {
  buffer
  cursor
  config
  #keypress = () => false
  #renderers = []
  /*
   * Render stuff
   * Main method
   * Keypress listener
   */
  constructor(state) {
    this.buffer = new TextBuffer(state)
    this.cursor = new Cursor(state.cursor)
    this.config = state.config
  }

  /*
   * Add method to use while
   * rendering the buffer
   *
   * Calling:
   * method(editor)
   */
  use(method) {
    this.#renderers.push(method)
  }

  /*
   * Called when the buffer
   * is being rendered
   *
   * Calls all render
   * methods sequentially
   */
  render() {
    let view = ""
    for (const method of this.#renderers) {
      view = method(view, this)
    }

    /*
     * Hide the cursor and
     * move it to home (0,0)
     *
     * This prevents cursor
     * flashing during rendering
     *
     * Seperating the two
     * escapes helps in
     * hiding the cursor
     * before moving it to
     * home
     */
    process.stdout.write("\u001b[?25l")
    process.stdout.write("\u001b[H")

    process.stdout.write(view)

    readline.cursorTo(process.stdout, this.cursor.column, this.cursor.row)

    /*
     * Show the cursor
     * after moving it to
     * the editor's cursor
     */
    process.stdout.write("\u001b[?25h")
  }

  /*
   * Main method
   * Editor starts listening
   * to keypresses and other
   * editor stuff
   */

  start() {
    this.enter()
    /*
     * Listener wrappers
     * Wrapper functions to
     * wrap event listeners
     * to keep "this"
     * reference intact
     */
    const onKeypress = (str, key) => {
      this.keypressed(str, key)
    }

    const onResize = () => {
      this.render()
    }
    /*
     * Event Listeners
     * These listeners form
     * the brain of the
     * editor. It calls
     * required commands on
     * keypresses and
     * terminal resizing
     */
    process.stdin.on("keypress", onKeypress)
    process.stdout.on("resize", onResize)
  }

  /*
   * Helper main methods
   * These methods initialize
   * and clean up stuff
   * before and after the
   * main method
   */

  enter() {
    process.stdout.write(ALTERNATE_BUFFER)
    process.stdout.write("\u001b[2J\u001b[H")

    readline.emitKeypressEvents(process.stdin)

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true)
    } else {
      process.stdout.write(MAIN_BUFFER)
      console.log("Terminal is not a TTY.")
      process.exit(0)
    }

    this.render()
  }

  exit() {
    process.stdin.setRawMode(false)
    process.stdout.write(MAIN_BUFFER)
  }

  /*
   * Keypress functions
   * Keypress listeners,
   * wrappers, and setters
   */

  keypressed(str, key) {
    const render = this.#keypress(str, key)

    if (render) this.render()
  }

  keypress(func) {
    this.#keypress = func
  }
}

module.exports = Editor
