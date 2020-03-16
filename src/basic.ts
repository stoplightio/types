export { DeepPartial, DeepReadonly } from 'utility-types'

/** Essentials */
export type Primitive = string | number | boolean | undefined | null;

/** Dictionaries related */
export type Dictionary<T, K extends string | number = string> = { [key in K]: T };
export type DictionaryValues<T> = T extends Dictionary<infer U> ? U : never;

/** Easy create opaque types ie. types that are subset of their original types (ex: positive numbers, uppercased string) */
export type Opaque<K, T> = T & { __TYPE__: K };

export type Optional<T> = T | undefined;
