module.exports = ({ extendContext, addController }) => {
  extendContext({
    whaaat() {
      return 'totally hacked yay'
    }
  })

  extendContext(context => {
    context.easy = context.send
  })

  addController({
    options: {
      url: 'plugins'
    },

    'GET /'({ send }) {
      send('owwwww yeahhhhh')
    }
  })
}
