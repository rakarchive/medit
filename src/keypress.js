module.exports = function (str, key) {
  if (str === "q") {
    this.exit()
    process.exit(0)
  }

  console.log(key)
  return false
}
