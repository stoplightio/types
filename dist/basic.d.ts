/** Adapted from https://github.com/krzkaczor/ts-essentials */
/** Essentials */
export declare type Primitive = string | number | boolean | undefined | null;
/** Dictionaries related */
export declare type Dictionary<T, K extends string | number = string> = {
    [key in K]: T;
};
export declare type DictionaryValues<T> = T extends Dictionary<infer U> ? U : never;
/** Like Partial but recursive */
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U2> ? ReadonlyArray<DeepPartial<U2>> : DeepPartial<T[P]>;
};
/** Like Readonly but recursive */
export declare type DeepReadonly<T> = T extends Primitive ? T : T extends Array<infer U> ? ReadonlyArray<U> : T extends Function ? T : DeepReadonlyObject<T>;
declare type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
/** Easy create opaque types ie. types that are subset of their original types (ex: positive numbers, uppercased string) */
export declare type Opaque<K, T> = T & {
    __TYPE__: K;
};
export declare type Optional<T> = T | undefined;
export {};
