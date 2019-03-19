/* globals Vue, axios */

new Vue({
  el: '#app',

  data: {
    authorInput: '',
    authors: [],
    bookInput: '',
    books: [],
    authorSelect: null
  },

  async mounted() {
    this.inputFocus()
    this.getAuthors()
    this.getBooks()
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
    }
  }
})
