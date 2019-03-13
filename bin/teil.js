#!/usr/bin/env node
const { join } = require('path')
const chokidar = require('chokidar')
const eventBus = require('../src/core/event-bus')
const teil = require('../src/teil')

const cwd = process.cwd()
const cwdConfigPath = join(cwd, 'teil.config.js')
const watcher = chokidar.watch(cwdConfigPath, { ignoreInitial: true })

teil.start(cwdConfigPath)

watcher.on('change', () => {
  eventBus.emit('server:restart')
  teil.stop()
  teil.start()
})
