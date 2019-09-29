const eventBus = require('../core/event-bus')
const createContext = require('../context/create-context')
const customContexts = require('../context/custom-contexts')

module.exports = (handler, route) => {
  const orgHandler = handler.bind({})

  return async (req, res, next) => {
    try {
      const ctx = createContext({
        route,
        req,
        res,
        next,
        customContexts: customContexts()
      })
      const args = orgHandler.length === 1 ? [ctx] : [req, res, next]
      const handler = await orgHandler.apply(this, args)

      return handler
    } catch (err) {
      eventBus.emit('middleware:error', { req, err })
      next(err) // pass the first catched error on to the error handling middleware
    }
  }
}
