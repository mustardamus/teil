const { join } = require('path')
const axios = require('axios') // eslint-disable-line
const teil = require('../src/teil')

const request = axios.create({ baseURL: 'http://localhost:3333' })

describe('Teil Example', () => {
  beforeAll(async () => {
    const configPath = join(__dirname, '../example/teil.config.js')
    return teil.start(configPath, true)
  })

  afterAll(async () => {
    return teil.stop()
  })

  it('should serve the index.html as static file', async () => {
    const { data } = await request.get('/')
    expect(data.includes('<title>Teil')).toBe(true)
  })

  it('should return simple controller GET', async () => {
    const { data } = await request.get('/api/simple')
    expect(data).toEqual({ message: 'That is too simple...' })
  })

  it('should return simple controller GET with parameter', async () => {
    const { data } = await request.get('/api/simple/hello/you')
    expect(data).toEqual({ message: 'Hey there you' })
  })

  it('should return simple controller POST', async () => {
    const { data } = await request.post('/api/simple', { works: true })
    expect(data).toEqual({
      message: 'received this body',
      body: { works: true }
    })
  })
})
