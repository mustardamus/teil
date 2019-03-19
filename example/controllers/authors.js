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

    ({ sendStatus, body }) => {
      if (body.author.length === 0) {
        return sendStatus(500)
      }

      global.authors.push({
        id: Math.random()
          .toString(36)
          .substring(7),
        name: body.author
      })

      sendStatus(200)
    }
  ],

  'DELETE /:id': [
    {
      schema: {
        params: {
          id: 'string'
        }
      }
    },

    ({ sendStatus, params }) => {
      global.authors = global.authors.filter(author => author.id !== params.id)

      sendStatus(200)
    }
  ]
}
