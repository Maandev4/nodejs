import Controller from 'framework/base/controller';
import type { FastifyRequest, FastifyReply } from 'fastify';

export default class SiteController extends Controller {
  actionIndex ( req: FastifyRequest, reply: FastifyReply ): Promise<{ [key: string]: string }> {
    return {
      status: 'OK',
    };
  }
}
