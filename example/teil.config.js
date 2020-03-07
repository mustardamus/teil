const { version } = require('../package.json')

module.exports = {
  srcDir: __dirname,
  apiEndpoint: '/api',
  host: '0.0.0.0',
  expressSettings: {
    'trust proxy': false
  },
  controllersGlob: `${__dirname}/controllers/**/!(*test|*spec|*draft).js`,
  plugins: ['./plugins/generate-id.js'],

  extendRoutes: routes => {
    routes.push({
      verb: 'GET',
      route: '/version',
      options: {},
      handlers: [
        (req, res) => {
          res.send(version)
        }
      ]
    })

    return routes
  }
}
