// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-06-26
 */

import { resolve, join } from 'path';
import Glob from 'glob';
import fp from 'fastify-plugin';

// Types
import type { FastifyInstance } from 'fastify';
import type { PluginMetadata } from 'fastify-plugin';

// Utils
import { checkPathAccess, normalize } from 'framework/helpers/path';

export interface IFastifyPlugin {
  /**
   * Load a plugin from a given callback function
   */
  registerCallback ( callback: ( fastify: FastifyInstance, opts?: { [string]: any }, next: () => void ) => void, meta: PluginMetadata ): Promise<void>;

  /**
   * Load a plugin from an installed package name
   */
  registerPackage ( name: string, options?: { [string]: any } ): Promise<void>;

  /**
   * Load a plugins from a given packages list
   */
  registerPackages ( list: Array<[string, { [string]: any }]> ): Promise<void>;

  /**
   * Load a plugin from a given relative file path (only from framework|app part)
   */
  registerFile ( path: string, options?: { [string]: any } ): Promise<void>;

  /**
   * Load all plugins from a given relative directory path (only from framework|app part)
   */
  registerDirectory ( path: string | Array<string> ): Promise<void>;
}

export default function FastifyPlugin ( fastify: FastifyInstance ): IFastifyPlugin {
  const basePath: string = resolve(__dirname, '../../');

  /**
   * @internal
   * @private
   * @static
   */
  const registerPackage = async ( name: string, options: { [string]: any } = {} ): void => {
    await registerPlugin(name, options);
  };

  /**
   * @internal
   * @private
   * @static
   */
  const registerPlugin = async ( path: string, options: { [string]: any } ): Promise<void> => {
    const pluginFile: any = await import(path);
    fastify.register(pluginFile, options);
  };

  const fastifyPlugin: IFastifyPlugin = {};

  fastifyPlugin.registerCallback = async function ( callback, meta ) {
    await fastify.register(fp(callback, meta));
  };

  fastifyPlugin.registerPackage = async function ( name, options = {} ) {
    await registerPlugin(name, options);
  };

  fastifyPlugin.registerPackages = async function ( list ) {
    if ( !list.length ) {
      return;
    }

    for await ( const [name, options = {}] of list ) {
      await registerPackage(name, options);
    }
  };

  fastifyPlugin.registerFile = async function ( path, options ) {
    const absolutePath: string = resolve(join(basePath, path));

    if ( !(await checkPathAccess(absolutePath)) ) {
      throw new Error(`Plugin file '${absolutePath}' is not accessible`);
    }

    await registerPlugin(absolutePath, options);
  };

  fastifyPlugin.registerDirectory = async function ( path ) {
    if ( typeof path !== 'string' && Array.isArray(path) ) {
      for await ( const dirPath of path ) {
        await fastifyPlugin.registerDirectory(dirPath);
      }
      return;
    }

    const absolutePath: string = resolve(join(basePath, path));

    if ( !(await checkPathAccess(absolutePath)) ) {
      throw new Error(`Plugin directory '${absolutePath}' is not accessible`);
    }

    const files: Array<string> = Glob.sync(normalize(`${absolutePath}/fastify-*/*.js`));

    for await ( const file of files ) {
      await registerPlugin(file);
    }
  };

  return fastifyPlugin;
}
