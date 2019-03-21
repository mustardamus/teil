const routerReplace = require('../../src/core/replace-router')

describe('Core - Replace Router', () => {
  it('should replace the router handler in the express instance', () => {
    const appMock = {
      _router: {
        stack: [
          { name: 'query', regexp: /^\/?(?=\/|$)/i, handle: 'query handle' },
          {
            name: 'expressInit',
            regexp: /^\/?(?=\/|$)/i,
            handle: 'expressInit handle'
          },
          {
            name: 'router',
            regexp: /^\/api\/?(?=\/|$)/i,
            handle: 'router handle'
          }
        ]
      }
    }

    routerReplace(appMock, 'new router', '/api')

    expect(appMock._router.stack[0].name).toBe('query')
    expect(appMock._router.stack[1].handle).toBe('expressInit handle')
    expect(appMock._router.stack[2].handle).toBe('new router')
  })
})
