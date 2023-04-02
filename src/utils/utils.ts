import type { LowerFirst } from './utiltypes';

export const lowerFirst = <T extends string>(str: T) => (str.charAt(0).toLowerCase() + str.slice(1)) as string extends T ? string : LowerFirst<T>;