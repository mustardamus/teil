const { join } = require('path')

module.exports = {
  srcDir: 'docs',
  modules: [join(__dirname, 'nuxt.js')],
  css: ['bulma/css/bulma.css']
}
