// @flow

import type { Controller as IController, ControllerActions } from 'framework/types/controller.flow';
import type { FastifyServerInstance } from 'framework/types/fastify.flow';

export default class Controller implements IController, ControllerActions {
  app: FastifyServerInstance;

  constructor ( app: FastifyServerInstance ) {
    this.app = app;
  }

  async behaviours () {
  }

  async init () {
  }
}
