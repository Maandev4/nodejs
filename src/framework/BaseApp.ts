/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-03
 */

import * as Op from 'object-path';
import { is as R_is } from 'ramda';

// Core
import Container from 'framework/di/Container';

// Exceptions
import InvalidConfigException from 'framework/base/InvalidConfigException';

// Helpers
import CallbackHelper from 'framework/helpers/CallbackHelper';

// Types | Interfaces
import { Application } from 'framework/types/Application.d';
import { TypeDefinition } from 'framework/BaseApp.d';
import { IProperties, IRegistry } from 'framework/interfaces/IBaseObject';
import Component from 'framework/base/Component';

// Global variables
/** @type {App} */
declare var App: any;

/**
 * Core helper class for the framework.
 *
 * Do not use BaseApp directly. Instead, use its child class {@link App} which you can replace to
 * customize methods of BaseApp.
 */
export default abstract class BaseApp {
  /**
   * The application instance
   */
  public static app: Application;

  /**
   * @var array registered path aliases
   * @see {@link getAlias()}
   * @see {@link setAlias()}
   */
  public static $aliases: { [alias: string]: string } = {'@framework': __dirname};

  public static container: Container;

  /**
   * Bind properties to the given object
   *
   * @example
   * const obj: Object = {};
   * const properties: IProperties = {language: 'JavaScript', category: 'Web'};
   *
   * App.configure(obj, properties);
   *
   * console.log('Object with dynamic properties:', obj);
   *
   * // Output like
   * // { 'programming': 'JavaScript', 'category': 'Web' }
   *
   * @param instance - The object instance
   * @param properties - Properties bind to the instance
   * @return Instance contain dynamic properties
   */
  public static configure<T> ( instance: T, properties: IProperties ): T {
    if ( !R_is(Object, instance) ) {
      throw new Error(`Instance type must be an object but '${typeof instance}' given`);
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
   * Note: Do not use this method directory on component, [[framework/base/BaseObject]] relies on it to
   * store scope like registry.
   *
   * Properties internal registry to store scope like information
   * +: is for write-only property
   * -: is for read-only property
   *
   * @example
   * const properties: IProperties = {language: 'PHP', '-category': 'Web'};
   * const registry: IRegistry = App.configureRegistry({}, properties);
   *
   * console.log('Registry:', registry);
   *
   * // Output like
   * // { 'programming': 'a', 'category': 'r' }
   *
   * // The flag types:
   * // r = read-only
   * // w = write-only
   * // a = all means read+write
   *
   * @param registry - The mutable registry object to update
   * @param properties - Properties to manipulate scope visibility
   */
  public static configureRegistry ( registry: IRegistry, properties: IProperties ): IRegistry {
    if ( !R_is(Object, registry) ) {
      throw new Error(`Registry type must be an object but '${typeof registry}' given`);
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

  /**
   * Creates a new object using the given configuration.
   *
   * You may view this method as an enhanced version of the `new` operator.
   * The method supports creating an object based on a class name, a configuration array or
   * an anonymous function.
   *
   * Below are some usage examples:
   *
   * ```js
   * // create an object using a class name
   * const obj = App.createObject('framework/db/Connection');
   *
   * // create an object using a configuration array
   * const obj = App.createObject({
   *     class: 'framework/db/Connection',
   *     dsn: 'mysql:host=127.0.0.1;dbname=demo',
   *     username: 'root',
   *     password: '',
   *     charset: 'utf8',
   * };
   *
   * // create an object with two constructor parameters (params config must be the last one)
   * const obj = App.createObject('framework\db\Connection', [arg1, arg2, {...}]);
   *
   * // create an object with two constructor parameters and <i>this</i> target.
   * const obj = App.createObject('framework\db\Connection', [{...}], this);
   * ```
   *
   * Using {@link Container} this method can also identify
   * dependent objects, instantiate them and inject them into the newly created object.
   *
   * @param type the object type. This can be specified in one of the following forms:
   *
   * - a string: representing the class name of the object to be created
   * - a configuration array: the array must contain a `class` element which is treated as the object class,
   *   and the rest of the name-value pairs will be used to initialize the corresponding object properties
   * - a Callable: An anonymous function should return a new instance of the object being created.
   *
   * @param configuration=[{}] - Arguments pass to constructor
   * @param thisArg=null - The constructor parameters
   * @return The created object
   * @throws {InvalidConfigException} - If the configuration is invalid.
   * @see framework/di/Container
   */
  public static createObject ( type: TypeDefinition, configuration: Array<any> = [{}], thisArg: any = null ): Component | null {
    if ( R_is(String, type) ) {
      return App.container.get(type, configuration);
    }

    if ( CallbackHelper.isActualFunction(type) ) {
      return App.container.invoke(type as Function, configuration, thisArg);
    }

    if ( !R_is(Object, type) ) {
      throw new InvalidConfigException(`Unsupported configuration type: ${typeof type}`);
    }

    if ( 'namespace' in type ) {
      const namespace = type['namespace'];
      Op.del(type, 'namespace');
      return App.container.get(namespace, configuration);
    }

    throw new InvalidConfigException('Type configuration must be an object containing a "namespace" property');
  }

  public static getAlias ( alias: string, throwException = true ): string | false {
    return alias;
  }

  /**
   * Returns the root alias part of a given alias.
   * A root alias is an alias that has been registered via {@link setAlias} previously.
   * If a given alias matches multiple root aliases, the longest one will be returned.
   * @param alias - The alias
   * @return The root alias, or false if no root alias is found
   */
  public static getRootAlias ( alias ): string | false {
    return alias;
  }

  public static setAlias ( alias: string, path: string ): void {
  }
}
