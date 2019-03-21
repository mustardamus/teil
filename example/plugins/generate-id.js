module.exports = ({ extendContext }) => {
  extendContext({
    generateId() {
      return Math.random()
        .toString(36)
        .substring(7)
    }
  })
}
