const StackTracey = require('stacktracey')

module.exports = (err, req, res, next) => {
  if (!err) {
    return next()
  }

  const prettyStack = new StackTracey(err).pretty

  if (!res.headersSent) {
    // TODO handle differently in production
    res.status(500).send(prettyStack) // this goes to the browser
  }

  // next(prettyStack) // and this would go to the console
  // but we have async logging in controllers/handler-wrapper.js
}
