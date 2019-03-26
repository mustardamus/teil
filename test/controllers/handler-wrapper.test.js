const handlerWrapper = require('../../src/controllers/handler-wrapper')

describe('Controllers Handler Wrapper', () => {
  const req = {
    app: true,
    body: true,
    cookies: true,
    params: true,
    query: true
  }
  const res = {
    append: jest.fn(() => 'append'),
    cookie: jest.fn(() => 'cookie'),
    clearCookie: jest.fn(() => 'clearCookie'),
    download: jest.fn(() => 'download'),
    get: jest.fn(() => 'get'),
    json: jest.fn(() => 'json'),
    jsonp: jest.fn(() => 'jsonp'),
    redirect: jest.fn(() => 'redirect'),
    send: jest.fn(() => 'send'),
    sendFile: jest.fn(() => 'sendFile'),
    sendStatus: jest.fn(() => 'sendStatus'),
    set: jest.fn(() => 'set'),
    status: jest.fn(() => 'status')
  }
  const next = jest.fn()

  test('it should wrap normal middleware method style', () => {
    const handler = jest.fn((req, res, next) => {
      return { req, res, next }
    })
    const wrapped = handlerWrapper(handler)

    expect(typeof wrapped).toBe('function')
    expect(wrapped('req', 'res', 'next')).toEqual({
      req: 'req',
      res: 'res',
      next: 'next'
    })
  })

  test('it should wrap destructed middleware method style', () => {
    const handler = jest.fn(context => context)
    const wrapped = handlerWrapper(handler)
    const context = wrapped(req, res, next)

    expect(context.res).toEqual(res)
    expect(context.req).toEqual(req)
    expect(context.next).toEqual(next)
    expect(context.appendHeader()).toBe('append')
    expect(context.setCookie()).toBe('cookie')
    expect(context.clearCookie()).toBe('clearCookie')
    expect(context.download()).toBe('download')
    expect(context.getHeader()).toBe('get')
    expect(context.json()).toBe('json')
    expect(context.jsonp()).toBe('jsonp')
    expect(context.redirect()).toBe('redirect')
    expect(context.send()).toBe('send')
    expect(context.sendFile()).toBe('sendFile')
    expect(context.sendStatus()).toBe('sendStatus')
    expect(context.setHeader()).toBe('set')
    expect(context.status()).toBe('status')
  })

  test('it should wrap promises with normal middleware style', () => {
    const handler = jest.fn(async (req, res, next) => {
      return { req, res, next }
    })
    const wrapped = handlerWrapper(handler)

    return wrapped('req', 'res', 'next').then(context => {
      expect(context).toEqual({ req: 'req', res: 'res', next: 'next' })
      return
    })
  })

  test('it should wrap promises with destructed middleware style', () => {
    const handler = jest.fn(async context => context)
    const wrapped = handlerWrapper(handler)

    return wrapped(req, res, next).then(context => {
      expect(context.res).toEqual(res)
      expect(context.req).toEqual(req)
      expect(context.next).toEqual(next)
      return
    })
  })
})
