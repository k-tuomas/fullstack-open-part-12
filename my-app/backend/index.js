const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
require('dotenv').config()

const server = http.createServer(app)

if (process.env.NODE_ENV !== 'test or not?') {
  server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}