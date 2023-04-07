/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware
Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/
import { LogbookApi, LogbookCategory} from '../api/logbook';
import { createFetcherStoreFn } from './fetcherStoreUtil';


const CONFIG = {
    numLogbook: {
        fn: LogbookApi.getNumLogbook,
        intervalMs: 0
    },
    logbookEntries: {
        fn: () => LogbookApi.getLogbook(LogbookCategory.ALL, 0),
        intervalMs: 0
    }
} as const;


type StoreValues = {
    [key in keyof typeof CONFIG]: Awaited<ReturnType<typeof CONFIG[key]['fn']>>;
}

export const logbook = createFetcherStoreFn<StoreValues>(CONFIG)();
