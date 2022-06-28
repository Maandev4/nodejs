// @flow

import type { RouteOptions } from 'fastify';

/** controller/action name */
type RulePath = string;

type RuleOptions = {
  /** controller/action name */
  route: string,
  /** route additional options */
  options: RouteOptions
}

export type RuleConfig = RulePath | RuleOptions;

export interface UrlRouter {
  [key: string]: RuleConfig;
}

