const fp = require('fastify-plugin');

async function jwtauth(fastify, options) {
  fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate('JWTauthenticate', async function (request, reply) {
    try {
      await request.jwtVerify(); // You can remove this line to turn of Authentication from server
    } catch (err) {
      reply.send(err);
    }
  });
}

module.exports = fp(jwtauth);
