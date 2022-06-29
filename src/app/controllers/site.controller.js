import Controller from 'framework/base/controller';

export default class SiteController extends Controller {
  /**
   * @public
   * @static
   * Main page
   */
  actionIndex (): Promise<{ [key: string]: string }> {
    return {
      status: 'OK',
    };
  }
}
