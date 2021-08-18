module.exports = function (str, key) {
  if (key.name === "escape") {
    this.exit()
    process.exit(0)
  }

  console.log(key)
  return false
}
