// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-06-26
 */

import { access } from 'fs/promises';
import path from 'path';

export async function checkPathAccess ( path: string ): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch ( e ) {
    return false;
  }
}

/**
 * @public
 * @static
 * Normalize a path, Fix path slashes issue (OS related)
 */
export function normalize ( str: string ): string {
  return path.resolve(str)
    .replace(/\\/g, '/');
}
