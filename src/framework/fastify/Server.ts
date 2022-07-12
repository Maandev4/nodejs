/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-03
 */

import fastify, { FastifyInstance } from 'fastify';

// Core
import Component from 'framework/base/Component';
import { ServerListenOptions } from 'framework/fastify/Interfaces';

export default class Server extends Component {
  /**
   * Fastify instance
   */
  private fastify;

  /**
   * @inheritDoc
   */
  get namespace (): string {
    return 'framework/fastify/Server';
  }

  /**
   * @inheritDoc
   */
  constructor ( config ) {
    config['serverOptions'] = config['serverOptions'] || {};
    super(config);
  }

  /**
   * @inheritDoc
   */
  init (): void {
    super.init();
    this.fastify = fastify({
      ...this.get('serverOptions'),
      logger: true,
    });
  }

  /**
   * Get fastify instance
   * @returns {FastifyInstance}
   */
  public getInstance (): FastifyInstance {
    return this.fastify;
  }

  /**
   * Start listening server
   */
  public async listen ( options: ServerListenOptions ): Promise<void> {
    await this.getInstance().listen(options);
  }
}
