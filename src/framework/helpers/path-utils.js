// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-06-26
 */

import { access } from 'fs/promises';
import path from 'path';


/**
 * @public
 * @static
 * Check that given file is accessible or not
 */
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

/**
 * @public
 * @static
 * Get normalized project's root path
 */
export function rootPath (): string {
  return normalize(path.resolve(__dirname, '../../'));
}

/**
 * @public
 * @static
 * Resolve to give a relative path by joining project's root path and creates an absolute file path
 */
export function resolveRelativePath ( ...parts: Array<string> ): string {
  return normalize(path.resolve(path.join(rootPath(), ...parts)));
}
