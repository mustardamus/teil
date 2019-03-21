const { resolve } = require('path')
const customContexts = require('../context/custom-contexts')
const customControllers = require('../controllers/custom-controllers')
const customMiddlewares = require('../middlewares/custom-middlewares')
const sendExtend = require('./send-extend')
const schemaValidation = require('./schema-validation')
// const adminInterface = require('./admin-interface/admin-interface')

module.exports = options => {
  const tools = {
    extendContext: customContexts,
    addController: customControllers,
    addMiddleware: customMiddlewares
  }

  sendExtend(tools)
  schemaValidation(tools)
  // adminInterface(tools)

  options.plugins.forEach(plugin => {
    if (plugin.charAt(0) === '.') {
      plugin = resolve(options.srcDir, plugin)
    }

    require(plugin)(tools)
  })
}
