// @flow
import { is } from 'ramda';

/** Cast string value into an array */
export function stringToArray ( input: Array<string> | string ): Array<string> {
  return is(Array, input)
    ? input
    : (
      typeof input === 'string'
        ? [input]
        : []
    );
}
