const { join } = require('path')
const { merge } = require('lodash')
const { existsSync } = require('fs')
const importFresh = require('import-fresh')

const cwd = process.cwd()
const cwdConfigPath = join(cwd, 'teil.config.js')
const jsGlob = '!(*test|*spec|*draft).js'
const isProduction = process.env.NODE_ENV === 'production'

module.exports = (configPath = cwdConfigPath, customOptions = {}) => {
  let configOptions = {}

  if (configPath.length && existsSync(configPath)) {
    configOptions = importFresh(configPath)
  }

  const srcDir = configOptions.srcDir || cwd

  const defaultOptions = {
    srcDir,
    isDev: !isProduction,

    host: 'localhost',
    port: 3333,

    apiEndpoint: '/api',

    staticEndpoint: '/',
    staticDir: join(srcDir, 'static'),
    staticOptions: {},

    expressSettings: {},

    controllersGlob: join(srcDir, 'controllers/**/', jsGlob),

    plugins: []
  }

  return merge({}, defaultOptions, configOptions, customOptions)
}
