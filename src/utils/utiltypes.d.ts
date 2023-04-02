/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

export type LowerFirst<T extends string> = T extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : never;
export type UpperFirst<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : never;