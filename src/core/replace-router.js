module.exports = (app, router, apiEndpoint) => {
  app._router.stack.forEach(route => {
    if (route.name === 'router' && route.regexp.test(apiEndpoint)) {
      route.handle = router
    }
  })
}
