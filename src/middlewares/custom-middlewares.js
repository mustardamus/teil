const customMiddlewares = []

module.exports = customMiddleware => {
  if (customMiddleware) {
    customMiddlewares.push(customMiddleware)
  }

  return customMiddlewares
}
