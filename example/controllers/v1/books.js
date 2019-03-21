global.books = []

module.exports = {
  'GET /'({ send }) {
    const booksExtended = global.books.map(book => {
      book.author = global.authors.find(author => author.id === book.authorId)
      return book
    })

    send(booksExtended)
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

    ({ sendStatus, body: { book, authorId }, generateId }) => {
      global.books.push({
        id: generateId(),
        name: book,
        authorId
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
      global.books = global.books.filter(book => book.id !== params.id)

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
