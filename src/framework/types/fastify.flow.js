// Types
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import type { IApplicationConfig } from './application.flow';

export type FastifyServerInstance = FastifyInstance & {
  /** Application configuration */
  config: IApplicationConfig;
};

export type RequestInstance = FastifyRequest & {
};


export type ReplyInstance = FastifyReply & {
};
