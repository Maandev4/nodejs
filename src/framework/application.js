// @flow

// Types
import type { FastifyServerInstance } from 'framework/types/fastify.flow';

// Base modules
import WebApplication from 'framework/web/application';

export default async function Application (): Promise<FastifyServerInstance> {
  const application = new WebApplication();
  await application.createInstance();

  // Export as public
  return application.getInstance();
};
