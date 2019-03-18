const { join } = require('path')
const optionsBuilder = require('../../src/core/build-options')

describe('Core - Build Options', () => {
  it('should return the default options', () => {
    const opt = optionsBuilder()

    expect(opt.srcDir).toBe(process.cwd())
    expect(opt.isDev).toBe(true)
    expect(opt.host).toBe('localhost')
    expect(opt.port).toBe(3333)
    expect(opt.apiEndpoint).toBe('/api')
    expect(opt.staticEndpoint).toBe('/')
    expect(opt.staticDir).toBe(join(process.cwd(), 'static'))
    expect(opt.staticOptions).toEqual({})
    expect(opt.expressSettings).toEqual({})
    expect(
      opt.controllersGlob.includes('controllers/**/!(*test|*spec|*draft).js')
    ).toBe(true)
  })

  it('should overwrite the default options with a config file', () => {
    const configPath = join(__dirname, '../../example/teil.config.js')
    const opt = optionsBuilder(configPath)

    expect(opt.host).toBe('0.0.0.0')
  })

  it('should overwrite the default and config options with passed in custom options', () => {
    const configPath = join(__dirname, '../../example/teil.config.js')
    const opt = optionsBuilder(configPath, { host: '127.0.0.1' })

    expect(opt.host).toBe('127.0.0.1')
  })
})
