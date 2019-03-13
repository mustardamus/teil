const { isObject, isFunction, isArray, merge } = require('lodash')

const validVerbs = [
  'CHECKOUT',
  'COPY',
  'DELETE',
  'GET',
  'HEAD',
  'LOCK',
  'MERGE',
  'MKACTIVITY',
  'MKCOL',
  'MOVE',
  'M-SEARCH',
  'NOTIFY',
  'OPTIONS',
  'PATCH',
  'POST',
  'PURGE',
  'PUT',
  'REPORT',
  'SEARCH',
  'SUBSCRIBE',
  'TRACE',
  'UNLOCK',
  'UNSUBSCRIBE'
]

const extractVerbAndRoute = verbWithRoute => {
  const split = verbWithRoute.split(' ')
  return { verb: split[0], route: split[1] || false }
}

const buildFullRoute = (baseUrl, route) => {
  if (baseUrl.charAt(0) !== '/') {
    baseUrl = `/${baseUrl}`
  }

  if (route === '/') {
    route = ''
  } else if (route.charAt(0) !== '/') {
    route = `/${route}`
  }

  return baseUrl + route
}

module.exports = (controller, initialOptions) => {
  try {
    if (!isObject(controller)) {
      throw new Error(`Should export an object`)
    }

    const parsedRoutes = []
    const controllerKeys = Object.keys(controller)
    const fullRoutes = controllerKeys.filter(key => key !== 'options')
    const controllerOptions = merge(initialOptions, controller.options)

    fullRoutes.forEach(verbWithRoute => {
      const { verb, route } = extractVerbAndRoute(verbWithRoute)

      if (!validVerbs.includes(verb)) {
        throw Error(`Unknown HTTP verb '${verb}'`)
      }

      if (route === false) {
        throw Error(`Missing route for HTTP verb '${verb}'`)
      }

      const routeObj = controller[verbWithRoute]
      const fullRoute = buildFullRoute(controllerOptions.url, route)

      if (isFunction(routeObj)) {
        parsedRoutes.push({
          verb,
          route: fullRoute,
          options: {},
          handlers: [routeObj]
        })
      }

      if (isArray(routeObj)) {
        let options = {}

        if (isObject(routeObj[0]) && !isFunction(routeObj[0])) {
          options = routeObj[0]
        }

        parsedRoutes.push({
          verb,
          route: fullRoute,
          options,
          handlers: routeObj.filter(routeFunc => isFunction(routeFunc))
        })
      }
    })

    return parsedRoutes
  } catch (err) {
    throw err
  }
}
