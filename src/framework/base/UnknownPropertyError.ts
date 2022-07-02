/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-01
 */

/**
 * UnknownPropertyError represents an exception caused by accessing unknown object properties.
 */
export default class UnknownPropertyError extends Error {
  constructor ( message: string = '' ) {
    super(message);
    this.name = 'UnknownPropertyError';
    this.message = message || 'Unknown Property';
  }
}
