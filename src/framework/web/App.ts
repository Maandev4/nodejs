/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-01
 */

import { is } from 'ramda';

export default class App {
  /**
   * Bind properties to the given object and configure a scope registry
   */
  public static configure<T> ( instance: T, properties: { [p: string | symbol]: any } ): T {
    if ( !is(Object, instance) ) {
      throw new Error(`Properties type must be an object but '${typeof properties}' given`);
    }

    for ( const [name, value] of Object.entries(properties) ) {
      instance[name] = value;
    }

    return instance;
  }
}
