const customContexts = []

module.exports = customContext => {
  if (customContext) {
    customContexts.push(customContext)
  }

  return customContexts
}
