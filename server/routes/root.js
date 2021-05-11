async function root(fastify, options) {
  fastify.get('/', async function (request, reply) {
    try {
      reply.send('The Server is up and running !!!');
    } catch (error) {
      reply.send('There was an error with server !!!');
    }
  });
}

module.exports = root;
