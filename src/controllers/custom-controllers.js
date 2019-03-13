const customControllers = []

module.exports = customController => {
  if (customController) {
    customControllers.push(customController)
    console.log('customs', customController)
  }

  return customControllers
}
