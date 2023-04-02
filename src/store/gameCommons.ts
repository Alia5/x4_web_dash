/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

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
