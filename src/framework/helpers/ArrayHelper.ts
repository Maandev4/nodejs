/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-09
 */

import { is as R_is } from 'ramda';

/**
 * ArrayHelper provides additional array functionality that you can use in your
 * application.
 */
export default class ArrayHelper {
  /**
   * Count total duplicate values in a given array */
  public static stringToArray ( input: Array<string> | string ): Array<string> {
    return R_is(Array, input) ? input : [input];
  }

  /**
   * Count total duplicate values in a given array */
  public static hasDuplicates ( arr: Array<any> ): boolean {
    return arr.length !== new Set(arr).size;
  }

  /**
   * Remove all duplicate values from given array */
  public static uniqueOnly<T> ( arr: Array<T> ): Array<T> {
    return [...new Set<T>(arr)];
  }

  /**
   * Check that all values exist in a list */
  public static contains ( list: Array<any>, check: Array<any> ): boolean {
    return !!check.filter(v => !list.includes(v)).length;
  }

  /**
   * Check that all values doest not exist in a list */
  public static notContains ( list: Array<any>, check: Array<any> ): boolean {
    return !!check.filter(v => list.includes(v)).length;
  }
}
