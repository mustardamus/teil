const log = require('consola')
const chalk = require('chalk')
const ttyTable = require('tty-table')
const eventBus = require('./event-bus')
const parseFile = require('../controllers/parse-file')

module.exports = () => {
  eventBus.on('error', err => {
    log.error(err)
  })

  eventBus.on('server:started', ({ options }) => {
    log
      .withScope('Server')
      .success(`Server started on ${options.host}:${options.port}`)

    log
      .withScope('Server')
      .success(
        `Serving statc files from ${options.staticDir} on ${
          options.staticEndpoint
        }`
      )

    log
      .withScope('Server')
      .info('Express Settings', JSON.stringify(options.expressSettings))
  })

  eventBus.on('server:error', err => {
    log.withScope('Server').error(err)
  })

  eventBus.on('server:restart', () => {
    log.withScope('Server').success('Restarting server...')
  })

  eventBus.on('controller:changed', ({ filePath }) => {
    const controller = parseFile(filePath)
    const trimmedPath = filePath.replace(`${process.cwd()}/`, '')
    const routes = controller.map(
      route => `${chalk.green(route.verb)} ${chalk.yellow(route.route)}`
    )

    log.withScope(trimmedPath).success(routes.join(' | '))
  })

  eventBus.on('middleware:log', req => {
    log.withScope('Request').info(req.route.path)
  })

  eventBus.on('router:initial-build', routes => {
    const header3 = [
      { value: 'verb', headerAlign: 'left' },
      { value: 'url', headerAlign: 'left' }
    ]

    const opts = {
      align: 'left'
    }
    const data = routes.map(route => [route.verb, route.route])

    const t3 = ttyTable(header3, data, opts)
    log.withScope('Available Routes').info(t3.render())
  })
}
