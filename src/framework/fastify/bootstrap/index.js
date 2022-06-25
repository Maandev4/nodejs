// @flow

import fastify, { FastifyInstance } from 'fastify';

/**
 * Fastify server bootstrapper
 */

// Custom modules
const isDev = process.env.NODE_ENV !== 'production';

const {
  SERVER_LOGGING = 'false',
} = process.env;

const bootstrapper = async (): Promise<FastifyInstance> => {
  //<editor-fold desc="Fastify server/middleware configuration">
  // Require the framework and instantiate it
  const app = fastify<FastifyInstance>({
    // Access log in console (comment following line to skip)
    logger: isDev && SERVER_LOGGING !== 'false',
    // Max JSON body request size in MB
    bodyLimit: 2 * (1024 * 1024),
  });

  // express like middleware handler
  await app.register(require('@fastify/sensible'));
  app.get('/', async ( req, reply ) => {
    reply.notFound
  });
  // Export as public
  return app;
};

export default bootstrapper;


export function testing (  ) {

}
