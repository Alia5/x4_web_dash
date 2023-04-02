/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import type { LowerFirst } from './utiltypes';

export const lowerFirst = <T extends string>(str: T) => (str.charAt(0).toLowerCase() + str.slice(1)) as string extends T ? string : LowerFirst<T>;