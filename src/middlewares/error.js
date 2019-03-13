const StackTracey = require('stacktracey')
const eventBus = require('../core/event-bus')

module.exports = (err, req, res, next) => {
  if (!err) {
    return next()
  }

  const prettyStack = new StackTracey(err).pretty

  if (!res.headersSent) {
    // TODO handle differently in production
    res.status(500).send(`<pre>${prettyStack}</pre>`) // this goes to the browser
  }

  eventBus.emit('middleware:error', { req, err, prettyStack })
  // next(prettyStack) // and this goes to the console
}
