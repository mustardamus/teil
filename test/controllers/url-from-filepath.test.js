const urlFromFilepath = require('../../src/controllers/url-from-filepath')

describe('Controllers - Url From Filepath', () => {
  const controllersGlob = '/project/controllers/**/*.js'

  it('should generate the url if the file is in the base controllers path', () => {
    const url = urlFromFilepath('/project/controllers/api.js', controllersGlob)

    expect(url).toBe('/api')
  })

  it('should generate the url if the file is in a subdir of the controllers path', () => {
    const url = urlFromFilepath(
      '/project/controllers/sub/api.js',
      controllersGlob
    )

    expect(url).toBe('/sub/api')
  })
})
