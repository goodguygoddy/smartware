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

  fastify.post('/upload', function (req, reply) {
    // some code to handle file
    const files = req.raw.files;
    console.log(files);
    let fileArr = [];
    for (let key in files) {
      fileArr.push({
        name: files[key].name,
        mimetype: files[key].mimetype,
      });
    }
    reply.send(fileArr);
  });
}

module.exports = vendorinvoice;
