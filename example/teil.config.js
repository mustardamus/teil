module.exports = {
  srcDir: __dirname,
  apiEndpoint: '/api',
  host: '0.0.0.0',
  expressSettings: {
    'trust proxy': false
  },
  controllersGlob: `${__dirname}/controllers/**/!(*test|*spec|*draft).js`,
  plugins: ['./plugins/generate-id.js']
}
