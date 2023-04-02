import { lowerFirst } from '../utils/utils';
import type { LowerFirst, UpperFirst } from '../utils/utiltypes';
import { api } from './apibase';

const basicGameCommonCalls = {
    GetCurrentGameTime: 0 as number,
    GetCurrentUTCDataTime: 0 as number
} as const;

export const GameCommonsApi = {
    ...Object.entries(basicGameCommonCalls)
        .reduce((acc, [key, value]) => ({
            ...acc,
            [lowerFirst(key)]: typeof value === 'function' ?  value :(
                async () => ((await api.get<unknown>(key)).data)
            )
        }), {}) as {
        [key in LowerFirst<keyof typeof basicGameCommonCalls>]:
        typeof basicGameCommonCalls[UpperFirst<key>] extends () => unknown
            ? typeof basicGameCommonCalls[UpperFirst<key>] 
            : () => Promise<typeof basicGameCommonCalls[UpperFirst<key>]>
    }
};