const chokidar = require('chokidar')
const eventBus = require('./event-bus')

module.exports = ({ controllersGlob }) => {
  const opts = { ignoreInitial: true }
  const watcher = chokidar.watch(controllersGlob, opts)

  watcher.on('all', (eventName, filePath) => {
    eventBus.emit('controller:changed', {
      eventName,
      filePath,
      controllersGlob
    })
  })

  return watcher
}
