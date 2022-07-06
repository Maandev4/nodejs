/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-01
 */

import BaseApplication from 'framework/base/Application';

export default class Application extends BaseApplication {
  /**
   * Full qualified namespace
   */
  get namespace (): string {
    return 'framework/web/Application';
  }
}
