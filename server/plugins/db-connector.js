const fp = require('fastify-plugin');

async function dbConnector(fastify, options) {
  await fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_IP}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`,
  });
}

module.exports = fp(dbConnector);
