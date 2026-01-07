async function vendorinvoice(fastify, options) {
  const db = await fastify.mongo.db.collection('vendorinvoice');

  // Get all vendor invoices
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

  // Get a single vendor invoice file with id
  fastify.route({
    method: 'GET',
    url: '/vendorinvoice/file/:id',
    preValidation: [fastify.JWTauthenticate],
    handler: async function (request, reply) {
      try {
        const res = await db.findOne({
          _id: fastify.mongo.ObjectId(request.params.id),
        });
        console.log(res.file);
        reply.send(res.file);
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
        request.body.quantity = parseInt(request.body.quantity);
        const res = await db.insertOne(request.body);
        console.log(res);
        if (res) {
          reply.send('Vendor Invoice is uploaded');
        }
      } catch (error) {
        reply.send(error);
      }
    },
  });

  // Delete vendor invoice by id
  fastify.route({
    method: 'DELETE',
    url: '/vendorinvoice/:id',
    preValidation: [fastify.JWTauthenticate],
    handler: async function (request, reply) {
      try {
        if (request.params.id) {
          const res = await db.deleteOne({
            _id: fastify.mongo.ObjectId(request.params.id),
          });
          reply.send('Vendor Invoice Deleted');
        } else {
          reply.error(res);
        }
      } catch (error) {
        reply.send(error);
      }
    },
  });
}

module.exports = vendorinvoice;
