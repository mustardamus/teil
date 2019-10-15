const { extend, isObject, isFunction } = require('lodash')
const customContexts = require('./custom-contexts')

module.exports = ({ route, req, res, next }) => {
  const context = {}

  if (route && route.options) {
    extend(context, { options: route.options })
  }

  if (req) {
    extend(context, {
      req,
      app: req.app,
      body: req.body,
      cookies: req.cookies,
      params: req.params,
      query: req.query,
      session: req.session
    })
  }

  if (res) {
    extend(context, {
      res,
      appendHeader: res.append && res.append.bind(res),
      setCookie: res.cookie && res.cookie.bind(res),
      clearCookie: res.clearCookie && res.clearCookie.bind(res),
      download: res.download && res.download.bind(res),
      getHeader: res.get && res.get.bind(res),
      json: res.json && res.json.bind(res),
      jsonp: res.jsonp && res.jsonp.bind(res),
      redirect: res.redirect && res.redirect.bind(res),
      send: res.send && res.send.bind(res),
      sendFile: res.sendFile && res.sendFile.bind(res),
      sendStatus: res.sendStatus && res.sendStatus.bind(res),
      setHeader: res.set && res.set.bind(res),
      status: res.status && res.status.bind(res)
    })
  }

  if (next) {
    extend(context, { next })
  }

  customContexts().forEach(customContext => {
    if (isFunction(customContext)) {
      customContext(context)
    } else if (isObject(customContext)) {
      extend(context, customContext)
    } else {
      const err = new Error('Custom Context must be Object or Function')
      throw err
    }
  })

  return context
}
