const { join } = require('path')
const { isFunction } = require('lodash')
const parser = require('../../src/controllers/parser')

const fixturesDir = join(__dirname, '../fixtures/controllers')

describe('Controllers Parser', () => {
  it('should throw an error if file dont exist', () => {
    expect(() => parser('/non-existent.js')).toThrow('Does not exist')
  })

  it('should throw an error if anything is wrong with the code', () => {
    const filePath = join(fixturesDir, 'invalid-syntax-error.js')
    expect(() => parser(filePath)).toThrow()
  })

  it('should throw an error if it doesnt export an object', () => {
    const filePath = join(fixturesDir, 'invalid-export-no-object.js')
    expect(() => parser(filePath)).toThrow('Should export an object')
  })

  it('should throw an error if it has a invalid http verb', () => {
    const filePath = join(fixturesDir, 'invalid-http-verb.js')
    expect(() => parser(filePath)).toThrow(`Unknown HTTP verb 'NOPE'`)
  })

  it('should throw an error if it lacks of a route', () => {
    const filePath = join(fixturesDir, 'invalid-no-route.js')
    expect(() => parser(filePath)).toThrow(`Missing route for HTTP verb 'GET'`)
  })

  it('should parse a single function route', () => {
    const filePath = join(fixturesDir, 'valid-single-function.js')
    const routes = parser(filePath)

    expect(routes).toHaveLength(1)
    expect(routes[0].verb).toBe('GET')
    expect(routes[0].route).toBe('/valid-single-function')
    expect(routes[0].options).toEqual({})
    expect(routes[0].handlers).toHaveLength(1)
    expect(isFunction(routes[0].handlers[0])).toBe(true)
    expect(routes[0].handlers[0]()).toBe(true)
  })

  it('should parse a multi functions route', () => {
    const filePath = join(fixturesDir, 'valid-multi-functions.js')
    const routes = parser(filePath)

    expect(routes).toHaveLength(1)
    expect(routes[0].verb).toBe('GET')
    expect(routes[0].route).toBe('/valid-multi-functions')
    expect(routes[0].options).toEqual({})
    expect(routes[0].handlers).toHaveLength(2)
    expect(isFunction(routes[0].handlers[0])).toBe(true)
    expect(isFunction(routes[0].handlers[1])).toBe(true)
    expect(routes[0].handlers[0]()).toBe('middleware')
    expect(routes[0].handlers[1]()).toBe('handler')
  })

  it('should parse a route with options', () => {
    const filePath = join(fixturesDir, 'valid-options.js')
    const routes = parser(filePath)

    expect(routes).toHaveLength(1)
    expect(routes[0].options).toEqual({ body: true, query: true })
    expect(routes[0].handlers).toHaveLength(1)
  })

  it('should overwrite the base url with options', () => {
    const filePath = join(fixturesDir, 'valid-custom-base-url.js')
    const routes = parser(filePath)

    expect(routes).toHaveLength(1)
    expect(routes[0].verb).toBe('GET')
    expect(routes[0].route).toBe('/some/custom/route/item')
  })
})
