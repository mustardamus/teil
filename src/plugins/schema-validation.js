const { superstruct } = require('superstruct')
const validator = require('validator')

const validatorMethods = [
  'isAfter',
  'isAlpha',
  'isAlphanumeric',
  'isAscii',
  'isBase64',
  'isBefore',
  'isBoolean',
  'isCreditCard',
  'isDataURI',
  'isEmail',
  'isEmpty',
  'isFQDN',
  'isFloat',
  'isFullWidth',
  'isHalfWidth',
  'isHexColor',
  'isHexadecimal',
  'isIP',
  'isISBN',
  'isISSN',
  'isISIN',
  'isISO31661Alpha2',
  'isISRC',
  'isInt',
  'isJSON',
  'isLatLong',
  'isLowercase',
  'isMACAddress',
  'isMD5',
  'isMimeType',
  'isMongoId',
  'isMultibyte',
  'isNumeric',
  'isPort',
  'isSurrogatePair',
  'isURL',
  'isUUID',
  'isUppercase',
  'isVariableWidth'
]
const types = {
  isNotEmpty: val => !validator.isEmpty(val)
}

validatorMethods.forEach(validatorMethod => {
  types[validatorMethod] = validator[validatorMethod]
})

const struct = superstruct({ types })

const middleware = ({ next, options, body, query, params }) => {
  try {
    if (options.schema) {
      if (options.schema.body) {
        struct(options.schema.body)(body)
      }

      if (options.schema.query) {
        struct(options.schema.query)(query)
      }

      if (options.schema.params) {
        struct(options.schema.params)(params)
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
