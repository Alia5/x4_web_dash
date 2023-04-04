/*
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
*/

import { writable } from 'svelte/store';

function createPollingIntervals() {
    const { subscribe, update, set } = writable({} as Record<string, number|undefined>);

    return {
        subscribe,
        set: (key: string, interval: number) => update((intervals) => ({
            ...intervals,
            [key]: interval
        })),
        reset: (key?: string) => {
            if (key) {
                return update((intervals) => ({
                    ...intervals,
                    [key]: undefined
                }));
            }
            set({});
        }
    };
}

export const pollingIntervals = createPollingIntervals();

if (window) {
    Object.assign(window, {
        X4PollingIntervals: pollingIntervals
    });
}