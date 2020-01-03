/** Adapted from https://github.com/krzkaczor/ts-essentials */

/** Essentials */
export type Primitive = string | number | boolean | undefined | null;

/** Dictionaries related */
export type Dictionary<T, K extends string | symbol | number = string> = { [key in K]: T };
export type DictionaryValues<T> = T extends Dictionary<infer U> ? U : never;

/** Like Partial but recursive */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U2> ? ReadonlyArray<DeepPartial<U2>> : DeepPartial<T[P]>
};

/** Like Readonly but recursive */
export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Array<infer U> ? ReadonlyArray<U> : T extends Function ? T : DeepReadonlyObject<T>;
type DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

/** Easy create opaque types ie. types that are subset of their original types (ex: positive numbers, uppercased string) */
export type Opaque<K, T> = T & { __TYPE__: K };

export type Optional<T> = T | undefined;
