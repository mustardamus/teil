const { join } = require('path')
const { merge } = require('lodash')
const teil = require('./src/teil')

module.exports = async function(moduleOptions) {
  const { rootDir, srcDir, dev } = this.options
  const configPath = join(rootDir, 'teil.config.js')
  const customOptions = merge({ srcDir, isDev: dev }, moduleOptions)
  const app = await teil.start(configPath, customOptions)

  if (app) {
    this.addServerMiddleware({ path: '/', handler: app._router })
  }

  /* this.nuxt.hook('build:done', () => {
    teil.stop()
  })*/
}
