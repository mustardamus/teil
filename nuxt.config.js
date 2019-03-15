const { join } = require('path')

module.exports = {
  srcDir: 'docs',
  modules: ['@nuxtjs/axios', join(__dirname, 'nuxt.js')],
  css: ['bulma/css/bulma.css']
}
