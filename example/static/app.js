/* globals Vue, axios */

new Vue({
  el: '#app',

  data: {
    authorInput: '',
    authors: [],
    bookInput: '',
    books: [],
    authorSelect: null,
    authorEditId: null,
    authorEditInput: '',
    version: ''
  },

  async mounted() {
    this.inputFocus()
    this.getAuthors()
    this.getBooks()
    this.getVersion()
  },

  methods: {
    inputFocus() {
      Vue.nextTick(() => {
        this.$el.querySelectorAll('input')[0].focus()
      })
    },

    async getAuthors() {
      const { data } = await axios.get('/api/writers')
      this.authors = data
    },

    async getBooks() {
      const { data } = await axios.get('/api/v1/books')
      this.books = data
    },

    async getVersion() {
      const { data } = await axios.get('/api/version')
      this.version = data
    },

    async onAuthorSubmit() {
      await axios.post('/api/writers', { author: this.authorInput })

      this.getAuthors()
      this.inputFocus()

      this.authorInput = ''
    },

    async onBookSubmit() {
      await axios.post('/api/v1/books', {
        book: this.bookInput,
        authorId: this.authorSelect
      })

      this.getBooks()
      this.inputFocus()

      this.bookInput = ''
    },

    async onAuthorEditClick(author) {
      this.authorEditId = author.id
      this.authorEditInput = author.name
    },

    async onAuthorEditSubmit() {
      await axios.put(`/api/writers/${this.authorEditId}`, {
        author: this.authorEditInput
      })

      this.getAuthors()
      this.getBooks()

      this.authorEditId = null
    },

    async onAuthorDeleteClick(author) {
      await axios.delete(`/api/writers/${author.id}`)
      await axios.delete(`/api/v1/books/author/${author.id}`)

      this.getAuthors()
      this.getBooks()
    },

    async onBookDeleteClick(book) {
      await axios.delete(`/api/v1/books/${book.id}`)

      this.getBooks()
    }
  }
})
