/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-02
 */

import * as Op from 'object-path';

// Core
import BaseObject from 'framework/base/BaseObject';

// Helpers
import CallbackHelper from 'framework/helpers/CallbackHelper';

// Types
type EventRegistry = [Function, any];
type EventsMap = { [name: string]: Array<EventRegistry> };

export default class Event extends BaseObject {
  public name: string = '';
  public handled: boolean = false;
  public data: any = null;

  private static _events: EventsMap = {};

  public static on ( name: string, handler: Function, data: any = null, append: boolean = true ): void {
    if ( !Op.has(Event._events, name) ) {
      Event._events[name] = [];
    }

    if ( append ) {
      Event._events[name].push([handler, data]);
    } else {
      Event._events[name] = [[handler, data]];
    }
  }

  public static off ( name: string, handler: Function | null ): boolean {
    if ( !Op.has(Event._events, name) ) {
      return false;
    }

    if ( handler === null ) {
      delete Event._events[name];
      return true;
    }

    // plain event names
    let removed: boolean = false;
    let i = 0;

    for ( const data of Object.values(Event._events[name]) ) {
      if ( data[0] === handler ) {
        delete Event._events[name][i];
        removed = true;
      }

      if ( removed ) {
        Event._events[name] = Object.values(Event._events[name]);
        return true;
      }

      i++;
    }

    return false;
  }

  public static offAll (): void {
    Event._events = {};
  }

  public static hasHandlers ( name: string ): boolean {
    return !!Op.get(Event._events, name, []).length;
  }

  /**
   * Triggers a class-level event.
   * This method will cause invocation of event handlers that are attached to the named event
   *
   * @param name The event name.
   * @param event The event parameter, If not set, a default [[Event]] object will be created.
   */
  public static async trigger ( name: string, event: Event | null = null ) {
    if ( !Op.has(Event._events, name) ) {
      return;
    }

    if ( event === null ) {
      event = new Event();
    }
console.log('event:', event);
    event.handled = false;
    event.name = name;

    const eventHandlers: Array<EventRegistry> = Op.get(Event._events, name, []);

    for ( const [handler, data] of eventHandlers ) {
      event.data = data;
      const callback = CallbackHelper.promisify(handler);
      await callback.call(null, event);
      if ( event.handled ) {
        return;
      }
    }
  }
}
