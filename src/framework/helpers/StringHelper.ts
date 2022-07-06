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
    const i = haystack.indexOf(needle, offset);
    return i === -1 ? false : i;
  }

  public static strrpos ( haystack: string, needle: string, offset?: number ): number | false {
    const i = haystack.lastIndexOf(needle, offset);
    return i === -1 ? false : i;
  }

  public static substr ( str: string, offset: number, length: number | undefined = undefined ): string {
    return String(str || '').substring(offset || 0, length);
  }

  /**
   * Make a string's first character uppercase
   * @param str - The input string
   * @param lowercase=false - Transform other than first chars to lowercase first
   */
  public static ucFirst ( str: any, lowercase: boolean = false ): string {
    str = String(str || '').toString();
    return str.charAt(0).toUpperCase()
      + (lowercase ? str.substring(1).toLowerCase() : str.substring(1));
  }

  public static trim ( str: string, chr: string = '' ): string {
    const regex: RegExp = !chr
      ? new RegExp('^\\s+|\\s+$', 'g')
      : new RegExp(`^${chr}+|${chr}+$`, 'g');
    return str.replace(regex, '');
  }

  public static rtrim ( str: string, chr: string = '' ): string {
    const regex: RegExp = !chr
      ? new RegExp('\\s+$')
      : new RegExp(`${chr}+$`);
    return str.replace(regex, '');
  }

  public static ltrim ( str: string, chr: string = '' ): string {
    const regex: RegExp = !chr
      ? new RegExp('^\\s+')
      : new RegExp(`^${chr}+`);
    return str.replace(regex, '');
  }
}
