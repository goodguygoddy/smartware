// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
require('dotenv').config();

// CORS access
fastify.register(require('fastify-cors'), {
  // put your options here
});

// Register all plugins
fastify.register(require('./plugins/db-connector')); // MongoDb Connection
fastify.register(require('./plugins/swagger')); // Swagger Documentation
fastify.register(require('./plugins/jwt-auth')); // Jwt Authentication
fastify.register(require('fastify-file-upload'));

// Register all routes
fastify.register(require('./routes/root'));
fastify.register(require('./routes/users'));
fastify.register(require('./routes/vendorinvoice'));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.SERVER_PORT, process.env.SERVER_IP);
    fastify.log.info(
      `Server is running on port ${fastify.server.address().port}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
