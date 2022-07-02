/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-01
 */

import { is } from 'ramda';

// Interfaces
import { IProperties, IRegistry } from 'framework/interfaces/IBaseObject';

export default class App {
  /**
   * Bind properties to the given object
   */
  public static configure<T> ( instance: T, properties: IProperties ): T {
    if ( !is(Object, instance) ) {
      throw new Error(`Instance type must be an object but '${typeof instance}' given`);
    }

    if ( !is(Object, properties) ) {
      throw new Error(`Properties type must be an object but '${typeof properties}' given`);
    }

    for ( const [name, value] of Object.entries(properties) ) {
      let propName: string | symbol = name;

      if ( typeof name === 'symbol' ) {
        instance[propName] = value;
        continue;
      }

      propName = name.replace(/^[-+]/, '');
      instance[propName] = value;
    }

    return instance;
  }

  /**
   * Configure properties scope registry
   */
  public static configureRegistry ( registry: IRegistry, properties: IProperties ): IRegistry {
    if ( !is(Object, registry) ) {
      throw new Error(`Registry type must be an object but '${typeof registry}' given`);
    }

    if ( !is(Object, properties) ) {
      throw new Error(`Properties type must be an object but '${typeof properties}' given`);
    }

    for ( const [name] of Object.entries(properties) ) {
      if ( typeof name === 'symbol' ) {
        registry[name] = 'a';
        continue;
      }

      const propName: string = name.replace(/^[-+]/, '');
      let type: string = 'a';

      if ( name.startsWith('-') ) {
        type = 'r';
      } else if ( name.startsWith('+') ) {
        type = 'w';
      }

      registry[propName] = type;
    }

    return registry;
  }
}
