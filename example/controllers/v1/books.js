module.exports = {
  'GET /'({ send }) {
    send({ message: 'with subfolders' })
  }
}
