module.exports = {
  options: {
    // url: 'writers'
  },

  'GET /': [
    {
      some: 'options'
    },

    ctx => {
      // throw new Error('oh noeeeess')
      ctx.easy(ctx.options)
    }
  ],

  'POST /': [
    {
      name: 'string',
      noe: true
    },
    // require('../middleware'),
    async () => {
      console.log('yoooooo', 1) // eslint-disable-line
    }
  ]
}
