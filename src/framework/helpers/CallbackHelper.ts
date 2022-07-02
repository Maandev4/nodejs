/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-02
 */

import Util from 'util';

export default class CallbackHelper {
  /**
   * Check that given callback is function or not
   * @param callback The callback to testify
   */
  public static isFunction ( callback: any ): boolean {
    return typeof callback === 'function';
  }

  /**
   * Check that given callback is async function or not
   * @param callback The callback to testify
   */
  public static isSync ( callback: any ): boolean {
    return CallbackHelper.isFunction(callback)
      && callback.constructor.name === 'Function';
  }

  /**
   * Check that given callback is async function or not
   * @param callback The callback to testify
   */
  public static isAsync ( callback: any ): boolean {
    return !CallbackHelper.isSync(callback)
      && callback.constructor.name === 'AsyncFunction';
  }

  /**
   * Converts plain function into an async function
   * @param callback The callback to promisify
   */
  public static promisify ( callback: Function ): Function {
    return !CallbackHelper.isAsync(callback)
      ? callback
      : Util.promisify(callback);
  }
}
