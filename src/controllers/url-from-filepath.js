module.exports = (filePath, controllersGlob) => {
  const splittedArr = controllersGlob.split('/')
  const controllersPathArr = []

  // get the base controllers path by searching for the first glob *
  for (let i = 0; i < splittedArr.length; i++) {
    if (splittedArr[i].includes('*')) {
      break
    }

    controllersPathArr.push(splittedArr[i])
  }

  const controllersPath = controllersPathArr.join('/')
  const url = filePath
    .replace(controllersPath, '')
    .toLowerCase()
    .replace('.js', '')

  return url
}
