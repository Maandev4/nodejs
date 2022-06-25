// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-06-25
 */

'use strict';

import dotenv from 'dotenv';

// Types
import type { FastifyInstance } from 'fastify';

// Utils
import bootstrapper from 'framework/fastify/bootstrap';

dotenv.config();

// Environment related
const {
  SERVER_ADDRESS = '127.0.0.1',
  SERVER_PORT = '8031',
} = process.env;

// Server initializer and kick starter
(async () => {
  // Create and initialize fastify instance
  const fastify: FastifyInstance = await bootstrapper();

  try {
    // Try to boot server
    await fastify.listen({
      host: SERVER_ADDRESS,
      port: SERVER_PORT,
    });

    console.log(`Server listing on http://${SERVER_ADDRESS}:${SERVER_PORT}`);
  } catch ( err ) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
})();
