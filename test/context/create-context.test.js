jest.mock('../../src/context/custom-contexts.js', () => {
  // the returning array holds all contexts by plugins, either a object or a function
  return () => [
    {
      withObject: () => 'extend with object'
    },
    context => {
      context.setContext = () => 'extend with function'
    }
  ]
})

const createContext = require('../../src/context/create-context')

describe('Context Builder', () => {
  it('should return the default context', () => {
    const context = createContext({
      route: null,
      req: null,
      res: null,
      next: null
    })

    expect(context === Object(context)).toBe(true)
  })

  it('should create shortcuts of common used request fields', () => {
    const req = {
      app: true,
      query: true,
      body: true,
      params: true,
      cookies: true
    }

    const context = createContext({
      route: null,
      req,
      res: null,
      next: null
    })

    expect(context.req).toEqual(req)
    expect(context.app).toBe(true)
    expect(context.query).toBe(true)
    expect(context.body).toBe(true)
    expect(context.params).toBe(true)
    expect(context.cookies).toBe(true)
  })

  it('should create shortcuts of common used response fields', () => {
    const res = {
      append: jest.fn(),
      cookie: jest.fn(),
      clearCookie: jest.fn(),
      download: jest.fn(),
      get: jest.fn(),
      json: jest.fn(),
      jsonp: jest.fn(),
      redirect: jest.fn(),
      send: jest.fn(),
      sendFile: jest.fn(),
      sendStatus: jest.fn(),
      set: jest.fn(),
      status: jest.fn()
    }

    const context = createContext({
      route: null,
      req: null,
      res,
      next: null
    })

    expect(typeof context.appendHeader).toBe('function')
    expect(typeof context.setCookie).toBe('function')
    expect(typeof context.clearCookie).toBe('function')
    expect(typeof context.download).toBe('function')
    expect(typeof context.getHeader).toBe('function')
    expect(typeof context.json).toBe('function')
    expect(typeof context.jsonp).toBe('function')
    expect(typeof context.redirect).toBe('function')
    expect(typeof context.send).toBe('function')
    expect(typeof context.sendFile).toBe('function')
    expect(typeof context.sendStatus).toBe('function')
    expect(typeof context.setHeader).toBe('function')
    expect(typeof context.status).toBe('function')
  })

  it('should create a shortcut to the next function', () => {
    const context = createContext({
      route: null,
      req: null,
      res: null,
      next: true
    })

    expect(context.next).toBe(true)
  })

  it('should extend with custom contexts', () => {
    const context = createContext({
      route: null,
      req: null,
      res: null,
      next: null
    })

    expect(context.withObject()).toBe('extend with object')
    expect(context.setContext()).toBe('extend with function')
  })

  /*
  it('should extend the context with an object defined in the options', () => {
    const ctx = { org: true }
    const options = {
      extendContext: {
        extended: true
      }
    }

    return contextBuilder(ctx, options).then(context => {
      expect(context.org).toBe(true)
      expect(context.extended).toBe(true)
    })
  })*/
})
