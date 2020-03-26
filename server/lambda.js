const awsServerlessExpress = require('aws-serverless-express')
const router = require('./router')


let _app
let _server

async function getServer() {
  if (!_server) {
    _app = await router()
    _server = awsServerlessExpress.createServer(_app)
  }
  return _server
}

exports.handler = async (event, context) => {
  awsServerlessExpress.proxy(await getServer(), event, context)
}
