const { isFunction } = require('lodash')
const createContext = require('../context/create-context')
const customContexts = require('../context/custom-contexts')

module.exports = (handler, route) => {
  const orgHandler = handler.bind({})

  return (req, res, next) => {
    let handler

    try {
      // synchronous function errors handled with good ol try/catch
      if (orgHandler.length === 1) {
        const ctx = createContext({
          route,
          req,
          res,
          next,
          customContexts: customContexts()
        })
        handler = orgHandler(ctx)
      } else {
        handler = orgHandler(req, res, next)
      }

      if (handler && isFunction(handler.catch)) {
        // if the handler returned a promise
        // catch any error and forward it to the error handling middleware
        return handler.catch(err => next(err)) // eslint-disable-line
      }

      return handler
    } catch (err) {
      next(err) // pass the catched error on to the error handling middleware
    }
  }
}
