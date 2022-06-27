// @flow
import fastify from 'fastify';

// Types
import type { FastifyServerInstance } from 'framework/types/fastify.flow';

// Utils
import FastifyBootstrapper from 'framework/loaders/fastify-bootstrapper';
import ApplicationConfiguration from 'framework/loaders/application.configuration';
import ApplicationComponent from 'framework/loaders/application.components';

// Utils
import { stringToArray } from 'framework/helpers/array-utils';

export default async function Application (): Promise<FastifyServerInstance> {
  //<editor-fold desc="Application configuration loader">
  const config = ApplicationConfiguration({});
  await config.fromFile([
    'framework/configuration/main.js',
    ...stringToArray(config.getConfig('configurationFile', 'app/configuration/main.js')),
  ]);
  //</editor-fold>

  // Require the framework and instantiate it
  const app = fastify<FastifyServerInstance>(config.getConfig('serverOptions', {}));

  // Define a `config` decorator
  config.decorate(app);

  await ApplicationComponent(app, config).fromDirectory([
    'framework/components',
    ...stringToArray(config.getConfig('componentDir', 'app/components')),
  ]);

  //<editor-fold desc="Bootstrapper loader">
  await FastifyBootstrapper(app).fromFile([
    'framework/fastify/bootstrap/server.js',
    ...stringToArray(config.getConfig('bootstrapFile', 'app/bootstrap/server.js')),
  ]);
  //</editor-fold>

  // Export as public
  return app;
};
