/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-01
 */

// Core
import App from 'framework/web/App';

// Interfaces
import IBaseObject from 'framework/interfaces/IBaseObject';

export default class CoreObject implements IBaseObject {
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
}
