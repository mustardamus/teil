const handlerWrapper = require('./handler-wrapper')
const middlewareError = require('../middlewares/error')
const middlewareLog = require('../middlewares/log')

module.exports = routes => {
  return routes.map(route => {
    route.handlers = route.handlers.map(handler => {
      return handlerWrapper(handler, route)
    })

    route.handlers.unshift(middlewareLog)
    route.handlers.push(middlewareError)

    return route
  })
}
