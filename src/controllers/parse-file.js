const { existsSync } = require('fs')
const importFresh = require('import-fresh')
const urlFromFilepath = require('./url-from-filepath')
const parseObject = require('./parse-object')

module.exports = (filePath, options = {}) => {
  if (!existsSync(filePath)) {
    throw new Error(`Does not exist`)
  }

  const controller = importFresh(filePath)
  let initialOptions

  if (!controller.options || (controller.options && !controller.options.url)) {
    initialOptions = {
      url: urlFromFilepath(filePath, options.controllersGlob)
    }
  }

  return parseObject(controller, initialOptions)
}
