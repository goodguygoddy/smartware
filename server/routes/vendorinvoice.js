async function vendorinvoice(fastify, options) {
  const db = fastify.mongo.db.collection('vendorinvoice');

  //Get all vendor invoices
  fastify.route({
    method: 'GET',
    url: '/vendorinvoice',
    preValidation: [fastify.JWTauthenticate],
    handler: async function (request, reply) {
      try {
        const res = await db.find().toArray();
        reply.send(res);
      } catch (error) {
        reply.send(error);
      }
    },
  });

  // Upload vendor invoice
  fastify.route({
    method: 'POST',
    url: '/vendorinvoice',
    preValidation: [fastify.JWTauthenticate],
    handler: async function (request, reply) {
      try {
        const res = await db.insert(request.body);
        if (res) {
          reply.send('Vendor Invoice has been added');
        }
      } catch (error) {
        reply.send(error);
      }
    },
  });
}

module.exports = vendorinvoice;
