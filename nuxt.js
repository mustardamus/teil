const { join } = require('path')
const teil = require('./src/teil')

module.exports = async function(moduleOptions) {
  const configPath = join(__dirname, 'example/teil.config.js')
  const app = await teil.start(configPath)

  this.addServerMiddleware({ path: '/', handler: app._router })
  console.log('Teil initialized')
}
