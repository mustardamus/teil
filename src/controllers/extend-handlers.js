const handlerWrapper = require('./handler-wrapper')
const middlewareError = require('../middlewares/error')
const middlewareLog = require('../middlewares/log')
const customMiddlewares = require('../middlewares/custom-middlewares')

module.exports = routes => {
  return routes.map(route => {
    const handlers = [
      middlewareLog,
      ...customMiddlewares(),
      ...route.handlers,
      middlewareError
    ]

    route.handlers = handlers.map(handler => handlerWrapper(handler, route))

    return route
  })
}
