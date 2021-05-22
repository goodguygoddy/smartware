async function users(fastify, options) {
  const db = fastify.mongo.db.collection('users');

  // Get all users
  fastify.route({
    method: 'GET',
    url: '/users',
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

  // Login User
  fastify.route({
    method: 'POST',
    url: '/login',
    handler: async function (request, reply) {
      try {
        const res = await db
          .find({
            email: request.body.email,
            password: request.body.password,
          })
          .toArray();
        if (res.length != 0) {
          const token = await fastify.jwt.sign({ res });
          reply.send({ token });
        } else {
          reply.code(401).send('The user does not exist');
        }
      } catch (error) {
        reply.send(error);
      }
    },
  });

  // Register new users
  fastify.route({
    method: 'POST',
    url: '/registeruser',
    handler: async function (request, reply) {
      try {
        const userexist = db.find({ email: request.email }).limit(1);
        if (userexist) {
          reply.code(409).send('This email is already registered');
        } else {
          const res = await db.insertOne(request.body);
          if (res) {
            reply.code(201).send('Successfully registered user');
          }
        }
      } catch (error) {
        reply.send(error);
      }
    },
  });

  //Get the user by id
  fastify.route({
    method: 'GET',
    url: '/users/:id',
    preValidation: [fastify.JWTauthenticate],
    handler: async function (request, reply) {
      try {
        const res = await db.findOne({
          _id: fastify.mongo.ObjectId(request.params.id),
        });
        reply.send(res);
      } catch (error) {
        reply.send(error);
      }
    },
  });

  // Get loggedin user
  fastify.route({
    method: 'GET',
    url: '/user',
    preValidation: [fastify.JWTauthenticate],
    handler: async function (request, reply) {
      try {
        const token = request.headers.authorization.split(' ')[1];
        const decoded = await fastify.jwt.decode(token);
        const res = {
          user: {
            _id: decoded.res[0]._id,
            name: decoded.res[0].name,
            role: decoded.res[0].role,
            iat: decoded.iat,
          },
        };
        reply.send(res);
      } catch (error) {
        reply.send(error);
      }
    },
  });
}

module.exports = users;
