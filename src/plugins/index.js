const customContexts = require('../context/custom-contexts')
const customControllers = require('../controllers/custom-controllers')
const sendExtend = require('./send-extend')
const adminInterface = require('./admin-interface/admin-interface')

module.exports = () => {
  const tools = {
    extendContext: customContexts,
    addController: customControllers
  }

  sendExtend(tools)
  adminInterface(tools)
}
