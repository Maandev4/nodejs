// Cores
import Component from 'framework/base/Component';

// Interfaces
import { IProperties } from 'framework/interfaces/IBaseObject';

export interface Paramters {
  [field: string]: any;
}

export interface ParamRegistry {
  [namespace: string]: Properties;
}

/** Class constructor parameters */
export interface Arguments {
  [field: string]: any;
}

export interface DefinitionContainer {
  namespace: string;
  [property: string]: any;
}

export type Definition = DefinitionContainer | Component | Function;

export interface DefinitionRegistry {
  [namespace: string]: Definition;
}

export interface SingletonRegistry {
  [id: string]: any;
}

export type DefinitionType = string | Definition | Function | Component | null;
