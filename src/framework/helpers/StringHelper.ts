/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-02
 */

import { isMatch, Options } from 'micromatch';

export default class StringHelper {
  public static matchWildcard ( pattern: string, str: string, options: Options = {} ): boolean {
    return isMatch(str, pattern, options);
  }

  public static strpos ( haystack: string, needle: string, offset: number = 0 ): number | false {
    const i = (haystack as string).indexOf(needle, offset);
    return i === -1 ? false : i;
  }
}
