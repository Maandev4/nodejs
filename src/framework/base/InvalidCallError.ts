/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-01
 */

/**
 * InvalidCallError represents an exception caused by accessing write-only object properties.
 */
export default class InvalidCallError extends Error {
  constructor ( message: string = '' ) {
    super(message);
    this.name = 'InvalidCallError';
    this.message = message || 'Invalid scope';
  }
}
