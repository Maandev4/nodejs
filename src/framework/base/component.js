import BaseObject from 'framework/base/base-object';

export class Component extends BaseObject implements IBaseObject {
  /**
   * @private
   * The attached event handlers (event name => handlers)
   */
  #events: { [string]: Function } = {};
  /**
   * @private
   * The event handlers attached for wildcard patterns (event name wildcard => handlers)
   */
  #eventWildcards: { [string]: Function } = {};
  /**
   * @private
   * The attached behaviors (behavior name => behavior). This is `null` when not initialized.
   */
  #behaviors: { [string]: Function } | null = null;
}
