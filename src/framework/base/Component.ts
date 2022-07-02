/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-01
 */

// Core
import BaseObject from 'framework/base/BaseObject';
import Behavior from 'framework/base/Behavior';

export type Behaviors = { [name: string]: Behavior };

export default class Component extends BaseObject {
  /**
   * @var array the attached event handlers (event name => handlers)
   */
  private _events: { [key: string]: Function } = {};

  /**
   * The event handlers attached for wildcard patterns (event name wildcard => handlers)
   */
  private _eventWildcards: { [key: string]: Function } = {};

  /**
   * The attached behaviors (behavior name => behavior). This is `null` when not initialized.
   */
  private _behaviors: Behaviors = {};

  public behaviors (): Array<Behavior> {
    return [];
  }

  public on ( event: string, handler: Function, data: any = null, append: boolean = true ) {
  }

  public off ( name, handler: Function | null = null ) {
  }

  public getBehavior ( name: string ): Behavior | null {
    this.ensureBehaviors();
    return this._behaviors?.hasOwnProperty(name)
      ? this._behaviors[name]
      : null;
  }

  public getBehaviors (): Behaviors {
    this.ensureBehaviors();
    return this._behaviors;
  }

  public attachBehavior ( name: string, behavior: Behavior ): Behavior {
    this.ensureBehaviors();
    return this.attachBehaviorInternal(name, behavior);
  }

  public attachBehaviors ( behaviors: Behaviors ): void {
    this.ensureBehaviors();

    for ( const [name, behavior] of Object.entries(behaviors) ) {
      this.attachBehaviorInternal(name, behavior);
    }
  }

  public detachBehaviors () {
    this.ensureBehaviors();
    for ( const name of Object.keys(this.behaviors) ) {
      this.detachBehavior(name);
    }
  }

  public detachBehavior ( name: string ): Behavior | null {
    this.ensureBehaviors();

    if ( this._behaviors?.hasOwnProperty(name) ) {
      const behavior: Behavior = this._behaviors[name];
      delete this._behaviors[name];
      behavior.detach();
      return behavior;
    }

    return null;
  }

  public ensureBehaviors (): void {
    if ( this.behaviors === null ) {
      this._behaviors = {};
      for ( const [name, behavior] of Object.entries(this.behaviors) ) {
        this.attachBehaviorInternal(name, behavior);
      }
    }
  }

  private attachBehaviorInternal ( name: string, behavior: Behavior ) {
    if ( this._behaviors.hasOwnProperty(name) ) {
      this._behaviors[name].detach();
    } else {
      behavior.attach(this);
      this._behaviors[name] = behavior;
    }

    return behavior;
  }
}
