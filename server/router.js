const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const router = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function getRouter () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  router.use(nuxt.render)

  return router;
}
module.exports = getRouter
