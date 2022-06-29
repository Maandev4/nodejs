// @flow

import type { Controller as IController, ControllerActions } from 'framework/types/controller.flow';
import type { FastifyServerInstance, ReplyInstance, RequestInstance } from 'framework/types/fastify.flow';

export default class Controller implements IController, ControllerActions {
  /** Application instance */
  #app: FastifyServerInstance;
  /** Request instance */
  #request: RequestInstance;
  /** Reply instance */
  #reply: ReplyInstance;

  constructor ( app: FastifyServerInstance, request: RequestInstance, reply: ReplyInstance) {
    this.#app = app;
    this.#request = request;
    this.#reply = reply;
  }

  /**
   * @public
   * @readonly
   * Application instance
   */
  get app () {
    return this.#app;
  }

  /**
   * @public
   * @readonly
   * Request instance
   */
  get request () {
    return this.#request;
  }

  /**
   * @public
   * @readonly
   * Reply instance
   */
  get reply () {
    return this.#reply;
  }

  async behaviours () {
  }

  async init () {
  }
}
