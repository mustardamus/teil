const { join } = require('path')
const globby = require('globby')
const parseFile = require('../../controllers/parse-file')

module.exports = ({ addController, options }) => {
  addController({
    options: {
      url: 'admin',
      staticDir: join(__dirname, 'static')
    },

    async 'GET /routes'({ send }) {
      const controllerPaths = await globby(options.controllersGlob)
      const routes = controllerPaths
        .map(controllerPath => {
          return {
            controllerPath,
            routes: parseFile(controllerPath, options)
          }
        })
        .map(controller => {
          controller.routes.map(route => {
            route.handlers = route.handlers.map(handler => handler.toString())
          })

          return controller
        })

      send(routes)
    },

    'POST /'({ send }) {
      send('owwwww yeahhhhh')
    }
  })
}
