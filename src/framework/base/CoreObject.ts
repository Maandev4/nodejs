/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-01
 */

// Core
import * as Op from 'object-path';

// Core
import App from 'framework/web/App';

// Interfaces
import ICoreObject, { IRegistry } from 'framework/interfaces/IBaseObject';
import CallbackHelper from 'framework/helpers/CallbackHelper';
import UnknownPropertyError from 'framework/base/UnknownPropertyError';
import InvalidCallError from 'framework/base/InvalidCallError';

export default class CoreObject implements ICoreObject {
  protected registry: IRegistry = {};

  /**
   * Constructor.
   *
   * The default implementation does two things:
   *
   * - Initializes the object with the given configuration `config`.
   * - Call [[init()]].
   *
   * If this method is overridden in a child class, it is recommended that
   *
   * - the last parameter of the constructor is a configuration array, like `config` here.
   * - call the parent implementation at the end of the constructor.
   *
   * @param config Name-value pairs that will be used to initialize the object properties
   */
  public constructor ( config: { [p: string | symbol]: any } = {} ) {
    if ( Object.keys(config).length ) {
      App.configure(this, config);
      App.configureRegistry(this.registry, config);
    }

    this.init();
  }

  /**
   * Initializes the object.
   * This method is invoked at the end of the constructor after the object is initialized with the
   * given configuration.
   */
  public init (): void {
    // Overridden by its children
  }

  /**
   * Returns the value of an object property.
   * @param name the property name
   * @return mixed the property value
   * @throws UnknownPropertyError if the property is not defined
   * @throws InvalidCallError if the property is write-only
   * @see __set()
   */
  public get ( name: string | symbol ): any {
    if ( !this.hasProperty(name) ) {
      throw new UnknownPropertyError(`Trying to get unknown property: '${(name as string)}'`);
    }

    if ( !this.canGetProperty(name) ) {
      throw new InvalidCallError(`Trying to get write-only property: '${(name as string)}'`);
    }

    return this[name];
  }

  /**
   * Sets value of an object property.
   *
   * @param name the property name
   * @param value The property value
   * @throws UnknownPropertyException if the property is not defined
   * @throws InvalidCallError if the property is read-only
   * @see __get()
   */
  public set ( name: string | symbol, value: any ): void {
    if ( !this.hasProperty(name) ) {
      throw new UnknownPropertyError(`Trying to set unknown property: '${(name as string)}'`);
    }

    if ( !this.canSetProperty(name) ) {
      throw new InvalidCallError(`Trying to set read-only property: '${(name as string)}'`);
    }

    this[name] = value;
  }

  /**
   * Sets a component property to be null.
   *
   * This method will check in the following order and act accordingly:
   *
   *  - a property defined by a setter: set the property value to be null
   *  - a property of a behavior: set the property value to be null
   *
   * This method will check in the following order and act accordingly:
   * @param name - The property name
   */
  public unset ( name: string | symbol ): void {
    if ( !this.hasProperty(name) ) {
      throw new UnknownPropertyError(`Trying to set unknown property: '${(name as string)}'`);
    }

    if ( this.canSetProperty(name) ) {
      throw new InvalidCallError(`Trying to remove read-only property: '${(name as string)}'`);
    }

    this[name] = null;
  }

  /**
   * Checks if a property is set, i.e. defined and not null.
   *
   * Note that if the property is not defined, false will be returned.
   * @param name the property name or the symbol
   * @return Whether the named property is set (not null).
   */
  public has ( name: string | symbol ): boolean {
    return this.hasMethod(name) || this.hasProperty(name);
  }

  /**
   * Returns a value indicating whether a property is defined.
   * @param name - The property name
   * @return Whether the property is defined
   * @see canGetProperty()
   * @see canSetProperty()
   */
  public hasProperty ( name: string | symbol ): boolean {
    return name in this
      && (typeof name === 'string' && !name.startsWith('__'))
      && Op.has(this.registry, name)
      && CallbackHelper.isActualValue(this.registry[name]);
  }

  /**
   * Returns a value indicating whether a property can be read.
   * @param name - The property name
   * @return Whether the property can be read
   * @see canSetProperty()
   */
  public canGetProperty ( name: string | symbol ): boolean {
    if ( !this.hasProperty(name) ) {
      return false;
    }

    return typeof name === 'symbol'
      ? true
      : ['r', 'a'].includes(this.registry[name]);
  }

  /**
   * Returns a value indicating whether a property can be set.
   * @param name - The property name
   * @return Whether the property can be read
   * @see canGetProperty()
   */
  public canSetProperty ( name: string | symbol ): boolean {
    if ( !this.hasProperty(name) ) {
      return false;
    }

    return typeof name === 'symbol'
      ? true
      : ['w', 'a'].includes(this.registry[name]);
  }

  /**
   * Returns a value indicating whether a method is defined.
   * @param name - The method name
   * @return Whether the method is defined
   */
  public hasMethod ( name: string | symbol ): boolean {
    return name in this
      && (typeof name === 'string' && !name.startsWith('__'))
      && Op.has(this.registry, name)
      && CallbackHelper.isActualFunction(this.registry[name]);
  }
}
