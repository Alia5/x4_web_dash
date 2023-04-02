import { GameCommonsApi } from '../api/game_commons';
import { createFetcherStoreFn } from './fetcherStoreUtil';



const CONFIG = {
    currentGameTime: {
        fn: GameCommonsApi.getCurrentGameTime,
        intervalMs: 5000
    },
    utcDataTime: {
        fn: GameCommonsApi.getCurrentUTCDataTime,
        intervalMs: 5000
    }
} as const;


type StoreValues = {
    [key in keyof typeof CONFIG]: Awaited<ReturnType<typeof CONFIG[key]['fn']>>;
}

export const gameCommons = createFetcherStoreFn<StoreValues>(CONFIG)();
