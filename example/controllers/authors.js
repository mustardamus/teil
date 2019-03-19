global.authors = []

module.exports = {
  options: {
    url: 'writers'
  },

  'GET /'({ send }) {
    send(global.authors)
  },

  'POST /': [
    {
      schema: {
        body: {
          author: 'string'
        }
      }
    },

    ({ send, body }) => {
      if (body.author.length !== 0) {
        global.authors.push({
          id: Math.random()
            .toString(36)
            .substring(7),
          name: body.author
        })
      }

      send(true)
    }
  ]
}
