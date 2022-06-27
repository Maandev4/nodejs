// Types

import type { PluginMetadata } from 'fastify-plugin';
import type { FastifyServerInstance } from 'framework/types/fastify.flow';

export interface IApplicationComponent {
  /** Namespace property to store options inside `components.*` object */
  namespace: string;

  /** Fastify plugin metadata */
  pluginMeta: PluginMetadata;

  /** Component default options */
  defaultOptions (): Promise<{ [string]: any }>;

  /** Initializer */
  init ( fastify: FastifyServerInstance, options?: { [string]: any } ): Promise<void>;
}
