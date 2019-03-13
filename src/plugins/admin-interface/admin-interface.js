const { join } = require('path')

module.exports = ({ addController }) => {
  addController({
    options: {
      url: 'admin',
      staticDir: join(__dirname, 'static')
    },

    'POST /'({ send }) {
      send('owwwww yeahhhhh')
    }
  })
}
