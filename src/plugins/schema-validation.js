const { struct } = require('superstruct')

const middleware = ({ next, options, body, query, params }) => {
  try {
    if (options.schema) {
      if (options.schema.body) {
        const schema = struct(options.schema.body)
        schema(body)
      }

      if (options.schema.query) {
        const schema = struct(options.schema.query)
        schema(query)
      }

      if (options.schema.params) {
        const schema = struct(options.schema.params)
        schema(params)
      }
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = ({ addMiddleware }) => {
  addMiddleware(middleware)
}
