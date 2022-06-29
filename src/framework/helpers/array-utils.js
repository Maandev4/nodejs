// @flow

import { is as R_is } from 'ramda';

/**
 * @public
 * @static
 * Count total duplicate values in a given array */
export function stringToArray ( input: Array<string> | string ): Array<string> {
  return R_is(Array, input)
    ? input
    : (
      typeof input === 'string'
        ? [input]
        : []
    );
}

/**
 * @public
 * @static
 * Count total duplicate values in a given array */
export function hasDuplicates ( arr: Array<any> ) {
  return arr.length !== new Set(arr).size;
}

/**
 * @public
 * @static
 * Check that all values exist in a list */
export function contains ( list: Array<any>, check: Array<any> ): boolean {
  return !!check.filter(v => !list.includes(v)).length;
}

/**
 * @public
 * @static
 * Check that all values doest not exist in a list */
export function notContains ( list: Array<any>, check: Array<any> ): boolean {
  return !!check.filter(v => list.includes(v)).length;
}
