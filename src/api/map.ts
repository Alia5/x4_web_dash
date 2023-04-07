/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware
Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/
import { api } from './apibase';

const mapCalls = {

} as const;

export const MapApi = {
    // ...Object.entries(mapCalls)
    //     .reduce((acc, [key, value]) => ({
    //         ...acc,
    //         [lowerFirst(key)]: typeof value === 'function' ?  value :(
    //             async () => ((await api.get<unknown>(key)).data)
    //         )
    //     }), {}) as {
    //     [key in LowerFirst<keyof typeof mapCalls>]:
    //     typeof mapCalls[UpperFirst<key>] extends () => unknown
    //         ? typeof mapCalls[UpperFirst<key>] 
    //         : () => Promise<typeof mapCalls[UpperFirst<key>]>
    // },
    
    getSectorShips: async (sectorId: number, hidden?: boolean) => {
        const resp = await api.get<{
            'owner': string,
            'sectorid': number,
            'id': number,
            'name': string,
            'shiptype': string
        }[]>('/GetSectorShips', {
            params: {
                sectorId,
                hidden
            }
        });
        return resp.data;
    }
};