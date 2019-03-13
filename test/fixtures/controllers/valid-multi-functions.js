module.exports = {
  'GET /': [
    () => {
      return 'middleware'
    },

    () => {
      return 'handler'
    }
  ]
}
