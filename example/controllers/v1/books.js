global.books = []

module.exports = {
  'GET /'({ send }) {
    send(global.books)
  },

  'POST /': [
    {
      schema: {
        body: {
          book: 'string',
          authorId: 'string'
        }
      }
    },

    ({ sendStatus, body: { book, authorId } }) => {
      global.books.push({
        id: Math.random()
          .toString(36)
          .substring(7),
        name: book,
        authorId
      })

      sendStatus(200)
    }
  ],

  'DELETE /author/:authorId': [
    {
      schema: {
        params: {
          authorId: 'string'
        }
      }
    },

    ({ sendStatus, params: { authorId } }) => {
      global.books = global.books.filter(book => book.authorId !== authorId)

      sendStatus(200)
    }
  ]
}
