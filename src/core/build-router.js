const express = require('express')
const globby = require('globby')
const { isFunction } = require('lodash')
const eventBus = require('../core/event-bus')
const parseControllerFile = require('../controllers/parse-file')
const parseControllerObject = require('../controllers/parse-object')
const extendControllerHandlers = require('../controllers/extend-handlers')
const customControllers = require('../controllers/custom-controllers')

let isInitialBuild = true

module.exports = controllersGlob => {
  try {
    const router = express.Router()
    const controllerPaths = globby.sync(controllersGlob)
    const routes = []

    controllerPaths.forEach(controllerPath => {
      const rawRoutes = parseControllerFile(controllerPath)
      routes.push(...rawRoutes)
    })

    customControllers().forEach(customController => {
      const rawRoutes = parseControllerObject(customController)
      routes.push(...rawRoutes)
    })

    const extendedRoutes = extendControllerHandlers(routes)

    extendedRoutes.forEach(route => {
      const routerFunc = router[route.verb.toLowerCase()]

      if (!isFunction(routerFunc)) {
        throw Error(`Can not find '${route.verb}' method in Express router`)
      }

      routerFunc.apply(router, [route.route, route.handlers])
    })

    if (isInitialBuild) {
      isInitialBuild = false
      eventBus.emit('router:initial-build', extendedRoutes)
    }

    return router
  } catch (err) {
    eventBus.emit('server:error', err)
  }
}
