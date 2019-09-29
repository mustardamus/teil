const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const logger = require('./core/logger')
const eventBus = require('./core/event-bus')
const buildOptions = require('./core/build-options')
const watchControllers = require('./core/watch-controllers')
const buildRouter = require('./core/build-router')
const replaceRouter = require('./core/replace-router')
const plugins = require('./plugins')
// const customControllers = require('./controllers/custom-controllers')

let app, server, watcher

module.exports = {
  async start(configPath = '', customOptions = {}, startServer) {
    try {
      eventBus._events = {} // TODO event bus reset via function

      logger()

      process.on('unhandledRejection', err => {
        eventBus.emit('error', err)
      })

      const options = buildOptions(configPath, customOptions)

      plugins(options)
      watcher = watchControllers(options)

      app = express()
      const router = buildRouter(options)
      const staticMiddleware = express.static(
        options.staticDir,
        options.staticOptions
      )

      app.use(helmet()) // TODO options
      app.use(bodyParser.json()) // TODO options
      app.use(options.staticEndpoint, staticMiddleware)
      app.use(options.apiEndpoint, router)

      Object.keys(options.expressSettings).forEach(settingName => {
        app.set(settingName, options.expressSettings[settingName])
      })

      // TODO for all controllers
      /* customControllers().forEach(({ options }) => {
        if (options.staticDir) {
          const staticMiddleware = express.static(
            options.staticDir,
            options.staticOptions
          )

          app.use(`/${options.url}`, staticMiddleware)
        }
      })*/

      if (startServer) {
        server = app.listen(options.port, options.host, () => {
          eventBus.emit('server:started', { app, server, options })
        })
      }

      eventBus.on('controller:changed', () => {
        const router = buildRouter(options)

        replaceRouter(app, router, options.apiEndpoint)
      })

      return Promise.resolve(app)
    } catch (err) {
      eventBus.emit('server:error', err)
    }
  },

  stop() {
    if (server) {
      server.close()
    }

    if (watcher) {
      watcher.close()
    }

    eventBus.emit('server:closed')
  }
}
