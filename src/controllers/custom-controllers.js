const customControllers = []

module.exports = customController => {
  if (customController) {
    customControllers.push(customController)
  }

  return customControllers
}
