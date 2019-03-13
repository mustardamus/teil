const { join } = require('path')
const { merge } = require('lodash')
const { existsSync } = require('fs')
const importFresh = require('import-fresh')

const cwd = process.cwd()
const cwdConfigPath = join(cwd, 'teil.config.js')
const jsGlob = '!(*test|*spec|*draft).js'
const isProduction = process.env.NODE_ENV === 'production'

module.exports = (configPath = cwdConfigPath, customOptions = {}) => {
  const defaultOptions = {
    srcDir: cwd,
    isDev: !isProduction,

    host: 'localhost',
    port: 3333,

    apiEndpoint: '/',

    staticEndpoint: '/',
    staticDir: join(cwd, 'static'),
    staticOptions: {},

    expressSettings: {},

    controllersGlob: join(cwd, 'controllers/**/', jsGlob)
  }

  let configOptions = {}

  if (configPath.length && existsSync(configPath)) {
    configOptions = importFresh(configPath)
  }

  return merge({}, defaultOptions, configOptions, customOptions)
}
