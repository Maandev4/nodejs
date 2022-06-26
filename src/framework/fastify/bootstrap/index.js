// @flow

import fastify from 'fastify';

// Types
import type { FastifyInstance } from 'fastify';
import type { IFastifyPlugin } from 'framework/loaders/fastify-plugin';

// Utils
import FastifyPluginLoader from 'framework/loaders/fastify-plugin';

export default async function bootstrapper (): Promise<FastifyInstance> {
  //<editor-fold desc="Fastify server/middleware configuration">
  // Require the framework and instantiate it
  const app = fastify<FastifyInstance>({
  });

  //<editor-fold desc="Plugins loader">
  const pluginLoader: IFastifyPlugin = FastifyPluginLoader(app);

  await pluginLoader.registerPackages([
    ['@fastify/sensible'],
  ]);
  await pluginLoader.registerDirectory([
    'app/plugins',
    'framework/fastify/plugins',
  ]);
  //</editor-fold>

  // Export as public
  return app;
};
