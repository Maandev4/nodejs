import type { FastifyCorsOptions } from '@fastify/cors';
import type { FastifyServerOptions } from 'fastify';

interface IApplicationComponents {
  /** CORS component options */
  cors: FastifyCorsOptions | null;
}

export interface IApplicationConfig {
  /** fastify server options */
  serverOptions: FastifyServerOptions;
  /** Application bootstrap file */
  bootstrapFile: string | Array<string>;
  /** Application configuration file */
  configurationFile: string | Array<string>;
  /** Application controllers directory or directories */
  controllerNamespace: string | Array<string>;
  /** Components directories path */
  componentDir: string | Array<string>;
  /** Components load order / arrangement */
  componentCatalogue: Array<string>;
  /** components options */
  components: IApplicationComponents;
}
