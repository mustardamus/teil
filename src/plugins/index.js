const { resolve } = require('path')
const { existsSync } = require('fs')
const customContexts = require('../context/custom-contexts')
const customControllers = require('../controllers/custom-controllers')
const customMiddlewares = require('../middlewares/custom-middlewares')
const sendExtend = require('./send-extend')
const schemaValidation = require('./schema-validation')
const adminInterface = require('./admin-interface/admin-interface')

module.exports = options => {
  const tools = {
    extendContext: customContexts,
    addController: customControllers,
    addMiddleware: customMiddlewares,
    options
  }

  sendExtend(tools)
  schemaValidation(tools)
  adminInterface(tools)

  options.plugins.forEach(plugin => {
    if (plugin.charAt(0) !== '/') {
      plugin = resolve(options.srcDir, plugin)
    }

    if (existsSync(plugin)) {
      const pluginFn = require(plugin)
      // TODO check if its a function
      pluginFn(tools)
    } else {
      const err = new Error(`Can not find plugin ${plugin}`)
      throw err
    }
  })
}
