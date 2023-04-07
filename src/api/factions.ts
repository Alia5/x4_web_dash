/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import { lowerFirst } from '../utils/utils';
import type { LowerFirst, UpperFirst } from '../utils/utiltypes';
import { api } from './apibase';

const factionCalls = {
    GetNumAllRaces: 0 as number,
    GetAllRaces: [] as RaceInfo[]
} as const;

export const FactionsApi = {
    ...Object.entries(factionCalls)
        .reduce((acc, [key, value]) => ({
            ...acc,
            [lowerFirst(key)]: typeof value === 'function' ?  value :(
                async () => ((await api.get<unknown>(key)).data)
            )
        }), {}) as {
        [key in LowerFirst<keyof typeof factionCalls>]:
        typeof factionCalls[UpperFirst<key>] extends () => unknown
            ? typeof factionCalls[UpperFirst<key>] 
            : () => Promise<typeof factionCalls[UpperFirst<key>]>
    },
    
    getNumAllFactions: async (hidden?: boolean) => {
        const resp = await api.get<number>('/GetNumAllFactions', {
            params: {
                hidden
            }
        });
        return resp.data;
    },
    getAllFactions: async (hidden?: boolean) => {
        const resp = await api.get<string[]>('/GetAllFactions', {
            params: {
                hidden
            }
        });
        return resp.data;
    },
    getAllFactionShips: async (factionId: string) => {
        const resp = await api.get<number[]>('/GetAllFactionShips', {
            params: {
                factionId
            }
        });
        return resp.data;
    },
    getAllFactionStations: async (factionId: string) => {
        const resp = await api.get<number[]>('/GetAllFactionStations', {
            params: {
                factionId
            }
        });
        return resp.data;
    }
};