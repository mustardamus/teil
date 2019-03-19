module.exports = {
  // GET /api/simple
  'GET /'({ send }) {
    send({ message: 'That is too simple...' })
  },

  // GET /api/simple/hello/xxx
  'GET /hello/:name': [
    {
      schema: {
        params: {
          name: 'string'
        }
      }
    },

    ({ send, params }) => {
      send({ message: `Hey there ${params.name}` })
    }
  ],

  // POST /api/simple
  'POST /'({ send, body }) {
    send({ message: 'received this body', body })
  }
}
