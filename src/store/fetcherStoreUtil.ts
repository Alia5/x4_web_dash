/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import { writable } from 'svelte/store';
import { pollingIntervals } from './pollingInterval';

export function createFetcherStoreFn<T = undefined>(storeConfig: {
    [key: string]: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fn: (...args: any[]) => Promise<unknown>|unknown;
        intervalMs: number;
        dependencies?: readonly string[] | string[] | undefined;
        [K: string]: unknown;
    };
}) {

    type StoreValues = T extends undefined ? {
        [key in keyof typeof storeConfig]: Awaited<ReturnType<typeof storeConfig[key]['fn']>>;
    } : T

    return () => {
        const storeValues: Partial<StoreValues> = {};
        const { subscribe, set } = writable(storeValues);

        pollingIntervals.subscribe((intervals) => {
            Object.entries(intervals)
                .forEach(([key, interval]) => {
                    if (key in pollingRates) {
                        pollingRates[key] = (
                            interval
                                ?? pollingRates[key ]
                        );
                    }
                    if (key in timers) {
                        clearTimeout(timers[key]);
                        if (interval) {
                            setTimeout(handlerFnForKey(key), 0);
                        }
                    }
                });
        });


        const pollingRates = Object.entries(storeConfig)
            .reduce((acc, [key, config]) => ({
                ...acc,
                [key]: config.intervalMs
            }), {}) as Record<keyof typeof storeConfig, number|undefined>;

        const handlerFnForKey = (key: string) => {
            const handlerFn = async () => {
                try {
                    await handlers[key as keyof typeof storeConfig]();
                } catch (e) {
                    console.error(e);      
                }
                timers[key] = (
                    pollingRates[key]
                        ? setTimeout(handlerFn, pollingRates[key])
                        : undefined
                );
            };
            return handlerFn;
        };
    
        const handlers = Object.entries(storeConfig)
            .reduce((acc, [key, config]) => {
                return {
                    ...acc,
                    [key]: async () => {
                        const deps = ((config as { dependencies?: string[]}).dependencies
                            ?.map((dep) => 
                                storeValues[dep as keyof StoreValues]) ?? []) as [unknown];
                        const value = await (config.fn as (...args: unknown[]) => unknown)(...deps);
                        Object.assign(storeValues, {
                            ...storeValues,
                            [key]: value
                        });
                        set(storeValues);
                    }
                };
            }, {}) as Record<keyof typeof storeConfig, () => Promise<void>>;
            
        const timers = Object.entries(storeConfig)
            .reduce((
                acc,
                [key]
            ) => {
                const handlerFn = handlerFnForKey(key);
                return ({
                    ...acc,
                    [key]: setTimeout(handlerFn, 0)
                });
            }, {} as Record<string, number|undefined>);

        return {
            subscribe,
            reset: () => set({}),
            // stop: () => {
            //     Object.values(timers).forEach((timer) => clearTimeout(timer));
            // },
            // resumePolling: () => {
            // },
            fetch: (k?: keyof typeof storeConfig) => {
                if (k) {
                    return handlers[k]();
                }
                return Promise.all(Object.values(handlers).map((h) => h()));
            }
        };
    };
}