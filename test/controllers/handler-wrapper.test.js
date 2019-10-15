const handlerWrapper = require('../../src/controllers/handler-wrapper')

describe('Controllers Handler Wrapper', () => {
  test('it should wrap normal middleware method in a promise', () => {
    const handler = jest.fn((req, res, next) => {
      return { req, res, next }
    })
    const wrapped = handlerWrapper(handler)

    expect(typeof wrapped).toBe('function')
    expect(wrapped.length).toBe(3)

    return wrapped('req', 'res', 'next').then(() => {
      expect(handler).toHaveBeenCalledWith('req', 'res', 'next')
      return
    })
  })

  test('it should wrap async middleware method in a promise', () => {
    const handler = jest.fn(async (req, res, next) => {
      return { req, res, next }
    })
    const wrapped = handlerWrapper(handler)

    expect(typeof wrapped).toBe('function')
    expect(wrapped.length).toBe(3)

    return wrapped('req', 'res', 'next').then(() => {
      expect(handler).toHaveBeenCalledWith('req', 'res', 'next')
      return
    })
  })

  test('it should wrap normal destructured method style in a promise', () => {
    const handler = jest.fn(context => context)
    const wrapped = handlerWrapper(handler)

    expect(typeof wrapped).toBe('function')
    expect(wrapped.length).toBe(3)

    return wrapped('req', 'res', 'next').then(() => {
      const obj = handler.mock.calls[0][0]

      expect(handler).toHaveBeenCalled()
      expect(obj.req).toBe('req')
      expect(obj.res).toBe('res')
      expect(obj.next).toBe('next')
      return
    })
  })

  test('it should wrap async destructured method style in a promise', () => {
    const handler = jest.fn(async context => await context)
    const wrapped = handlerWrapper(handler)

    expect(typeof wrapped).toBe('function')
    expect(wrapped.length).toBe(3)

    return wrapped('req', 'res', 'next').then(() => {
      const obj = handler.mock.calls[0][0]

      expect(handler).toHaveBeenCalled()
      expect(obj.req).toBe('req')
      expect(obj.res).toBe('res')
      expect(obj.next).toBe('next')
      return
    })
  })
})
