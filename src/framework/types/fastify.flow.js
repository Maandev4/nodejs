// Types
import type { FastifyInstance } from 'fastify';
import type { IApplicationConfig } from './application.flow';

export type FastifyServerInstance = FastifyInstance & {
  /** Application configuration */
  config: IApplicationConfig;
};
