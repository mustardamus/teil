const eventBus = require('../core/event-bus')

module.exports = (req, res, next) => {
  next()
  eventBus.emit('middleware:log', req)
}
