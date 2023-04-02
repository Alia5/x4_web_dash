/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import type { Length } from '../utils/utiltypes';
import { api } from './apibase';


// const basicCalls = {
//     GetComponentData: [] as string[]
// } as const;

export const ComponentsApi = {
    // ...Object.entries(basicCalls)
    //     .reduce((acc, [key, value]) => ({
    //         ...acc,
    //         [lowerFirst(key)]: typeof value === 'function' ? value : (
    //             async () => ((await api.get<unknown>(key)).data)
    //         )
    //     }), {}) as {
    //     [key in LowerFirst<keyof typeof basicCalls>]:
    //         typeof basicCalls[UpperFirst<key>] extends () => unknown
    //             ? typeof basicCalls[UpperFirst<key>]
    //             : () => Promise<typeof basicCalls[UpperFirst<key>]>
    // }
    // TODO: improve types... But eh... It works for now
    getComponentData: async <R extends unknown[], T extends string[] = string[]>(
        componentId: number,
        attribs: T
    ): Promise<
    Length<R> extends 1 ? R[0] : R
    > => {

        const respData = (await api.get<R>('/GetComponentData', {
            params: {
                componentId,
                attribs: attribs.join(',')
            }
        })).data;
        if (respData.length === 1) {
            return respData[0] as Length<R> extends 1 ? R[0] : never;
        }
        return respData as Length<R> extends 1 ? never : R;
    }
} as const;