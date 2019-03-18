global.books = []

module.exports = {
  'GET /'({ send }) {
    send(global.books)
  },

  'POST /'({ sendStatus, body: { book, authorId } }) {
    if (!authorId) {
      return sendStatus('500')
    }

    global.books.push({ book, authorId })
    sendStatus(200)
  }
}
