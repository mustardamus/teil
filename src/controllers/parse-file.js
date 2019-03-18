/**
Parses a controller .js file.
@module controllers/parser
@function
@param {String} filePath - the path of the controller .js file to parse
@returns {ControllerRoute[]}
*/

/**
@typedef {Object} ControllerRoute
@property {String} verb - The HTTP Verb (GET, POST, PUT, ...)
@property {String} route
  The full route including the resource name derived from the file name
  (books.js -> /books/some/route), or the custom url set with
  controller.options.url ({ url: 'some/custom' } => /some/custom/route)
@property {Object} options
  Options for a route. Empty Object {} if none is given, or the first
  object if a route is defined with an Array
@property {Function[]} handlers
  Array of handler functions for the route. The last item in the array is the
  route handler, every function before is middleware.
*/

const { existsSync } = require('fs')
const importFresh = require('import-fresh')
const { basename, parse, sep } = require('path')
const parseObject = require('./parse-object')

module.exports = (filePath, options = {}) => {
  if (!existsSync(filePath)) {
    throw new Error(`Does not exist`)
  }

  let url = basename(filePath, '.js')
  const controller = importFresh(filePath)

  if (options.srcDir) {
    const { dir, name } = parse(filePath)
    let truncatedPath = dir.replace(options.srcDir, '')

    if (truncatedPath.charAt(0) === '/') {
      truncatedPath = truncatedPath.substr(1, truncatedPath.length)
    }

    const truncatedArr = truncatedPath.split(sep)

    truncatedArr.shift() // remove 'controllers' prefix path

    url = `${truncatedArr.join(sep)}/${name}`
  }

  return parseObject(controller, { url })
}
